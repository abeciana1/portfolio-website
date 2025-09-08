import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_call_to_action" ADD COLUMN "cursor_label" varchar;
  ALTER TABLE "project_pages_blocks_call_to_action" ADD COLUMN "cursor_label" varchar;
  ALTER TABLE "blog_pages_blocks_call_to_action" ADD COLUMN "cursor_label" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_call_to_action" DROP COLUMN "cursor_label";
  ALTER TABLE "project_pages_blocks_call_to_action" DROP COLUMN "cursor_label";
  ALTER TABLE "blog_pages_blocks_call_to_action" DROP COLUMN "cursor_label";`)
}
