-- CreateEnum
CREATE TYPE "enum_jobs_blocks_image_block_gradient_select" AS ENUM ('Variant1', 'Variant2', 'Variant3', 'Variant4');

-- CreateEnum
CREATE TYPE "enum_jobs_position_type" AS ENUM ('Contract', 'Full-Time', 'Entrepreneur');

-- CreateEnum
CREATE TYPE "enum_pages_blocks_call_to_action_arrow_direction" AS ENUM ('right', 'down');

-- CreateEnum
CREATE TYPE "enum_pages_blocks_call_to_action_link_type" AS ENUM ('reference', 'custom');

-- CreateEnum
CREATE TYPE "enum_pages_blocks_call_to_action_style" AS ENUM ('primary', 'secondary', 'tertiary', 'noBackground');

-- CreateEnum
CREATE TYPE "enum_pages_blocks_code_mockup_link_text_color" AS ENUM ('white', 'black', 'success', 'warning');

-- CreateEnum
CREATE TYPE "enum_pages_blocks_image_block_gradient_select" AS ENUM ('Variant1', 'Variant2', 'Variant3', 'Variant4');

-- CreateEnum
CREATE TYPE "enum_pages_blocks_job_section_block_gradient_select" AS ENUM ('Variant1', 'Variant2', 'Variant3', 'Variant4');

-- CreateEnum
CREATE TYPE "enum_pages_blocks_skills_section_gradient_select" AS ENUM ('Variant1', 'Variant2', 'Variant3', 'Variant4');

-- CreateEnum
CREATE TYPE "enum_pages_blocks_testimonial_section_block_gradient_select" AS ENUM ('Variant1', 'Variant2', 'Variant3', 'Variant4');

-- CreateEnum
CREATE TYPE "enum_pages_blocks_two_column_grid_vert_alignment" AS ENUM ('top', 'middle', 'bottom');

-- CreateEnum
CREATE TYPE "enum_pages_nested_route" AS ENUM ('base', 'projects');

-- CreateEnum
CREATE TYPE "enum_project_pages_blocks_call_to_action_arrow_direction" AS ENUM ('right', 'down');

-- CreateEnum
CREATE TYPE "enum_project_pages_blocks_call_to_action_link_type" AS ENUM ('reference', 'custom');

-- CreateEnum
CREATE TYPE "enum_project_pages_blocks_call_to_action_style" AS ENUM ('primary', 'secondary', 'tertiary', 'noBackground');

-- CreateEnum
CREATE TYPE "enum_project_pages_blocks_image_block_gradient_select" AS ENUM ('Variant1', 'Variant2', 'Variant3', 'Variant4');

-- CreateEnum
CREATE TYPE "enum_project_pages_blocks_outcomes_section_gradient_select" AS ENUM ('Variant1', 'Variant2', 'Variant3', 'Variant4');

-- CreateEnum
CREATE TYPE "enum_project_pages_blocks_outcomes_section_outcomes_result_type" AS ENUM ('adoption', 'retention', 'efficiency');

-- CreateEnum
CREATE TYPE "enum_project_pages_blocks_overview_section_duration_frequency" AS ENUM ('years', 'months', 'weeks');

-- CreateEnum
CREATE TYPE "enum_project_pages_blocks_overview_section_role" AS ENUM ('designer', 'frontendDev', 'backendDEv', 'integrationSpec');

-- CreateEnum
CREATE TYPE "enum_project_pages_blocks_problem_framing_gradient_select" AS ENUM ('Variant1', 'Variant2', 'Variant3', 'Variant4');

-- CreateEnum
CREATE TYPE "enum_project_pages_blocks_problem_framing_problems_frame" AS ENUM ('who', 'where', 'when', 'why');

-- CreateEnum
CREATE TYPE "enum_project_pages_blocks_project_grid_block_gradient_select" AS ENUM ('Variant1', 'Variant2', 'Variant3', 'Variant4');

-- CreateEnum
CREATE TYPE "enum_project_pages_blocks_user_research_gradient_select" AS ENUM ('Variant1', 'Variant2', 'Variant3', 'Variant4');

-- CreateEnum
CREATE TYPE "enum_project_pages_blocks_user_research_research_research_type" AS ENUM ('survey', 'interviews', 'usability', 'accessibility');

-- CreateEnum
CREATE TYPE "enum_project_pages_nested_route" AS ENUM ('base', 'projects');

-- CreateEnum
CREATE TYPE "enum_projects_status" AS ENUM ('completed', 'inProgress', 'onHold');

-- CreateTable
CREATE TABLE "jobs" (
    "id" SERIAL NOT NULL,
    "company_name" VARCHAR NOT NULL,
    "job_role" VARCHAR NOT NULL,
    "start_date" TIMESTAMPTZ(3) NOT NULL,
    "current_position" BOOLEAN,
    "end_date" TIMESTAMPTZ(3),
    "location" VARCHAR NOT NULL,
    "position_type" "enum_jobs_position_type" NOT NULL,
    "company_description" VARCHAR NOT NULL,
    "company_website" VARCHAR NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs_blocks_image_block" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "image_id" INTEGER NOT NULL,
    "gradient" BOOLEAN DEFAULT false,
    "gradient_x_flip" BOOLEAN DEFAULT false,
    "gradient_y_flip" BOOLEAN DEFAULT false,
    "gradient_select" "enum_jobs_blocks_image_block_gradient_select",
    "block_name" VARCHAR,
    "forced_width" DECIMAL NOT NULL DEFAULT 0,
    "forced_height" DECIMAL NOT NULL DEFAULT 0,

    CONSTRAINT "jobs_blocks_image_block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs_blocks_rich_text_block" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "content" JSONB NOT NULL,
    "content_html" VARCHAR,
    "block_name" VARCHAR,

    CONSTRAINT "jobs_blocks_rich_text_block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs_rels" (
    "id" SERIAL NOT NULL,
    "order" INTEGER,
    "parent_id" INTEGER NOT NULL,
    "path" VARCHAR NOT NULL,
    "skills_id" INTEGER,

    CONSTRAINT "jobs_rels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "alt" VARCHAR NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" VARCHAR,
    "thumbnail_u_r_l" VARCHAR,
    "filename" VARCHAR,
    "mime_type" VARCHAR,
    "filesize" DECIMAL,
    "width" DECIMAL,
    "height" DECIMAL,
    "focal_x" DECIMAL,
    "focal_y" DECIMAL,
    "convert_webp" BOOLEAN DEFAULT false,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nav_links" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR NOT NULL,
    "link" VARCHAR NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nav_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "navigation_menu" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logo_id" INTEGER,

    CONSTRAINT "navigation_menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "navigation_menu_rels" (
    "id" SERIAL NOT NULL,
    "order" INTEGER,
    "parent_id" INTEGER NOT NULL,
    "path" VARCHAR NOT NULL,
    "nav_links_id" INTEGER,
    "social_links_id" INTEGER,

    CONSTRAINT "navigation_menu_rels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "meta_title" VARCHAR,
    "meta_description" VARCHAR,
    "meta_image_id" INTEGER,
    "slug" VARCHAR,
    "nested_route" "enum_pages_nested_route" NOT NULL,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages_blocks_call_to_action" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "style" "enum_pages_blocks_call_to_action_style",
    "link_type" "enum_pages_blocks_call_to_action_link_type" DEFAULT 'reference',
    "link_new_tab" BOOLEAN DEFAULT false,
    "link_url" VARCHAR,
    "link_label" VARCHAR NOT NULL,
    "arrow" BOOLEAN DEFAULT false,
    "arrow_direction" "enum_pages_blocks_call_to_action_arrow_direction",
    "block_name" VARCHAR,

    CONSTRAINT "pages_blocks_call_to_action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages_blocks_card" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "pill" VARCHAR,
    "block_name" VARCHAR,

    CONSTRAINT "pages_blocks_card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages_blocks_code_mockup_link" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "prefix" VARCHAR,
    "text" VARCHAR NOT NULL,
    "text_color" "enum_pages_blocks_code_mockup_link_text_color" NOT NULL,
    "block_name" VARCHAR,

    CONSTRAINT "pages_blocks_code_mockup_link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages_blocks_code_mockup_section" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "enable_section" BOOLEAN,
    "block_name" VARCHAR,
    "use_random_data" BOOLEAN,

    CONSTRAINT "pages_blocks_code_mockup_section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages_blocks_hero_section" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "subtitle" VARCHAR,
    "description" VARCHAR,
    "block_name" VARCHAR,
    "section_id" VARCHAR NOT NULL,
    "enable_inner_container" BOOLEAN DEFAULT false,
    "secondary_blurb" VARCHAR,
    "grey_background" BOOLEAN,

    CONSTRAINT "pages_blocks_hero_section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages_blocks_image_block" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "image_id" INTEGER NOT NULL,
    "gradient" BOOLEAN DEFAULT false,
    "gradient_x_flip" BOOLEAN DEFAULT false,
    "gradient_y_flip" BOOLEAN DEFAULT false,
    "gradient_select" "enum_pages_blocks_image_block_gradient_select",
    "block_name" VARCHAR,
    "forced_width" DECIMAL NOT NULL DEFAULT 0,
    "forced_height" DECIMAL NOT NULL DEFAULT 0,

    CONSTRAINT "pages_blocks_image_block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages_blocks_in_view_basic" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "hidden_y" DECIMAL DEFAULT 0,
    "hidden_blur" DECIMAL DEFAULT 4,
    "visible_y" DECIMAL DEFAULT 1,
    "visible_blur" DECIMAL DEFAULT 0,
    "block_name" VARCHAR,

    CONSTRAINT "pages_blocks_in_view_basic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages_blocks_in_view_embed" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "section_id" VARCHAR NOT NULL,
    "hidden_y" DECIMAL DEFAULT 0,
    "hidden_blur" DECIMAL DEFAULT 4,
    "visible_y" DECIMAL DEFAULT 1,
    "visible_blur" DECIMAL DEFAULT 0,
    "block_name" VARCHAR,

    CONSTRAINT "pages_blocks_in_view_embed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages_blocks_job_section_block" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "gradient" BOOLEAN DEFAULT false,
    "gradient_select" "enum_pages_blocks_job_section_block_gradient_select",
    "block_name" VARCHAR,
    "section_id" VARCHAR NOT NULL,

    CONSTRAINT "pages_blocks_job_section_block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages_blocks_rich_text_block" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "block_name" VARCHAR,
    "content" JSONB NOT NULL,
    "content_html" VARCHAR,

    CONSTRAINT "pages_blocks_rich_text_block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages_blocks_skills_section" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "section_id" VARCHAR NOT NULL,
    "skills_collection_id" INTEGER NOT NULL,
    "block_name" VARCHAR,
    "heading" VARCHAR NOT NULL,
    "gradient" BOOLEAN DEFAULT false,
    "gradient_select" "enum_pages_blocks_skills_section_gradient_select",
    "pill" VARCHAR,
    "description" VARCHAR,

    CONSTRAINT "pages_blocks_skills_section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages_blocks_testimonial_section_block" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "section_id" VARCHAR,
    "pill" VARCHAR,
    "heading" VARCHAR NOT NULL,
    "description" VARCHAR,
    "block_name" VARCHAR,
    "gradient" BOOLEAN DEFAULT false,
    "gradient_select" "enum_pages_blocks_testimonial_section_block_gradient_select",
    "carousel_custom" BOOLEAN DEFAULT false,
    "enable_infinite" BOOLEAN DEFAULT false,
    "carousel_timer" BOOLEAN DEFAULT false,
    "seconds_timer" DECIMAL,

    CONSTRAINT "pages_blocks_testimonial_section_block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages_blocks_two_column_grid" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "section_id" VARCHAR NOT NULL,
    "reverse_order" BOOLEAN,
    "block_name" VARCHAR,
    "vert_alignment" "enum_pages_blocks_two_column_grid_vert_alignment",

    CONSTRAINT "pages_blocks_two_column_grid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pages_rels" (
    "id" SERIAL NOT NULL,
    "order" INTEGER,
    "parent_id" INTEGER NOT NULL,
    "path" VARCHAR NOT NULL,
    "pages_id" INTEGER,
    "testimonials_id" INTEGER,
    "jobs_id" INTEGER,

    CONSTRAINT "pages_rels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payload_locked_documents" (
    "id" SERIAL NOT NULL,
    "global_slug" VARCHAR,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payload_locked_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payload_locked_documents_rels" (
    "id" SERIAL NOT NULL,
    "order" INTEGER,
    "parent_id" INTEGER NOT NULL,
    "path" VARCHAR NOT NULL,
    "media_id" INTEGER,
    "users_id" INTEGER,
    "navigation_menu_id" INTEGER,
    "nav_links_id" INTEGER,
    "social_links_id" INTEGER,
    "pages_id" INTEGER,
    "skills_collection_id" INTEGER,
    "skills_id" INTEGER,
    "testimonials_id" INTEGER,
    "jobs_id" INTEGER,
    "projects_id" INTEGER,
    "project_tags_id" INTEGER,
    "project_pages_id" INTEGER,

    CONSTRAINT "payload_locked_documents_rels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payload_migrations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "batch" DECIMAL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payload_migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payload_preferences" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR,
    "value" JSONB,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payload_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payload_preferences_rels" (
    "id" SERIAL NOT NULL,
    "order" INTEGER,
    "parent_id" INTEGER NOT NULL,
    "path" VARCHAR NOT NULL,
    "users_id" INTEGER,

    CONSTRAINT "payload_preferences_rels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "slug" VARCHAR,
    "meta_title" VARCHAR,
    "meta_description" VARCHAR,
    "meta_image_id" INTEGER,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nested_route" "enum_project_pages_nested_route" NOT NULL,

    CONSTRAINT "project_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages_blocks_call_to_action" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "style" "enum_project_pages_blocks_call_to_action_style",
    "link_type" "enum_project_pages_blocks_call_to_action_link_type" DEFAULT 'reference',
    "link_new_tab" BOOLEAN DEFAULT false,
    "link_url" VARCHAR,
    "link_label" VARCHAR NOT NULL,
    "arrow" BOOLEAN DEFAULT false,
    "arrow_direction" "enum_project_pages_blocks_call_to_action_arrow_direction",
    "block_name" VARCHAR,

    CONSTRAINT "project_pages_blocks_call_to_action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages_blocks_hero_section" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "section_id" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "subtitle" VARCHAR,
    "description" VARCHAR,
    "secondary_blurb" VARCHAR,
    "enable_inner_container" BOOLEAN DEFAULT false,
    "block_name" VARCHAR,
    "grey_background" BOOLEAN,

    CONSTRAINT "project_pages_blocks_hero_section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages_blocks_hero_section_no_image" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "section_id" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "subtitle" VARCHAR,
    "description" VARCHAR,
    "secondary_blurb" VARCHAR,
    "block_name" VARCHAR,

    CONSTRAINT "project_pages_blocks_hero_section_no_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages_blocks_image_block" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "image_id" INTEGER NOT NULL,
    "gradient" BOOLEAN DEFAULT false,
    "gradient_x_flip" BOOLEAN DEFAULT false,
    "gradient_y_flip" BOOLEAN DEFAULT false,
    "gradient_select" "enum_project_pages_blocks_image_block_gradient_select",
    "block_name" VARCHAR,
    "forced_width" DECIMAL NOT NULL DEFAULT 0,
    "forced_height" DECIMAL NOT NULL DEFAULT 0,

    CONSTRAINT "project_pages_blocks_image_block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages_blocks_insights_section" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "section_id" VARCHAR NOT NULL,
    "pill" VARCHAR,
    "heading" VARCHAR NOT NULL,
    "description" VARCHAR,
    "block_name" VARCHAR,

    CONSTRAINT "project_pages_blocks_insights_section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages_blocks_insights_section_insights" (
    "_order" INTEGER NOT NULL,
    "_parent_id" VARCHAR NOT NULL,
    "id" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "body" VARCHAR NOT NULL,

    CONSTRAINT "project_pages_blocks_insights_section_insights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages_blocks_outcomes_section" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "section_id" VARCHAR NOT NULL,
    "pill" VARCHAR,
    "heading" VARCHAR NOT NULL,
    "description" VARCHAR,
    "gradient" BOOLEAN DEFAULT false,
    "gradient_select" "enum_project_pages_blocks_outcomes_section_gradient_select",
    "block_name" VARCHAR,

    CONSTRAINT "project_pages_blocks_outcomes_section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages_blocks_outcomes_section_outcomes" (
    "_order" INTEGER NOT NULL,
    "_parent_id" VARCHAR NOT NULL,
    "id" VARCHAR NOT NULL,
    "result_type" "enum_project_pages_blocks_outcomes_section_outcomes_result_type" NOT NULL,
    "emojis" VARCHAR NOT NULL,

    CONSTRAINT "project_pages_blocks_outcomes_section_outcomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages_blocks_outcomes_section_outcomes_stats" (
    "_order" INTEGER NOT NULL,
    "_parent_id" VARCHAR NOT NULL,
    "id" VARCHAR NOT NULL,
    "number" DECIMAL NOT NULL,
    "num_label" VARCHAR,
    "label" VARCHAR NOT NULL,

    CONSTRAINT "project_pages_blocks_outcomes_section_outcomes_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages_blocks_overview_section" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "content" JSONB NOT NULL,
    "content_html" VARCHAR,
    "duration_time_length" DECIMAL NOT NULL,
    "duration_frequency" "enum_project_pages_blocks_overview_section_duration_frequency" NOT NULL,
    "block_name" VARCHAR,
    "grey_background" BOOLEAN,

    CONSTRAINT "project_pages_blocks_overview_section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages_blocks_overview_section_role" (
    "order" INTEGER NOT NULL,
    "parent_id" VARCHAR NOT NULL,
    "value" "enum_project_pages_blocks_overview_section_role",
    "id" SERIAL NOT NULL,

    CONSTRAINT "project_pages_blocks_overview_section_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages_blocks_problem_framing" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "section_id" VARCHAR NOT NULL,
    "pill" VARCHAR,
    "heading" VARCHAR NOT NULL,
    "description" VARCHAR,
    "grey_background" BOOLEAN,
    "block_name" VARCHAR,
    "gradient" BOOLEAN DEFAULT false,
    "gradient_select" "enum_project_pages_blocks_problem_framing_gradient_select",

    CONSTRAINT "project_pages_blocks_problem_framing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages_blocks_problem_framing_problems" (
    "_order" INTEGER NOT NULL,
    "_parent_id" VARCHAR NOT NULL,
    "id" VARCHAR NOT NULL,
    "frame" "enum_project_pages_blocks_problem_framing_problems_frame" NOT NULL,
    "description" VARCHAR NOT NULL,

    CONSTRAINT "project_pages_blocks_problem_framing_problems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages_blocks_project_grid_block" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "block_name" VARCHAR,
    "gradient" BOOLEAN DEFAULT false,
    "gradient_select" "enum_project_pages_blocks_project_grid_block_gradient_select",

    CONSTRAINT "project_pages_blocks_project_grid_block_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages_blocks_user_research" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "_path" TEXT NOT NULL,
    "id" VARCHAR NOT NULL,
    "section_id" VARCHAR NOT NULL,
    "pill" VARCHAR,
    "heading" VARCHAR NOT NULL,
    "description" VARCHAR,
    "block_name" VARCHAR,
    "gradient" BOOLEAN DEFAULT false,
    "gradient_select" "enum_project_pages_blocks_user_research_gradient_select",

    CONSTRAINT "project_pages_blocks_user_research_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages_blocks_user_research_research" (
    "_order" INTEGER NOT NULL,
    "_parent_id" VARCHAR NOT NULL,
    "id" VARCHAR NOT NULL,
    "research_type" "enum_project_pages_blocks_user_research_research_research_type" NOT NULL,
    "number_metric" DECIMAL NOT NULL,

    CONSTRAINT "project_pages_blocks_user_research_research_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_pages_rels" (
    "id" SERIAL NOT NULL,
    "order" INTEGER,
    "parent_id" INTEGER NOT NULL,
    "path" VARCHAR NOT NULL,
    "pages_id" INTEGER,
    "projects_id" INTEGER,
    "project_tags_id" INTEGER,

    CONSTRAINT "project_pages_rels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_tags" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "image_id" INTEGER NOT NULL,
    "title" VARCHAR NOT NULL,
    "excerpt" VARCHAR NOT NULL,
    "status" "enum_projects_status" NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" VARCHAR,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects_links" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "id" VARCHAR NOT NULL,
    "label" VARCHAR NOT NULL,
    "link" VARCHAR NOT NULL,

    CONSTRAINT "projects_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects_rels" (
    "id" SERIAL NOT NULL,
    "order" INTEGER,
    "parent_id" INTEGER NOT NULL,
    "path" VARCHAR NOT NULL,
    "skills_id" INTEGER,
    "project_tags_id" INTEGER,

    CONSTRAINT "projects_rels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "skill_icon_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills_collection" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "skills_collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skills_collection_rels" (
    "id" SERIAL NOT NULL,
    "order" INTEGER,
    "parent_id" INTEGER NOT NULL,
    "path" VARCHAR NOT NULL,
    "skills_id" INTEGER,

    CONSTRAINT "skills_collection_rels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "social_links" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR NOT NULL,
    "link" VARCHAR NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "social_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "position" VARCHAR NOT NULL,
    "company" VARCHAR NOT NULL,
    "headshot_id" INTEGER NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" JSONB NOT NULL,
    "content_html" VARCHAR,
    "callout" VARCHAR NOT NULL,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" VARCHAR NOT NULL,
    "reset_password_token" VARCHAR,
    "reset_password_expiration" TIMESTAMPTZ(3),
    "salt" VARCHAR,
    "hash" VARCHAR,
    "login_attempts" DECIMAL DEFAULT 0,
    "lock_until" TIMESTAMPTZ(3),
    "enable_a_p_i_key" BOOLEAN,
    "api_key" VARCHAR,
    "api_key_index" VARCHAR,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "jobs_created_at_idx" ON "jobs"("created_at");

-- CreateIndex
CREATE INDEX "jobs_updated_at_idx" ON "jobs"("updated_at");

-- CreateIndex
CREATE INDEX "jobs_blocks_image_block_image_idx" ON "jobs_blocks_image_block"("image_id");

-- CreateIndex
CREATE INDEX "jobs_blocks_image_block_order_idx" ON "jobs_blocks_image_block"("_order");

-- CreateIndex
CREATE INDEX "jobs_blocks_image_block_parent_id_idx" ON "jobs_blocks_image_block"("_parent_id");

-- CreateIndex
CREATE INDEX "jobs_blocks_image_block_path_idx" ON "jobs_blocks_image_block"("_path");

-- CreateIndex
CREATE INDEX "jobs_blocks_rich_text_block_order_idx" ON "jobs_blocks_rich_text_block"("_order");

-- CreateIndex
CREATE INDEX "jobs_blocks_rich_text_block_parent_id_idx" ON "jobs_blocks_rich_text_block"("_parent_id");

-- CreateIndex
CREATE INDEX "jobs_blocks_rich_text_block_path_idx" ON "jobs_blocks_rich_text_block"("_path");

-- CreateIndex
CREATE INDEX "jobs_rels_order_idx" ON "jobs_rels"("order");

-- CreateIndex
CREATE INDEX "jobs_rels_parent_idx" ON "jobs_rels"("parent_id");

-- CreateIndex
CREATE INDEX "jobs_rels_path_idx" ON "jobs_rels"("path");

-- CreateIndex
CREATE INDEX "jobs_rels_skills_id_idx" ON "jobs_rels"("skills_id");

-- CreateIndex
CREATE UNIQUE INDEX "media_filename_idx" ON "media"("filename");

-- CreateIndex
CREATE INDEX "media_created_at_idx" ON "media"("created_at");

-- CreateIndex
CREATE INDEX "media_updated_at_idx" ON "media"("updated_at");

-- CreateIndex
CREATE INDEX "nav_links_created_at_idx" ON "nav_links"("created_at");

-- CreateIndex
CREATE INDEX "nav_links_updated_at_idx" ON "nav_links"("updated_at");

-- CreateIndex
CREATE INDEX "navigation_menu_created_at_idx" ON "navigation_menu"("created_at");

-- CreateIndex
CREATE INDEX "navigation_menu_logo_idx" ON "navigation_menu"("logo_id");

-- CreateIndex
CREATE INDEX "navigation_menu_updated_at_idx" ON "navigation_menu"("updated_at");

-- CreateIndex
CREATE INDEX "navigation_menu_rels_nav_links_id_idx" ON "navigation_menu_rels"("nav_links_id");

-- CreateIndex
CREATE INDEX "navigation_menu_rels_order_idx" ON "navigation_menu_rels"("order");

-- CreateIndex
CREATE INDEX "navigation_menu_rels_parent_idx" ON "navigation_menu_rels"("parent_id");

-- CreateIndex
CREATE INDEX "navigation_menu_rels_path_idx" ON "navigation_menu_rels"("path");

-- CreateIndex
CREATE INDEX "navigation_menu_rels_social_links_id_idx" ON "navigation_menu_rels"("social_links_id");

-- CreateIndex
CREATE INDEX "pages_created_at_idx" ON "pages"("created_at");

-- CreateIndex
CREATE INDEX "pages_meta_meta_image_idx" ON "pages"("meta_image_id");

-- CreateIndex
CREATE INDEX "pages_updated_at_idx" ON "pages"("updated_at");

-- CreateIndex
CREATE INDEX "pages_blocks_call_to_action_order_idx" ON "pages_blocks_call_to_action"("_order");

-- CreateIndex
CREATE INDEX "pages_blocks_call_to_action_parent_id_idx" ON "pages_blocks_call_to_action"("_parent_id");

-- CreateIndex
CREATE INDEX "pages_blocks_call_to_action_path_idx" ON "pages_blocks_call_to_action"("_path");

-- CreateIndex
CREATE INDEX "pages_blocks_card_order_idx" ON "pages_blocks_card"("_order");

-- CreateIndex
CREATE INDEX "pages_blocks_card_parent_id_idx" ON "pages_blocks_card"("_parent_id");

-- CreateIndex
CREATE INDEX "pages_blocks_card_path_idx" ON "pages_blocks_card"("_path");

-- CreateIndex
CREATE INDEX "pages_blocks_code_mockup_link_order_idx" ON "pages_blocks_code_mockup_link"("_order");

-- CreateIndex
CREATE INDEX "pages_blocks_code_mockup_link_parent_id_idx" ON "pages_blocks_code_mockup_link"("_parent_id");

-- CreateIndex
CREATE INDEX "pages_blocks_code_mockup_link_path_idx" ON "pages_blocks_code_mockup_link"("_path");

-- CreateIndex
CREATE INDEX "pages_blocks_code_mockup_section_order_idx" ON "pages_blocks_code_mockup_section"("_order");

-- CreateIndex
CREATE INDEX "pages_blocks_code_mockup_section_parent_id_idx" ON "pages_blocks_code_mockup_section"("_parent_id");

-- CreateIndex
CREATE INDEX "pages_blocks_code_mockup_section_path_idx" ON "pages_blocks_code_mockup_section"("_path");

-- CreateIndex
CREATE INDEX "pages_blocks_hero_section_order_idx" ON "pages_blocks_hero_section"("_order");

-- CreateIndex
CREATE INDEX "pages_blocks_hero_section_parent_id_idx" ON "pages_blocks_hero_section"("_parent_id");

-- CreateIndex
CREATE INDEX "pages_blocks_hero_section_path_idx" ON "pages_blocks_hero_section"("_path");

-- CreateIndex
CREATE INDEX "pages_blocks_image_block_image_idx" ON "pages_blocks_image_block"("image_id");

-- CreateIndex
CREATE INDEX "pages_blocks_image_block_order_idx" ON "pages_blocks_image_block"("_order");

-- CreateIndex
CREATE INDEX "pages_blocks_image_block_parent_id_idx" ON "pages_blocks_image_block"("_parent_id");

-- CreateIndex
CREATE INDEX "pages_blocks_image_block_path_idx" ON "pages_blocks_image_block"("_path");

-- CreateIndex
CREATE INDEX "pages_blocks_in_view_basic_order_idx" ON "pages_blocks_in_view_basic"("_order");

-- CreateIndex
CREATE INDEX "pages_blocks_in_view_basic_parent_id_idx" ON "pages_blocks_in_view_basic"("_parent_id");

-- CreateIndex
CREATE INDEX "pages_blocks_in_view_basic_path_idx" ON "pages_blocks_in_view_basic"("_path");

-- CreateIndex
CREATE INDEX "pages_blocks_in_view_embed_order_idx" ON "pages_blocks_in_view_embed"("_order");

-- CreateIndex
CREATE INDEX "pages_blocks_in_view_embed_parent_id_idx" ON "pages_blocks_in_view_embed"("_parent_id");

-- CreateIndex
CREATE INDEX "pages_blocks_in_view_embed_path_idx" ON "pages_blocks_in_view_embed"("_path");

-- CreateIndex
CREATE INDEX "pages_blocks_job_section_block_order_idx" ON "pages_blocks_job_section_block"("_order");

-- CreateIndex
CREATE INDEX "pages_blocks_job_section_block_parent_id_idx" ON "pages_blocks_job_section_block"("_parent_id");

-- CreateIndex
CREATE INDEX "pages_blocks_job_section_block_path_idx" ON "pages_blocks_job_section_block"("_path");

-- CreateIndex
CREATE INDEX "pages_blocks_rich_text_block_order_idx" ON "pages_blocks_rich_text_block"("_order");

-- CreateIndex
CREATE INDEX "pages_blocks_rich_text_block_parent_id_idx" ON "pages_blocks_rich_text_block"("_parent_id");

-- CreateIndex
CREATE INDEX "pages_blocks_rich_text_block_path_idx" ON "pages_blocks_rich_text_block"("_path");

-- CreateIndex
CREATE INDEX "pages_blocks_skills_section_order_idx" ON "pages_blocks_skills_section"("_order");

-- CreateIndex
CREATE INDEX "pages_blocks_skills_section_parent_id_idx" ON "pages_blocks_skills_section"("_parent_id");

-- CreateIndex
CREATE INDEX "pages_blocks_skills_section_path_idx" ON "pages_blocks_skills_section"("_path");

-- CreateIndex
CREATE INDEX "pages_blocks_skills_section_skills_collection_idx" ON "pages_blocks_skills_section"("skills_collection_id");

-- CreateIndex
CREATE INDEX "pages_blocks_testimonial_section_block_order_idx" ON "pages_blocks_testimonial_section_block"("_order");

-- CreateIndex
CREATE INDEX "pages_blocks_testimonial_section_block_parent_id_idx" ON "pages_blocks_testimonial_section_block"("_parent_id");

-- CreateIndex
CREATE INDEX "pages_blocks_testimonial_section_block_path_idx" ON "pages_blocks_testimonial_section_block"("_path");

-- CreateIndex
CREATE INDEX "pages_blocks_two_column_grid_order_idx" ON "pages_blocks_two_column_grid"("_order");

-- CreateIndex
CREATE INDEX "pages_blocks_two_column_grid_parent_id_idx" ON "pages_blocks_two_column_grid"("_parent_id");

-- CreateIndex
CREATE INDEX "pages_blocks_two_column_grid_path_idx" ON "pages_blocks_two_column_grid"("_path");

-- CreateIndex
CREATE INDEX "pages_rels_jobs_id_idx" ON "pages_rels"("jobs_id");

-- CreateIndex
CREATE INDEX "pages_rels_order_idx" ON "pages_rels"("order");

-- CreateIndex
CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels"("pages_id");

-- CreateIndex
CREATE INDEX "pages_rels_parent_idx" ON "pages_rels"("parent_id");

-- CreateIndex
CREATE INDEX "pages_rels_path_idx" ON "pages_rels"("path");

-- CreateIndex
CREATE INDEX "pages_rels_testimonials_id_idx" ON "pages_rels"("testimonials_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents"("created_at");

-- CreateIndex
CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents"("global_slug");

-- CreateIndex
CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents"("updated_at");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_jobs_id_idx" ON "payload_locked_documents_rels"("jobs_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels"("media_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_nav_links_id_idx" ON "payload_locked_documents_rels"("nav_links_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_navigation_menu_id_idx" ON "payload_locked_documents_rels"("navigation_menu_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels"("order");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels"("pages_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels"("parent_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels"("path");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_project_pages_id_idx" ON "payload_locked_documents_rels"("project_pages_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_project_tags_id_idx" ON "payload_locked_documents_rels"("project_tags_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels"("projects_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_skills_collection_id_idx" ON "payload_locked_documents_rels"("skills_collection_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_skills_id_idx" ON "payload_locked_documents_rels"("skills_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_social_links_id_idx" ON "payload_locked_documents_rels"("social_links_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels"("testimonials_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels"("users_id");

-- CreateIndex
CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations"("created_at");

-- CreateIndex
CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations"("updated_at");

-- CreateIndex
CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences"("created_at");

-- CreateIndex
CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences"("key");

-- CreateIndex
CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences"("updated_at");

-- CreateIndex
CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels"("order");

-- CreateIndex
CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels"("parent_id");

-- CreateIndex
CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels"("path");

-- CreateIndex
CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels"("users_id");

-- CreateIndex
CREATE INDEX "project_pages_created_at_idx" ON "project_pages"("created_at");

-- CreateIndex
CREATE INDEX "project_pages_meta_meta_image_idx" ON "project_pages"("meta_image_id");

-- CreateIndex
CREATE INDEX "project_pages_updated_at_idx" ON "project_pages"("updated_at");

-- CreateIndex
CREATE INDEX "project_pages_blocks_call_to_action_order_idx" ON "project_pages_blocks_call_to_action"("_order");

-- CreateIndex
CREATE INDEX "project_pages_blocks_call_to_action_parent_id_idx" ON "project_pages_blocks_call_to_action"("_parent_id");

-- CreateIndex
CREATE INDEX "project_pages_blocks_call_to_action_path_idx" ON "project_pages_blocks_call_to_action"("_path");

-- CreateIndex
CREATE INDEX "project_pages_blocks_hero_section_order_idx" ON "project_pages_blocks_hero_section"("_order");

-- CreateIndex
CREATE INDEX "project_pages_blocks_hero_section_parent_id_idx" ON "project_pages_blocks_hero_section"("_parent_id");

-- CreateIndex
CREATE INDEX "project_pages_blocks_hero_section_path_idx" ON "project_pages_blocks_hero_section"("_path");

-- CreateIndex
CREATE INDEX "project_pages_blocks_hero_section_no_image_order_idx" ON "project_pages_blocks_hero_section_no_image"("_order");

-- CreateIndex
CREATE INDEX "project_pages_blocks_hero_section_no_image_parent_id_idx" ON "project_pages_blocks_hero_section_no_image"("_parent_id");

-- CreateIndex
CREATE INDEX "project_pages_blocks_hero_section_no_image_path_idx" ON "project_pages_blocks_hero_section_no_image"("_path");

-- CreateIndex
CREATE INDEX "project_pages_blocks_image_block_image_idx" ON "project_pages_blocks_image_block"("image_id");

-- CreateIndex
CREATE INDEX "project_pages_blocks_image_block_order_idx" ON "project_pages_blocks_image_block"("_order");

-- CreateIndex
CREATE INDEX "project_pages_blocks_image_block_parent_id_idx" ON "project_pages_blocks_image_block"("_parent_id");

-- CreateIndex
CREATE INDEX "project_pages_blocks_image_block_path_idx" ON "project_pages_blocks_image_block"("_path");

-- CreateIndex
CREATE INDEX "project_pages_blocks_insights_section_order_idx" ON "project_pages_blocks_insights_section"("_order");

-- CreateIndex
CREATE INDEX "project_pages_blocks_insights_section_parent_id_idx" ON "project_pages_blocks_insights_section"("_parent_id");

-- CreateIndex
CREATE INDEX "project_pages_blocks_insights_section_path_idx" ON "project_pages_blocks_insights_section"("_path");

-- CreateIndex
CREATE INDEX "project_pages_blocks_insights_section_insights_order_idx" ON "project_pages_blocks_insights_section_insights"("_order");

-- CreateIndex
CREATE INDEX "project_pages_blocks_insights_section_insights_parent_id_idx" ON "project_pages_blocks_insights_section_insights"("_parent_id");

-- CreateIndex
CREATE INDEX "project_pages_blocks_outcomes_section_order_idx" ON "project_pages_blocks_outcomes_section"("_order");

-- CreateIndex
CREATE INDEX "project_pages_blocks_outcomes_section_parent_id_idx" ON "project_pages_blocks_outcomes_section"("_parent_id");

-- CreateIndex
CREATE INDEX "project_pages_blocks_outcomes_section_path_idx" ON "project_pages_blocks_outcomes_section"("_path");

-- CreateIndex
CREATE INDEX "project_pages_blocks_outcomes_section_outcomes_order_idx" ON "project_pages_blocks_outcomes_section_outcomes"("_order");

-- CreateIndex
CREATE INDEX "project_pages_blocks_outcomes_section_outcomes_parent_id_idx" ON "project_pages_blocks_outcomes_section_outcomes"("_parent_id");

-- CreateIndex
CREATE INDEX "project_pages_blocks_outcomes_section_outcomes_stats_order_idx" ON "project_pages_blocks_outcomes_section_outcomes_stats"("_order");

-- CreateIndex
CREATE INDEX "stats_parent_id_idx" ON "project_pages_blocks_outcomes_section_outcomes_stats"("_parent_id");

-- CreateIndex
CREATE INDEX "project_pages_blocks_overview_section_order_idx" ON "project_pages_blocks_overview_section"("_order");

-- CreateIndex
CREATE INDEX "project_pages_blocks_overview_section_parent_id_idx" ON "project_pages_blocks_overview_section"("_parent_id");

-- CreateIndex
CREATE INDEX "project_pages_blocks_overview_section_path_idx" ON "project_pages_blocks_overview_section"("_path");

-- CreateIndex
CREATE INDEX "project_pages_blocks_overview_section_role_order_idx" ON "project_pages_blocks_overview_section_role"("order");

-- CreateIndex
CREATE INDEX "project_pages_blocks_overview_section_role_parent_idx" ON "project_pages_blocks_overview_section_role"("parent_id");

-- CreateIndex
CREATE INDEX "project_pages_blocks_problem_framing_order_idx" ON "project_pages_blocks_problem_framing"("_order");

-- CreateIndex
CREATE INDEX "project_pages_blocks_problem_framing_parent_id_idx" ON "project_pages_blocks_problem_framing"("_parent_id");

-- CreateIndex
CREATE INDEX "project_pages_blocks_problem_framing_path_idx" ON "project_pages_blocks_problem_framing"("_path");

-- CreateIndex
CREATE INDEX "project_pages_blocks_problem_framing_problems_order_idx" ON "project_pages_blocks_problem_framing_problems"("_order");

-- CreateIndex
CREATE INDEX "project_pages_blocks_problem_framing_problems_parent_id_idx" ON "project_pages_blocks_problem_framing_problems"("_parent_id");

-- CreateIndex
CREATE INDEX "project_pages_blocks_project_grid_block_order_idx" ON "project_pages_blocks_project_grid_block"("_order");

-- CreateIndex
CREATE INDEX "project_pages_blocks_project_grid_block_parent_id_idx" ON "project_pages_blocks_project_grid_block"("_parent_id");

-- CreateIndex
CREATE INDEX "project_pages_blocks_project_grid_block_path_idx" ON "project_pages_blocks_project_grid_block"("_path");

-- CreateIndex
CREATE INDEX "project_pages_blocks_user_research_order_idx" ON "project_pages_blocks_user_research"("_order");

-- CreateIndex
CREATE INDEX "project_pages_blocks_user_research_parent_id_idx" ON "project_pages_blocks_user_research"("_parent_id");

-- CreateIndex
CREATE INDEX "project_pages_blocks_user_research_path_idx" ON "project_pages_blocks_user_research"("_path");

-- CreateIndex
CREATE INDEX "project_pages_blocks_user_research_research_order_idx" ON "project_pages_blocks_user_research_research"("_order");

-- CreateIndex
CREATE INDEX "project_pages_blocks_user_research_research_parent_id_idx" ON "project_pages_blocks_user_research_research"("_parent_id");

-- CreateIndex
CREATE INDEX "project_pages_rels_order_idx" ON "project_pages_rels"("order");

-- CreateIndex
CREATE INDEX "project_pages_rels_pages_id_idx" ON "project_pages_rels"("pages_id");

-- CreateIndex
CREATE INDEX "project_pages_rels_parent_idx" ON "project_pages_rels"("parent_id");

-- CreateIndex
CREATE INDEX "project_pages_rels_path_idx" ON "project_pages_rels"("path");

-- CreateIndex
CREATE INDEX "project_pages_rels_project_tags_id_idx" ON "project_pages_rels"("project_tags_id");

-- CreateIndex
CREATE INDEX "project_pages_rels_projects_id_idx" ON "project_pages_rels"("projects_id");

-- CreateIndex
CREATE INDEX "project_tags_created_at_idx" ON "project_tags"("created_at");

-- CreateIndex
CREATE INDEX "project_tags_updated_at_idx" ON "project_tags"("updated_at");

-- CreateIndex
CREATE INDEX "projects_created_at_idx" ON "projects"("created_at");

-- CreateIndex
CREATE INDEX "projects_image_idx" ON "projects"("image_id");

-- CreateIndex
CREATE INDEX "projects_updated_at_idx" ON "projects"("updated_at");

-- CreateIndex
CREATE INDEX "projects_links_order_idx" ON "projects_links"("_order");

-- CreateIndex
CREATE INDEX "projects_links_parent_id_idx" ON "projects_links"("_parent_id");

-- CreateIndex
CREATE INDEX "projects_rels_order_idx" ON "projects_rels"("order");

-- CreateIndex
CREATE INDEX "projects_rels_parent_idx" ON "projects_rels"("parent_id");

-- CreateIndex
CREATE INDEX "projects_rels_path_idx" ON "projects_rels"("path");

-- CreateIndex
CREATE INDEX "projects_rels_project_tags_id_idx" ON "projects_rels"("project_tags_id");

-- CreateIndex
CREATE INDEX "projects_rels_skills_id_idx" ON "projects_rels"("skills_id");

-- CreateIndex
CREATE INDEX "skills_created_at_idx" ON "skills"("created_at");

-- CreateIndex
CREATE INDEX "skills_skill_icon_idx" ON "skills"("skill_icon_id");

-- CreateIndex
CREATE INDEX "skills_updated_at_idx" ON "skills"("updated_at");

-- CreateIndex
CREATE INDEX "skills_collection_created_at_idx" ON "skills_collection"("created_at");

-- CreateIndex
CREATE INDEX "skills_collection_updated_at_idx" ON "skills_collection"("updated_at");

-- CreateIndex
CREATE INDEX "skills_collection_rels_order_idx" ON "skills_collection_rels"("order");

-- CreateIndex
CREATE INDEX "skills_collection_rels_parent_idx" ON "skills_collection_rels"("parent_id");

-- CreateIndex
CREATE INDEX "skills_collection_rels_path_idx" ON "skills_collection_rels"("path");

-- CreateIndex
CREATE INDEX "skills_collection_rels_skills_id_idx" ON "skills_collection_rels"("skills_id");

-- CreateIndex
CREATE INDEX "social_links_created_at_idx" ON "social_links"("created_at");

-- CreateIndex
CREATE INDEX "social_links_updated_at_idx" ON "social_links"("updated_at");

-- CreateIndex
CREATE INDEX "testimonials_created_at_idx" ON "testimonials"("created_at");

-- CreateIndex
CREATE INDEX "testimonials_headshot_idx" ON "testimonials"("headshot_id");

-- CreateIndex
CREATE INDEX "testimonials_updated_at_idx" ON "testimonials"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "users"("created_at");

-- CreateIndex
CREATE INDEX "users_updated_at_idx" ON "users"("updated_at");

-- AddForeignKey
ALTER TABLE "jobs_blocks_image_block" ADD CONSTRAINT "jobs_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "jobs_blocks_image_block" ADD CONSTRAINT "jobs_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "jobs_blocks_rich_text_block" ADD CONSTRAINT "jobs_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "jobs_rels" ADD CONSTRAINT "jobs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "jobs_rels" ADD CONSTRAINT "jobs_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "navigation_menu" ADD CONSTRAINT "navigation_menu_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "navigation_menu_rels" ADD CONSTRAINT "navigation_menu_rels_nav_links_fk" FOREIGN KEY ("nav_links_id") REFERENCES "nav_links"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "navigation_menu_rels" ADD CONSTRAINT "navigation_menu_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "navigation_menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "navigation_menu_rels" ADD CONSTRAINT "navigation_menu_rels_social_links_fk" FOREIGN KEY ("social_links_id") REFERENCES "social_links"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_blocks_call_to_action" ADD CONSTRAINT "pages_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_blocks_card" ADD CONSTRAINT "pages_blocks_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_blocks_code_mockup_link" ADD CONSTRAINT "pages_blocks_code_mockup_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_blocks_code_mockup_section" ADD CONSTRAINT "pages_blocks_code_mockup_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_blocks_hero_section" ADD CONSTRAINT "pages_blocks_hero_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_blocks_image_block" ADD CONSTRAINT "pages_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_blocks_image_block" ADD CONSTRAINT "pages_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_blocks_in_view_basic" ADD CONSTRAINT "pages_blocks_in_view_basic_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_blocks_in_view_embed" ADD CONSTRAINT "pages_blocks_in_view_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_blocks_job_section_block" ADD CONSTRAINT "pages_blocks_job_section_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_blocks_rich_text_block" ADD CONSTRAINT "pages_blocks_rich_text_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_blocks_skills_section" ADD CONSTRAINT "pages_blocks_skills_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_blocks_skills_section" ADD CONSTRAINT "pages_blocks_skills_section_skills_collection_id_skills_collect" FOREIGN KEY ("skills_collection_id") REFERENCES "skills_collection"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_blocks_testimonial_section_block" ADD CONSTRAINT "pages_blocks_testimonial_section_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_blocks_two_column_grid" ADD CONSTRAINT "pages_blocks_two_column_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "testimonials"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_jobs_fk" FOREIGN KEY ("jobs_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_nav_links_fk" FOREIGN KEY ("nav_links_id") REFERENCES "nav_links"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_navigation_menu_fk" FOREIGN KEY ("navigation_menu_id") REFERENCES "navigation_menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_locked_documents"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_pages_fk" FOREIGN KEY ("project_pages_id") REFERENCES "project_pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_project_tags_fk" FOREIGN KEY ("project_tags_id") REFERENCES "project_tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_skills_collection_fk" FOREIGN KEY ("skills_collection_id") REFERENCES "skills_collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_social_links_fk" FOREIGN KEY ("social_links_id") REFERENCES "social_links"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "testimonials"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages" ADD CONSTRAINT "project_pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_blocks_call_to_action" ADD CONSTRAINT "project_pages_blocks_call_to_action_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "project_pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_blocks_hero_section" ADD CONSTRAINT "project_pages_blocks_hero_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "project_pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_blocks_hero_section_no_image" ADD CONSTRAINT "project_pages_blocks_hero_section_no_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "project_pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_blocks_image_block" ADD CONSTRAINT "project_pages_blocks_image_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_blocks_image_block" ADD CONSTRAINT "project_pages_blocks_image_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "project_pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_blocks_insights_section" ADD CONSTRAINT "project_pages_blocks_insights_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "project_pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_blocks_insights_section_insights" ADD CONSTRAINT "project_pages_blocks_insights_section_insights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "project_pages_blocks_insights_section"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_blocks_outcomes_section" ADD CONSTRAINT "project_pages_blocks_outcomes_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "project_pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_blocks_outcomes_section_outcomes" ADD CONSTRAINT "project_pages_blocks_outcomes_section_outcomes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "project_pages_blocks_outcomes_section"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_blocks_outcomes_section_outcomes_stats" ADD CONSTRAINT "stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "project_pages_blocks_outcomes_section_outcomes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_blocks_overview_section" ADD CONSTRAINT "project_pages_blocks_overview_section_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "project_pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_blocks_overview_section_role" ADD CONSTRAINT "project_pages_blocks_overview_section_role_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "project_pages_blocks_overview_section"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_blocks_problem_framing" ADD CONSTRAINT "project_pages_blocks_problem_framing_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "project_pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_blocks_problem_framing_problems" ADD CONSTRAINT "project_pages_blocks_problem_framing_problems_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "project_pages_blocks_problem_framing"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_blocks_project_grid_block" ADD CONSTRAINT "project_pages_blocks_project_grid_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "project_pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_blocks_user_research" ADD CONSTRAINT "project_pages_blocks_user_research_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "project_pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_blocks_user_research_research" ADD CONSTRAINT "project_pages_blocks_user_research_research_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "project_pages_blocks_user_research"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_rels" ADD CONSTRAINT "project_pages_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_rels" ADD CONSTRAINT "project_pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "project_pages"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_rels" ADD CONSTRAINT "project_pages_rels_project_tags_fk" FOREIGN KEY ("project_tags_id") REFERENCES "project_tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "project_pages_rels" ADD CONSTRAINT "project_pages_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projects_links" ADD CONSTRAINT "projects_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_project_tags_fk" FOREIGN KEY ("project_tags_id") REFERENCES "project_tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "skills" ADD CONSTRAINT "skills_skill_icon_id_media_id_fk" FOREIGN KEY ("skill_icon_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "skills_collection_rels" ADD CONSTRAINT "skills_collection_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "skills_collection"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "skills_collection_rels" ADD CONSTRAINT "skills_collection_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_headshot_id_media_id_fk" FOREIGN KEY ("headshot_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
