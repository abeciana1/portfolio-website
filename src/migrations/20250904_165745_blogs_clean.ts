import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // ----- Enums (duplicate-safe) -----
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_pages_blocks_blog_post_section_post_selection"
        AS ENUM('latest', 'custom', 'all', 'byCategory');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `);

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_blog_pages_blocks_blog_post_section_post_selection"
        AS ENUM('latest', 'custom', 'all', 'byCategory');
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `);

  // ----- Tables -----
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "public"."users_sessions" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "created_at" timestamp(3) with time zone,
      "expires_at" timestamp(3) with time zone NOT NULL
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "public"."pages_blocks_blog_post_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "post_selection" "public"."enum_pages_blocks_blog_post_section_post_selection" NOT NULL,
      "post_limit" numeric,
      "category_filter_id" integer,
      "block_name" varchar
    );
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "public"."blog_pages_blocks_blog_post_section" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "post_selection" "public"."enum_blog_pages_blocks_blog_post_section_post_selection" NOT NULL,
      "post_limit" numeric,
      "category_filter_id" integer,
      "block_name" varchar
    );
  `);

  // ----- Column adds / default -----
  await db.execute(sql`ALTER TABLE "public"."blog_pages" ALTER COLUMN "is_blog_post" SET DEFAULT false;`);
  await db.execute(sql`ALTER TABLE "public"."pages_rels" ADD COLUMN IF NOT EXISTS "blog_pages_id" integer;`);
  await db.execute(sql`ALTER TABLE "public"."blog_pages" ADD COLUMN IF NOT EXISTS "teaser_content" jsonb;`);
  await db.execute(sql`ALTER TABLE "public"."blog_pages" ADD COLUMN IF NOT EXISTS "content_html" varchar;`);
  await db.execute(sql`ALTER TABLE "public"."blog_pages_rels" ADD COLUMN IF NOT EXISTS "blog_pages_id" integer;`);

  // ----- FKs (guarded; Postgres has no IF NOT EXISTS for constraints) -----

  // users_sessions_parent_id_fk
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM pg_class WHERE oid = 'public.users_sessions'::regclass) AND
         EXISTS (SELECT 1 FROM pg_class WHERE oid = 'public.users'::regclass) AND
         NOT EXISTS (
           SELECT 1 FROM pg_constraint
           WHERE conname = 'users_sessions_parent_id_fk'
             AND conrelid = 'public.users_sessions'::regclass
         )
      THEN
        ALTER TABLE "public"."users_sessions"
          ADD CONSTRAINT "users_sessions_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id")
          ON DELETE CASCADE ON UPDATE NO ACTION;
      END IF;
    END $$;
  `);

  // pages_blocks_blog_post_section_category_filter_id_blog_categories_id_fk
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM pg_class WHERE oid = 'public.pages_blocks_blog_post_section'::regclass) AND
         EXISTS (SELECT 1 FROM pg_class WHERE oid = 'public.blog_categories'::regclass) AND
         NOT EXISTS (
           SELECT 1 FROM pg_constraint
           WHERE conname = 'pages_blocks_blog_post_section_category_filter_id_blog_categories_id_fk'
             AND conrelid = 'public.pages_blocks_blog_post_section'::regclass
         )
      THEN
        ALTER TABLE "public"."pages_blocks_blog_post_section"
          ADD CONSTRAINT "pages_blocks_blog_post_section_category_filter_id_blog_categories_id_fk"
          FOREIGN KEY ("category_filter_id") REFERENCES "public"."blog_categories"("id")
          ON DELETE SET NULL ON UPDATE NO ACTION;
      END IF;
    END $$;
  `);

  // pages_blocks_blog_post_section_parent_id_fk
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM pg_class WHERE oid = 'public.pages_blocks_blog_post_section'::regclass) AND
         EXISTS (SELECT 1 FROM pg_class WHERE oid = 'public.pages'::regclass) AND
         NOT EXISTS (
           SELECT 1 FROM pg_constraint
           WHERE conname = 'pages_blocks_blog_post_section_parent_id_fk'
             AND conrelid = 'public.pages_blocks_blog_post_section'::regclass
         )
      THEN
        ALTER TABLE "public"."pages_blocks_blog_post_section"
          ADD CONSTRAINT "pages_blocks_blog_post_section_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id")
          ON DELETE CASCADE ON UPDATE NO ACTION;
      END IF;
    END $$;
  `);

  // blog_pages_blocks_blog_post_section_category_filter_id_blog_categories_id_fk
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM pg_class WHERE oid = 'public.blog_pages_blocks_blog_post_section'::regclass) AND
         EXISTS (SELECT 1 FROM pg_class WHERE oid = 'public.blog_categories'::regclass) AND
         NOT EXISTS (
           SELECT 1 FROM pg_constraint
           WHERE conname = 'blog_pages_blocks_blog_post_section_category_filter_id_blog_categories_id_fk'
             AND conrelid = 'public.blog_pages_blocks_blog_post_section'::regclass
         )
      THEN
        ALTER TABLE "public"."blog_pages_blocks_blog_post_section"
          ADD CONSTRAINT "blog_pages_blocks_blog_post_section_category_filter_id_blog_categories_id_fk"
          FOREIGN KEY ("category_filter_id") REFERENCES "public"."blog_categories"("id")
          ON DELETE SET NULL ON UPDATE NO ACTION;
      END IF;
    END $$;
  `);

  // blog_pages_blocks_blog_post_section_parent_id_fk
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM pg_class WHERE oid = 'public.blog_pages_blocks_blog_post_section'::regclass) AND
         EXISTS (SELECT 1 FROM pg_class WHERE oid = 'public.blog_pages'::regclass) AND
         NOT EXISTS (
           SELECT 1 FROM pg_constraint
           WHERE conname = 'blog_pages_blocks_blog_post_section_parent_id_fk'
             AND conrelid = 'public.blog_pages_blocks_blog_post_section'::regclass
         )
      THEN
        ALTER TABLE "public"."blog_pages_blocks_blog_post_section"
          ADD CONSTRAINT "blog_pages_blocks_blog_post_section_parent_id_fk"
          FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_pages"("id")
          ON DELETE CASCADE ON UPDATE NO ACTION;
      END IF;
    END $$;
  `);

  // pages_rels_blog_pages_fk
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM pg_class WHERE oid = 'public.pages_rels'::regclass) AND
         EXISTS (SELECT 1 FROM pg_class WHERE oid = 'public.blog_pages'::regclass) AND
         NOT EXISTS (
           SELECT 1 FROM pg_constraint
           WHERE conname = 'pages_rels_blog_pages_fk'
             AND conrelid = 'public.pages_rels'::regclass
         )
      THEN
        ALTER TABLE "public"."pages_rels"
          ADD CONSTRAINT "pages_rels_blog_pages_fk"
          FOREIGN KEY ("blog_pages_id") REFERENCES "public"."blog_pages"("id")
          ON DELETE CASCADE ON UPDATE NO ACTION;
      END IF;
    END $$;
  `);

  // blog_pages_rels_blog_pages_fk
  await db.execute(sql`
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM pg_class WHERE oid = 'public.blog_pages_rels'::regclass) AND
         EXISTS (SELECT 1 FROM pg_class WHERE oid = 'public.blog_pages'::regclass) AND
         NOT EXISTS (
           SELECT 1 FROM pg_constraint
           WHERE conname = 'blog_pages_rels_blog_pages_fk'
             AND conrelid = 'public.blog_pages_rels'::regclass
         )
      THEN
        ALTER TABLE "public"."blog_pages_rels"
          ADD CONSTRAINT "blog_pages_rels_blog_pages_fk"
          FOREIGN KEY ("blog_pages_id") REFERENCES "public"."blog_pages"("id")
          ON DELETE CASCADE ON UPDATE NO ACTION;
      END IF;
    END $$;
  `);

  // ----- Indexes -----
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "users_sessions_order_idx" ON "public"."users_sessions" USING btree ("_order");`);
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "users_sessions_parent_id_idx" ON "public"."users_sessions" USING btree ("_parent_id");`);

  await db.execute(sql`CREATE INDEX IF NOT EXISTS "pages_blocks_blog_post_section_order_idx" ON "public"."pages_blocks_blog_post_section" USING btree ("_order");`);
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "pages_blocks_blog_post_section_parent_id_idx" ON "public"."pages_blocks_blog_post_section" USING btree ("_parent_id");`);
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "pages_blocks_blog_post_section_path_idx" ON "public"."pages_blocks_blog_post_section" USING btree ("_path");`);
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "pages_blocks_blog_post_section_category_filter_idx" ON "public"."pages_blocks_blog_post_section" USING btree ("category_filter_id");`);

  await db.execute(sql`CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_post_section_order_idx" ON "public"."blog_pages_blocks_blog_post_section" USING btree ("_order");`);
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_post_section_parent_id_idx" ON "public"."blog_pages_blocks_blog_post_section" USING btree ("_parent_id");`);
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_post_section_path_idx" ON "public"."blog_pages_blocks_blog_post_section" USING btree ("_path");`);
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_post_section_category_filter_idx" ON "public"."blog_pages_blocks_blog_post_section" USING btree ("category_filter_id");`);

  await db.execute(sql`CREATE INDEX IF NOT EXISTS "pages_rels_blog_pages_id_idx" ON "public"."pages_rels" USING btree ("blog_pages_id");`);
  await db.execute(sql`CREATE INDEX IF NOT EXISTS "blog_pages_rels_blog_pages_id_idx" ON "public"."blog_pages_rels" USING btree ("blog_pages_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
    // Migration code
}
