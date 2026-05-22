import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users_sessions\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`created_at\` text,
  	\`expires_at\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_sessions_order_idx\` ON \`users_sessions\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`users_sessions_parent_id_idx\` ON \`users_sessions\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`enable_a_p_i_key\` integer,
  	\`api_key\` text,
  	\`api_key_index\` text,
  	\`email\` text NOT NULL,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text NOT NULL,
  	\`convert_webp\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`navigation_menu\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`logo_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_menu_logo_idx\` ON \`navigation_menu\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`navigation_menu_updated_at_idx\` ON \`navigation_menu\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`navigation_menu_created_at_idx\` ON \`navigation_menu\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`navigation_menu_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`nav_links_id\` integer,
  	\`social_links_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`navigation_menu\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`nav_links_id\`) REFERENCES \`nav_links\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`social_links_id\`) REFERENCES \`social_links\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_menu_rels_order_idx\` ON \`navigation_menu_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_menu_rels_parent_idx\` ON \`navigation_menu_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`navigation_menu_rels_path_idx\` ON \`navigation_menu_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`navigation_menu_rels_nav_links_id_idx\` ON \`navigation_menu_rels\` (\`nav_links_id\`);`)
  await db.run(sql`CREATE INDEX \`navigation_menu_rels_social_links_id_idx\` ON \`navigation_menu_rels\` (\`social_links_id\`);`)
  await db.run(sql`CREATE TABLE \`nav_links\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`nav_links_updated_at_idx\` ON \`nav_links\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`nav_links_created_at_idx\` ON \`nav_links\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`social_links\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`social_links_updated_at_idx\` ON \`social_links\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`social_links_created_at_idx\` ON \`social_links\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_call_to_action\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`cursor_label\` text,
  	\`style\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer DEFAULT false,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`arrow\` integer DEFAULT false,
  	\`arrow_direction\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_call_to_action_order_idx\` ON \`pages_blocks_call_to_action\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_call_to_action_parent_id_idx\` ON \`pages_blocks_call_to_action\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_call_to_action_path_idx\` ON \`pages_blocks_call_to_action\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_image_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`cursor_label\` text,
  	\`image_id\` integer NOT NULL,
  	\`forced_width\` numeric DEFAULT 0 NOT NULL,
  	\`forced_height\` numeric DEFAULT 0 NOT NULL,
  	\`gradient\` integer DEFAULT false,
  	\`gradient_x_flip\` integer DEFAULT false,
  	\`gradient_y_flip\` integer DEFAULT false,
  	\`gradient_select\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_block_order_idx\` ON \`pages_blocks_image_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_block_parent_id_idx\` ON \`pages_blocks_image_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_block_path_idx\` ON \`pages_blocks_image_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_image_block_image_idx\` ON \`pages_blocks_image_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_hero_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`subtitle\` text,
  	\`description\` text,
  	\`secondary_blurb\` text,
  	\`enable_inner_container\` integer DEFAULT false,
  	\`grey_background\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_section_order_idx\` ON \`pages_blocks_hero_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_section_parent_id_idx\` ON \`pages_blocks_hero_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_hero_section_path_idx\` ON \`pages_blocks_hero_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_in_view_basic\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`description\` text NOT NULL,
  	\`hidden_y\` numeric DEFAULT 0,
  	\`hidden_blur\` numeric DEFAULT 4,
  	\`visible_y\` numeric DEFAULT 1,
  	\`visible_blur\` numeric DEFAULT 0,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_in_view_basic_order_idx\` ON \`pages_blocks_in_view_basic\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_in_view_basic_parent_id_idx\` ON \`pages_blocks_in_view_basic\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_in_view_basic_path_idx\` ON \`pages_blocks_in_view_basic\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_skills_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` text NOT NULL,
  	\`pill\` text,
  	\`heading\` text NOT NULL,
  	\`description\` text,
  	\`skills_collection_id\` integer NOT NULL,
  	\`gradient\` integer DEFAULT false,
  	\`gradient_select\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`skills_collection_id\`) REFERENCES \`skills_collection\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_skills_section_order_idx\` ON \`pages_blocks_skills_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_skills_section_parent_id_idx\` ON \`pages_blocks_skills_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_skills_section_path_idx\` ON \`pages_blocks_skills_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_skills_section_skills_collection_idx\` ON \`pages_blocks_skills_section\` (\`skills_collection_id\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_code_mockup_link\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`prefix\` text,
  	\`text\` text NOT NULL,
  	\`text_color\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_code_mockup_link_order_idx\` ON \`pages_blocks_code_mockup_link\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_code_mockup_link_parent_id_idx\` ON \`pages_blocks_code_mockup_link\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_code_mockup_link_path_idx\` ON \`pages_blocks_code_mockup_link\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_code_mockup_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enable_section\` integer,
  	\`use_random_data\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_code_mockup_section_order_idx\` ON \`pages_blocks_code_mockup_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_code_mockup_section_parent_id_idx\` ON \`pages_blocks_code_mockup_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_code_mockup_section_path_idx\` ON \`pages_blocks_code_mockup_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_rich_text_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`content_html\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_block_order_idx\` ON \`pages_blocks_rich_text_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_block_parent_id_idx\` ON \`pages_blocks_rich_text_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_rich_text_block_path_idx\` ON \`pages_blocks_rich_text_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_two_column_grid\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` text NOT NULL,
  	\`vert_alignment\` text,
  	\`reverse_order\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_two_column_grid_order_idx\` ON \`pages_blocks_two_column_grid\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_two_column_grid_parent_id_idx\` ON \`pages_blocks_two_column_grid\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_two_column_grid_path_idx\` ON \`pages_blocks_two_column_grid\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_card\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`pill\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_order_idx\` ON \`pages_blocks_card\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_parent_id_idx\` ON \`pages_blocks_card\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_card_path_idx\` ON \`pages_blocks_card\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_in_view_embed\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` text NOT NULL,
  	\`hidden_y\` numeric DEFAULT 0,
  	\`hidden_blur\` numeric DEFAULT 4,
  	\`visible_y\` numeric DEFAULT 1,
  	\`visible_blur\` numeric DEFAULT 0,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_in_view_embed_order_idx\` ON \`pages_blocks_in_view_embed\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_in_view_embed_parent_id_idx\` ON \`pages_blocks_in_view_embed\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_in_view_embed_path_idx\` ON \`pages_blocks_in_view_embed\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_job_section_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`gradient\` integer DEFAULT false,
  	\`gradient_select\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_job_section_block_order_idx\` ON \`pages_blocks_job_section_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_job_section_block_parent_id_idx\` ON \`pages_blocks_job_section_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_job_section_block_path_idx\` ON \`pages_blocks_job_section_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_testimonial_section_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` text,
  	\`pill\` text,
  	\`heading\` text NOT NULL,
  	\`description\` text,
  	\`gradient\` integer DEFAULT false,
  	\`gradient_select\` text,
  	\`carousel_custom\` integer DEFAULT false,
  	\`enable_infinite\` integer DEFAULT false,
  	\`carousel_timer\` integer DEFAULT false,
  	\`seconds_timer\` numeric,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_section_block_order_idx\` ON \`pages_blocks_testimonial_section_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_section_block_parent_id_idx\` ON \`pages_blocks_testimonial_section_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_testimonial_section_block_path_idx\` ON \`pages_blocks_testimonial_section_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`pages_blocks_blog_post_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enable_section_content\` integer,
  	\`section_group_section_id\` text,
  	\`section_group_pill\` text,
  	\`section_group_heading\` text,
  	\`section_group_description\` text,
  	\`post_selection\` text NOT NULL,
  	\`post_limit\` numeric,
  	\`category_filter_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`category_filter_id\`) REFERENCES \`blog_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_post_section_order_idx\` ON \`pages_blocks_blog_post_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_post_section_parent_id_idx\` ON \`pages_blocks_blog_post_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_post_section_path_idx\` ON \`pages_blocks_blog_post_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`pages_blocks_blog_post_section_category_filter_idx\` ON \`pages_blocks_blog_post_section\` (\`category_filter_id\`);`)
  await db.run(sql`CREATE TABLE \`pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nested_route\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_meta_meta_image_idx\` ON \`pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_updated_at_idx\` ON \`pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`pages_created_at_idx\` ON \`pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`jobs_id\` integer,
  	\`testimonials_id\` integer,
  	\`blog_pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`jobs_id\`) REFERENCES \`jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_pages_id\`) REFERENCES \`blog_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`pages_rels_order_idx\` ON \`pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_parent_idx\` ON \`pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_path_idx\` ON \`pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_pages_id_idx\` ON \`pages_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_jobs_id_idx\` ON \`pages_rels\` (\`jobs_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_testimonials_id_idx\` ON \`pages_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`pages_rels_blog_pages_id_idx\` ON \`pages_rels\` (\`blog_pages_id\`);`)
  await db.run(sql`CREATE TABLE \`project_pages_blocks_call_to_action\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`cursor_label\` text,
  	\`style\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer DEFAULT false,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`arrow\` integer DEFAULT false,
  	\`arrow_direction\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_call_to_action_order_idx\` ON \`project_pages_blocks_call_to_action\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_call_to_action_parent_id_idx\` ON \`project_pages_blocks_call_to_action\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_call_to_action_path_idx\` ON \`project_pages_blocks_call_to_action\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`project_pages_blocks_hero_section_no_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`subtitle\` text,
  	\`description\` text,
  	\`secondary_blurb\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_hero_section_no_image_order_idx\` ON \`project_pages_blocks_hero_section_no_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_hero_section_no_image_parent_id_idx\` ON \`project_pages_blocks_hero_section_no_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_hero_section_no_image_path_idx\` ON \`project_pages_blocks_hero_section_no_image\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`project_pages_blocks_project_grid_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`gradient\` integer DEFAULT false,
  	\`gradient_select\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_project_grid_block_order_idx\` ON \`project_pages_blocks_project_grid_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_project_grid_block_parent_id_idx\` ON \`project_pages_blocks_project_grid_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_project_grid_block_path_idx\` ON \`project_pages_blocks_project_grid_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`project_pages_blocks_image_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`cursor_label\` text,
  	\`image_id\` integer NOT NULL,
  	\`forced_width\` numeric DEFAULT 0 NOT NULL,
  	\`forced_height\` numeric DEFAULT 0 NOT NULL,
  	\`gradient\` integer DEFAULT false,
  	\`gradient_x_flip\` integer DEFAULT false,
  	\`gradient_y_flip\` integer DEFAULT false,
  	\`gradient_select\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_image_block_order_idx\` ON \`project_pages_blocks_image_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_image_block_parent_id_idx\` ON \`project_pages_blocks_image_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_image_block_path_idx\` ON \`project_pages_blocks_image_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_image_block_image_idx\` ON \`project_pages_blocks_image_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`project_pages_blocks_hero_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`subtitle\` text,
  	\`description\` text,
  	\`secondary_blurb\` text,
  	\`enable_inner_container\` integer DEFAULT false,
  	\`grey_background\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_hero_section_order_idx\` ON \`project_pages_blocks_hero_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_hero_section_parent_id_idx\` ON \`project_pages_blocks_hero_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_hero_section_path_idx\` ON \`project_pages_blocks_hero_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`project_pages_blocks_overview_section_role\` (
  	\`order\` integer NOT NULL,
  	\`parent_id\` text NOT NULL,
  	\`value\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`project_pages_blocks_overview_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_overview_section_role_order_idx\` ON \`project_pages_blocks_overview_section_role\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_overview_section_role_parent_idx\` ON \`project_pages_blocks_overview_section_role\` (\`parent_id\`);`)
  await db.run(sql`CREATE TABLE \`project_pages_blocks_overview_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`content\` text NOT NULL,
  	\`content_html\` text,
  	\`duration_time_length\` numeric NOT NULL,
  	\`duration_frequency\` text NOT NULL,
  	\`grey_background\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_overview_section_order_idx\` ON \`project_pages_blocks_overview_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_overview_section_parent_id_idx\` ON \`project_pages_blocks_overview_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_overview_section_path_idx\` ON \`project_pages_blocks_overview_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`project_pages_blocks_problem_framing_problems\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`frame\` text NOT NULL,
  	\`description\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project_pages_blocks_problem_framing\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_problem_framing_problems_order_idx\` ON \`project_pages_blocks_problem_framing_problems\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_problem_framing_problems_parent_id_idx\` ON \`project_pages_blocks_problem_framing_problems\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`project_pages_blocks_problem_framing\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` text NOT NULL,
  	\`pill\` text,
  	\`heading\` text NOT NULL,
  	\`description\` text,
  	\`grey_background\` integer,
  	\`gradient\` integer DEFAULT false,
  	\`gradient_select\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_problem_framing_order_idx\` ON \`project_pages_blocks_problem_framing\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_problem_framing_parent_id_idx\` ON \`project_pages_blocks_problem_framing\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_problem_framing_path_idx\` ON \`project_pages_blocks_problem_framing\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`project_pages_blocks_user_research_research\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`research_type\` text NOT NULL,
  	\`number_metric\` numeric NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project_pages_blocks_user_research\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_user_research_research_order_idx\` ON \`project_pages_blocks_user_research_research\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_user_research_research_parent_id_idx\` ON \`project_pages_blocks_user_research_research\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`project_pages_blocks_user_research\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` text NOT NULL,
  	\`pill\` text,
  	\`heading\` text NOT NULL,
  	\`description\` text,
  	\`gradient\` integer DEFAULT false,
  	\`gradient_select\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_user_research_order_idx\` ON \`project_pages_blocks_user_research\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_user_research_parent_id_idx\` ON \`project_pages_blocks_user_research\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_user_research_path_idx\` ON \`project_pages_blocks_user_research\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`project_pages_blocks_insights_section_insights\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`body\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project_pages_blocks_insights_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_insights_section_insights_order_idx\` ON \`project_pages_blocks_insights_section_insights\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_insights_section_insights_parent_id_idx\` ON \`project_pages_blocks_insights_section_insights\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`project_pages_blocks_insights_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` text NOT NULL,
  	\`pill\` text,
  	\`heading\` text NOT NULL,
  	\`description\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_insights_section_order_idx\` ON \`project_pages_blocks_insights_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_insights_section_parent_id_idx\` ON \`project_pages_blocks_insights_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_insights_section_path_idx\` ON \`project_pages_blocks_insights_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`project_pages_blocks_outcomes_section_outcomes_stats\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`number\` numeric NOT NULL,
  	\`num_label\` text,
  	\`label\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project_pages_blocks_outcomes_section_outcomes\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_outcomes_section_outcomes_stats_order_idx\` ON \`project_pages_blocks_outcomes_section_outcomes_stats\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_outcomes_section_outcomes_stats_parent_id_idx\` ON \`project_pages_blocks_outcomes_section_outcomes_stats\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`project_pages_blocks_outcomes_section_outcomes\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`result_type\` text NOT NULL,
  	\`emojis\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project_pages_blocks_outcomes_section\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_outcomes_section_outcomes_order_idx\` ON \`project_pages_blocks_outcomes_section_outcomes\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_outcomes_section_outcomes_parent_id_idx\` ON \`project_pages_blocks_outcomes_section_outcomes\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`project_pages_blocks_outcomes_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` text NOT NULL,
  	\`pill\` text,
  	\`heading\` text NOT NULL,
  	\`description\` text,
  	\`gradient\` integer DEFAULT false,
  	\`gradient_select\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`project_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_outcomes_section_order_idx\` ON \`project_pages_blocks_outcomes_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_outcomes_section_parent_id_idx\` ON \`project_pages_blocks_outcomes_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_blocks_outcomes_section_path_idx\` ON \`project_pages_blocks_outcomes_section\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`project_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nested_route\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_meta_meta_image_idx\` ON \`project_pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_updated_at_idx\` ON \`project_pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_created_at_idx\` ON \`project_pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`project_pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`pages_id\` integer,
  	\`projects_id\` integer,
  	\`project_tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`project_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`project_tags_id\`) REFERENCES \`project_tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`project_pages_rels_order_idx\` ON \`project_pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_rels_parent_idx\` ON \`project_pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_rels_path_idx\` ON \`project_pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_rels_pages_id_idx\` ON \`project_pages_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_rels_projects_id_idx\` ON \`project_pages_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`project_pages_rels_project_tags_id_idx\` ON \`project_pages_rels\` (\`project_tags_id\`);`)
  await db.run(sql`CREATE TABLE \`skills_collection\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`skills_collection_updated_at_idx\` ON \`skills_collection\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`skills_collection_created_at_idx\` ON \`skills_collection\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`skills_collection_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`skills_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`skills_collection\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`skills_id\`) REFERENCES \`skills\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`skills_collection_rels_order_idx\` ON \`skills_collection_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`skills_collection_rels_parent_idx\` ON \`skills_collection_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`skills_collection_rels_path_idx\` ON \`skills_collection_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`skills_collection_rels_skills_id_idx\` ON \`skills_collection_rels\` (\`skills_id\`);`)
  await db.run(sql`CREATE TABLE \`skills\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`skill_icon_id\` integer NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`skill_icon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`skills_skill_icon_idx\` ON \`skills\` (\`skill_icon_id\`);`)
  await db.run(sql`CREATE INDEX \`skills_updated_at_idx\` ON \`skills\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`skills_created_at_idx\` ON \`skills\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`position\` text NOT NULL,
  	\`company\` text NOT NULL,
  	\`headshot_id\` integer NOT NULL,
  	\`callout\` text NOT NULL,
  	\`content\` text NOT NULL,
  	\`content_html\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`headshot_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`testimonials_headshot_idx\` ON \`testimonials\` (\`headshot_id\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`jobs_blocks_image_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`cursor_label\` text,
  	\`image_id\` integer NOT NULL,
  	\`forced_width\` numeric DEFAULT 0 NOT NULL,
  	\`forced_height\` numeric DEFAULT 0 NOT NULL,
  	\`gradient\` integer DEFAULT false,
  	\`gradient_x_flip\` integer DEFAULT false,
  	\`gradient_y_flip\` integer DEFAULT false,
  	\`gradient_select\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`jobs_blocks_image_block_order_idx\` ON \`jobs_blocks_image_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`jobs_blocks_image_block_parent_id_idx\` ON \`jobs_blocks_image_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`jobs_blocks_image_block_path_idx\` ON \`jobs_blocks_image_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`jobs_blocks_image_block_image_idx\` ON \`jobs_blocks_image_block\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`jobs_blocks_rich_text_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`content_html\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`jobs_blocks_rich_text_block_order_idx\` ON \`jobs_blocks_rich_text_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`jobs_blocks_rich_text_block_parent_id_idx\` ON \`jobs_blocks_rich_text_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`jobs_blocks_rich_text_block_path_idx\` ON \`jobs_blocks_rich_text_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`jobs\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`company_name\` text NOT NULL,
  	\`job_role\` text NOT NULL,
  	\`start_date\` text NOT NULL,
  	\`current_position\` integer,
  	\`end_date\` text,
  	\`location\` text NOT NULL,
  	\`position_type\` text NOT NULL,
  	\`company_description\` text NOT NULL,
  	\`company_website\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`jobs_updated_at_idx\` ON \`jobs\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`jobs_created_at_idx\` ON \`jobs\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`jobs_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`skills_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`skills_id\`) REFERENCES \`skills\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`jobs_rels_order_idx\` ON \`jobs_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`jobs_rels_parent_idx\` ON \`jobs_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`jobs_rels_path_idx\` ON \`jobs_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`jobs_rels_skills_id_idx\` ON \`jobs_rels\` (\`skills_id\`);`)
  await db.run(sql`CREATE TABLE \`projects_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`link\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_links_order_idx\` ON \`projects_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`projects_links_parent_id_idx\` ON \`projects_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`projects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text,
  	\`excerpt\` text NOT NULL,
  	\`status\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_image_idx\` ON \`projects\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_updated_at_idx\` ON \`projects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`projects_created_at_idx\` ON \`projects\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`projects_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`skills_id\` integer,
  	\`project_tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`skills_id\`) REFERENCES \`skills\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`project_tags_id\`) REFERENCES \`project_tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`projects_rels_order_idx\` ON \`projects_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_parent_idx\` ON \`projects_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_path_idx\` ON \`projects_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_skills_id_idx\` ON \`projects_rels\` (\`skills_id\`);`)
  await db.run(sql`CREATE INDEX \`projects_rels_project_tags_id_idx\` ON \`projects_rels\` (\`project_tags_id\`);`)
  await db.run(sql`CREATE TABLE \`project_tags\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`project_tags_updated_at_idx\` ON \`project_tags\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`project_tags_created_at_idx\` ON \`project_tags\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`blog_pages_blocks_call_to_action\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`cursor_label\` text,
  	\`style\` text,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_new_tab\` integer DEFAULT false,
  	\`link_url\` text,
  	\`link_label\` text NOT NULL,
  	\`arrow\` integer DEFAULT false,
  	\`arrow_direction\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_call_to_action_order_idx\` ON \`blog_pages_blocks_call_to_action\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_call_to_action_parent_id_idx\` ON \`blog_pages_blocks_call_to_action\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_call_to_action_path_idx\` ON \`blog_pages_blocks_call_to_action\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`blog_pages_blocks_hero_section_no_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`section_id\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`subtitle\` text,
  	\`description\` text,
  	\`secondary_blurb\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_hero_section_no_image_order_idx\` ON \`blog_pages_blocks_hero_section_no_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_hero_section_no_image_parent_id_idx\` ON \`blog_pages_blocks_hero_section_no_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_hero_section_no_image_path_idx\` ON \`blog_pages_blocks_hero_section_no_image\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`blog_pages_blocks_rich_text_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`content\` text NOT NULL,
  	\`content_html\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_rich_text_block_order_idx\` ON \`blog_pages_blocks_rich_text_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_rich_text_block_parent_id_idx\` ON \`blog_pages_blocks_rich_text_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_rich_text_block_path_idx\` ON \`blog_pages_blocks_rich_text_block\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`blog_pages_blocks_blog_image\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`cursor_label\` text NOT NULL,
  	\`image_id\` integer NOT NULL,
  	\`caption\` text NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_blog_image_order_idx\` ON \`blog_pages_blocks_blog_image\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_blog_image_parent_id_idx\` ON \`blog_pages_blocks_blog_image\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_blog_image_path_idx\` ON \`blog_pages_blocks_blog_image\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_blog_image_image_idx\` ON \`blog_pages_blocks_blog_image\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_pages_blocks_blog_header\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`cursor_label\` text,
  	\`title\` text NOT NULL,
  	\`excerpt\` text NOT NULL,
  	\`featured_image_id\` integer NOT NULL,
  	\`category_id\` integer NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`blog_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_blog_header_order_idx\` ON \`blog_pages_blocks_blog_header\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_blog_header_parent_id_idx\` ON \`blog_pages_blocks_blog_header\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_blog_header_path_idx\` ON \`blog_pages_blocks_blog_header\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_blog_header_featured_image_idx\` ON \`blog_pages_blocks_blog_header\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_blog_header_category_idx\` ON \`blog_pages_blocks_blog_header\` (\`category_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_pages_blocks_code\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`code\` text NOT NULL,
  	\`language\` text DEFAULT 'bash',
  	\`wrap\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_code_order_idx\` ON \`blog_pages_blocks_code\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_code_parent_id_idx\` ON \`blog_pages_blocks_code\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_code_path_idx\` ON \`blog_pages_blocks_code\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`blog_pages_blocks_video_block\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`video_id\` integer NOT NULL,
  	\`forced_width\` numeric DEFAULT 0 NOT NULL,
  	\`forced_height\` numeric DEFAULT 0 NOT NULL,
  	\`gradient\` integer DEFAULT false,
  	\`gradient_select\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`video\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_video_block_order_idx\` ON \`blog_pages_blocks_video_block\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_video_block_parent_id_idx\` ON \`blog_pages_blocks_video_block\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_video_block_path_idx\` ON \`blog_pages_blocks_video_block\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_video_block_video_idx\` ON \`blog_pages_blocks_video_block\` (\`video_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_pages_blocks_blog_body\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_blog_body_order_idx\` ON \`blog_pages_blocks_blog_body\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_blog_body_parent_id_idx\` ON \`blog_pages_blocks_blog_body\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_blog_body_path_idx\` ON \`blog_pages_blocks_blog_body\` (\`_path\`);`)
  await db.run(sql`CREATE TABLE \`blog_pages_blocks_blog_post_section\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`enable_section_content\` integer,
  	\`section_group_section_id\` text,
  	\`section_group_pill\` text,
  	\`section_group_heading\` text,
  	\`section_group_description\` text,
  	\`post_selection\` text NOT NULL,
  	\`post_limit\` numeric,
  	\`category_filter_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`category_filter_id\`) REFERENCES \`blog_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`blog_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_blog_post_section_order_idx\` ON \`blog_pages_blocks_blog_post_section\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_blog_post_section_parent_id_idx\` ON \`blog_pages_blocks_blog_post_section\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_blog_post_section_path_idx\` ON \`blog_pages_blocks_blog_post_section\` (\`_path\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_blocks_blog_post_section_category_filter_idx\` ON \`blog_pages_blocks_blog_post_section\` (\`category_filter_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_pages\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`nested_route\` text NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text,
  	\`is_blog_post\` integer DEFAULT false,
  	\`published_date\` text,
  	\`category_id\` integer,
  	\`teaser_content\` text,
  	\`content_html\` text,
  	\`meta_title\` text,
  	\`meta_description\` text,
  	\`meta_image_id\` integer,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`category_id\`) REFERENCES \`blog_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`meta_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_pages_category_idx\` ON \`blog_pages\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_meta_meta_image_idx\` ON \`blog_pages\` (\`meta_image_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_updated_at_idx\` ON \`blog_pages\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_created_at_idx\` ON \`blog_pages\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`blog_pages_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`blog_tags_id\` integer,
  	\`pages_id\` integer,
  	\`blog_pages_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`blog_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_tags_id\`) REFERENCES \`blog_tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_pages_id\`) REFERENCES \`blog_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_pages_rels_order_idx\` ON \`blog_pages_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_rels_parent_idx\` ON \`blog_pages_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_rels_path_idx\` ON \`blog_pages_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_rels_blog_tags_id_idx\` ON \`blog_pages_rels\` (\`blog_tags_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_rels_pages_id_idx\` ON \`blog_pages_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`blog_pages_rels_blog_pages_id_idx\` ON \`blog_pages_rels\` (\`blog_pages_id\`);`)
  await db.run(sql`CREATE TABLE \`blog_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_categories_updated_at_idx\` ON \`blog_categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`blog_categories_created_at_idx\` ON \`blog_categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`blog_tags\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`blog_tags_updated_at_idx\` ON \`blog_tags\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`blog_tags_created_at_idx\` ON \`blog_tags\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`video\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`storage_key\` text,
  	\`stream_url\` text,
  	\`video_url\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`video_updated_at_idx\` ON \`video\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`video_created_at_idx\` ON \`video\` (\`created_at\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`video_filename_idx\` ON \`video\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	\`navigation_menu_id\` integer,
  	\`nav_links_id\` integer,
  	\`social_links_id\` integer,
  	\`pages_id\` integer,
  	\`project_pages_id\` integer,
  	\`skills_collection_id\` integer,
  	\`skills_id\` integer,
  	\`testimonials_id\` integer,
  	\`jobs_id\` integer,
  	\`projects_id\` integer,
  	\`project_tags_id\` integer,
  	\`blog_pages_id\` integer,
  	\`blog_categories_id\` integer,
  	\`blog_tags_id\` integer,
  	\`video_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`navigation_menu_id\`) REFERENCES \`navigation_menu\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`nav_links_id\`) REFERENCES \`nav_links\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`social_links_id\`) REFERENCES \`social_links\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`pages_id\`) REFERENCES \`pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`project_pages_id\`) REFERENCES \`project_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`skills_collection_id\`) REFERENCES \`skills_collection\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`skills_id\`) REFERENCES \`skills\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`testimonials_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`jobs_id\`) REFERENCES \`jobs\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`projects_id\`) REFERENCES \`projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`project_tags_id\`) REFERENCES \`project_tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_pages_id\`) REFERENCES \`blog_pages\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_categories_id\`) REFERENCES \`blog_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`blog_tags_id\`) REFERENCES \`blog_tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`video_id\`) REFERENCES \`video\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_navigation_menu_id_idx\` ON \`payload_locked_documents_rels\` (\`navigation_menu_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_nav_links_id_idx\` ON \`payload_locked_documents_rels\` (\`nav_links_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_social_links_id_idx\` ON \`payload_locked_documents_rels\` (\`social_links_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_project_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`project_pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_skills_collection_id_idx\` ON \`payload_locked_documents_rels\` (\`skills_collection_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_skills_id_idx\` ON \`payload_locked_documents_rels\` (\`skills_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_jobs_id_idx\` ON \`payload_locked_documents_rels\` (\`jobs_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_project_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`project_tags_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blog_pages_id_idx\` ON \`payload_locked_documents_rels\` (\`blog_pages_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blog_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`blog_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_blog_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`blog_tags_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_video_id_idx\` ON \`payload_locked_documents_rels\` (\`video_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users_sessions\`;`)
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`navigation_menu\`;`)
  await db.run(sql`DROP TABLE \`navigation_menu_rels\`;`)
  await db.run(sql`DROP TABLE \`nav_links\`;`)
  await db.run(sql`DROP TABLE \`social_links\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_call_to_action\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_image_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_hero_section\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_in_view_basic\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_skills_section\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_code_mockup_link\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_code_mockup_section\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_rich_text_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_two_column_grid\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_card\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_in_view_embed\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_job_section_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_testimonial_section_block\`;`)
  await db.run(sql`DROP TABLE \`pages_blocks_blog_post_section\`;`)
  await db.run(sql`DROP TABLE \`pages\`;`)
  await db.run(sql`DROP TABLE \`pages_rels\`;`)
  await db.run(sql`DROP TABLE \`project_pages_blocks_call_to_action\`;`)
  await db.run(sql`DROP TABLE \`project_pages_blocks_hero_section_no_image\`;`)
  await db.run(sql`DROP TABLE \`project_pages_blocks_project_grid_block\`;`)
  await db.run(sql`DROP TABLE \`project_pages_blocks_image_block\`;`)
  await db.run(sql`DROP TABLE \`project_pages_blocks_hero_section\`;`)
  await db.run(sql`DROP TABLE \`project_pages_blocks_overview_section_role\`;`)
  await db.run(sql`DROP TABLE \`project_pages_blocks_overview_section\`;`)
  await db.run(sql`DROP TABLE \`project_pages_blocks_problem_framing_problems\`;`)
  await db.run(sql`DROP TABLE \`project_pages_blocks_problem_framing\`;`)
  await db.run(sql`DROP TABLE \`project_pages_blocks_user_research_research\`;`)
  await db.run(sql`DROP TABLE \`project_pages_blocks_user_research\`;`)
  await db.run(sql`DROP TABLE \`project_pages_blocks_insights_section_insights\`;`)
  await db.run(sql`DROP TABLE \`project_pages_blocks_insights_section\`;`)
  await db.run(sql`DROP TABLE \`project_pages_blocks_outcomes_section_outcomes_stats\`;`)
  await db.run(sql`DROP TABLE \`project_pages_blocks_outcomes_section_outcomes\`;`)
  await db.run(sql`DROP TABLE \`project_pages_blocks_outcomes_section\`;`)
  await db.run(sql`DROP TABLE \`project_pages\`;`)
  await db.run(sql`DROP TABLE \`project_pages_rels\`;`)
  await db.run(sql`DROP TABLE \`skills_collection\`;`)
  await db.run(sql`DROP TABLE \`skills_collection_rels\`;`)
  await db.run(sql`DROP TABLE \`skills\`;`)
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`DROP TABLE \`jobs_blocks_image_block\`;`)
  await db.run(sql`DROP TABLE \`jobs_blocks_rich_text_block\`;`)
  await db.run(sql`DROP TABLE \`jobs\`;`)
  await db.run(sql`DROP TABLE \`jobs_rels\`;`)
  await db.run(sql`DROP TABLE \`projects_links\`;`)
  await db.run(sql`DROP TABLE \`projects\`;`)
  await db.run(sql`DROP TABLE \`projects_rels\`;`)
  await db.run(sql`DROP TABLE \`project_tags\`;`)
  await db.run(sql`DROP TABLE \`blog_pages_blocks_call_to_action\`;`)
  await db.run(sql`DROP TABLE \`blog_pages_blocks_hero_section_no_image\`;`)
  await db.run(sql`DROP TABLE \`blog_pages_blocks_rich_text_block\`;`)
  await db.run(sql`DROP TABLE \`blog_pages_blocks_blog_image\`;`)
  await db.run(sql`DROP TABLE \`blog_pages_blocks_blog_header\`;`)
  await db.run(sql`DROP TABLE \`blog_pages_blocks_code\`;`)
  await db.run(sql`DROP TABLE \`blog_pages_blocks_video_block\`;`)
  await db.run(sql`DROP TABLE \`blog_pages_blocks_blog_body\`;`)
  await db.run(sql`DROP TABLE \`blog_pages_blocks_blog_post_section\`;`)
  await db.run(sql`DROP TABLE \`blog_pages\`;`)
  await db.run(sql`DROP TABLE \`blog_pages_rels\`;`)
  await db.run(sql`DROP TABLE \`blog_categories\`;`)
  await db.run(sql`DROP TABLE \`blog_tags\`;`)
  await db.run(sql`DROP TABLE \`video\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
}
