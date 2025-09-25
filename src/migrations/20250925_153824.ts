import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_pages_blocks_video_block" DROP COLUMN "gradient_y_flip";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "blog_pages_blocks_video_block" ADD COLUMN "gradient_y_flip" boolean DEFAULT false;`)
}
