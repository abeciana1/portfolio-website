import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_blog_post_section" ADD COLUMN "enable_section_content" boolean;
  ALTER TABLE "pages_blocks_blog_post_section" ADD COLUMN "section_group_section_id" varchar;
  ALTER TABLE "pages_blocks_blog_post_section" ADD COLUMN "section_group_pill" varchar;
  ALTER TABLE "pages_blocks_blog_post_section" ADD COLUMN "section_group_heading" varchar;
  ALTER TABLE "pages_blocks_blog_post_section" ADD COLUMN "section_group_description" varchar;
  ALTER TABLE "blog_pages_blocks_blog_post_section" ADD COLUMN "enable_section_content" boolean;
  ALTER TABLE "blog_pages_blocks_blog_post_section" ADD COLUMN "section_group_section_id" varchar;
  ALTER TABLE "blog_pages_blocks_blog_post_section" ADD COLUMN "section_group_pill" varchar;
  ALTER TABLE "blog_pages_blocks_blog_post_section" ADD COLUMN "section_group_heading" varchar;
  ALTER TABLE "blog_pages_blocks_blog_post_section" ADD COLUMN "section_group_description" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_blog_post_section" DROP COLUMN "enable_section_content";
  ALTER TABLE "pages_blocks_blog_post_section" DROP COLUMN "section_group_section_id";
  ALTER TABLE "pages_blocks_blog_post_section" DROP COLUMN "section_group_pill";
  ALTER TABLE "pages_blocks_blog_post_section" DROP COLUMN "section_group_heading";
  ALTER TABLE "pages_blocks_blog_post_section" DROP COLUMN "section_group_description";
  ALTER TABLE "blog_pages_blocks_blog_post_section" DROP COLUMN "enable_section_content";
  ALTER TABLE "blog_pages_blocks_blog_post_section" DROP COLUMN "section_group_section_id";
  ALTER TABLE "blog_pages_blocks_blog_post_section" DROP COLUMN "section_group_pill";
  ALTER TABLE "blog_pages_blocks_blog_post_section" DROP COLUMN "section_group_heading";
  ALTER TABLE "blog_pages_blocks_blog_post_section" DROP COLUMN "section_group_description";`)
}
