import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blog_pages_blocks_video_block_gradient_select" AS ENUM('Variant1', 'Variant2', 'Variant3', 'Variant4');
  CREATE TABLE "blog_pages_blocks_video_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"video_id" integer NOT NULL,
  	"forced_width" numeric DEFAULT 0 NOT NULL,
  	"forced_height" numeric DEFAULT 0 NOT NULL,
  	"gradient" boolean DEFAULT false,
  	"gradient_y_flip" boolean DEFAULT false,
  	"gradient_select" "enum_blog_pages_blocks_video_block_gradient_select",
  	"block_name" varchar
  );
  
  ALTER TABLE "blog_pages_blocks_video_block" ADD CONSTRAINT "blog_pages_blocks_video_block_video_id_video_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."video"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_pages_blocks_video_block" ADD CONSTRAINT "blog_pages_blocks_video_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "blog_pages_blocks_video_block_order_idx" ON "blog_pages_blocks_video_block" USING btree ("_order");
  CREATE INDEX "blog_pages_blocks_video_block_parent_id_idx" ON "blog_pages_blocks_video_block" USING btree ("_parent_id");
  CREATE INDEX "blog_pages_blocks_video_block_path_idx" ON "blog_pages_blocks_video_block" USING btree ("_path");
  CREATE INDEX "blog_pages_blocks_video_block_video_idx" ON "blog_pages_blocks_video_block" USING btree ("video_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "blog_pages_blocks_video_block" CASCADE;
  DROP TYPE "public"."enum_blog_pages_blocks_video_block_gradient_select";`)
}
