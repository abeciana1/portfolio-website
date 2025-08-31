import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_call_to_action_style" AS ENUM('primary', 'secondary', 'tertiary', 'noBackground');
  CREATE TYPE "public"."enum_pages_blocks_call_to_action_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_call_to_action_arrow_direction" AS ENUM('right', 'down');
  CREATE TYPE "public"."enum_pages_blocks_image_block_gradient_select" AS ENUM('Variant1', 'Variant2', 'Variant3', 'Variant4');
  CREATE TYPE "public"."enum_pages_blocks_skills_section_gradient_select" AS ENUM('Variant1', 'Variant2', 'Variant3', 'Variant4');
  CREATE TYPE "public"."enum_pages_blocks_code_mockup_link_text_color" AS ENUM('white', 'black', 'success', 'warning');
  CREATE TYPE "public"."enum_pages_blocks_two_column_grid_vert_alignment" AS ENUM('top', 'middle', 'bottom');
  CREATE TYPE "public"."enum_pages_blocks_job_section_block_gradient_select" AS ENUM('Variant1', 'Variant2', 'Variant3', 'Variant4');
  CREATE TYPE "public"."enum_pages_blocks_testimonial_section_block_gradient_select" AS ENUM('Variant1', 'Variant2', 'Variant3', 'Variant4');
  CREATE TYPE "public"."enum_pages_nested_route" AS ENUM('base', 'projects', 'blog');
  CREATE TYPE "public"."enum_project_pages_blocks_call_to_action_style" AS ENUM('primary', 'secondary', 'tertiary', 'noBackground');
  CREATE TYPE "public"."enum_project_pages_blocks_call_to_action_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_project_pages_blocks_call_to_action_arrow_direction" AS ENUM('right', 'down');
  CREATE TYPE "public"."enum_project_pages_blocks_project_grid_block_gradient_select" AS ENUM('Variant1', 'Variant2', 'Variant3', 'Variant4');
  CREATE TYPE "public"."enum_project_pages_blocks_image_block_gradient_select" AS ENUM('Variant1', 'Variant2', 'Variant3', 'Variant4');
  CREATE TYPE "public"."enum_project_pages_blocks_overview_section_role" AS ENUM('designer', 'frontendDev', 'backendDEv', 'integrationSpec');
  CREATE TYPE "public"."enum_project_pages_blocks_overview_section_duration_frequency" AS ENUM('years', 'months', 'weeks');
  CREATE TYPE "public"."enum_project_pages_blocks_problem_framing_problems_frame" AS ENUM('who', 'where', 'when', 'why');
  CREATE TYPE "public"."enum_project_pages_blocks_problem_framing_gradient_select" AS ENUM('Variant1', 'Variant2', 'Variant3', 'Variant4');
  CREATE TYPE "public"."enum_project_pages_blocks_user_research_research_research_type" AS ENUM('survey', 'interviews', 'usability', 'accessibility');
  CREATE TYPE "public"."enum_project_pages_blocks_user_research_gradient_select" AS ENUM('Variant1', 'Variant2', 'Variant3', 'Variant4');
  CREATE TYPE "public"."enum_project_pages_blocks_outcomes_section_outcomes_result_type" AS ENUM('adoption', 'retention', 'efficiency');
  CREATE TYPE "public"."enum_project_pages_blocks_outcomes_section_gradient_select" AS ENUM('Variant1', 'Variant2', 'Variant3', 'Variant4');
  CREATE TYPE "public"."enum_project_pages_nested_route" AS ENUM('base', 'projects', 'blog');
  CREATE TYPE "public"."enum_jobs_blocks_image_block_gradient_select" AS ENUM('Variant1', 'Variant2', 'Variant3', 'Variant4');
  CREATE TYPE "public"."enum_jobs_position_type" AS ENUM('Contract', 'Full-Time', 'Entrepreneur');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('completed', 'inProgress', 'onHold');
  CREATE TYPE "public"."enum_blog_pages_blocks_call_to_action_style" AS ENUM('primary', 'secondary', 'tertiary', 'noBackground');
  CREATE TYPE "public"."enum_blog_pages_blocks_call_to_action_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_blog_pages_blocks_call_to_action_arrow_direction" AS ENUM('right', 'down');
  CREATE TYPE "public"."enum_blog_pages_nested_route" AS ENUM('base', 'projects', 'blog');
  CREATE TABLE IF NOT EXISTS "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"convert_webp" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE IF NOT EXISTS "navigation_menu" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"logo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "navigation_menu_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"nav_links_id" integer,
  	"social_links_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "nav_links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "social_links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_pages_blocks_call_to_action_style",
  	"link_type" "enum_pages_blocks_call_to_action_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"arrow" boolean DEFAULT false,
  	"arrow_direction" "enum_pages_blocks_call_to_action_arrow_direction",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"forced_width" numeric DEFAULT 0 NOT NULL,
  	"forced_height" numeric DEFAULT 0 NOT NULL,
  	"gradient" boolean DEFAULT false,
  	"gradient_x_flip" boolean DEFAULT false,
  	"gradient_y_flip" boolean DEFAULT false,
  	"gradient_select" "enum_pages_blocks_image_block_gradient_select",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_hero_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"description" varchar,
  	"secondary_blurb" varchar,
  	"enable_inner_container" boolean DEFAULT false,
  	"grey_background" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_in_view_basic" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"hidden_y" numeric DEFAULT 0,
  	"hidden_blur" numeric DEFAULT 4,
  	"visible_y" numeric DEFAULT 1,
  	"visible_blur" numeric DEFAULT 0,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_skills_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"pill" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"skills_collection_id" integer NOT NULL,
  	"gradient" boolean DEFAULT false,
  	"gradient_select" "enum_pages_blocks_skills_section_gradient_select",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_code_mockup_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"prefix" varchar,
  	"text" varchar NOT NULL,
  	"text_color" "enum_pages_blocks_code_mockup_link_text_color" NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_code_mockup_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"enable_section" boolean,
  	"use_random_data" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"content_html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_two_column_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"vert_alignment" "enum_pages_blocks_two_column_grid_vert_alignment",
  	"reverse_order" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"pill" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_in_view_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"hidden_y" numeric DEFAULT 0,
  	"hidden_blur" numeric DEFAULT 4,
  	"visible_y" numeric DEFAULT 1,
  	"visible_blur" numeric DEFAULT 0,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_job_section_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"gradient" boolean DEFAULT false,
  	"gradient_select" "enum_pages_blocks_job_section_block_gradient_select",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_testimonial_section_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar,
  	"pill" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"gradient" boolean DEFAULT false,
  	"gradient_select" "enum_pages_blocks_testimonial_section_block_gradient_select",
  	"carousel_custom" boolean DEFAULT false,
  	"enable_infinite" boolean DEFAULT false,
  	"carousel_timer" boolean DEFAULT false,
  	"seconds_timer" numeric,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nested_route" "enum_pages_nested_route" NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"jobs_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_project_pages_blocks_call_to_action_style",
  	"link_type" "enum_project_pages_blocks_call_to_action_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"arrow" boolean DEFAULT false,
  	"arrow_direction" "enum_project_pages_blocks_call_to_action_arrow_direction",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages_blocks_hero_section_no_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"description" varchar,
  	"secondary_blurb" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages_blocks_project_grid_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"gradient" boolean DEFAULT false,
  	"gradient_select" "enum_project_pages_blocks_project_grid_block_gradient_select",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages_blocks_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"forced_width" numeric DEFAULT 0 NOT NULL,
  	"forced_height" numeric DEFAULT 0 NOT NULL,
  	"gradient" boolean DEFAULT false,
  	"gradient_x_flip" boolean DEFAULT false,
  	"gradient_y_flip" boolean DEFAULT false,
  	"gradient_select" "enum_project_pages_blocks_image_block_gradient_select",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages_blocks_hero_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"description" varchar,
  	"secondary_blurb" varchar,
  	"enable_inner_container" boolean DEFAULT false,
  	"grey_background" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages_blocks_overview_section_role" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_project_pages_blocks_overview_section_role",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages_blocks_overview_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"content_html" varchar,
  	"duration_time_length" numeric NOT NULL,
  	"duration_frequency" "enum_project_pages_blocks_overview_section_duration_frequency" NOT NULL,
  	"grey_background" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages_blocks_problem_framing_problems" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"frame" "enum_project_pages_blocks_problem_framing_problems_frame" NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages_blocks_problem_framing" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"pill" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"grey_background" boolean,
  	"gradient" boolean DEFAULT false,
  	"gradient_select" "enum_project_pages_blocks_problem_framing_gradient_select",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages_blocks_user_research_research" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"research_type" "enum_project_pages_blocks_user_research_research_research_type" NOT NULL,
  	"number_metric" numeric NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages_blocks_user_research" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"pill" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"gradient" boolean DEFAULT false,
  	"gradient_select" "enum_project_pages_blocks_user_research_gradient_select",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages_blocks_insights_section_insights" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages_blocks_insights_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"pill" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages_blocks_outcomes_section_outcomes_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" numeric NOT NULL,
  	"num_label" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages_blocks_outcomes_section_outcomes" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"result_type" "enum_project_pages_blocks_outcomes_section_outcomes_result_type" NOT NULL,
  	"emojis" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages_blocks_outcomes_section" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"pill" varchar,
  	"heading" varchar NOT NULL,
  	"description" varchar,
  	"gradient" boolean DEFAULT false,
  	"gradient_select" "enum_project_pages_blocks_outcomes_section_gradient_select",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nested_route" "enum_project_pages_nested_route" NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "project_pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"projects_id" integer,
  	"project_tags_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "skills_collection" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "skills_collection_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "skills" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"skill_icon_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"position" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"headshot_id" integer NOT NULL,
  	"callout" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"content_html" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "jobs_blocks_image_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"forced_width" numeric DEFAULT 0 NOT NULL,
  	"forced_height" numeric DEFAULT 0 NOT NULL,
  	"gradient" boolean DEFAULT false,
  	"gradient_x_flip" boolean DEFAULT false,
  	"gradient_y_flip" boolean DEFAULT false,
  	"gradient_select" "enum_jobs_blocks_image_block_gradient_select",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "jobs_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"content_html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "jobs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"company_name" varchar NOT NULL,
  	"job_role" varchar NOT NULL,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"current_position" boolean,
  	"end_date" timestamp(3) with time zone,
  	"location" varchar NOT NULL,
  	"position_type" "enum_jobs_position_type" NOT NULL,
  	"company_description" varchar NOT NULL,
  	"company_website" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "jobs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "projects_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"excerpt" varchar NOT NULL,
  	"status" "enum_projects_status" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"skills_id" integer,
  	"project_tags_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "project_tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_pages_blocks_call_to_action" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"style" "enum_blog_pages_blocks_call_to_action_style",
  	"link_type" "enum_blog_pages_blocks_call_to_action_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean DEFAULT false,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"arrow" boolean DEFAULT false,
  	"arrow_direction" "enum_blog_pages_blocks_call_to_action_arrow_direction",
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_pages_blocks_hero_section_no_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_id" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"description" varchar,
  	"secondary_blurb" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_pages_blocks_rich_text_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"content" jsonb NOT NULL,
  	"content_html" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_pages_blocks_blog_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_pages_blocks_blog_header" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"featured_image_id" integer NOT NULL,
  	"category_id" integer NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_pages_blocks_blog_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blog_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nested_route" "enum_blog_pages_nested_route" NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar,
  	"is_blog_post" boolean,
  	"published_date" timestamp(3) with time zone,
  	"category_id" integer,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"blog_tags_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "blog_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blog_tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"navigation_menu_id" integer,
  	"nav_links_id" integer,
  	"social_links_id" integer,
  	"pages_id" integer,
  	"project_pages_id" integer,
  	"skills_collection_id" integer,
  	"skills_id" integer,
  	"testimonials_id" integer,
  	"jobs_id" integer,
  	"projects_id" integer,
  	"project_tags_id" integer,
  	"blog_pages_id" integer,
  	"blog_categories_id" integer,
  	"blog_tags_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DO $$ BEGIN
   ALTER TABLE "navigation_menu" ADD CONSTRAINT "navigation_menu_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "navigation_menu_rels" ADD CONSTRAINT "navigation_menu_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."navigation_menu"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "navigation_menu_rels" ADD CONSTRAINT "navigation_menu_rels_nav_links_fk" FOREIGN KEY ("nav_links_id") REFERENCES "public"."nav_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "navigation_menu_rels" ADD CONSTRAINT "navigation_menu_rels_social_links_fk" FOREIGN KEY ("social_links_id") REFERENCES "public"."social_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_call_to_action" ADD CONSTRAINT "pages_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_block" ADD CONSTRAINT "pages_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_image_block" ADD CONSTRAINT "pages_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_hero_section" ADD CONSTRAINT "pages_blocks_hero_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_in_view_basic" ADD CONSTRAINT "pages_blocks_in_view_basic_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_skills_section" ADD CONSTRAINT "pages_blocks_skills_section_skills_collection_id_skills_collection_id_fk" FOREIGN KEY ("skills_collection_id") REFERENCES "public"."skills_collection"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_skills_section" ADD CONSTRAINT "pages_blocks_skills_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_code_mockup_link" ADD CONSTRAINT "pages_blocks_code_mockup_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_code_mockup_section" ADD CONSTRAINT "pages_blocks_code_mockup_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_rich_text_block" ADD CONSTRAINT "pages_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_two_column_grid" ADD CONSTRAINT "pages_blocks_two_column_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_card" ADD CONSTRAINT "pages_blocks_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_in_view_embed" ADD CONSTRAINT "pages_blocks_in_view_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_job_section_block" ADD CONSTRAINT "pages_blocks_job_section_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_testimonial_section_block" ADD CONSTRAINT "pages_blocks_testimonial_section_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_blocks_call_to_action" ADD CONSTRAINT "project_pages_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_blocks_hero_section_no_image" ADD CONSTRAINT "project_pages_blocks_hero_section_no_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_blocks_project_grid_block" ADD CONSTRAINT "project_pages_blocks_project_grid_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_blocks_image_block" ADD CONSTRAINT "project_pages_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_blocks_image_block" ADD CONSTRAINT "project_pages_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_blocks_hero_section" ADD CONSTRAINT "project_pages_blocks_hero_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_blocks_overview_section_role" ADD CONSTRAINT "project_pages_blocks_overview_section_role_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."project_pages_blocks_overview_section"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_blocks_overview_section" ADD CONSTRAINT "project_pages_blocks_overview_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_blocks_problem_framing_problems" ADD CONSTRAINT "project_pages_blocks_problem_framing_problems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_pages_blocks_problem_framing"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_blocks_problem_framing" ADD CONSTRAINT "project_pages_blocks_problem_framing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_blocks_user_research_research" ADD CONSTRAINT "project_pages_blocks_user_research_research_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_pages_blocks_user_research"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_blocks_user_research" ADD CONSTRAINT "project_pages_blocks_user_research_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_blocks_insights_section_insights" ADD CONSTRAINT "project_pages_blocks_insights_section_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_pages_blocks_insights_section"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_blocks_insights_section" ADD CONSTRAINT "project_pages_blocks_insights_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_blocks_outcomes_section_outcomes_stats" ADD CONSTRAINT "project_pages_blocks_outcomes_section_outcomes_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_pages_blocks_outcomes_section_outcomes"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_blocks_outcomes_section_outcomes" ADD CONSTRAINT "project_pages_blocks_outcomes_section_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_pages_blocks_outcomes_section"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_blocks_outcomes_section" ADD CONSTRAINT "project_pages_blocks_outcomes_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."project_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages" ADD CONSTRAINT "project_pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_rels" ADD CONSTRAINT "project_pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."project_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_rels" ADD CONSTRAINT "project_pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_rels" ADD CONSTRAINT "project_pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "project_pages_rels" ADD CONSTRAINT "project_pages_rels_project_tags_fk" FOREIGN KEY ("project_tags_id") REFERENCES "public"."project_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "skills_collection_rels" ADD CONSTRAINT "skills_collection_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."skills_collection"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "skills_collection_rels" ADD CONSTRAINT "skills_collection_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "skills" ADD CONSTRAINT "skills_skill_icon_id_media_id_fk" FOREIGN KEY ("skill_icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_headshot_id_media_id_fk" FOREIGN KEY ("headshot_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "jobs_blocks_image_block" ADD CONSTRAINT "jobs_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "jobs_blocks_image_block" ADD CONSTRAINT "jobs_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "jobs_blocks_rich_text_block" ADD CONSTRAINT "jobs_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "jobs_rels" ADD CONSTRAINT "jobs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "jobs_rels" ADD CONSTRAINT "jobs_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_links" ADD CONSTRAINT "projects_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects" ADD CONSTRAINT "projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_project_tags_fk" FOREIGN KEY ("project_tags_id") REFERENCES "public"."project_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_pages_blocks_call_to_action" ADD CONSTRAINT "blog_pages_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_pages_blocks_hero_section_no_image" ADD CONSTRAINT "blog_pages_blocks_hero_section_no_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_pages_blocks_rich_text_block" ADD CONSTRAINT "blog_pages_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_pages_blocks_blog_image" ADD CONSTRAINT "blog_pages_blocks_blog_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_pages_blocks_blog_image" ADD CONSTRAINT "blog_pages_blocks_blog_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_pages_blocks_blog_header" ADD CONSTRAINT "blog_pages_blocks_blog_header_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_pages_blocks_blog_header" ADD CONSTRAINT "blog_pages_blocks_blog_header_category_id_blog_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."blog_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_pages_blocks_blog_header" ADD CONSTRAINT "blog_pages_blocks_blog_header_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_pages_blocks_blog_body" ADD CONSTRAINT "blog_pages_blocks_blog_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_pages" ADD CONSTRAINT "blog_pages_category_id_blog_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."blog_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_pages" ADD CONSTRAINT "blog_pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_pages_rels" ADD CONSTRAINT "blog_pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_pages_rels" ADD CONSTRAINT "blog_pages_rels_blog_tags_fk" FOREIGN KEY ("blog_tags_id") REFERENCES "public"."blog_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blog_pages_rels" ADD CONSTRAINT "blog_pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_navigation_menu_fk" FOREIGN KEY ("navigation_menu_id") REFERENCES "public"."navigation_menu"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_nav_links_fk" FOREIGN KEY ("nav_links_id") REFERENCES "public"."nav_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_social_links_fk" FOREIGN KEY ("social_links_id") REFERENCES "public"."social_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_pages_fk" FOREIGN KEY ("project_pages_id") REFERENCES "public"."project_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_skills_collection_fk" FOREIGN KEY ("skills_collection_id") REFERENCES "public"."skills_collection"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "public"."jobs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_tags_fk" FOREIGN KEY ("project_tags_id") REFERENCES "public"."project_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_pages_fk" FOREIGN KEY ("blog_pages_id") REFERENCES "public"."blog_pages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_categories_fk" FOREIGN KEY ("blog_categories_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_tags_fk" FOREIGN KEY ("blog_tags_id") REFERENCES "public"."blog_tags"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "navigation_menu_logo_idx" ON "navigation_menu" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "navigation_menu_updated_at_idx" ON "navigation_menu" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "navigation_menu_created_at_idx" ON "navigation_menu" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "navigation_menu_rels_order_idx" ON "navigation_menu_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "navigation_menu_rels_parent_idx" ON "navigation_menu_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "navigation_menu_rels_path_idx" ON "navigation_menu_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "navigation_menu_rels_nav_links_id_idx" ON "navigation_menu_rels" USING btree ("nav_links_id");
  CREATE INDEX IF NOT EXISTS "navigation_menu_rels_social_links_id_idx" ON "navigation_menu_rels" USING btree ("social_links_id");
  CREATE INDEX IF NOT EXISTS "nav_links_updated_at_idx" ON "nav_links" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "nav_links_created_at_idx" ON "nav_links" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "social_links_updated_at_idx" ON "social_links" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "social_links_created_at_idx" ON "social_links" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_order_idx" ON "pages_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_parent_id_idx" ON "pages_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_call_to_action_path_idx" ON "pages_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_block_order_idx" ON "pages_blocks_image_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_block_parent_id_idx" ON "pages_blocks_image_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_block_path_idx" ON "pages_blocks_image_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_image_block_image_idx" ON "pages_blocks_image_block" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_section_order_idx" ON "pages_blocks_hero_section" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_section_parent_id_idx" ON "pages_blocks_hero_section" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_section_path_idx" ON "pages_blocks_hero_section" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_in_view_basic_order_idx" ON "pages_blocks_in_view_basic" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_in_view_basic_parent_id_idx" ON "pages_blocks_in_view_basic" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_in_view_basic_path_idx" ON "pages_blocks_in_view_basic" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_skills_section_order_idx" ON "pages_blocks_skills_section" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_skills_section_parent_id_idx" ON "pages_blocks_skills_section" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_skills_section_path_idx" ON "pages_blocks_skills_section" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_skills_section_skills_collection_idx" ON "pages_blocks_skills_section" USING btree ("skills_collection_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_code_mockup_link_order_idx" ON "pages_blocks_code_mockup_link" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_code_mockup_link_parent_id_idx" ON "pages_blocks_code_mockup_link" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_code_mockup_link_path_idx" ON "pages_blocks_code_mockup_link" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_code_mockup_section_order_idx" ON "pages_blocks_code_mockup_section" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_code_mockup_section_parent_id_idx" ON "pages_blocks_code_mockup_section" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_code_mockup_section_path_idx" ON "pages_blocks_code_mockup_section" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_block_order_idx" ON "pages_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_block_parent_id_idx" ON "pages_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_rich_text_block_path_idx" ON "pages_blocks_rich_text_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_two_column_grid_order_idx" ON "pages_blocks_two_column_grid" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_two_column_grid_parent_id_idx" ON "pages_blocks_two_column_grid" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_two_column_grid_path_idx" ON "pages_blocks_two_column_grid" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_card_order_idx" ON "pages_blocks_card" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_card_parent_id_idx" ON "pages_blocks_card" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_card_path_idx" ON "pages_blocks_card" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_in_view_embed_order_idx" ON "pages_blocks_in_view_embed" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_in_view_embed_parent_id_idx" ON "pages_blocks_in_view_embed" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_in_view_embed_path_idx" ON "pages_blocks_in_view_embed" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_job_section_block_order_idx" ON "pages_blocks_job_section_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_job_section_block_parent_id_idx" ON "pages_blocks_job_section_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_job_section_block_path_idx" ON "pages_blocks_job_section_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonial_section_block_order_idx" ON "pages_blocks_testimonial_section_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonial_section_block_parent_id_idx" ON "pages_blocks_testimonial_section_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_testimonial_section_block_path_idx" ON "pages_blocks_testimonial_section_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_jobs_id_idx" ON "pages_rels" USING btree ("jobs_id");
  CREATE INDEX IF NOT EXISTS "pages_rels_testimonials_id_idx" ON "pages_rels" USING btree ("testimonials_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_call_to_action_order_idx" ON "project_pages_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_call_to_action_parent_id_idx" ON "project_pages_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_call_to_action_path_idx" ON "project_pages_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_hero_section_no_image_order_idx" ON "project_pages_blocks_hero_section_no_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_hero_section_no_image_parent_id_idx" ON "project_pages_blocks_hero_section_no_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_hero_section_no_image_path_idx" ON "project_pages_blocks_hero_section_no_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_project_grid_block_order_idx" ON "project_pages_blocks_project_grid_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_project_grid_block_parent_id_idx" ON "project_pages_blocks_project_grid_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_project_grid_block_path_idx" ON "project_pages_blocks_project_grid_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_image_block_order_idx" ON "project_pages_blocks_image_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_image_block_parent_id_idx" ON "project_pages_blocks_image_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_image_block_path_idx" ON "project_pages_blocks_image_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_image_block_image_idx" ON "project_pages_blocks_image_block" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_hero_section_order_idx" ON "project_pages_blocks_hero_section" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_hero_section_parent_id_idx" ON "project_pages_blocks_hero_section" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_hero_section_path_idx" ON "project_pages_blocks_hero_section" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_overview_section_role_order_idx" ON "project_pages_blocks_overview_section_role" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_overview_section_role_parent_idx" ON "project_pages_blocks_overview_section_role" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_overview_section_order_idx" ON "project_pages_blocks_overview_section" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_overview_section_parent_id_idx" ON "project_pages_blocks_overview_section" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_overview_section_path_idx" ON "project_pages_blocks_overview_section" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_problem_framing_problems_order_idx" ON "project_pages_blocks_problem_framing_problems" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_problem_framing_problems_parent_id_idx" ON "project_pages_blocks_problem_framing_problems" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_problem_framing_order_idx" ON "project_pages_blocks_problem_framing" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_problem_framing_parent_id_idx" ON "project_pages_blocks_problem_framing" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_problem_framing_path_idx" ON "project_pages_blocks_problem_framing" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_user_research_research_order_idx" ON "project_pages_blocks_user_research_research" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_user_research_research_parent_id_idx" ON "project_pages_blocks_user_research_research" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_user_research_order_idx" ON "project_pages_blocks_user_research" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_user_research_parent_id_idx" ON "project_pages_blocks_user_research" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_user_research_path_idx" ON "project_pages_blocks_user_research" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_insights_section_insights_order_idx" ON "project_pages_blocks_insights_section_insights" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_insights_section_insights_parent_id_idx" ON "project_pages_blocks_insights_section_insights" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_insights_section_order_idx" ON "project_pages_blocks_insights_section" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_insights_section_parent_id_idx" ON "project_pages_blocks_insights_section" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_insights_section_path_idx" ON "project_pages_blocks_insights_section" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_outcomes_section_outcomes_stats_order_idx" ON "project_pages_blocks_outcomes_section_outcomes_stats" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_outcomes_section_outcomes_stats_parent_id_idx" ON "project_pages_blocks_outcomes_section_outcomes_stats" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_outcomes_section_outcomes_order_idx" ON "project_pages_blocks_outcomes_section_outcomes" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_outcomes_section_outcomes_parent_id_idx" ON "project_pages_blocks_outcomes_section_outcomes" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_outcomes_section_order_idx" ON "project_pages_blocks_outcomes_section" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_outcomes_section_parent_id_idx" ON "project_pages_blocks_outcomes_section" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "project_pages_blocks_outcomes_section_path_idx" ON "project_pages_blocks_outcomes_section" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "project_pages_meta_meta_image_idx" ON "project_pages" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "project_pages_updated_at_idx" ON "project_pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "project_pages_created_at_idx" ON "project_pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "project_pages_rels_order_idx" ON "project_pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "project_pages_rels_parent_idx" ON "project_pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "project_pages_rels_path_idx" ON "project_pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "project_pages_rels_pages_id_idx" ON "project_pages_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "project_pages_rels_projects_id_idx" ON "project_pages_rels" USING btree ("projects_id");
  CREATE INDEX IF NOT EXISTS "project_pages_rels_project_tags_id_idx" ON "project_pages_rels" USING btree ("project_tags_id");
  CREATE INDEX IF NOT EXISTS "skills_collection_updated_at_idx" ON "skills_collection" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "skills_collection_created_at_idx" ON "skills_collection" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "skills_collection_rels_order_idx" ON "skills_collection_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "skills_collection_rels_parent_idx" ON "skills_collection_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "skills_collection_rels_path_idx" ON "skills_collection_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "skills_collection_rels_skills_id_idx" ON "skills_collection_rels" USING btree ("skills_id");
  CREATE INDEX IF NOT EXISTS "skills_skill_icon_idx" ON "skills" USING btree ("skill_icon_id");
  CREATE INDEX IF NOT EXISTS "skills_updated_at_idx" ON "skills" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "skills_created_at_idx" ON "skills" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "testimonials_headshot_idx" ON "testimonials" USING btree ("headshot_id");
  CREATE INDEX IF NOT EXISTS "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "jobs_blocks_image_block_order_idx" ON "jobs_blocks_image_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "jobs_blocks_image_block_parent_id_idx" ON "jobs_blocks_image_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "jobs_blocks_image_block_path_idx" ON "jobs_blocks_image_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "jobs_blocks_image_block_image_idx" ON "jobs_blocks_image_block" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "jobs_blocks_rich_text_block_order_idx" ON "jobs_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "jobs_blocks_rich_text_block_parent_id_idx" ON "jobs_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "jobs_blocks_rich_text_block_path_idx" ON "jobs_blocks_rich_text_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "jobs_updated_at_idx" ON "jobs" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "jobs_created_at_idx" ON "jobs" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "jobs_rels_order_idx" ON "jobs_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "jobs_rels_parent_idx" ON "jobs_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "jobs_rels_path_idx" ON "jobs_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "jobs_rels_skills_id_idx" ON "jobs_rels" USING btree ("skills_id");
  CREATE INDEX IF NOT EXISTS "projects_links_order_idx" ON "projects_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "projects_links_parent_id_idx" ON "projects_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "projects_image_idx" ON "projects" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "projects_rels_skills_id_idx" ON "projects_rels" USING btree ("skills_id");
  CREATE INDEX IF NOT EXISTS "projects_rels_project_tags_id_idx" ON "projects_rels" USING btree ("project_tags_id");
  CREATE INDEX IF NOT EXISTS "project_tags_updated_at_idx" ON "project_tags" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "project_tags_created_at_idx" ON "project_tags" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_call_to_action_order_idx" ON "blog_pages_blocks_call_to_action" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_call_to_action_parent_id_idx" ON "blog_pages_blocks_call_to_action" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_call_to_action_path_idx" ON "blog_pages_blocks_call_to_action" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_hero_section_no_image_order_idx" ON "blog_pages_blocks_hero_section_no_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_hero_section_no_image_parent_id_idx" ON "blog_pages_blocks_hero_section_no_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_hero_section_no_image_path_idx" ON "blog_pages_blocks_hero_section_no_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_rich_text_block_order_idx" ON "blog_pages_blocks_rich_text_block" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_rich_text_block_parent_id_idx" ON "blog_pages_blocks_rich_text_block" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_rich_text_block_path_idx" ON "blog_pages_blocks_rich_text_block" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_image_order_idx" ON "blog_pages_blocks_blog_image" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_image_parent_id_idx" ON "blog_pages_blocks_blog_image" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_image_path_idx" ON "blog_pages_blocks_blog_image" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_image_image_idx" ON "blog_pages_blocks_blog_image" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_header_order_idx" ON "blog_pages_blocks_blog_header" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_header_parent_id_idx" ON "blog_pages_blocks_blog_header" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_header_path_idx" ON "blog_pages_blocks_blog_header" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_header_featured_image_idx" ON "blog_pages_blocks_blog_header" USING btree ("featured_image_id");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_header_category_idx" ON "blog_pages_blocks_blog_header" USING btree ("category_id");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_body_order_idx" ON "blog_pages_blocks_blog_body" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_body_parent_id_idx" ON "blog_pages_blocks_blog_body" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blog_pages_blocks_blog_body_path_idx" ON "blog_pages_blocks_blog_body" USING btree ("_path");
  CREATE INDEX IF NOT EXISTS "blog_pages_category_idx" ON "blog_pages" USING btree ("category_id");
  CREATE INDEX IF NOT EXISTS "blog_pages_meta_meta_image_idx" ON "blog_pages" USING btree ("meta_image_id");
  CREATE INDEX IF NOT EXISTS "blog_pages_updated_at_idx" ON "blog_pages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "blog_pages_created_at_idx" ON "blog_pages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "blog_pages_rels_order_idx" ON "blog_pages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "blog_pages_rels_parent_idx" ON "blog_pages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "blog_pages_rels_path_idx" ON "blog_pages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "blog_pages_rels_blog_tags_id_idx" ON "blog_pages_rels" USING btree ("blog_tags_id");
  CREATE INDEX IF NOT EXISTS "blog_pages_rels_pages_id_idx" ON "blog_pages_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "blog_categories_updated_at_idx" ON "blog_categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "blog_categories_created_at_idx" ON "blog_categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "blog_tags_updated_at_idx" ON "blog_tags" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "blog_tags_created_at_idx" ON "blog_tags" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_navigation_menu_id_idx" ON "payload_locked_documents_rels" USING btree ("navigation_menu_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_nav_links_id_idx" ON "payload_locked_documents_rels" USING btree ("nav_links_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_social_links_id_idx" ON "payload_locked_documents_rels" USING btree ("social_links_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_project_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("project_pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_skills_collection_id_idx" ON "payload_locked_documents_rels" USING btree ("skills_collection_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_skills_id_idx" ON "payload_locked_documents_rels" USING btree ("skills_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("jobs_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_project_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("project_tags_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blog_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_pages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blog_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blog_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_tags_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "navigation_menu" CASCADE;
  DROP TABLE "navigation_menu_rels" CASCADE;
  DROP TABLE "nav_links" CASCADE;
  DROP TABLE "social_links" CASCADE;
  DROP TABLE "pages_blocks_call_to_action" CASCADE;
  DROP TABLE "pages_blocks_image_block" CASCADE;
  DROP TABLE "pages_blocks_hero_section" CASCADE;
  DROP TABLE "pages_blocks_in_view_basic" CASCADE;
  DROP TABLE "pages_blocks_skills_section" CASCADE;
  DROP TABLE "pages_blocks_code_mockup_link" CASCADE;
  DROP TABLE "pages_blocks_code_mockup_section" CASCADE;
  DROP TABLE "pages_blocks_rich_text_block" CASCADE;
  DROP TABLE "pages_blocks_two_column_grid" CASCADE;
  DROP TABLE "pages_blocks_card" CASCADE;
  DROP TABLE "pages_blocks_in_view_embed" CASCADE;
  DROP TABLE "pages_blocks_job_section_block" CASCADE;
  DROP TABLE "pages_blocks_testimonial_section_block" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "project_pages_blocks_call_to_action" CASCADE;
  DROP TABLE "project_pages_blocks_hero_section_no_image" CASCADE;
  DROP TABLE "project_pages_blocks_project_grid_block" CASCADE;
  DROP TABLE "project_pages_blocks_image_block" CASCADE;
  DROP TABLE "project_pages_blocks_hero_section" CASCADE;
  DROP TABLE "project_pages_blocks_overview_section_role" CASCADE;
  DROP TABLE "project_pages_blocks_overview_section" CASCADE;
  DROP TABLE "project_pages_blocks_problem_framing_problems" CASCADE;
  DROP TABLE "project_pages_blocks_problem_framing" CASCADE;
  DROP TABLE "project_pages_blocks_user_research_research" CASCADE;
  DROP TABLE "project_pages_blocks_user_research" CASCADE;
  DROP TABLE "project_pages_blocks_insights_section_insights" CASCADE;
  DROP TABLE "project_pages_blocks_insights_section" CASCADE;
  DROP TABLE "project_pages_blocks_outcomes_section_outcomes_stats" CASCADE;
  DROP TABLE "project_pages_blocks_outcomes_section_outcomes" CASCADE;
  DROP TABLE "project_pages_blocks_outcomes_section" CASCADE;
  DROP TABLE "project_pages" CASCADE;
  DROP TABLE "project_pages_rels" CASCADE;
  DROP TABLE "skills_collection" CASCADE;
  DROP TABLE "skills_collection_rels" CASCADE;
  DROP TABLE "skills" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "jobs_blocks_image_block" CASCADE;
  DROP TABLE "jobs_blocks_rich_text_block" CASCADE;
  DROP TABLE "jobs" CASCADE;
  DROP TABLE "jobs_rels" CASCADE;
  DROP TABLE "projects_links" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "project_tags" CASCADE;
  DROP TABLE "blog_pages_blocks_call_to_action" CASCADE;
  DROP TABLE "blog_pages_blocks_hero_section_no_image" CASCADE;
  DROP TABLE "blog_pages_blocks_rich_text_block" CASCADE;
  DROP TABLE "blog_pages_blocks_blog_image" CASCADE;
  DROP TABLE "blog_pages_blocks_blog_header" CASCADE;
  DROP TABLE "blog_pages_blocks_blog_body" CASCADE;
  DROP TABLE "blog_pages" CASCADE;
  DROP TABLE "blog_pages_rels" CASCADE;
  DROP TABLE "blog_categories" CASCADE;
  DROP TABLE "blog_tags" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_call_to_action_style";
  DROP TYPE "public"."enum_pages_blocks_call_to_action_link_type";
  DROP TYPE "public"."enum_pages_blocks_call_to_action_arrow_direction";
  DROP TYPE "public"."enum_pages_blocks_image_block_gradient_select";
  DROP TYPE "public"."enum_pages_blocks_skills_section_gradient_select";
  DROP TYPE "public"."enum_pages_blocks_code_mockup_link_text_color";
  DROP TYPE "public"."enum_pages_blocks_two_column_grid_vert_alignment";
  DROP TYPE "public"."enum_pages_blocks_job_section_block_gradient_select";
  DROP TYPE "public"."enum_pages_blocks_testimonial_section_block_gradient_select";
  DROP TYPE "public"."enum_pages_nested_route";
  DROP TYPE "public"."enum_project_pages_blocks_call_to_action_style";
  DROP TYPE "public"."enum_project_pages_blocks_call_to_action_link_type";
  DROP TYPE "public"."enum_project_pages_blocks_call_to_action_arrow_direction";
  DROP TYPE "public"."enum_project_pages_blocks_project_grid_block_gradient_select";
  DROP TYPE "public"."enum_project_pages_blocks_image_block_gradient_select";
  DROP TYPE "public"."enum_project_pages_blocks_overview_section_role";
  DROP TYPE "public"."enum_project_pages_blocks_overview_section_duration_frequency";
  DROP TYPE "public"."enum_project_pages_blocks_problem_framing_problems_frame";
  DROP TYPE "public"."enum_project_pages_blocks_problem_framing_gradient_select";
  DROP TYPE "public"."enum_project_pages_blocks_user_research_research_research_type";
  DROP TYPE "public"."enum_project_pages_blocks_user_research_gradient_select";
  DROP TYPE "public"."enum_project_pages_blocks_outcomes_section_outcomes_result_type";
  DROP TYPE "public"."enum_project_pages_blocks_outcomes_section_gradient_select";
  DROP TYPE "public"."enum_project_pages_nested_route";
  DROP TYPE "public"."enum_jobs_blocks_image_block_gradient_select";
  DROP TYPE "public"."enum_jobs_position_type";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum_blog_pages_blocks_call_to_action_style";
  DROP TYPE "public"."enum_blog_pages_blocks_call_to_action_link_type";
  DROP TYPE "public"."enum_blog_pages_blocks_call_to_action_arrow_direction";
  DROP TYPE "public"."enum_blog_pages_nested_route";`)
}
