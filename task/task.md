# Tumin Dhanbari Chandra Jyoti Sanstha - Project Implementation Tasks

> **Project**: Full-Stack Community Website  
> **Stack**: Next.js 16, React 19.2, Tailwind CSS v4, PostgreSQL, Prisma 6+, NextAuth.js v5  
> **Last Updated**: January 24, 2026

---

# PHASE 1: CORE FEATURES (MVP)

---

## 1. Project Foundation & Setup

### 1.1 Development Environment

- [ ] Configure TypeScript 5.1+ with strict mode
- [ ] Set up ESLint & Prettier configurations
- [ ] Configure Turbopack for development
- [ ] Set up environment variables (.env.local)
- [ ] Install and configure Tailwind CSS v4
- [ ] Set up Lucide React icons

### 1.2 Database Setup

- [ ] Set up PostgreSQL database (v15+)
- [ ] Install Prisma ORM (v6+)
- [ ] Create complete Prisma schema (all Phase 1 models)
- [ ] Configure Prisma Client
- [ ] Run initial database migrations
- [ ] Create seed script for initial data (categories, settings)

### 1.3 Project Structure

- [ ] Create folder structure:
  - [ ] `app/` - Next.js App Router pages
  - [ ] `components/` - Reusable UI components
  - [ ] `lib/` - Utilities and configurations
  - [ ] `utils/` - Helper functions
  - [ ] `types/` - TypeScript types/interfaces
  - [ ] `hooks/` - Custom React hooks
  - [ ] `actions/` - Server Actions
- [ ] Set up path aliases in tsconfig.json
- [ ] Create shared types and interfaces
- [ ] Set up API route structure

### 1.4 Coding Standards Implementation

- [ ] Enable TypeScript strict mode
- [ ] Set up consistent naming conventions (camelCase, PascalCase)
- [ ] Create component composition patterns
- [ ] Set up custom hooks template
- [ ] Implement error boundary components
- [ ] Configure accessibility linting rules

---

## 2. Authentication System (NextAuth.js v5)

### 2.1 Core Authentication Setup

- [ ] Install and configure NextAuth.js v5 (Auth.js)
- [ ] Create auth configuration file
- [ ] Implement Credentials Provider (email/password)
- [ ] Set up session management with secure cookies
- [ ] Implement JWT token management
- [ ] Configure bcrypt password hashing (salt rounds: 12)

### 2.2 Registration Flow

- [ ] Create registration page UI
- [ ] Implement registration form with React Hook Form + Zod
- [ ] Add password strength indicator
- [ ] Implement email verification flow
- [ ] Create family association dropdown/search
- [ ] Handle admin approval workflow (optional)
- [ ] Create UserPreferences on registration

### 2.3 Login Flow

- [ ] Create login page UI
- [ ] Implement login form with validation
- [ ] Add "Remember Me" functionality
- [ ] Implement forgot password flow
- [ ] Create password reset email template
- [ ] Optional: Add Google/Facebook OAuth providers

### 2.4 User Profile Management

- [ ] Create user profile page UI
- [ ] Implement profile edit functionality
- [ ] Add profile picture upload (with Next.js Image optimization)
- [ ] Create change password feature
- [ ] Build activity history display (ActivityLog)
- [ ] Implement notification preferences (UserPreferences)

### 2.5 Role-Based Access Control (RBAC)

- [ ] Define user roles (USER, ADMIN, MODERATOR)
- [ ] Create middleware for route protection
- [ ] Implement permission checking utilities
- [ ] Create protected route wrappers
- [ ] Handle user status (ACTIVE, PENDING, SUSPENDED, DELETED)

---

## 3. Landing Page

### 3.1 Header Component

- [ ] Create responsive header with navigation
- [ ] Implement Sanstha logo placement
- [ ] Build navigation menu (Home, News, Forum, Blogs, Family Tree, About, Contact)
- [ ] Create responsive hamburger menu for mobile
- [ ] Implement sticky header with scroll animations
- [ ] Add conditional Login/Register or User Profile display
- [ ] Prepare global search bar placeholder

### 3.2 Hero Section

- [ ] Create full-width banner with village imagery
- [ ] Implement animated text (village name, tagline)
- [ ] Add CTA buttons (Explore Community, Join Forum)
- [ ] Implement parallax scrolling effect
- [ ] Set up View Transitions API for smooth navigation

### 3.3 About Section

- [ ] Create village introduction content
- [ ] Build statistics cards (families, population, established year, members)
- [ ] Implement image gallery carousel with lazy loading
- [ ] Add Next.js Image optimization

### 3.4 Features Showcase

- [ ] Create feature cards grid layout
- [ ] Implement hover animations (Framer Motion/CSS)
- [ ] Add interactive effects
- [ ] Link to respective sections

### 3.5 News Highlights

- [ ] Create news preview cards (3-4 items)
- [ ] Implement "View All News" button
- [ ] Add date and category tags
- [ ] Set up "use cache" directive for performance

### 3.6 Events/Announcements Section

- [ ] Create events calendar preview
- [ ] Build announcements banner
- [ ] Implement real-time updates (optional)

### 3.7 Testimonials Section

- [ ] Create testimonials slider
- [ ] Add community member quotes with photos
- [ ] Implement smooth transitions

### 3.8 Footer Component

- [ ] Create multi-column footer layout
- [ ] Add About Sanstha brief
- [ ] Build Quick Links section
- [ ] Add contact information
- [ ] Implement social media links
- [ ] Add newsletter subscription (optional)
- [ ] Include copyright and legal links

---

## 4. News Section

### 4.1 News Categories Setup

- [ ] Create NewsCategory model API routes
- [ ] Seed initial categories (Village News, Events, Announcements)
- [ ] Build category management (admin)

### 4.2 News List Page

- [ ] Create news listing page UI
- [ ] Implement card-based grid layout
- [ ] Add featured news highlighting
- [ ] Build filter sidebar (categories, date range)
- [ ] Implement pagination
- [ ] Add skeleton loaders during fetch
- [ ] Implement search functionality

### 4.3 News Detail Page

- [ ] Create single news article view
- [ ] Display full article with images
- [ ] Add related news section
- [ ] Implement share buttons
- [ ] Set up View Transitions for smooth navigation

### 4.4 News Admin Management

- [ ] Create news creation form (admin)
- [ ] Implement featured image upload (auto-optimized)
- [ ] Add category and priority selection
- [ ] Build publish/draft status toggle
- [ ] Create priority/featured flag options
- [ ] Implement edit/delete functionality
- [ ] Set up cache revalidation (revalidateTag)

---

## 5. Forum System

### 5.1 Forum Categories

- [ ] Create ForumCategory model API routes
- [ ] Seed categories (General Discussion, Announcements, Village Development, etc.)
- [ ] Create forum categories list view
- [ ] Implement category cards with icons/colors
- [ ] Add thread count and last activity display
- [ ] Build category management (admin)
- [ ] Set up "use cache" for categories

### 5.2 Thread Listing

- [ ] Create thread list view per category
- [ ] Implement thread cards with metadata
- [ ] Add view counter and reply count
- [ ] Build pagination/infinite scroll
- [ ] Implement sort options (Latest, Popular, Most Replied, Unanswered)
- [ ] Add skeleton loaders

### 5.3 Thread Creation & Management

- [ ] Create "New Thread" form UI
- [ ] Integrate rich text editor (TipTap/Lexical)
- [ ] Implement category selection
- [ ] Add thread edit functionality (with time limit)
- [ ] Create thread delete functionality
- [ ] Build pin/lock/feature options (admin)
- [ ] Add SEO meta tags

### 5.4 Posts & Replies

- [ ] Create thread detail view
- [ ] Build reply form with rich text editor
- [ ] Implement @mentions functionality
- [ ] Add quote previous posts feature
- [ ] Build likes/reactions system (React 19 optimistic updates)
- [ ] Implement post pagination
- [ ] Add post edit/delete for own posts
- [ ] Track isEdited and editedAt

### 5.5 Forum Search & Filter

- [ ] Implement keyword search
- [ ] Add category filter
- [ ] Create advanced sort options
- [ ] Build "Unanswered" filter

### 5.6 Forum Moderation

- [ ] Create Report model integration
- [ ] Build report/flag system UI
- [ ] Create admin moderation panel
- [ ] Implement user ban functionality
- [ ] Add content approval workflow (optional)
- [ ] Log admin actions (AdminAction)

### 5.7 Real-time Features

- [ ] Set up Server-Sent Events (SSE)
- [ ] Implement new reply indicators
- [ ] Add real-time notifications

---

## 6. Blog System

### 6.1 Blog Categories & Tags

- [ ] Create BlogCategory model API routes
- [ ] Seed categories (Village News, Cultural Heritage, Success Stories, etc.)
- [ ] Create BlogTag model API routes
- [ ] Build category/tag management (admin)

### 6.2 Blog List Page

- [ ] Create blog listing page UI
- [ ] Implement grid/list view toggle
- [ ] Add featured posts section
- [ ] Build pagination/infinite scroll
- [ ] Add category and search filters
- [ ] Implement skeleton loaders

### 6.3 Blog Post Creation (Admin)

- [ ] Create blog post editor page
- [ ] Integrate rich text editor (TipTap/Lexical)
- [ ] Implement featured image upload
- [ ] Add SEO meta tags fields (metaTitle, metaDescription, keywords)
- [ ] Build category/tag selection
- [ ] Create publish/draft/schedule options
- [ ] Implement read time calculation

### 6.4 Single Blog Page

- [ ] Create blog post detail view
- [ ] Display full-width featured image (Next.js Image)
- [ ] Show author info and publish date
- [ ] Implement Table of Contents (TOC)
- [ ] Add social share buttons
- [ ] Build related posts section
- [ ] Set up View Transitions

### 6.5 Comments System (BlogComment)

- [ ] Create comments section UI
- [ ] Implement nested/threaded comments (parentId)
- [ ] Add comment likes/reactions
- [ ] Build comment report functionality
- [ ] Implement admin moderation (isApproved)
- [ ] Set up email notifications for new comments
- [ ] Add optimistic updates (React 19)

### 6.6 Blog Caching Strategy

- [ ] Implement "use cache" for static blog posts
- [ ] Set up dynamic comments with incremental updates
- [ ] Configure revalidateTag() for content updates

---

## 7. Village Family Tree

### 7.1 Data Structure & Models

- [ ] Create FamilyNode model API routes
- [ ] Set up parent-child relationships (parentId)
- [ ] Configure spousal relationships (spouseId)
- [ ] Add privacy controls (isPrivate)
- [ ] Handle deceased flag (isDeceased)

### 7.2 D3.js Tree Visualization

- [ ] Install and set up D3.js v7
- [ ] Create hierarchical tree layout (top-down or left-right)
- [ ] Implement node representations (photos, icons)
- [ ] Add color coding by generation
- [ ] Distinguish male/female/deceased nodes

### 7.3 Interactive Controls

- [ ] Implement zoom in/out functionality (D3 zoom behavior)
- [ ] Add pan across tree
- [ ] Create person search functionality
- [ ] Build branch focus/expand/collapse
- [ ] Add full-screen mode
- [ ] Optimize with Canvas/SVG for large trees

### 7.4 Alternative Views

- [ ] Create list view (alphabetical)
- [ ] Build generation view
- [ ] Implement timeline view (optional)

### 7.5 User Edit Functionality

- [ ] Create edit modal/sidebar form
- [ ] Implement image upload for profile pictures
- [ ] Build relationship management interface
- [ ] Add validation for circular relationships
- [ ] Restrict user to edit only own family node

### 7.6 Admin Family Tree Management

- [ ] Grant full edit access to admins
- [ ] Implement add new root nodes (founding families)
- [ ] Build merge duplicate entries feature
- [ ] Add reorganize connections functionality
- [ ] Create bulk import/export (CSV)
- [ ] Build change history/audit log

### 7.7 Privacy Controls

- [ ] Implement private node marking
- [ ] Show only name for private nodes
- [ ] Add admin privacy override

### 7.8 Performance Optimization

- [ ] Implement virtualization (react-window)
- [ ] Add lazy loading for tree branches
- [ ] Set up "use cache" for tree data
- [ ] Enable incremental updates

---

## 8. About Sanstha Page

### 8.1 Sanstha Information

- [ ] Create About page layout
- [ ] Add history section
- [ ] Build Mission & Vision statements
- [ ] Display objectives and goals
- [ ] Add achievements and milestones
- [ ] Create organizational structure chart

### 8.2 Executive Members Section

- [ ] Create ExecutiveMember model API routes
- [ ] Create member card component
- [ ] Display member photo, name, designation
- [ ] Show tenure period (tenureStart, tenureEnd)
- [ ] Implement grid layout (responsive)
- [ ] Add hierarchical ordering (priority)
- [ ] Create past executives archive (MemberStatus.PAST)

### 8.3 Executive Management (Admin)

- [ ] Create add executive member form
- [ ] Implement edit member details
- [ ] Add remove member functionality
- [ ] Build tenure date management
- [ ] Create member reorder interface

### 8.4 Documents Section (Basic)

- [ ] Add constitution/bylaws PDF download
- [ ] Create meeting minutes section (protected)
- [ ] Add annual reports
- [ ] Include financial statements (protected)

### 8.5 Caching

- [ ] Implement "use cache" for static content
- [ ] Set up revalidation for member updates

---

## 9. Contact Us Page

### 9.1 Contact Form

- [ ] Create contact form UI
- [ ] Implement ContactInquiry model
- [ ] Add form fields (name, email, phone, subject, message)
- [ ] Add attachment upload option
- [ ] Integrate reCAPTCHA/CAPTCHA
- [ ] Implement Zod + React Hook Form validation
- [ ] Create success/error toast notifications
- [ ] Set up Server Actions for submission

### 9.2 Contact Information Display

- [ ] Display Sanstha office address
- [ ] Embed Google Maps
- [ ] Add "Get Directions" link
- [ ] Show phone numbers and email
- [ ] Display office hours
- [ ] Add social media links

### 9.3 Email Notifications

- [ ] Set up Resend/SendGrid integration
- [ ] Create admin notification email
- [ ] Create auto-reply for user (optional)
- [ ] Store submissions in database

### 9.4 Admin Inquiry Management

- [ ] Create inquiry listing page
- [ ] Implement InquiryStatus (UNREAD, READ, REPLIED, RESOLVED, ARCHIVED)
- [ ] Build reply functionality
- [ ] Add archive/delete options
- [ ] Create data export feature
- [ ] Support InquiryPriority sorting

---

## 10. Admin Dashboard

### 10.1 Dashboard Overview

- [ ] Create dashboard layout
- [ ] Build statistics widgets:
  - [ ] Total registered users
  - [ ] Active users (last 30 days)
  - [ ] Total forum threads/posts
  - [ ] Total blog posts
  - [ ] News articles count
  - [ ] Contact inquiries (unread)
- [ ] Add recent activity feed (ActivityLog)
- [ ] Create quick action buttons
- [ ] Implement real-time updates (SSE)

### 10.2 User Management

- [ ] Create user listing page (with pagination)
- [ ] Build user detail view
- [ ] Implement approve/suspend/delete users (UserStatus)
- [ ] Add admin role assignment
- [ ] Log all actions (AdminAction)

### 10.3 Content Management

- [ ] Forum moderation panel (flagged posts, bans)
- [ ] Blog management (CRUD)
- [ ] News management (CRUD, feature articles)
- [ ] Family tree management
- [ ] Executive members management
- [ ] Contact inquiries management

### 10.4 Site Settings

- [ ] Create SiteSetting model API routes
- [ ] Site title and tagline configuration
- [ ] Logo and favicon management
- [ ] Contact information settings
- [ ] Social media links configuration

### 10.5 SEO Settings

- [ ] Meta tags configuration
- [ ] Sitemap generation

### 10.6 Email Templates

- [ ] Create EmailTemplate model API routes
- [ ] Welcome email template
- [ ] Password reset template
- [ ] Notification templates (forum, blog, news)

### 10.7 Performance Monitoring

- [ ] Display cache analytics
- [ ] Show page load metrics (SiteMetrics)
- [ ] Add database query performance stats

---

## 11. Core UI/UX Components

### 11.1 Design System

- [ ] Set up color scheme (Sikkim-inspired: blues, greens, earth tones)
- [ ] Configure typography (Inter, Poppins, Open Sans)
- [ ] Create CSS variables for theming
- [ ] Implement dark mode support (optional)

### 11.2 Core Components

- [ ] Create Button component (primary, secondary, tertiary with ripple effects)
- [ ] Build Card component with hover animations
- [ ] Create Form components (Input, Select, Textarea with floating labels)
- [ ] Build Modal component (React portals)
- [ ] Create Toast/Notification component
- [ ] Build Loading states (Skeletons, Spinners)
- [ ] Create Empty state components

### 11.3 Animations

- [ ] Implement View Transitions API
- [ ] Add hover effects to interactive elements
- [ ] Create scroll animations (subtle, performance-conscious)
- [ ] Build micro-interactions
- [ ] Optimize for CSS-first animations

### 11.4 Accessibility

- [ ] Ensure WCAG 2.1 AA compliance
- [ ] Add proper ARIA labels
- [ ] Implement keyboard navigation
- [ ] Test with screen readers

---

## 12. Core Notifications System

### 12.1 Notification Types (Phase 1)

- [ ] Implement forum reply notifications (FORUM_REPLY)
- [ ] Add blog comment notifications (BLOG_COMMENT)
- [ ] Create @mention notifications (MENTION)
- [ ] Add like/reaction notifications (LIKE)
- [ ] Build admin message notifications (ADMIN_MESSAGE)
- [ ] Create system alerts (SYSTEM_ALERT)
- [ ] Add news update notifications (NEWS_UPDATE)
- [ ] Build event reminders (EVENT_REMINDER)

### 12.2 Notification UI

- [ ] Create notification dropdown in header
- [ ] Build notification bell with unread count
- [ ] Create notification list view
- [ ] Implement mark as read functionality
- [ ] Add notification preferences page

### 12.3 Email Notifications

- [ ] Set up email notification templates
- [ ] Implement user preference checking
- [ ] Create digest emails (optional)

---

## 13. Reactions & Engagement

### 13.1 Reactions System

- [ ] Create Reaction model API routes
- [ ] Implement reaction types (LIKE, LOVE, HELPFUL, INSIGHTFUL, CELEBRATE)
- [ ] Build reaction picker UI
- [ ] Implement optimistic updates
- [ ] Add reaction counts display
- [ ] Create "who reacted" list

### 13.2 Reporting System

- [ ] Create Report model API routes
- [ ] Create report modal
- [ ] Implement ReportReason selection
- [ ] Build admin report review panel
- [ ] Add report resolution workflow (ReportStatus)

---

## 14. Search & Analytics

### 14.1 Search Functionality

- [ ] Create SearchIndex model
- [ ] Implement global search bar
- [ ] Build search results page
- [ ] Add search filters by content type
- [ ] Implement search suggestions (optional)

### 14.2 Analytics

- [ ] Set up PageView tracking
- [ ] Create SiteMetrics daily aggregation job
- [ ] Build analytics dashboard for admin
- [ ] Integrate Vercel Analytics (optional)

---

## 15. Security & Performance

### 15.1 Security Implementation

- [ ] Configure bcrypt password hashing (salt rounds: 12)
- [ ] Implement rate limiting on sensitive routes
- [ ] Set up CSRF protection (built-in Next.js)
- [ ] Add input validation/sanitization (Zod schemas)
- [ ] Implement XSS prevention (DOMPurify for rich content)
- [ ] Configure Content Security Policy (CSP) headers
- [ ] Set up environment variable validation

### 15.2 File Upload Security

- [ ] Create Upload model API routes
- [ ] Implement file type validation
- [ ] Add file size limits
- [ ] Configure malware scanning (optional)
- [ ] Set up AWS S3/Cloudinary integration

### 15.3 Performance Optimization

- [ ] Configure Next.js Image optimization
- [ ] Implement lazy loading for images
- [ ] Set up code splitting with Turbopack
- [ ] Configure "use cache" directives
- [ ] Implement ISR (Incremental Static Regeneration)
- [ ] Optimize database queries with indexes

### 15.4 Privacy Compliance

- [ ] Create privacy policy page
- [ ] Build terms of service page
- [ ] Implement cookie consent (if using analytics)
- [ ] Add user data export functionality
- [ ] Create user data deletion workflow

---

## 16. Testing & Quality Assurance

### 16.1 Unit Testing

- [ ] Set up testing framework (Jest/Vitest)
- [ ] Write tests for utility functions
- [ ] Test authentication flows
- [ ] Test API routes

### 16.2 Integration Testing

- [ ] Test database operations
- [ ] Test form submissions
- [ ] Test file uploads

### 16.3 E2E Testing

- [ ] Set up Playwright/Cypress
- [ ] Test user registration flow
- [ ] Test login/logout flow
- [ ] Test forum CRUD operations
- [ ] Test blog CRUD operations
- [ ] Test admin dashboard

### 16.4 Performance Testing

- [ ] Run Lighthouse audits
- [ ] Test page load times
- [ ] Verify cache effectiveness

---

## 17. Deployment & Documentation

### 17.1 Deployment Preparation

- [ ] Configure production environment variables
- [ ] Set up PostgreSQL production database
- [ ] Configure file storage (S3/Cloudinary)
- [ ] Set up email service (Resend/SendGrid)

### 17.2 Vercel Deployment

- [ ] Connect GitHub repository
- [ ] Configure build settings
- [ ] Set up environment variables in Vercel
- [ ] Deploy to staging
- [ ] Test staging deployment
- [ ] Deploy to production

### 17.3 Documentation

- [ ] Create API documentation
- [ ] Write user guide for admins
- [ ] Document database schema
- [ ] Create deployment guide

### 17.4 Post-Launch

- [ ] Monitor error tracking
- [ ] Set up uptime monitoring
- [ ] Create backup strategy
- [ ] Implement CacheEntry for app-level caching
- [ ] Set up DataBackup for critical tables

---

# PHASE 2: ADVANCED FEATURES

---

## 18. Internationalization (i18n)

### 18.1 Translation System

- [ ] Create Translation model API routes
- [ ] Set up locale support (en, ne, hi)
- [ ] Create namespace structure (common, auth, forum, blog, etc.)
- [ ] Implement translation loading mechanism
- [ ] Create admin translation management UI
- [ ] Add language switcher component

### 18.2 Content Localization

- [ ] Translate static UI strings
- [ ] Support bilingual content (English + Nepali/Hindi)
- [ ] Implement RTL support (if needed)
- [ ] Configure variable fonts for multi-language support

---

## 19. Event Management System

### 19.1 Event Categories

- [ ] Create EventCategory model API routes
- [ ] Seed event categories (Meeting, Celebration, Cultural, Religious, etc.)
- [ ] Build category management (admin)

### 19.2 Event Listing

- [ ] Create events listing page UI
- [ ] Implement calendar view
- [ ] Add list view with filters
- [ ] Build event cards with date, location, type
- [ ] Implement pagination
- [ ] Add featured events section

### 19.3 Event Detail Page

- [ ] Create single event view
- [ ] Display event details (date, time, location, venue)
- [ ] Show organizer information
- [ ] Add Google Maps integration
- [ ] Display attendee count
- [ ] Show event attachments (EventAttachment)

### 19.4 Event Creation (Admin/Organizer)

- [ ] Create event form UI
- [ ] Implement date/time picker with timezone
- [ ] Add location and venue details
- [ ] Upload featured image
- [ ] Set capacity and RSVP requirements
- [ ] Add SEO meta tags
- [ ] Attach files/documents

### 19.5 RSVP System

- [ ] Create EventRSVP API routes
- [ ] Implement RSVP UI (Attending, Not Attending, Maybe)
- [ ] Add guest count feature
- [ ] Allow notes with RSVP
- [ ] Display RSVP status per event
- [ ] Show attendee list

### 19.6 Event Reminders

- [ ] Create EventReminder model API routes
- [ ] Implement reminder scheduling
- [ ] Send email reminders
- [ ] Send push notifications for reminders
- [ ] Track sent status (isSent, sentAt)

### 19.7 Event Notifications

- [ ] Add EVENT_INVITE notification type
- [ ] Notify users of new events
- [ ] Remind users before events

---

## 20. Photo Gallery System

### 20.1 Photo Albums

- [ ] Create PhotoAlbum model API routes
- [ ] Implement album creation UI
- [ ] Add album visibility controls (PUBLIC, MEMBERS_ONLY, PRIVATE)
- [ ] Build album listing page
- [ ] Implement cover photo selection

### 20.2 Photo Upload & Management

- [ ] Create Photo model API routes
- [ ] Build bulk photo upload UI
- [ ] Implement automatic thumbnail generation
- [ ] Add photo metadata (title, description, location, takenAt)
- [ ] Support image optimization (Next.js Image)
- [ ] Track file dimensions (width, height, fileSize)

### 20.3 Photo Tagging

- [ ] Create PhotoTag model API routes
- [ ] Implement person tagging on photos
- [ ] Add tag coordinates (x, y percentage)
- [ ] Link tags to user profiles

### 20.4 Photo Interactions

- [ ] Create PhotoComment model API routes
- [ ] Build comments section for photos
- [ ] Create PhotoReaction model API routes
- [ ] Implement like/love reactions
- [ ] Add reaction counts display

### 20.5 Photo Gallery UI

- [ ] Create lightbox/modal for photo viewing
- [ ] Implement swipe navigation
- [ ] Add zoom functionality
- [ ] Build slideshow feature
- [ ] Create masonry grid layout

---

## 21. Document Management System

### 21.1 Document Categories

- [ ] Create DocumentCategory model API routes
- [ ] Seed categories (Constitution, Minutes, Reports, Financial)
- [ ] Build category management (admin)

### 21.2 Document Upload

- [ ] Create Document model API routes
- [ ] Build document upload UI
- [ ] Implement file type validation (PDF, DOC, DOCX, XLS, etc.)
- [ ] Add version control (version, parentVersionId)
- [ ] Set document status (DRAFT, PUBLISHED, ARCHIVED)
- [ ] Configure access levels (PUBLIC, MEMBERS_ONLY, ADMIN_ONLY, CUSTOM)

### 21.3 Document Permissions

- [ ] Create DocumentPermission model API routes
- [ ] Implement custom permission UI
- [ ] Allow view/download/edit permissions per user
- [ ] Handle access level checks

### 21.4 Document Viewing & Download

- [ ] Create document listing page
- [ ] Implement PDF preview (optional)
- [ ] Track downloads (DocumentDownload)
- [ ] Add download count display
- [ ] Log download with IP address

### 21.5 Version History

- [ ] Display document versions
- [ ] Allow version comparison (optional)
- [ ] Implement version rollback (admin)

---

## 22. Donation System

### 22.1 Donation Campaigns

- [ ] Create DonationCampaign model API routes
- [ ] Build campaign creation UI
- [ ] Set goal amount and currency
- [ ] Add start/end dates
- [ ] Track current amount raised
- [ ] Display progress bar

### 22.2 Donation Processing

- [ ] Create Donation model API routes
- [ ] Integrate payment gateway (Razorpay/Stripe)
- [ ] Support multiple payment methods
- [ ] Handle anonymous donations
- [ ] Track donation status (PENDING, PROCESSING, COMPLETED, FAILED, REFUNDED)
- [ ] Store transaction details (transactionId, paymentGatewayResponse)

### 22.3 Donation Receipt

- [ ] Generate receipt numbers
- [ ] Create downloadable receipt PDF
- [ ] Mark tax-deductible donations
- [ ] Send confirmation email

### 22.4 Donation History

- [ ] Create user donation history page
- [ ] Display donation amounts and dates
- [ ] Show associated campaigns
- [ ] Allow donor messages

### 22.5 Donation Admin Management

- [ ] Create donation listing page
- [ ] Filter by status, campaign, date
- [ ] Export donation reports
- [ ] Process refunds
- [ ] Add DONATION_RECEIVED notification

---

## 23. Member Directory & Profiles

### 23.1 Member Profiles

- [ ] Create MemberProfile model API routes
- [ ] Build extended profile form
- [ ] Add professional info (profession, company, skills)
- [ ] Set contact preferences (showEmail, showPhone, showAddress)
- [ ] Configure membership type (REGULAR, HONORARY, LIFE_MEMBER, PATRON)
- [ ] Add social links (LinkedIn, Twitter, Facebook, Website)

### 23.2 Member Directory

- [ ] Create directory listing page
- [ ] Implement search by name, skills, profession
- [ ] Add filter by membership type
- [ ] Display member cards with key info
- [ ] Respect privacy preferences

### 23.3 Badge System

- [ ] Create Badge model API routes
- [ ] Define badge types and criteria
- [ ] Build badge management (admin)
- [ ] Create UserBadge assignment
- [ ] Display badges on profiles
- [ ] Add BADGE_EARNED notification

---

## 24. Direct Messaging System

### 24.1 Conversations

- [ ] Create Conversation model API routes
- [ ] Implement one-on-one messaging
- [ ] Add group conversation support
- [ ] Set group name and image
- [ ] Track participants (ConversationParticipant)

### 24.2 Message Features

- [ ] Create Message model API routes
- [ ] Build message compose UI
- [ ] Implement real-time messaging (WebSocket/SSE)
- [ ] Add attachments support
- [ ] Implement reply to message (replyToId)
- [ ] Track message status (SENT, DELIVERED, READ, DELETED)
- [ ] Support soft delete (deletedAt)

### 24.3 Read Receipts

- [ ] Create MessageReadReceipt model API routes
- [ ] Track read status per user
- [ ] Display read indicators
- [ ] Implement "last read at" tracking

### 24.4 Conversation Management

- [ ] Create conversation list UI
- [ ] Show unread counts
- [ ] Implement mute conversation
- [ ] Allow leaving group conversations
- [ ] Add NEW_MESSAGE notification

### 24.5 Search & History

- [ ] Search within conversations
- [ ] Load message history with pagination
- [ ] Implement infinite scroll

---

## 25. Push Notifications

### 25.1 Push Subscription

- [ ] Create PushSubscription model API routes
- [ ] Implement Web Push API
- [ ] Store subscription endpoint and keys
- [ ] Support device types (WEB, IOS, ANDROID)
- [ ] Track device names

### 25.2 Push Notification Delivery

- [ ] Create PushNotification model API routes
- [ ] Implement notification sending service
- [ ] Track sent status and time
- [ ] Handle failed deliveries
- [ ] Add badge and icon support

### 25.3 Notification Preferences

- [ ] Allow users to manage subscriptions
- [ ] Set notification categories
- [ ] Implement quiet hours (optional)
- [ ] Support multiple devices per user

---

## 26. Video Content System

### 26.1 Video Categories

- [ ] Create VideoCategory model API routes
- [ ] Seed video categories
- [ ] Build category management (admin)

### 26.2 Video Upload & Processing

- [ ] Create Video model API routes
- [ ] Implement video upload UI
- [ ] Track processing status (PROCESSING, READY, FAILED)
- [ ] Generate thumbnails
- [ ] Extract duration
- [ ] Configure visibility (PUBLIC, MEMBERS_ONLY, PRIVATE)

### 26.3 Video Player

- [ ] Create custom video player component
- [ ] Implement playback controls
- [ ] Track view counts
- [ ] Support quality selection (optional)

### 26.4 Video Interactions

- [ ] Create VideoComment model API routes
- [ ] Implement timestamped comments
- [ ] Create VideoReaction model API routes
- [ ] Add like/love reactions
- [ ] Display reaction counts

### 26.5 Live Streaming

- [ ] Create LiveStream model API routes
- [ ] Implement stream key generation
- [ ] Track live status (isLive, startedAt, endedAt)
- [ ] Display viewer counts (peakViewers, totalViews)
- [ ] Integrate streaming service (optional)

---

## 27. Gamification System

### 27.1 Points System

- [ ] Create UserPoints model API routes
- [ ] Define point values for actions
- [ ] Track points by category (forum, blog, helpful, event)
- [ ] Calculate user levels
- [ ] Create PointHistory for tracking

### 27.2 Achievements

- [ ] Create Achievement model API routes
- [ ] Define achievement criteria (JSON)
- [ ] Create UserAchievement tracking
- [ ] Display earned achievements on profiles
- [ ] Add ACHIEVEMENT_UNLOCKED notification

### 27.3 Leaderboards

- [ ] Create Leaderboard model API routes
- [ ] Implement ranking algorithm
- [ ] Support multiple categories (overall, forum, blog, helpful, events)
- [ ] Create period-based leaderboards (weekly, monthly, yearly, all-time)
- [ ] Build leaderboard UI

### 27.4 Gamification UI

- [ ] Create points display on profile
- [ ] Show level progress bar
- [ ] Display recent achievements
- [ ] Build achievements showcase page
- [ ] Create leaderboard page

---

## 28. Family Tree AI Suggestions

### 28.1 AI Suggestion System

- [ ] Create FamilyTreeSuggestion model API routes
- [ ] Implement suggestion generation algorithm
- [ ] Calculate confidence scores
- [ ] Store suggestion reasons

### 28.2 Suggestion Review

- [ ] Create suggestion review UI
- [ ] Allow accept/reject suggestions
- [ ] Track review status (pending, accepted, rejected)
- [ ] Log reviewer and review time

### 28.3 ML Integration (Optional)

- [ ] Integrate ML model for relationship predictions
- [ ] Improve suggestions based on feedback
- [ ] Detect potential duplicate nodes

---

## 29. Audit & Backup Systems

### 29.1 Audit Logging

- [ ] Create AuditLog model API routes
- [ ] Log all critical actions
- [ ] Store action metadata
- [ ] Build audit log viewer (admin)
- [ ] Implement filtering and search

### 29.2 Data Backup

- [ ] Create DataBackup model API routes
- [ ] Implement backup scheduling
- [ ] Store backup data as JSON
- [ ] Track backup reasons and creators
- [ ] Create restore functionality (admin)

---

## 30. Extended Notification Types

### 30.1 Additional Notifications

- [ ] Implement NEW_MESSAGE notification
- [ ] Add EVENT_INVITE notification
- [ ] Create DONATION_RECEIVED notification
- [ ] Add BADGE_EARNED notification
- [ ] Implement ACHIEVEMENT_UNLOCKED notification

### 30.2 Notification Preferences

- [ ] Update UserPreferences with new notification types
- [ ] Allow granular notification control
- [ ] Implement email digest for grouped notifications

---

# PHASE 3: FUTURE ENHANCEMENTS

---

## Future Features (Post Phase 2)

- [ ] Two-Factor Authentication (2FA)
- [ ] Advanced global search with elasticsearch
- [ ] AI-powered content recommendations
- [ ] Mobile app (React Native)
- [ ] Offline support (PWA)
- [ ] Advanced analytics dashboard
- [ ] Newsletter automation
- [ ] Event calendar with reminders sync (Google Calendar, iCal)
- [ ] Community polls and surveys
- [ ] Job board for community members
- [ ] Marketplace for local products
- [ ] Emergency notification system

---

> **Note**: Check off items `[x]` as they are completed. Update status to `[/]` for in-progress items.  
> This task list follows the project structure defined in `docs/prd.md` and `docs/database.md`.
