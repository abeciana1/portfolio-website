import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_image_block" ADD COLUMN "cursor_label" varchar;
  ALTER TABLE "project_pages_blocks_image_block" ADD COLUMN "cursor_label" varchar;
  ALTER TABLE "jobs_blocks_image_block" ADD COLUMN "cursor_label" varchar;
  ALTER TABLE "blog_pages_blocks_blog_image" ADD COLUMN "cursor_label" varchar NOT NULL;
  ALTER TABLE "blog_pages_blocks_blog_header" ADD COLUMN "cursor_label" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_image_block" DROP COLUMN "cursor_label";
  ALTER TABLE "project_pages_blocks_image_block" DROP COLUMN "cursor_label";
  ALTER TABLE "jobs_blocks_image_block" DROP COLUMN "cursor_label";
  ALTER TABLE "blog_pages_blocks_blog_image" DROP COLUMN "cursor_label";
  ALTER TABLE "blog_pages_blocks_blog_header" DROP COLUMN "cursor_label";`)
}
