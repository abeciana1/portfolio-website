import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Create enums with duplicate-safe guards
  await db.execute(sql`
    DO $$
    BEGIN
      CREATE TYPE "public"."enum_pages_blocks_blog_post_section_post_selection"
        AS ENUM('latest', 'custom', 'all', 'byCategory');
    EXCEPTION WHEN duplicate_object THEN
      NULL;
    END $$;
  `);

  await db.execute(sql`
    DO $$
    BEGIN
      CREATE TYPE "public"."enum_blog_pages_blocks_blog_post_section_post_selection"
        AS ENUM('latest', 'custom', 'all', 'byCategory');
    EXCEPTION WHEN duplicate_object THEN
      NULL;
    END $$;
  `);

  // Create tables
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "users_sessions" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "created_at" timestamp(3) with time zone,
      "expires_at" timestamp(3) with time zone NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "pages_blocks_blog_post_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "post_selection" "enum_pages_blocks_blog_post_section_post_selection" NOT NULL,
      "post_limit" numeric,
      "category_filter_id" integer,
      "block_name" varchar
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "blog_pages_blocks_blog_post_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "post_selection" "enum_blog_pages_blocks_blog_post_section_post_selection" NOT NULL,
      "post_limit" numeric,
      "category_filter_id" integer,
      "block_name" varchar
    );
  `);

  // ---- SAFE CLEANUP for legacy "test" artifacts ----
  // Disable RLS & drop table "test" only if it exists
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema='public' AND table_name='test'
      ) THEN
        EXECUTE 'ALTER TABLE "public"."test" DISABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP TABLE "public"."test" CASCADE';
      END IF;
    END $$;
  `);

  // Drop FK only if it exists
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (
        SELECT 1
        FROM information_schema.table_constraints
        WHERE table_schema='public'
          AND table_name='payload_locked_documents_rels'
          AND constraint_name='payload_locked_documents_rels_test_fk'
      ) THEN
        ALTER TABLE "public"."payload_locked_documents_rels"
          DROP CONSTRAINT "payload_locked_documents_rels_test_fk";
      END IF;
    END $$;
  `);

  // Drop index & column only if they exist
  await db.execute(sql`DROP INDEX IF EXISTS "payload_locked_documents_rels_test_id_idx";`);
  await db.execute(sql`
    ALTER TABLE "public"."payload_locked_documents_rels"
    DROP COLUMN IF EXISTS "test_id";
  `);

  // ---- Rest of your intended schema changes ----
  await db.execute(sql`
    ALTER TABLE "public"."blog_pages" ALTER COLUMN "is_blog_post" SET DEFAULT false;

    ALTER TABLE "public"."pages_rels" ADD COLUMN IF NOT EXISTS "blog_pages_id" integer;
    ALTER TABLE "public"."blog_pages" ADD COLUMN IF NOT EXISTS "teaser_content" jsonb;
    ALTER TABLE "public"."blog_pages" ADD COLUMN IF NOT EXISTS "content_html" varchar;
    ALTER TABLE "public"."blog_pages_rels" ADD COLUMN IF NOT EXISTS "blog_pages_id" integer;

    ALTER TABLE "public"."users_sessions"
      ADD CONSTRAINT IF NOT EXISTS "users_sessions_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "public"."pages_blocks_blog_post_section"
      ADD CONSTRAINT IF NOT EXISTS "pages_blocks_blog_post_section_category_filter_id_blog_categories_id_fk"
      FOREIGN KEY ("category_filter_id") REFERENCES "public"."blog_categories"("id")
      ON DELETE set null ON UPDATE no action;

    ALTER TABLE "public"."pages_blocks_blog_post_section"
      ADD CONSTRAINT IF NOT EXISTS "pages_blocks_blog_post_section_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "public"."blog_pages_blocks_blog_post_section"
      ADD CONSTRAINT IF NOT EXISTS "blog_pages_blocks_blog_post_section_category_filter_id_blog_categories_id_fk"
      FOREIGN KEY ("category_filter_id") REFERENCES "public"."blog_categories"("id")
      ON DELETE set null ON UPDATE no action;

    ALTER TABLE "public"."blog_pages_blocks_blog_post_section"
      ADD CONSTRAINT IF NOT EXISTS "blog_pages_blocks_blog_post_section_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_pages"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "public"."users_sessions" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "public"."users_sessions" USING btree ("_parent_id");

    CREATE INDEX IF NOT EXISTS "pages_blocks_blog_post_section_order_idx" ON "public"."pages_blocks_blog_post_section" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "pages_blocks_blog_post_section_parent_id_idx" ON "public"."pages_blocks_blog_post_section" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "pages_blocks_blog_post_section_path_idx" ON "public"."pages_blocks_blog_post_section" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "pages_blocks_blog_post_section_category_filter_idx" ON "public"."pages_blocks_blog_post_section" USING btree ("category_filter_id");

    CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_post_section_order_idx" ON "public"."blog_pages_blocks_blog_post_section" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_post_section_parent_id_idx" ON "public"."blog_pages_blocks_blog_post_section" USING btree ("_parent_id");
    CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_post_section_path_idx" ON "public"."blog_pages_blocks_blog_post_section" USING btree ("_path");
    CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_post_section_category_filter_idx" ON "public"."blog_pages_blocks_blog_post_section" USING btree ("category_filter_id");

    ALTER TABLE "public"."pages_rels"
      ADD CONSTRAINT IF NOT EXISTS "pages_rels_blog_pages_fk"
      FOREIGN KEY ("blog_pages_id") REFERENCES "public"."blog_pages"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "public"."blog_pages_rels"
      ADD CONSTRAINT IF NOT EXISTS "blog_pages_rels_blog_pages_fk"
      FOREIGN KEY ("blog_pages_id") REFERENCES "public"."blog_pages"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "pages_rels_blog_pages_id_idx" ON "public"."pages_rels" USING btree ("blog_pages_id");
    CREATE INDEX IF NOT EXISTS "blog_pages_rels_blog_pages_id_idx" ON "public"."blog_pages_rels" USING btree ("blog_pages_id");
  `);
}

// export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
//   await db.execute(sql`
//    CREATE TYPE "public"."enum_pages_blocks_blog_post_section_post_selection" AS ENUM('latest', 'custom', 'all', 'byCategory');
//   CREATE TYPE "public"."enum_blog_pages_blocks_blog_post_section_post_selection" AS ENUM('latest', 'custom', 'all', 'byCategory');
//   CREATE TABLE "users_sessions" (
//   	"_order" integer NOT NULL,
//   	"_parent_id" integer NOT NULL,
//   	"id" varchar PRIMARY KEY NOT NULL,
//   	"created_at" timestamp(3) with time zone,
//   	"expires_at" timestamp(3) with time zone NOT NULL
//   );
  
//   CREATE TABLE "pages_blocks_blog_post_section" (
//   	"_order" integer NOT NULL,
//   	"_parent_id" integer NOT NULL,
//   	"_path" text NOT NULL,
//   	"id" varchar PRIMARY KEY NOT NULL,
//   	"post_selection" "enum_pages_blocks_blog_post_section_post_selection" NOT NULL,
//   	"post_limit" numeric,
//   	"category_filter_id" integer,
//   	"block_name" varchar
//   );
  
//   CREATE TABLE "blog_pages_blocks_blog_post_section" (
//   	"_order" integer NOT NULL,
//   	"_parent_id" integer NOT NULL,
//   	"_path" text NOT NULL,
//   	"id" varchar PRIMARY KEY NOT NULL,
//   	"post_selection" "enum_blog_pages_blocks_blog_post_section_post_selection" NOT NULL,
//   	"post_limit" numeric,
//   	"category_filter_id" integer,
//   	"block_name" varchar
//   );
  
//   ALTER TABLE "test" DISABLE ROW LEVEL SECURITY;
//   DROP TABLE "test" CASCADE;
//   ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_test_fk";
  
//   DROP INDEX "payload_locked_documents_rels_test_id_idx";
//   ALTER TABLE "blog_pages" ALTER COLUMN "is_blog_post" SET DEFAULT false;
//   ALTER TABLE "pages_rels" ADD COLUMN "blog_pages_id" integer;
//   ALTER TABLE "blog_pages" ADD COLUMN "teaser_content" jsonb;
//   ALTER TABLE "blog_pages" ADD COLUMN "content_html" varchar;
//   ALTER TABLE "blog_pages_rels" ADD COLUMN "blog_pages_id" integer;
//   ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
//   ALTER TABLE "pages_blocks_blog_post_section" ADD CONSTRAINT "pages_blocks_blog_post_section_category_filter_id_blog_categories_id_fk" FOREIGN KEY ("category_filter_id") REFERENCES "public"."blog_categories"("id") ON DELETE set null ON UPDATE no action;
//   ALTER TABLE "pages_blocks_blog_post_section" ADD CONSTRAINT "pages_blocks_blog_post_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
//   ALTER TABLE "blog_pages_blocks_blog_post_section" ADD CONSTRAINT "blog_pages_blocks_blog_post_section_category_filter_id_blog_categories_id_fk" FOREIGN KEY ("category_filter_id") REFERENCES "public"."blog_categories"("id") ON DELETE set null ON UPDATE no action;
//   ALTER TABLE "blog_pages_blocks_blog_post_section" ADD CONSTRAINT "blog_pages_blocks_blog_post_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_pages"("id") ON DELETE cascade ON UPDATE no action;
//   CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
//   CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
//   CREATE INDEX "pages_blocks_blog_post_section_order_idx" ON "pages_blocks_blog_post_section" USING btree ("_order");
//   CREATE INDEX "pages_blocks_blog_post_section_parent_id_idx" ON "pages_blocks_blog_post_section" USING btree ("_parent_id");
//   CREATE INDEX "pages_blocks_blog_post_section_path_idx" ON "pages_blocks_blog_post_section" USING btree ("_path");
//   CREATE INDEX "pages_blocks_blog_post_section_category_filter_idx" ON "pages_blocks_blog_post_section" USING btree ("category_filter_id");
//   CREATE INDEX "blog_pages_blocks_blog_post_section_order_idx" ON "blog_pages_blocks_blog_post_section" USING btree ("_order");
//   CREATE INDEX "blog_pages_blocks_blog_post_section_parent_id_idx" ON "blog_pages_blocks_blog_post_section" USING btree ("_parent_id");
//   CREATE INDEX "blog_pages_blocks_blog_post_section_path_idx" ON "blog_pages_blocks_blog_post_section" USING btree ("_path");
//   CREATE INDEX "blog_pages_blocks_blog_post_section_category_filter_idx" ON "blog_pages_blocks_blog_post_section" USING btree ("category_filter_id");
//   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_blog_pages_fk" FOREIGN KEY ("blog_pages_id") REFERENCES "public"."blog_pages"("id") ON DELETE cascade ON UPDATE no action;
//   ALTER TABLE "blog_pages_rels" ADD CONSTRAINT "blog_pages_rels_blog_pages_fk" FOREIGN KEY ("blog_pages_id") REFERENCES "public"."blog_pages"("id") ON DELETE cascade ON UPDATE no action;
//   CREATE INDEX "pages_rels_blog_pages_id_idx" ON "pages_rels" USING btree ("blog_pages_id");
//   CREATE INDEX "blog_pages_rels_blog_pages_id_idx" ON "blog_pages_rels" USING btree ("blog_pages_id");
//   ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "test_id";`)
// }

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "test" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_blog_post_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_pages_blocks_blog_post_section" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "pages_blocks_blog_post_section" CASCADE;
  DROP TABLE "blog_pages_blocks_blog_post_section" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_blog_pages_fk";
  
  ALTER TABLE "blog_pages_rels" DROP CONSTRAINT "blog_pages_rels_blog_pages_fk";
  
  DROP INDEX "pages_rels_blog_pages_id_idx";
  DROP INDEX "blog_pages_rels_blog_pages_id_idx";
  ALTER TABLE "blog_pages" ALTER COLUMN "is_blog_post" DROP DEFAULT;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "test_id" integer;
  CREATE INDEX "test_updated_at_idx" ON "test" USING btree ("updated_at");
  CREATE INDEX "test_created_at_idx" ON "test" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_test_fk" FOREIGN KEY ("test_id") REFERENCES "public"."test"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_test_id_idx" ON "payload_locked_documents_rels" USING btree ("test_id");
  ALTER TABLE "pages_rels" DROP COLUMN "blog_pages_id";
  ALTER TABLE "blog_pages" DROP COLUMN "teaser_content";
  ALTER TABLE "blog_pages" DROP COLUMN "content_html";
  ALTER TABLE "blog_pages_rels" DROP COLUMN "blog_pages_id";
  DROP TYPE "public"."enum_pages_blocks_blog_post_section_post_selection";
  DROP TYPE "public"."enum_blog_pages_blocks_blog_post_section_post_selection";`)
}
