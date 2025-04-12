/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  blocks: {
    'hero-section': HeroSection;
    'rich-text-block': RichTextBlock;
    'code-mockup-section': CodeMockupSectionBlock;
    'in-view-basic': InViewBasic;
    'in-view-embed': InViewEmbedBlock;
  };
  collections: {
    users: User;
    media: Media;
    'navigation-menu': NavigationMenu;
    'nav-links': NavLink;
    'social-links': SocialLink;
    pages: Page;
    'skills-collection': SkillsCollection;
    skills: Skill;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    media: MediaSelect<false> | MediaSelect<true>;
    'navigation-menu': NavigationMenuSelect<false> | NavigationMenuSelect<true>;
    'nav-links': NavLinksSelect<false> | NavLinksSelect<true>;
    'social-links': SocialLinksSelect<false> | SocialLinksSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    'skills-collection': SkillsCollectionSelect<false> | SkillsCollectionSelect<true>;
    skills: SkillsSelect<false> | SkillsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: number;
  };
  globals: {};
  globalsSelect: {};
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hero-section".
 */
export interface HeroSection {
  sectionId: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  secondaryBlurb?: string | null;
  /**
   * Enable the inner container for this section
   */
  enableInnerContainer?: boolean | null;
  callToAction?:
    | {
        style?: ('primary' | 'secondary' | 'tertiary') | null;
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | {
                relationTo: 'pages';
                value: number | Page;
              }[]
            | null;
          url?: string | null;
          label: string;
        };
        arrow?: boolean | null;
        arrowDirection?: ('right' | 'down') | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'call-to-action';
      }[]
    | null;
  media: ImageBlock[];
  id?: string | null;
  blockName?: string | null;
  blockType: 'hero-section';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: number;
  /**
   * Title for the page
   */
  title: string;
  slug?: string | null;
  layout?:
    | (
        | {
            sectionId: string;
            title: string;
            subtitle?: string | null;
            description?: string | null;
            secondaryBlurb?: string | null;
            /**
             * Enable the inner container for this section
             */
            enableInnerContainer?: boolean | null;
            callToAction?:
              | {
                  style?: ('primary' | 'secondary' | 'tertiary') | null;
                  link: {
                    type?: ('reference' | 'custom') | null;
                    newTab?: boolean | null;
                    reference?:
                      | {
                          relationTo: 'pages';
                          value: number | Page;
                        }[]
                      | null;
                    url?: string | null;
                    label: string;
                  };
                  arrow?: boolean | null;
                  arrowDirection?: ('right' | 'down') | null;
                  id?: string | null;
                  blockName?: string | null;
                  blockType: 'call-to-action';
                }[]
              | null;
            media: ImageBlock[];
            id?: string | null;
            blockName?: string | null;
            blockType: 'hero-section';
          }
        | InViewBasic
        | SkillsSection
        | TwoColumnGridBlock
        | InViewEmbedBlock
        | CardBlock
      )[]
    | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    /**
     * Maximum upload file size: 12MB. Recommended file size for images is <500KB.
     */
    image?: (number | null) | Media;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ImageBlock".
 */
export interface ImageBlock {
  image: number | Media;
  /**
   * Add a gradient aura to the image
   */
  gradient?: boolean | null;
  gradientXFlip?: boolean | null;
  gradientYFlip?: boolean | null;
  /**
   * Set a specific width for the image, overriding the aspect ratio
   */
  forcedWidth?: number | null;
  /**
   * Set a specific height for the image, overriding the aspect ratio
   */
  forcedHeight?: number | null;
  gradientSelect?: ('Variant1' | 'Variant2' | 'Variant3' | 'Variant4') | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'image-block';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: number;
  alt: string;
  /**
   * Convert image to webp
   */
  convertWebp?: boolean | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "InViewBasic".
 */
export interface InViewBasic {
  title: string;
  description: string;
  /**
   * Hidden on y-axis (in pixels)
   */
  hiddenY?: number | null;
  hiddenBlur?: number | null;
  /**
   * Visible on y-axis (in pixels)
   */
  visibleY?: number | null;
  visibleBlur?: number | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'in-view-basic';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "SkillsSection".
 */
export interface SkillsSection {
  sectionId: string;
  pill?: string | null;
  heading: string;
  description?: string | null;
  callToAction?:
    | {
        style?: ('primary' | 'secondary' | 'tertiary') | null;
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | {
                relationTo: 'pages';
                value: number | Page;
              }[]
            | null;
          url?: string | null;
          label: string;
        };
        arrow?: boolean | null;
        arrowDirection?: ('right' | 'down') | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'call-to-action';
      }[]
    | null;
  skillsCollection: number | SkillsCollection;
  /**
   * Add a gradient aura to the image
   */
  gradient?: boolean | null;
  gradientSelect?: ('Variant1' | 'Variant2' | 'Variant3' | 'Variant4') | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'skills-section';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "skills-collection".
 */
export interface SkillsCollection {
  id: number;
  /**
   * Title for the skill collection
   */
  title: string;
  /**
   * Add skills to the collection
   */
  skills?: (number | Skill)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "skills".
 */
export interface Skill {
  id: number;
  title: string;
  skillIcon: number | Media;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TwoColumnGridBlock".
 */
export interface TwoColumnGridBlock {
  sectionId: string;
  vertAlignment?: ('top' | 'middle' | 'bottom') | null;
  column1?: (CodeMockupSectionBlock | RichTextBlock)[] | null;
  column2?: (CodeMockupSectionBlock | RichTextBlock)[] | null;
  /**
   * Reverses the order of the columns
   */
  reverseOrder?: boolean | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'two-column-grid';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CodeMockupSectionBlock".
 */
export interface CodeMockupSectionBlock {
  enableSection?: boolean | null;
  /**
   * This is used for developer jokes.
   */
  useRandomData?: boolean | null;
  code?: CodeMockupLinkBlock[] | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'code-mockup-section';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CodeMockupLinkBlock".
 */
export interface CodeMockupLinkBlock {
  prefix?: string | null;
  text: string;
  textColor: 'white' | 'black' | 'success' | 'warning';
  id?: string | null;
  blockName?: string | null;
  blockType: 'code-mockup-link';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "RichTextBlock".
 */
export interface RichTextBlock {
  content: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  content_html?: string | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'rich-text-block';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "InViewEmbedBlock".
 */
export interface InViewEmbedBlock {
  sectionId: string;
  /**
   * Hidden on y-axis (in pixels)
   */
  hiddenY?: number | null;
  hiddenBlur?: number | null;
  /**
   * Visible on y-axis (in pixels)
   */
  visibleY?: number | null;
  visibleBlur?: number | null;
  embedBlocks?: (CodeMockupSectionBlock | RichTextBlock | TwoColumnGridBlock | CardBlock)[] | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'in-view-embed';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CardBlock".
 */
export interface CardBlock {
  pill?: string | null;
  embedBlocks?: (CodeMockupSectionBlock | RichTextBlock | TwoColumnGridBlock)[] | null;
  id?: string | null;
  blockName?: string | null;
  blockType: 'card';
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: number;
  updatedAt: string;
  createdAt: string;
  enableAPIKey?: boolean | null;
  apiKey?: string | null;
  apiKeyIndex?: string | null;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "navigation-menu".
 */
export interface NavigationMenu {
  id: number;
  /**
   * title for the navigation menu (i.e. Main Menu)
   */
  title: string;
  logo?: (number | null) | Media;
  links: (number | NavLink)[];
  socialLinks?: (number | SocialLink)[] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "nav-links".
 */
export interface NavLink {
  id: number;
  label: string;
  link: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "social-links".
 */
export interface SocialLink {
  id: number;
  label: string;
  link: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: number;
  document?:
    | ({
        relationTo: 'users';
        value: number | User;
      } | null)
    | ({
        relationTo: 'media';
        value: number | Media;
      } | null)
    | ({
        relationTo: 'navigation-menu';
        value: number | NavigationMenu;
      } | null)
    | ({
        relationTo: 'nav-links';
        value: number | NavLink;
      } | null)
    | ({
        relationTo: 'social-links';
        value: number | SocialLink;
      } | null)
    | ({
        relationTo: 'pages';
        value: number | Page;
      } | null)
    | ({
        relationTo: 'skills-collection';
        value: number | SkillsCollection;
      } | null)
    | ({
        relationTo: 'skills';
        value: number | Skill;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: number;
  user: {
    relationTo: 'users';
    value: number | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: number;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  updatedAt?: T;
  createdAt?: T;
  enableAPIKey?: T;
  apiKey?: T;
  apiKeyIndex?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media_select".
 */
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  convertWebp?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "navigation-menu_select".
 */
export interface NavigationMenuSelect<T extends boolean = true> {
  title?: T;
  logo?: T;
  links?: T;
  socialLinks?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "nav-links_select".
 */
export interface NavLinksSelect<T extends boolean = true> {
  label?: T;
  link?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "social-links_select".
 */
export interface SocialLinksSelect<T extends boolean = true> {
  label?: T;
  link?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  slug?: T;
  layout?:
    | T
    | {
        'hero-section'?:
          | T
          | {
              sectionId?: T;
              title?: T;
              subtitle?: T;
              description?: T;
              secondaryBlurb?: T;
              enableInnerContainer?: T;
              callToAction?:
                | T
                | {
                    'call-to-action'?:
                      | T
                      | {
                          style?: T;
                          link?:
                            | T
                            | {
                                type?: T;
                                newTab?: T;
                                reference?: T;
                                url?: T;
                                label?: T;
                              };
                          arrow?: T;
                          arrowDirection?: T;
                          id?: T;
                          blockName?: T;
                        };
                  };
              media?:
                | T
                | {
                    'image-block'?: T | ImageBlockSelect<T>;
                  };
              id?: T;
              blockName?: T;
            };
        'in-view-basic'?: T | InViewBasicSelect<T>;
        'skills-section'?: T | SkillsSectionSelect<T>;
        'two-column-grid'?: T | TwoColumnGridBlockSelect<T>;
        'in-view-embed'?: T | InViewEmbedBlockSelect<T>;
        card?: T | CardBlockSelect<T>;
      };
  meta?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "ImageBlock_select".
 */
export interface ImageBlockSelect<T extends boolean = true> {
  image?: T;
  gradient?: T;
  gradientXFlip?: T;
  gradientYFlip?: T;
  forcedWidth?: T;
  forcedHeight?: T;
  gradientSelect?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "InViewBasic_select".
 */
export interface InViewBasicSelect<T extends boolean = true> {
  title?: T;
  description?: T;
  hiddenY?: T;
  hiddenBlur?: T;
  visibleY?: T;
  visibleBlur?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "SkillsSection_select".
 */
export interface SkillsSectionSelect<T extends boolean = true> {
  sectionId?: T;
  pill?: T;
  heading?: T;
  description?: T;
  callToAction?:
    | T
    | {
        'call-to-action'?:
          | T
          | {
              style?: T;
              link?:
                | T
                | {
                    type?: T;
                    newTab?: T;
                    reference?: T;
                    url?: T;
                    label?: T;
                  };
              arrow?: T;
              arrowDirection?: T;
              id?: T;
              blockName?: T;
            };
      };
  skillsCollection?: T;
  gradient?: T;
  gradientSelect?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "TwoColumnGridBlock_select".
 */
export interface TwoColumnGridBlockSelect<T extends boolean = true> {
  sectionId?: T;
  vertAlignment?: T;
  column1?:
    | T
    | {
        'code-mockup-section'?: T | CodeMockupSectionBlockSelect<T>;
        'rich-text-block'?: T | RichTextBlockSelect<T>;
      };
  column2?:
    | T
    | {
        'code-mockup-section'?: T | CodeMockupSectionBlockSelect<T>;
        'rich-text-block'?: T | RichTextBlockSelect<T>;
      };
  reverseOrder?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CodeMockupSectionBlock_select".
 */
export interface CodeMockupSectionBlockSelect<T extends boolean = true> {
  enableSection?: T;
  useRandomData?: T;
  code?:
    | T
    | {
        'code-mockup-link'?: T | CodeMockupLinkBlockSelect<T>;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CodeMockupLinkBlock_select".
 */
export interface CodeMockupLinkBlockSelect<T extends boolean = true> {
  prefix?: T;
  text?: T;
  textColor?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "RichTextBlock_select".
 */
export interface RichTextBlockSelect<T extends boolean = true> {
  content?: T;
  content_html?: T;
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "InViewEmbedBlock_select".
 */
export interface InViewEmbedBlockSelect<T extends boolean = true> {
  sectionId?: T;
  hiddenY?: T;
  hiddenBlur?: T;
  visibleY?: T;
  visibleBlur?: T;
  embedBlocks?:
    | T
    | {
        'code-mockup-section'?: T | CodeMockupSectionBlockSelect<T>;
        'rich-text-block'?: T | RichTextBlockSelect<T>;
        'two-column-grid'?: T | TwoColumnGridBlockSelect<T>;
        card?: T | CardBlockSelect<T>;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "CardBlock_select".
 */
export interface CardBlockSelect<T extends boolean = true> {
  pill?: T;
  embedBlocks?:
    | T
    | {
        'code-mockup-section'?: T | CodeMockupSectionBlockSelect<T>;
        'rich-text-block'?: T | RichTextBlockSelect<T>;
        'two-column-grid'?: T | TwoColumnGridBlockSelect<T>;
      };
  id?: T;
  blockName?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "skills-collection_select".
 */
export interface SkillsCollectionSelect<T extends boolean = true> {
  title?: T;
  skills?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "skills_select".
 */
export interface SkillsSelect<T extends boolean = true> {
  title?: T;
  skillIcon?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}