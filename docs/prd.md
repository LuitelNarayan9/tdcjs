Project Requirements Document (PRD)
Tumin Dhanbari Chandra Jyoti Sanstha Website
Version: 2.0 (Updated for Next.js 16)
Date: January 23, 2026
Project Type: Full-Stack Web Application
Location: Tumin Dhanbari, Gangtok District, Sikkim, India

1. Executive Summary
   1.1 Project Overview
   A comprehensive full-stack web application for the Tumin Dhanbari Chandra Jyoti Sanstha - a village community organization website. The platform will serve as a digital hub for the village community, featuring rich content management, interactive family tree visualization, community forums, and news dissemination.
   1.2 Objectives

Create a modern, accessible digital presence for the village Sanstha
Facilitate community engagement through forums and blogs
Preserve and visualize village heritage through interactive family trees
Enable efficient communication between Sanstha executives and community members
Provide seamless access to news and updates for all visitors

1.3 Target Audience

Primary: Village residents and their families
Secondary: Diaspora community members
Tertiary: General public interested in the village and Sanstha activities

2. Technical Stack
   2.1 Frontend

Framework: Next.js 16 (App Router with Turbopack)
UI Library: React 19.2
Styling: Tailwind CSS v4 (latest)
Visualization: D3.js v7 (for Family Tree)
Form Handling: React Hook Form + Zod validation
State Management: React Context API / Zustand (for complex state)
Rich Text Editor: TipTap / Lexical (for blogs and forums)
Icons: Lucide React

2.2 Backend

API Routes: Next.js 16 Route Handlers (App Router)
Database: PostgreSQL (v15+) with Prisma ORM (v6+)
Authentication: NextAuth.js v5 (Auth.js)
File Storage: AWS S3 / Cloudinary (for images)
Image Optimization: Next.js Image component
Caching: Next.js 16 Cache Components with "use cache" directive

2.3 Additional Technologies

Email Service: Resend / SendGrid
Real-time Features: Server-Sent Events (SSE) for forum notifications
Analytics: Vercel Analytics / Google Analytics
Deployment: Vercel
Node.js Version: 20.9.0+ (required for Next.js 16)
TypeScript: 5.1.0+ (strongly recommended)

2.4 Next.js 16 Specific Features

Turbopack: Default bundler (5-10x faster Fast Refresh, 2-5x faster builds)
React Compiler: Optional (stable support for automatic memoization)
Enhanced Routing: Layout deduplication, incremental prefetching
Cache Components: Explicit caching with "use cache" directive
Proxy: Using proxy.ts instead of middleware.ts (if needed)

3. User Roles & Permissions
   3.1 User Types
   3.1.1 Public User (Unauthenticated)
   Access:

Landing page (full access)
News section (read-only)
Contact Us page (submit inquiries)

Restrictions:

Cannot access Forum, Blogs, Family Tree, About Sanstha

3.1.2 Registered User (Authenticated)
Access:

All public pages
Forum (create posts, comment, like, participate)
Blogs (read, comment, like)
Family Tree (view entire tree, edit only their own family node)
About Sanstha (view executive members)

Permissions:

Edit own profile
Manage own family tree node
Create forum posts and comments
Comment on blogs

3.1.3 Admin User
Access:

Full access to all sections
Content management dashboard

Permissions:

Create, edit, delete blogs
Moderate forum (delete inappropriate content, ban users)
Edit entire family tree
Add/remove executive members
Manage news posts
View and respond to contact inquiries
User management (approve, suspend, delete users)

4. Feature Requirements
   4.1 Landing Page
   4.1.1 Header

Logo: Sanstha logo with village name
Navigation Menu:

Home
News
Forum (protected)
Blogs (protected)
Family Tree (protected)
About Sanstha (protected)
Contact Us
Login/Register (conditional)
User Profile (when logged in)

Responsive: Hamburger menu for mobile
Sticky/Fixed: Header remains visible on scroll with smooth animations
Search Bar: Global search functionality (future enhancement)

4.1.2 Hero Section

Full-width banner with high-quality village imagery
Animated text: Village name and tagline with modern CSS animations
Call-to-Action buttons:

"Explore Our Community"
"Join the Forum"

Parallax scrolling effect using CSS transform
View Transitions API: Smooth page transitions (React 19.2 feature)

4.1.3 About Section

Village Introduction: Brief history and significance
Statistics Cards:

Total families
Population
Established year
Active members

Image Gallery: Modern carousel with lazy loading and Next.js Image optimization

4.1.4 Features Showcase

Cards/Grid Layout highlighting:

Community Forum
Family Tree Visualization
Latest News & Updates
Cultural Heritage

Modern animations using Framer Motion or CSS transitions
Interactive hover effects

4.1.5 News Highlights

Latest 3-4 news items with optimized thumbnails
"View All News" button
Date and category tags
Cached using "use cache" directive for optimal performance

4.1.6 Events/Announcements

Upcoming events calendar preview
Important announcements banner
Real-time updates (if enabled)

4.1.7 Testimonials/Community Voices

Slider with community member quotes
Profile pictures (Next.js Image optimized)
Smooth transitions

4.1.8 Footer

Multi-column layout:

About Sanstha: Brief description
Quick Links: Navigation shortcuts
Contact Information: Address, phone, email
Social Media: Links to social platforms

Newsletter Subscription (optional)
Copyright notice
Privacy Policy & Terms of Service links
Modern glassmorphism design (optional)

4.2 Authentication System
4.2.1 Registration

Required Fields:

Full Name
Email
Phone Number
Password (with strength indicator)
Family Association (dropdown/search)
Village Address

Optional Fields:

Profile Picture
Date of Birth

Email Verification: Send confirmation email
Admin Approval: Optional workflow for new registrations

4.2.2 Login

Login Methods:

Email + Password
Optional: Social logins (Google, Facebook)

Remember Me checkbox
Forgot Password flow with email reset
Two-Factor Authentication (future enhancement)
NextAuth.js v5 implementation

4.2.3 User Profile

View/Edit personal information
Upload/change profile picture (optimized with Next.js Image)
Change password
Activity history
Notification preferences

4.3 Forum System
4.3.1 Forum Structure

Categories:

General Discussion
Announcements
Village Development
Cultural Events
Help & Support
Suggestions

Subcategories (optional)

4.3.2 Forum Features
Thread Management:

Create new thread (title, category, content with rich text)
Edit own threads (within time limit)
Delete own threads
Pin/Featured threads (admin only)
Lock threads (admin only)

Post/Reply Features:

Rich text editor (bold, italic, lists, links, images)
Mentions (@username)
Quote previous posts
Like/React to posts (using React 19 optimistic updates)
Report inappropriate content
Pagination for long threads

Search & Filter:

Search threads by keyword
Filter by category
Sort by: Latest, Most Popular, Most Replied, Unanswered

User Engagement:

Thread view counter
Reply counter
Last activity timestamp
User reputation/badges (future enhancement)

Moderation:

Flag/Report system
Admin moderation panel
User ban functionality
Content approval workflow (optional)

4.3.3 UI/UX Requirements

Thread List View: Clean, scannable layout with skeleton loaders
Thread Detail View: Readable typography, clear hierarchy
Mobile Responsive: Optimized for all devices
Real-time Updates: New replies indicator (SSE)
Breadcrumb navigation
Optimistic UI updates using React 19 features

4.3.4 Performance Optimization

Cached forum categories using "use cache"
Incremental loading for thread lists
Optimized images with Next.js Image component

4.4 Blog System
4.4.1 Blog Structure

Categories:

Village News
Cultural Heritage
Success Stories
Development Projects
Announcements

4.4.2 Blog Features
Blog Post Management (Admin):

Create blog post with rich text editor
Featured image upload (optimized automatically)
SEO meta tags (title, description)
Categories and tags
Publish/Draft status
Schedule publishing
Edit/Delete posts

Reader Features:

Read full blog posts
Comment on posts
Like/React to posts
Share on social media
Related posts suggestions
Search blogs

Blog Layout:

Blog List Page:

Grid/List view toggle
Featured posts at top
Pagination or infinite scroll
Filter by category/tag
Search functionality

Single Blog Page:

Full-width featured image (Next.js Image)
Author information
Publish date and read time
Content with TOC (Table of Contents)
Comments section
Social share buttons
View Transitions for smooth navigation

4.4.3 Comments System

Nested/threaded comments
Like comments
Report inappropriate comments
Admin moderation
Email notifications for new comments (to author)
Optimistic updates using React 19

4.4.4 Caching Strategy

Static blog posts using "use cache" directive
Dynamic comments with incremental updates
Revalidation on content updates using revalidateTag()

4.5 Village Family Tree
4.5.1 Data Structure
Family Node Information:

Full Name
Photo
Date of Birth
Date of Death (if applicable)
Gender
Relationship type (parent, spouse, child, sibling)
Current location
Occupation
Contact information (optional, private)
Biography/notes

Relationships:

Parent-child connections
Spousal relationships
Sibling relationships
Extended family connections

4.5.2 Visualization Features
D3.js Interactive Tree:

Hierarchical tree layout (top-down or left-right)
Node representations:

Profile picture thumbnail (optimized)
Name and basic info on hover
Color coding by generation
Different icons for male/female/deceased

Interactive controls:

Zoom in/out (using D3 zoom behavior)
Pan across the tree
Search for specific person
Focus on specific branch
Expand/collapse branches
Full-screen mode

Canvas/SVG rendering for performance with large trees
Web Worker for heavy computations (if needed)

Alternative Views:

List view (alphabetical)
Generation view (by age groups)
Timeline view

4.5.3 Edit Functionality
User Permissions:

Users can edit only their immediate family node
Users can add their own children/spouse
Cannot edit or delete other family members

Admin Permissions:

Full edit access to entire tree
Add new root nodes (founding families)
Merge duplicate entries
Reorganize connections
Bulk import/export (CSV)

Edit Features:

Modal/sidebar form for editing
Image upload for profile pictures (Next.js Image optimization)
Relationship management interface
Validation for circular relationships
Change history/audit log (admin view)

4.5.4 Privacy Controls

Users can mark their node as private
Private nodes show only name (no details)
Admin can override privacy settings if needed

4.5.5 Performance Optimization

Virtualization for large trees (react-window or similar)
Lazy loading of tree branches
Cached tree data using "use cache" directive
Incremental updates without full tree reload

4.6 News Section
4.6.1 Features
News Management (Admin):

Create news articles
Featured image (auto-optimized)
Category (Village News, Events, Announcements, etc.)
Publish date
Priority/Featured flag
Edit/Delete news

Public Access:

View all news articles
Filter by category
Search news
Pagination
Share on social media

Layout:

News List:

Card-based grid layout with modern design
Thumbnail (Next.js Image), headline, excerpt, date
Featured news highlighted
Filter sidebar (categories, date range)
Skeleton loaders during data fetching

News Detail:

Full article with images
Related news
Share buttons
View Transitions for smooth navigation

4.6.2 News Types

Regular news articles
Urgent announcements (banner display)
Event notifications
Photo galleries (future enhancement)

4.6.3 Caching Strategy

Static news list cached using "use cache"
Revalidation using revalidateTag() when admin publishes new news
ISR (Incremental Static Regeneration) for news pages

4.7 About Sanstha
4.7.1 Sanstha Information

History: Detailed history of the Sanstha
Mission & Vision statements
Objectives and goals
Achievements and milestones
Organizational structure chart

4.7.2 Executive Members Section
Member Card Display:

Information per member:

Full Name
Professional photo (Next.js Image optimized)
Designation (President, Vice President, Secretary, Treasurer, etc.)
Tenure period (start date - end date)
Contact information (optional)
Brief bio

Modern card design with hover effects
Grid layout (responsive)
Hierarchical ordering (President first, then by importance)
Past executives archive (collapsible section)

Admin Management:

Add new executive member
Edit member details
Remove member
Set tenure dates
Reorder members

4.7.3 Documents Section

Constitution/bylaws (PDF download)
Meeting minutes (protected)
Annual reports
Financial statements (protected)

4.7.4 Caching

Static page cached using "use cache"
Revalidation when admin updates executive members

4.8 Contact Us Page
4.8.1 Contact Form
Form Fields:

Full Name (required)
Email (required)
Phone Number (optional)
Subject (required, dropdown)
Message (required, textarea)
Attachment (optional, for supporting documents)
CAPTCHA/reCAPTCHA (spam prevention)

Form Behavior:

Client-side validation (Zod + React Hook Form)
Success/error messages with toast notifications
Email notification to admin
Auto-reply to user (optional)
Store submissions in database
Server Actions for form submission (Next.js 16)

4.8.2 Contact Information

Sanstha Office Address:

Full address
Embedded Google Maps
Get Directions link

Contact Details:

Phone numbers
Email addresses
Office hours

Social Media Links

4.8.3 Admin Panel for Inquiries

View all contact submissions
Mark as read/unread
Reply to inquiries
Archive/delete submissions
Export data

5. Admin Dashboard
   5.1 Dashboard Overview

Statistics widgets:

Total registered users
Active users (last 30 days)
Total forum threads/posts
Total blog posts
News articles count
Contact inquiries (unread)

Recent activity feed
Quick actions (Create blog, Create news, etc.)
Real-time updates using SSE

5.2 Content Management

Users Management:

List all users (with pagination)
View user details
Approve/suspend/delete users
Assign admin roles

Forum Moderation:

Flagged posts review
Delete inappropriate content
Ban users

Blog Management:

Create/Edit/Delete blogs
Manage categories

News Management:

Create/Edit/Delete news
Feature news articles

Family Tree Management:

Edit entire tree
Merge duplicate nodes
Import/export data

Executive Members Management:

Add/Edit/Remove members

Contact Inquiries:

View and respond to messages

5.3 Settings

Site Settings:

Site title and tagline
Logo and favicon
Contact information
Social media links

SEO Settings:

Meta tags
Sitemap configuration

Email Templates:

Welcome email
Password reset
Notifications

5.4 Performance Monitoring

Cache analytics (cache hit/miss rates)
Page load metrics
Database query performance

6. UI/UX Requirements
   6.1 Design Principles

Modern and Professional: Clean, contemporary design with modern CSS features
Cultural Sensitivity: Incorporate Sikkimese cultural elements subtly
Accessibility: WCAG 2.1 AA compliance
Responsive: Mobile-first approach, works on all devices
Fast Loading: Optimized images, lazy loading, code splitting with Turbopack
Intuitive Navigation: Clear hierarchy, breadcrumbs
Smooth Transitions: Using View Transitions API (React 19.2)

6.2 Color Scheme

Primary Colors: Inspired by Sikkim (mountains, nature)

Suggestions: Shades of blue (sky, rivers), green (forests), warm earth tones

Secondary Colors: Complementary accent colors
Neutral Colors: Grays for text and backgrounds
Dark mode support (optional, using CSS variables)

6.3 Typography

Headings: Modern sans-serif (Inter, Poppins, Outfit)
Body: Readable serif or sans-serif (Open Sans, Lato, Merriweather)
Variable fonts for performance
Bilingual Support: Support for English and Nepali/Hindi (if needed)

6.4 Components

Buttons: Clear primary, secondary, and tertiary styles with modern ripple effects
Cards: Consistent card design with subtle shadows and hover animations
Forms: Clean, validated input fields with floating labels
Modals: For confirmations and quick actions (using React portals)
Notifications: Toast notifications using modern libraries
Loading States: Skeletons, spinners, and progressive loading
Empty States: Friendly messages when no content
View Transitions: Smooth page-to-page animations

6.5 Animations

Smooth transitions between pages using View Transitions API
Hover effects on interactive elements
Scroll animations for landing page sections (subtle, performance-conscious)
Loading animations for async operations
Micro-interactions for better user feedback
CSS-first animations (avoiding unnecessary JavaScript)

9. Security Requirements
   9.1 Authentication & Authorization

Secure password hashing (bcrypt with salt rounds: 12)
JWT token management with NextAuth.js v5
Role-based access control (RBAC)
Session management with secure cookies
CSRF protection (built into Next.js)
Rate limiting on sensitive routes

9.2 Data Protection

Input validation and sanitization (Zod schemas)
XSS prevention (React's built-in escaping + DOMPurify for rich content)
SQL injection prevention (Prisma ORM parameterized queries)
File upload validation (size, type, malware scanning)
Rate limiting on API routes (using Vercel rate limiting or custom middleware)
Environment variables for secrets (.env.local)
Content Security Policy (CSP) headers

9.3 Privacy

GDPR compliance considerations
User data export/deletion on request
Privacy policy and terms of service
Cookie consent (if using analytics)
Data encryption at rest (database level)
Secure communication (HTTPS only)

9.4 Next.js 16 Security Features

Server-only code isolation
Secure proxy.ts configuration (if needed)
Environment variable validation
Secure caching strategies
