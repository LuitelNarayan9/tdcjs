# Tumin Dhanbari Chandra Jyoti Sanstha - Development Tasks

## Project Overview

A comprehensive full-stack web application for a village community organization using Next.js 16, React 19, Tailwind CSS v4, Prisma 6, PostgreSQL, and Bun package manager.

---

## Phase 1: Project Foundation & Setup

### 1.1 Initial Project Configuration

- [x] Initialize Next.js 16 project with Bun
- [x] Configure TypeScript strict mode
- [x] Set up Tailwind CSS v4
- [x] Configure ESLint and Prettier
- [x] Set up folder structure
- [x] Configure `next.config.ts` for Next.js 16 features
- [x] Configure Turbopack settings
- [x] Set up environment variables (`.env.local`)

### 1.2 Database Setup

- [ ] Set up PostgreSQL database connection
- [ ] Configure Prisma ORM (v6+)
  - [ ] Create Prisma client singleton (`lib/db/index.ts`)
  - [ ] Add database connection pooling
- [ ] Create Prisma schema from `database.md`
  - [ ] User Management models (User, Account, Session, VerificationToken, UserPreferences)
  - [ ] Family Tree models (FamilyNode)
  - [ ] Forum models (ForumCategory, ForumThread, ForumPost)
  - [ ] Blog models (BlogCategory, BlogPost, BlogTag, BlogComment)
  - [ ] News models (NewsCategory, News)
  - [ ] Executive Members model
  - [ ] Contact Inquiries model
  - [ ] Reactions model
  - [ ] Notifications model
  - [ ] Reports model
  - [ ] Admin Actions model
  - [ ] Activity Log model
  - [ ] Analytics models (PageView, SiteMetrics)
  - [ ] Search Index model
  - [ ] Site Settings model
  - [ ] Email Template model
  - [ ] Upload model
  - [ ] Cache Entry model
  - [ ] Data Backup model
- [ ] Run initial migration (`bunx prisma migrate dev`)
- [ ] Create database seed script (`prisma/seed.ts`)
  - [ ] Seed admin user
  - [ ] Seed forum categories
  - [ ] Seed blog categories
  - [ ] Seed news categories
  - [ ] Seed sample executive members

### 1.3 Core Utilities Setup

- [ ] Create utility functions (`lib/utils/`)
  - [ ] `cn.ts` - Class name merger (clsx + tailwind-merge)
  - [ ] `format-date.ts` - Date formatting
  - [ ] `format-currency.ts` - Currency formatting
  - [ ] `slugify.ts` - URL slug generator
  - [ ] `truncate.ts` - Text truncation
  - [ ] `sanitize.ts` - HTML sanitization (DOMPurify)
  - [ ] `constants.ts` - App constants
- [ ] Create validation schemas (`validations/`)
  - [ ] `common.ts` - Shared schemas
  - [ ] `auth.ts` - Authentication schemas
  - [ ] `user.ts` - User schemas

### 1.4 TypeScript Types Setup

- [ ] Create type definitions (`types/`)
  - [ ] `index.ts` - Export all types
  - [ ] `auth.ts` - Auth types
  - [ ] `user.ts` - User types
  - [ ] `api.ts` - API response types
  - [ ] `next-auth.d.ts` - NextAuth augmentation

---

## Phase 2: Authentication System

### 2.1 NextAuth.js v5 Configuration

- [ ] Install NextAuth.js v5 (`bun add next-auth@beta`)
- [ ] Configure auth options (`lib/auth/`)
  - [ ] Create `config.ts` - Main NextAuth config
  - [ ] Create `options.ts` - Auth options
  - [ ] Create `callbacks.ts` - Session/JWT callbacks
  - [ ] Create `providers.ts` - Credentials provider
- [ ] Create auth API route (`app/api/auth/[...nextauth]/route.ts`)
- [ ] Set up session provider (`components/providers/auth-provider.tsx`)

### 2.2 Password Management

- [ ] Create password utilities (`lib/auth/password.ts`)
  - [ ] Hash password function (bcrypt, 12 salt rounds)
  - [ ] Verify password function
  - [ ] Password strength validator
- [ ] Create token utilities (`lib/auth/tokens.ts`)
  - [ ] Generate verification token
  - [ ] Generate password reset token
  - [ ] Verify tokens

### 2.3 Registration Flow

- [ ] Create registration validation schema (`validations/auth.ts`)
- [ ] Create register server action (`actions/auth/register.ts`)
- [ ] Create registration page (`app/[locale]/(auth)/register/page.tsx`)
- [ ] Create registration form component (`app/[locale]/(auth)/register/_components/register-form.tsx`)
  - [ ] Full name input
  - [ ] Email input
  - [ ] Phone number input
  - [ ] Password input with strength indicator
  - [ ] Confirm password input
  - [ ] Family association dropdown
  - [ ] Village address input
  - [ ] Profile picture upload (optional)
  - [ ] Date of birth picker (optional)
  - [ ] Form validation with Zod
  - [ ] Submit button with loading state

### 2.4 Login Flow

- [ ] Create login validation schema
- [ ] Create login server action (`actions/auth/login.ts`)
- [ ] Create login page (`app/[locale]/(auth)/login/page.tsx`)
- [ ] Create login form component (`app/[locale]/(auth)/login/_components/login-form.tsx`)
  - [ ] Email input
  - [ ] Password input
  - [ ] Remember me checkbox
  - [ ] Forgot password link
  - [ ] Form validation
  - [ ] Error handling

### 2.5 Email Verification

- [ ] Set up email service (`lib/email/`)
  - [ ] Configure Resend/SendGrid client (`client.ts`)
  - [ ] Create email templates (`templates/`)
    - [ ] `verify-email.tsx`
  - [ ] Create send function (`send.ts`)
- [ ] Create verify email page (`app/[locale]/(auth)/verify-email/page.tsx`)
- [ ] Create verify email server action (`actions/auth/verify-email.ts`)

### 2.6 Password Reset Flow

- [ ] Create forgot password page (`app/[locale]/(auth)/forgot-password/page.tsx`)
- [ ] Create forgot password server action (`actions/auth/forgot-password.ts`)
- [ ] Create reset password email template (`lib/email/templates/reset-password.tsx`)
- [ ] Create reset password page (`app/[locale]/(auth)/reset-password/page.tsx`)
- [ ] Create reset password server action (`actions/auth/reset-password.ts`)

### 2.7 Auth Layout & Guards

- [ ] Create auth layout (`app/[locale]/(auth)/layout.tsx`)
  - [ ] Redirect authenticated users
  - [ ] Clean auth-focused design
- [ ] Create auth guard component (`components/features/auth/auth-guard.tsx`)
- [ ] Create role guard component (`components/features/auth/role-guard.tsx`)
- [ ] Create permissions helper (`lib/auth/permissions.ts`)

---

## Phase 3: Core UI Components

### 3.1 Design System Setup

- [ ] Configure Tailwind CSS theme
  - [ ] Color palette (Sikkim-inspired: blues, greens, earth tones)
  - [ ] Typography (Inter, Poppins, Outfit fonts)
  - [ ] Spacing and sizing
  - [ ] Dark mode support
- [ ] Create global styles (`styles/globals.css`)
- [ ] Create theme CSS variables (`styles/themes.css`)
- [ ] Create animations (`styles/animations.css`)
- [ ] Create fonts CSS (`styles/fonts.css`)

### 3.2 Atomic UI Components (`components/ui/`)

- [ ] `button.tsx` - Button with variants
- [ ] `input.tsx` - Form input
- [ ] `textarea.tsx` - Textarea
- [ ] `select.tsx` - Select dropdown
- [ ] `checkbox.tsx` - Checkbox
- [ ] `switch.tsx` - Toggle switch
- [ ] `card.tsx` - Card container
- [ ] `badge.tsx` - Status badge
- [ ] `avatar.tsx` - User avatar
- [ ] `modal.tsx` - Modal dialog
- [ ] `dialog.tsx` - Dialog component
- [ ] `dropdown.tsx` - Dropdown menu
- [ ] `tabs.tsx` - Tab navigation
- [ ] `accordion.tsx` - Accordion
- [ ] `tooltip.tsx` - Tooltip
- [ ] `toast.tsx` - Toast notifications
- [ ] `skeleton.tsx` - Loading skeleton
- [ ] `spinner.tsx` - Loading spinner
- [ ] `progress.tsx` - Progress bar
- [ ] `pagination.tsx` - Pagination
- [ ] `breadcrumb.tsx` - Breadcrumb navigation
- [ ] `table.tsx` - Data table

### 3.3 Layout Components (`components/layouts/`)

- [ ] Header (`header/`)
  - [ ] `header.tsx` - Main header
  - [ ] `nav-menu.tsx` - Navigation menu
  - [ ] `mobile-menu.tsx` - Mobile hamburger menu
  - [ ] `user-menu.tsx` - User dropdown
  - [ ] `search-bar.tsx` - Global search
  - [ ] `notification-bell.tsx` - Notifications
  - [ ] `language-switcher.tsx` - Language toggle
- [ ] Footer (`footer/`)
  - [ ] `footer.tsx` - Main footer
  - [ ] `footer-column.tsx` - Footer sections
  - [ ] `social-links.tsx` - Social media links
- [ ] Sidebar (`sidebar/`)
  - [ ] `sidebar.tsx` - Sidebar container
  - [ ] `sidebar-nav.tsx` - Sidebar navigation
- [ ] `container.tsx` - Container wrapper

### 3.4 Form Components (`components/forms/`)

- [ ] `form-field.tsx` - Form field wrapper
- [ ] `form-error.tsx` - Error message
- [ ] `form-label.tsx` - Form label
- [ ] `image-upload.tsx` - Single image upload
- [ ] `file-upload.tsx` - File upload
- [ ] `rich-text-editor.tsx` - TipTap/Lexical editor
- [ ] `date-picker.tsx` - Date picker
- [ ] `tag-input.tsx` - Tag input

### 3.5 Shared Components (`components/shared/`)

- [ ] `empty-state.tsx` - Empty state display
- [ ] `error-message.tsx` - Error display
- [ ] `loading-spinner.tsx` - Loading indicator
- [ ] `loading-skeleton.tsx` - Skeleton loader
- [ ] `image-with-fallback.tsx` - Image with fallback
- [ ] `scroll-to-top.tsx` - Scroll to top button
- [ ] `seo-head.tsx` - SEO meta tags

### 3.6 Context Providers (`components/providers/`)

- [ ] `theme-provider.tsx` - Theme context
- [ ] `toast-provider.tsx` - Toast notifications
- [ ] `modal-provider.tsx` - Modal manager
- [ ] `query-provider.tsx` - React Query provider

---

## Phase 4: Landing Page (Public)

### 4.1 Landing Page Structure

- [ ] Create public layout (`app/[locale]/(public)/layout.tsx`)
- [ ] Create landing page (`app/[locale]/(public)/page.tsx`)
- [ ] Create loading state (`app/[locale]/(public)/loading.tsx`)

### 4.2 Landing Page Sections (`components/features/landing/`)

- [ ] `hero-section.tsx`
  - [ ] Full-width banner with village imagery
  - [ ] Animated text overlay
  - [ ] CTA buttons ("Explore Our Community", "Join the Forum")
  - [ ] Parallax scrolling effect
- [ ] `about-section.tsx`
  - [ ] Village introduction text
  - [ ] Statistics cards (families, population, established year, members)
  - [ ] Image gallery carousel
- [ ] `features-section.tsx`
  - [ ] Grid layout showcasing features
  - [ ] Interactive hover effects
  - [ ] Links to Forum, Family Tree, News, Heritage
- [ ] `stats-section.tsx`
  - [ ] Animated counter stats
- [ ] `news-highlights.tsx`
  - [ ] Latest 3-4 news with thumbnails
  - [ ] "View All News" button
  - [ ] Date and category tags
- [ ] `events-preview.tsx`
  - [ ] Upcoming events calendar preview
  - [ ] Important announcements banner
- [ ] `testimonials.tsx`
  - [ ] Community member quotes slider
  - [ ] Profile pictures
- [ ] `cta-section.tsx`
  - [ ] Call to action for joining

---

## Phase 5: News Section (Public)

### 5.1 News Database Queries

- [ ] Create news queries (`lib/db/queries/news.ts`)
  - [ ] Get all news (paginated)
  - [ ] Get news by slug
  - [ ] Get featured news
  - [ ] Get news by category
- [ ] Create news mutations (`lib/db/mutations/news.ts`)
  - [ ] Create news
  - [ ] Update news
  - [ ] Delete news
  - [ ] Increment views

### 5.2 News Validation

- [ ] Create news validation schema (`validations/news.ts`)
- [ ] Create news types (`types/news.ts`)

### 5.3 News Pages

- [ ] Create news list page (`app/[locale]/(public)/news/page.tsx`)
- [ ] Create news loading state (`app/[locale]/(public)/news/loading.tsx`)
- [ ] Create news detail page (`app/[locale]/(public)/news/[slug]/page.tsx`)
- [ ] Create news detail loading (`app/[locale]/(public)/news/[slug]/loading.tsx`)

### 5.4 News Components (`app/[locale]/(public)/news/_components/`)

- [ ] `news-card.tsx` - News card display
- [ ] `news-grid.tsx` - News grid layout
- [ ] `news-filters.tsx` - Category filters
- [ ] `featured-news.tsx` - Featured news section

### 5.5 News API Routes

- [ ] Create news API (`app/api/news/route.ts`) - GET all
- [ ] Create news detail API (`app/api/news/[newsId]/route.ts`) - GET, PUT, DELETE
- [ ] Create news views API (`app/api/news/[newsId]/views/route.ts`) - Track views

---

## Phase 6: Contact Us Page (Public)

### 6.1 Contact Form Setup

- [ ] Create contact validation schema (`validations/contact.ts`)
- [ ] Create contact queries (`lib/db/queries/contact.ts`)
- [ ] Create contact mutations (`lib/db/mutations/contact.ts`)
- [ ] Create contact types (`types/contact.ts`)

### 6.2 Contact Page

- [ ] Create contact page (`app/[locale]/(public)/contact/page.tsx`)
- [ ] Create contact server action (`actions/contact/send-inquiry.ts`)

### 6.3 Contact Components (`app/[locale]/(public)/contact/_components/`)

- [ ] `contact-form.tsx`
  - [ ] Full name input
  - [ ] Email input
  - [ ] Phone number input (optional)
  - [ ] Subject dropdown
  - [ ] Message textarea
  - [ ] Attachment upload (optional)
  - [ ] CAPTCHA integration
  - [ ] Submit with loading state
- [ ] `contact-info.tsx` - Address, phone, email display
- [ ] `map-embed.tsx` - Google Maps embed

### 6.4 Contact API

- [ ] Create contact API (`app/api/contact/route.ts`) - POST submissions
- [ ] Create contact detail API (`app/api/contact/[inquiryId]/route.ts`)

---

## Phase 7: Protected Routes Layout

### 7.1 Protected Layout Setup

- [ ] Create protected layout (`app/[locale]/(protected)/layout.tsx`)
  - [ ] Session validation
  - [ ] Redirect unauthenticated users
  - [ ] Header with user menu
  - [ ] Sidebar navigation (optional)
- [ ] Create loading state (`app/[locale]/(protected)/loading.tsx`)

### 7.2 User Dashboard

- [ ] Create dashboard page (`app/[locale]/(protected)/dashboard/page.tsx`)
- [ ] Create dashboard loading (`app/[locale]/(protected)/dashboard/loading.tsx`)
- [ ] Create dashboard components (`app/[locale]/(protected)/dashboard/_components/`)
  - [ ] `stats-overview.tsx` - User stats
  - [ ] `recent-activity.tsx` - Activity feed
  - [ ] `quick-actions.tsx` - Quick action buttons
  - [ ] `upcoming-events.tsx` - Events widget
  - [ ] `notifications-widget.tsx` - Notifications

---

## Phase 8: User Profile System

### 8.1 Profile Database Operations

- [ ] Create user queries (`lib/db/queries/users.ts`)
  - [ ] Get user by ID
  - [ ] Get user profile
  - [ ] Get user activity
- [ ] Create user mutations (`lib/db/mutations/users.ts`)
  - [ ] Update profile
  - [ ] Update avatar
  - [ ] Update password
  - [ ] Update preferences

### 8.2 Profile Validation

- [ ] Create user validation schema (`validations/user.ts`)
- [ ] Create profile types (`types/user.ts`)

### 8.3 Profile Pages

- [ ] Create profile page (`app/[locale]/(protected)/profile/page.tsx`)
- [ ] Create profile loading (`app/[locale]/(protected)/profile/loading.tsx`)
- [ ] Create edit profile page (`app/[locale]/(protected)/profile/edit/page.tsx`)
- [ ] Create settings page (`app/[locale]/(protected)/profile/settings/page.tsx`)

### 8.4 Profile Server Actions

- [ ] `actions/users/update-profile.ts`
- [ ] `actions/users/update-avatar.ts`
- [ ] `actions/users/update-password.ts`
- [ ] `actions/users/update-preferences.ts`

### 8.5 Profile Components (`app/[locale]/(protected)/profile/_components/`)

- [ ] `profile-header.tsx` - Profile header with avatar
- [ ] `profile-stats.tsx` - Stats display
- [ ] `activity-feed.tsx` - Activity list
- [ ] `edit-profile-form.tsx` - Edit form
- [ ] `settings-form.tsx` - Settings form

### 8.6 Profile API Routes

- [ ] Create users API (`app/api/users/route.ts`) - GET all (admin)
- [ ] Create user detail API (`app/api/users/[userId]/route.ts`)
- [ ] Create profile API (`app/api/users/profile/route.ts`)

---

## Phase 9: Forum System

### 9.1 Forum Database Operations

- [ ] Create forum queries (`lib/db/queries/forum.ts`)
  - [ ] Get all categories
  - [ ] Get category by slug
  - [ ] Get threads (paginated, filtered)
  - [ ] Get thread by slug
  - [ ] Get posts by thread
  - [ ] Get thread stats
- [ ] Create forum mutations (`lib/db/mutations/forum.ts`)
  - [ ] Create thread
  - [ ] Update thread
  - [ ] Delete thread
  - [ ] Create post
  - [ ] Update post
  - [ ] Delete post
  - [ ] Pin/unpin thread
  - [ ] Lock/unlock thread
  - [ ] Increment thread views

### 9.2 Forum Validation

- [ ] Create forum validation schema (`validations/forum.ts`)
- [ ] Create forum types (`types/forum.ts`)

### 9.3 Forum Pages

- [ ] Create forum home page (`app/[locale]/(protected)/forum/page.tsx`)
- [ ] Create forum loading (`app/[locale]/(protected)/forum/loading.tsx`)
- [ ] Create category page (`app/[locale]/(protected)/forum/[categorySlug]/page.tsx`)
- [ ] Create category loading (`app/[locale]/(protected)/forum/[categorySlug]/loading.tsx`)
- [ ] Create thread page (`app/[locale]/(protected)/forum/thread/[threadSlug]/page.tsx`)
- [ ] Create thread loading (`app/[locale]/(protected)/forum/thread/[threadSlug]/loading.tsx`)
- [ ] Create new thread page (`app/[locale]/(protected)/forum/thread/new/page.tsx`)

### 9.4 Forum Server Actions

- [ ] `actions/forum/create-thread.ts`
- [ ] `actions/forum/update-thread.ts`
- [ ] `actions/forum/delete-thread.ts`
- [ ] `actions/forum/create-post.ts`
- [ ] `actions/forum/update-post.ts`
- [ ] `actions/forum/delete-post.ts`
- [ ] `actions/forum/pin-thread.ts`

### 9.5 Forum Components (`app/[locale]/(protected)/forum/_components/`)

- [ ] `category-card.tsx` - Category display card
- [ ] `thread-card.tsx` - Thread list item
- [ ] `thread-list.tsx` - Thread list container
- [ ] `post-card.tsx` - Post display
- [ ] `post-editor.tsx` - Rich text post editor
- [ ] `thread-filters.tsx` - Sort/filter controls
- [ ] `forum-search.tsx` - Forum search
- [ ] `thread-actions.tsx` - Thread action buttons

### 9.6 Forum Feature Components (`components/features/forum/`)

- [ ] `thread-composer.tsx` - Create thread form
- [ ] `post-composer.tsx` - Create post form
- [ ] `thread-actions.tsx` - Thread actions
- [ ] `post-actions.tsx` - Post actions
- [ ] `mention-autocomplete.tsx` - @mentions

### 9.7 Forum API Routes

- [ ] Create categories API (`app/api/forum/categories/route.ts`)
- [ ] Create category detail API (`app/api/forum/categories/[categoryId]/route.ts`)
- [ ] Create threads API (`app/api/forum/threads/route.ts`)
- [ ] Create thread detail API (`app/api/forum/threads/[threadId]/route.ts`)
- [ ] Create thread posts API (`app/api/forum/threads/[threadId]/posts/route.ts`)
- [ ] Create thread views API (`app/api/forum/threads/[threadId]/views/route.ts`)
- [ ] Create post detail API (`app/api/forum/posts/[postId]/route.ts`)

---

## Phase 10: Blog System

### 10.1 Blog Database Operations

- [ ] Create blog queries (`lib/db/queries/blogs.ts`)
  - [ ] Get all blogs (paginated, filtered)
  - [ ] Get blog by slug
  - [ ] Get blogs by category
  - [ ] Get featured blogs
  - [ ] Get related blogs
  - [ ] Get blog comments
- [ ] Create blog mutations (`lib/db/mutations/blogs.ts`)
  - [ ] Create blog
  - [ ] Update blog
  - [ ] Delete blog
  - [ ] Publish/unpublish blog
  - [ ] Create comment
  - [ ] Delete comment

### 10.2 Blog Validation

- [ ] Create blog validation schema (`validations/blog.ts`)
- [ ] Create comment validation schema (`validations/comment.ts`)
- [ ] Create blog types (`types/blog.ts`)

### 10.3 Blog Pages

- [ ] Create blog list page (`app/[locale]/(protected)/blogs/page.tsx`)
- [ ] Create blog loading (`app/[locale]/(protected)/blogs/loading.tsx`)
- [ ] Create blog detail page (`app/[locale]/(protected)/blogs/[slug]/page.tsx`)
- [ ] Create blog detail loading (`app/[locale]/(protected)/blogs/[slug]/loading.tsx`)
- [ ] Create blog category page (`app/[locale]/(protected)/blogs/category/[categorySlug]/page.tsx`)

### 10.4 Blog Server Actions

- [ ] `actions/blogs/add-comment.ts`

### 10.5 Blog Components (`app/[locale]/(protected)/blogs/_components/`)

- [ ] `blog-card.tsx` - Blog preview card
- [ ] `blog-grid.tsx` - Grid view
- [ ] `blog-list.tsx` - List view
- [ ] `blog-filters.tsx` - Filters and search
- [ ] `blog-sidebar.tsx` - Sidebar with categories
- [ ] `comment-section.tsx` - Comments container
- [ ] `comment-item.tsx` - Single comment
- [ ] `comment-form.tsx` - Add comment form
- [ ] `related-posts.tsx` - Related posts widget

### 10.6 Blog Feature Components (`components/features/blog/`)

- [ ] `blog-card-grid.tsx` - Grid card
- [ ] `blog-card-list.tsx` - List card
- [ ] `blog-header.tsx` - Post header
- [ ] `blog-content.tsx` - Post content
- [ ] `blog-meta.tsx` - Metadata display
- [ ] `share-buttons.tsx` - Social sharing
- [ ] `reading-progress.tsx` - Reading progress bar

### 10.7 Blog API Routes

- [ ] Create blogs API (`app/api/blogs/route.ts`)
- [ ] Create blog detail API (`app/api/blogs/[blogId]/route.ts`)
- [ ] Create blog comments API (`app/api/blogs/[blogId]/comments/route.ts`)
- [ ] Create blog categories API (`app/api/blogs/categories/route.ts`)
- [ ] Create blog tags API (`app/api/blogs/tags/route.ts`)

---

## Phase 11: Family Tree System

### 11.1 Family Tree Database Operations

- [ ] Create family tree queries (`lib/db/queries/family-tree.ts`)
  - [ ] Get all nodes
  - [ ] Get node by ID
  - [ ] Get node with relations
  - [ ] Search nodes
  - [ ] Get tree for user
- [ ] Create family tree mutations (`lib/db/mutations/family-tree.ts`)
  - [ ] Create node
  - [ ] Update node
  - [ ] Delete node
  - [ ] Add relationship
  - [ ] Remove relationship

### 11.2 Family Tree Validation

- [ ] Create family tree validation schema (`validations/family-tree.ts`)
- [ ] Create family tree types (`types/family-tree.ts`)

### 11.3 Family Tree Pages

- [ ] Create family tree page (`app/[locale]/(protected)/family-tree/page.tsx`)
- [ ] Create family tree loading (`app/[locale]/(protected)/family-tree/loading.tsx`)
- [ ] Create edit node page (`app/[locale]/(protected)/family-tree/edit/page.tsx`)

### 11.4 Family Tree Server Actions

- [ ] `actions/family-tree/create-node.ts`
- [ ] `actions/family-tree/update-node.ts`
- [ ] `actions/family-tree/delete-node.ts`
- [ ] `actions/family-tree/add-relationship.ts`
- [ ] `actions/family-tree/remove-relationship.ts`

### 11.5 Family Tree Components (`app/[locale]/(protected)/family-tree/_components/`)

- [ ] `tree-canvas.tsx` - Main canvas
- [ ] `d3-tree-visualization.tsx` - D3.js tree
- [ ] `tree-controls.tsx` - View controls
- [ ] `tree-zoom-controls.tsx` - Zoom in/out/pan
- [ ] `node-card.tsx` - Node display
- [ ] `node-detail-modal.tsx` - Node details modal
- [ ] `edit-node-form.tsx` - Edit node form
- [ ] `search-tree.tsx` - Search functionality
- [ ] `tree-legend.tsx` - Tree legend
- [ ] `tree-list-view.tsx` - Alternative list view

### 11.6 Family Tree Feature Components (`components/features/family-tree/`)

- [ ] `d3-tree-visualization.tsx` - D3 integration
- [ ] `tree-zoom-controls.tsx` - Zoom controls
- [ ] `tree-node.tsx` - Node component
- [ ] `tree-tooltip.tsx` - Tooltip
- [ ] `relationship-connector.tsx` - Connectors

### 11.7 Family Tree API Routes

- [ ] Create family tree API (`app/api/family-tree/route.ts`)
- [ ] Create nodes API (`app/api/family-tree/nodes/route.ts`)
- [ ] Create node detail API (`app/api/family-tree/nodes/[nodeId]/route.ts`)
- [ ] Create search API (`app/api/family-tree/search/route.ts`)

---

## Phase 12: About Sanstha (Protected)

### 12.1 Executive Members Database Operations

- [ ] Create executive members queries (`lib/db/queries/executive-members.ts`)
- [ ] Create executive members mutations (`lib/db/mutations/executive-members.ts`)

### 12.2 Executive Members Validation

- [ ] Create validation schema (`validations/executive-member.ts`)
- [ ] Create types (`types/executive-member.ts`)

### 12.3 About Sanstha Page

- [ ] Create about sanstha page (`app/[locale]/(protected)/about-sanstha/page.tsx`)

### 12.4 About Sanstha Components (`app/[locale]/(protected)/about-sanstha/_components/`)

- [ ] `history-section.tsx` - Sanstha history
- [ ] `mission-vision.tsx` - Mission & vision
- [ ] `executive-members.tsx` - Members grid
- [ ] `member-card.tsx` - Individual member card
- [ ] `achievements.tsx` - Achievements list
- [ ] `documents-section.tsx` - Documents download

### 12.5 Executive Members API

- [ ] Create executive members API (`app/api/executive-members/route.ts`)
- [ ] Create member detail API (`app/api/executive-members/[memberId]/route.ts`)

---

## Phase 13: Reactions & Notifications System

### 13.1 Reactions System

- [ ] Create reactions queries (`lib/db/queries/reactions.ts`)
- [ ] Create reactions mutations (`lib/db/mutations/reactions.ts`)
- [ ] Create reactions validation (`validations/reaction.ts`)
- [ ] Create reactions types (`types/reaction.ts`)
- [ ] Create reactions server actions
  - [ ] `actions/reactions/add-reaction.ts`
  - [ ] `actions/reactions/remove-reaction.ts`
- [ ] Create reactions API (`app/api/reactions/route.ts`)

### 13.2 Notifications System

- [ ] Create notifications queries (`lib/db/queries/notifications.ts`)
- [ ] Create notifications mutations (`lib/db/mutations/notifications.ts`)
- [ ] Create notifications validation (`validations/notification.ts`)
- [ ] Create notifications types (`types/notification.ts`)
- [ ] Create notifications server actions
  - [ ] `actions/notifications/mark-as-read.ts`
  - [ ] `actions/notifications/mark-all-as-read.ts`
- [ ] Create notifications components (`components/features/notifications/`)
  - [ ] `notification-bell.tsx`
  - [ ] `notification-list.tsx`
  - [ ] `notification-item.tsx`
- [ ] Create notifications API (`app/api/notifications/route.ts`)
- [ ] Create notifications detail API (`app/api/notifications/[notificationId]/route.ts`)

---

## Phase 14: Reports & Moderation System

### 14.1 Reports Database

- [ ] Create reports queries (`lib/db/queries/reports.ts`)
- [ ] Create reports mutations (`lib/db/mutations/reports.ts`)
- [ ] Create reports validation (`validations/report.ts`)
- [ ] Create reports types (`types/report.ts`)

### 14.2 Reports Server Actions

- [ ] `actions/reports/create-report.ts`
- [ ] `actions/reports/resolve-report.ts`

### 14.3 Reports API

- [ ] Create reports API (`app/api/reports/route.ts`)
- [ ] Create report detail API (`app/api/reports/[reportId]/route.ts`)

---

## Phase 15: Admin Dashboard

### 15.1 Admin Layout

- [ ] Create admin layout (`app/[locale]/(admin)/layout.tsx`)
  - [ ] Admin role check
  - [ ] Admin sidebar
  - [ ] Admin header

### 15.2 Admin Dashboard Page

- [ ] Create admin dashboard (`app/[locale]/(admin)/admin/page.tsx`)
- [ ] Create admin loading (`app/[locale]/(admin)/admin/loading.tsx`)
- [ ] Create admin components (`app/[locale]/(admin)/admin/_components/`)
  - [ ] `admin-sidebar.tsx`
  - [ ] `admin-header.tsx`
  - [ ] `stats-widget.tsx`
  - [ ] `quick-actions.tsx`
  - [ ] `recent-activities.tsx`

### 15.3 Admin User Management

- [ ] Create users page (`app/[locale]/(admin)/admin/users/page.tsx`)
- [ ] Create user detail page (`app/[locale]/(admin)/admin/users/[userId]/page.tsx`)
- [ ] Create user components (`app/[locale]/(admin)/admin/users/_components/`)
  - [ ] `user-table.tsx`
  - [ ] `user-filters.tsx`
  - [ ] `user-actions.tsx`
  - [ ] `bulk-actions.tsx`
- [ ] Create user management server actions
  - [ ] `actions/admin/approve-user.ts`
  - [ ] `actions/admin/suspend-user.ts`
  - [ ] `actions/admin/delete-content.ts`

### 15.4 Admin Forum Management

- [ ] Create forum admin page (`app/[locale]/(admin)/admin/forum/page.tsx`)
- [ ] Create categories management (`app/[locale]/(admin)/admin/forum/categories/page.tsx`)
- [ ] Create reported content page (`app/[locale]/(admin)/admin/forum/reported/page.tsx`)
- [ ] Create forum admin components
  - [ ] `moderation-dashboard.tsx`
  - [ ] `category-manager.tsx`
  - [ ] `report-queue.tsx`
  - [ ] `report-card.tsx`

### 15.5 Admin Blog Management

- [ ] Create blogs admin page (`app/[locale]/(admin)/admin/blogs/page.tsx`)
- [ ] Create new blog page (`app/[locale]/(admin)/admin/blogs/new/page.tsx`)
- [ ] Create edit blog page (`app/[locale]/(admin)/admin/blogs/edit/[blogId]/page.tsx`)
- [ ] Create categories page (`app/[locale]/(admin)/admin/blogs/categories/page.tsx`)
- [ ] Create blog admin components
  - [ ] `blog-editor.tsx`
  - [ ] `blog-list-admin.tsx`
  - [ ] `category-manager.tsx`
  - [ ] `media-library.tsx`
- [ ] Create blog server actions
  - [ ] `actions/blogs/create-blog.ts`
  - [ ] `actions/blogs/update-blog.ts`
  - [ ] `actions/blogs/delete-blog.ts`
  - [ ] `actions/blogs/publish-blog.ts`

### 15.6 Admin News Management

- [ ] Create news admin page (`app/[locale]/(admin)/admin/news/page.tsx`)
- [ ] Create new news page (`app/[locale]/(admin)/admin/news/new/page.tsx`)
- [ ] Create edit news page (`app/[locale]/(admin)/admin/news/edit/[newsId]/page.tsx`)
- [ ] Create news admin components
  - [ ] `news-editor.tsx`
  - [ ] `news-list-admin.tsx`
  - [ ] `news-scheduler.tsx`
- [ ] Create news server actions
  - [ ] `actions/news/create-news.ts`
  - [ ] `actions/news/update-news.ts`
  - [ ] `actions/news/delete-news.ts`
  - [ ] `actions/news/feature-news.ts`

### 15.7 Admin Executive Members Management

- [ ] Create executive members admin page (`app/[locale]/(admin)/admin/executive-members/page.tsx`)
- [ ] Create new member page (`app/[locale]/(admin)/admin/executive-members/new/page.tsx`)
- [ ] Create edit member page (`app/[locale]/(admin)/admin/executive-members/edit/[memberId]/page.tsx`)
- [ ] Create member admin components
  - [ ] `member-form.tsx`
  - [ ] `member-list-admin.tsx`
  - [ ] `tenure-manager.tsx`

### 15.8 Admin Contact Inquiries

- [ ] Create contact admin page (`app/[locale]/(admin)/admin/contact/page.tsx`)
- [ ] Create inquiry detail page (`app/[locale]/(admin)/admin/contact/[inquiryId]/page.tsx`)
- [ ] Create inquiry components
  - [ ] `inquiry-list.tsx`
  - [ ] `inquiry-detail.tsx`
  - [ ] `reply-form.tsx`

### 15.9 Admin Family Tree Management

- [ ] Create family tree admin page (`app/[locale]/(admin)/admin/family-tree/page.tsx`)
- [ ] Create import page (`app/[locale]/(admin)/admin/family-tree/import/page.tsx`)
- [ ] Create export page (`app/[locale]/(admin)/admin/family-tree/export/page.tsx`)
- [ ] Create admin components
  - [ ] `admin-tree-editor.tsx`
  - [ ] `bulk-import.tsx`
  - [ ] `merge-nodes.tsx`
  - [ ] `tree-analytics.tsx`
- [ ] Create import/export APIs
  - [ ] `app/api/family-tree/import/route.ts`
  - [ ] `app/api/family-tree/export/route.ts`

### 15.10 Admin Settings

- [ ] Create settings page (`app/[locale]/(admin)/admin/settings/page.tsx`)
- [ ] Create general settings (`app/[locale]/(admin)/admin/settings/general/page.tsx`)
- [ ] Create SEO settings (`app/[locale]/(admin)/admin/settings/seo/page.tsx`)
- [ ] Create email settings (`app/[locale]/(admin)/admin/settings/email/page.tsx`)
- [ ] Create settings components
  - [ ] `settings-form.tsx`
  - [ ] `seo-settings.tsx`
  - [ ] `email-templates.tsx`
- [ ] Create settings API (`app/api/settings/route.ts`)
- [ ] Create settings actions (`actions/admin/update-settings.ts`)

---

## Phase 16: File Storage & Upload

### 16.1 Storage Configuration

- [ ] Set up AWS S3 or Cloudinary (`lib/storage/`)
  - [ ] `index.ts` - Storage exports
  - [ ] `s3.ts` - AWS S3 client
  - [ ] `cloudinary.ts` - Cloudinary client
  - [ ] `upload.ts` - Upload helpers
  - [ ] `delete.ts` - Delete helpers
  - [ ] `optimize.ts` - Image optimization

### 16.2 Upload API Routes

- [ ] Create image upload API (`app/api/upload/image/route.ts`)
- [ ] Create document upload API (`app/api/upload/document/route.ts`)
- [ ] Create avatar upload API (`app/api/upload/avatar/route.ts`)

### 16.3 Upload Hooks

- [ ] Create upload hook (`hooks/use-upload.ts`)

---

## Phase 17: Search System

### 17.1 Search Implementation

- [ ] Create search utilities (`lib/search/`)
  - [ ] `index.ts` - Search exports
  - [ ] `full-text-search.ts` - PostgreSQL FTS
  - [ ] `indexing.ts` - Search indexing
  - [ ] `filters.ts` - Search filters

### 17.2 Global Search API

- [ ] Create search API (`app/api/search/route.ts`)
  - [ ] Search users
  - [ ] Search forum threads
  - [ ] Search blog posts
  - [ ] Search news

---

## Phase 18: Custom React Hooks

### 18.1 Core Hooks (`hooks/`)

- [ ] `use-auth.ts` - Auth state hook
- [ ] `use-user.ts` - User data hook
- [ ] `use-session.ts` - Session hook
- [ ] `use-toast.ts` - Toast hook
- [ ] `use-modal.ts` - Modal hook
- [ ] `use-debounce.ts` - Debounce hook
- [ ] `use-throttle.ts` - Throttle hook
- [ ] `use-local-storage.ts` - Local storage hook
- [ ] `use-media-query.ts` - Media query hook
- [ ] `use-intersection-observer.ts` - Intersection observer
- [ ] `use-click-outside.ts` - Click outside hook
- [ ] `use-copy-to-clipboard.ts` - Copy hook
- [ ] `use-infinite-scroll.ts` - Infinite scroll
- [ ] `use-notifications.ts` - Notifications hook
- [ ] `use-permissions.ts` - Permissions hook

---

## Phase 19: Middleware & Security

### 19.1 Middleware Setup

- [ ] Create rate limiting middleware (`middleware/rate-limit.ts`)
- [ ] Create CORS middleware (`middleware/cors.ts`)
- [ ] Create error handler middleware (`middleware/error-handler.ts`)
- [ ] Create logger middleware (`middleware/logger.ts`)

### 19.2 Security Implementation

- [ ] Implement CSRF protection
- [ ] Set up Content Security Policy headers
- [ ] Configure secure cookies
- [ ] Implement input sanitization
- [ ] Set up rate limiting on sensitive routes

---

## Phase 20: Testing Setup

### 20.1 Testing Configuration

- [ ] Configure Vitest (`vitest.config.ts`)
- [ ] Configure Playwright (`playwright.config.ts`)
- [ ] Create test setup (`tests/setup.ts`)
- [ ] Create test helpers (`tests/helpers.ts`)
- [ ] Create test fixtures (`tests/fixtures/`)

### 20.2 Unit Tests (`tests/unit/`)

- [ ] Utility function tests
- [ ] Validation schema tests
- [ ] Auth function tests
- [ ] Component tests

### 20.3 Integration Tests (`tests/integration/`)

- [ ] API route tests
- [ ] Database query tests
- [ ] Server action tests

### 20.4 E2E Tests (`tests/e2e/`)

- [ ] Auth flow tests
- [ ] Forum flow tests
- [ ] Blog flow tests
- [ ] Family tree tests

---

## Phase 21: Phase 2 Features (Optional/Future)

### 21.1 Events System

- [ ] Add Phase 2 database models (Event, EventCategory, EventRSVP, etc.)
- [ ] Create events pages and components
- [ ] Implement RSVP functionality
- [ ] Create events calendar view

### 21.2 Photo Gallery

- [ ] Add gallery database models (PhotoAlbum, Photo, PhotoTag, etc.)
- [ ] Create gallery pages and components
- [ ] Implement photo upload with tagging
- [ ] Create lightbox viewer

### 21.3 Document Management

- [ ] Add document database models
- [ ] Create document pages and components
- [ ] Implement version control
- [ ] Create PDF viewer

### 21.4 Donation System

- [ ] Add donation database models
- [ ] Integrate payment gateways (Razorpay/Stripe)
- [ ] Create donation pages
- [ ] Implement receipt generation

### 21.5 Messaging System

- [ ] Add messaging database models
- [ ] Create real-time messaging
- [ ] Implement conversation UI
- [ ] Add file attachments

### 21.6 Video System

- [ ] Add video database models
- [ ] Implement video upload and processing
- [ ] Create video player
- [ ] Add live streaming support

### 21.7 Gamification System

- [ ] Add gamification database models
- [ ] Implement points system
- [ ] Create badges and achievements
- [ ] Build leaderboard

### 21.8 Member Directory

- [ ] Add member profile database models
- [ ] Create member directory pages
- [ ] Implement member search
- [ ] Create member profiles

---

## Phase 22: Performance & Optimization

### 22.1 Caching Strategy

- [ ] Implement Next.js 16 "use cache" directive
- [ ] Set up revalidation with `revalidateTag()`
- [ ] Configure Redis caching (optional)
- [ ] Implement cache helpers (`lib/cache/`)

### 22.2 Performance Optimization

- [ ] Implement image optimization with Next.js Image
- [ ] Add lazy loading for images
- [ ] Implement code splitting
- [ ] Add loading skeletons
- [ ] Optimize database queries

### 22.3 SEO Optimization

- [ ] Configure SEO defaults (`config/seo.ts`)
- [ ] Add meta tags to all pages
- [ ] Generate sitemap
- [ ] Configure robots.txt
- [ ] Add structured data (JSON-LD)

---

## Phase 23: Internationalization (i18n)

### 23.1 i18n Setup

- [ ] Configure i18n routing
- [ ] Create translation files (`public/locales/`)
  - [ ] English (`en/`)
  - [ ] Nepali (`ne/`)
  - [ ] Hindi (`hi/`)
- [ ] Create i18n provider (`components/providers/i18n-provider.tsx`)
- [ ] Create language switcher
- [ ] Create i18n API (`app/api/i18n/[locale]/route.ts`)

---

## Phase 24: Analytics & Monitoring

### 24.1 Analytics Setup

- [ ] Integrate Vercel Analytics
- [ ] Create analytics utilities (`lib/analytics/`)
- [ ] Implement page view tracking
- [ ] Create custom event tracking

### 24.2 Admin Analytics

- [ ] Create analytics dashboard (`app/[locale]/(admin)/admin/analytics/page.tsx`)
- [ ] Create analytics components
  - [ ] `analytics-overview.tsx`
  - [ ] Chart components (`line-chart.tsx`, `bar-chart.tsx`, etc.)
  - [ ] `user-metrics.tsx`
  - [ ] `content-metrics.tsx`

---

## Phase 25: Deployment & Documentation

### 25.1 Deployment Setup

- [ ] Configure Vercel deployment
- [ ] Set up environment variables on Vercel
- [ ] Configure database connection (production)
- [ ] Set up domain and SSL

### 25.2 CI/CD

- [ ] Create GitHub Actions workflow (`.github/workflows/`)
  - [ ] CI workflow
  - [ ] Deploy workflow
  - [ ] Test workflow

### 25.3 Documentation

- [ ] Update README.md
- [ ] Create API documentation (`docs/API.md`)
- [ ] Create deployment guide (`docs/DEPLOYMENT.md`)
- [ ] Create contributing guide (`docs/CONTRIBUTING.md`)

---

## Quick Reference

### Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: React 19.2, Tailwind CSS v4
- **Database**: PostgreSQL + Prisma 6
- **Auth**: NextAuth.js v5
- **Package Manager**: Bun
- **Visualization**: D3.js v7
- **Forms**: React Hook Form + Zod
- **Email**: Resend/SendGrid
- **Storage**: AWS S3 / Cloudinary
- **Testing**: Vitest + Playwright

### Key Directories

- `app/` - Next.js pages and API routes
- `components/` - React components
- `lib/` - Core library functions
- `actions/` - Server Actions
- `hooks/` - Custom React hooks
- `validations/` - Zod schemas
- `types/` - TypeScript types
- `prisma/` - Database schema
- `tests/` - Test files

### Commands

```bash
# Development
bun run dev

# Database
bunx prisma db push
bunx prisma migrate dev
bunx prisma generate
bunx prisma db seed

# Testing
bun run test
bun run test:e2e

# Build
bun run build
bun run start

# Linting
bun run lint
bun run format
```
