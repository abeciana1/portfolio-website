import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blog_pages_blocks_code_language" AS ENUM('bash', 'css', 'html', 'javascript', 'json', 'markdown', 'python', 'sql', 'yaml', 'typescript');
  CREATE TABLE "blog_pages_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar NOT NULL,
  	"language" "enum_blog_pages_blocks_code_language" DEFAULT 'bash',
  	"block_name" varchar
  );
  
  ALTER TABLE "blog_pages_blocks_code" ADD CONSTRAINT "blog_pages_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "blog_pages_blocks_code_order_idx" ON "blog_pages_blocks_code" USING btree ("_order");
  CREATE INDEX "blog_pages_blocks_code_parent_id_idx" ON "blog_pages_blocks_code" USING btree ("_parent_id");
  CREATE INDEX "blog_pages_blocks_code_path_idx" ON "blog_pages_blocks_code" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "blog_pages_blocks_code" CASCADE;
  DROP TYPE "public"."enum_blog_pages_blocks_code_language";`)
}
