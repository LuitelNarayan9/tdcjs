// This is your Prisma schema file for Tumin Dhanbari Chandra Jyoti Sanstha
// Database: PostgreSQL
// ORM: Prisma 6+
// Next.js: 16 with React 19

generator client {
provider = "prisma-client-js"
}

datasource db {
provider = "postgresql"
url = env("DATABASE_URL")
}

// ============================================
// USER MANAGEMENT
// ============================================

enum Role {
USER
ADMIN
MODERATOR
}

enum UserStatus {
ACTIVE
PENDING
SUSPENDED
DELETED
}

enum Gender {
MALE
FEMALE
OTHER
}

model User {
id String @id @default(cuid())
email String @unique
emailVerified DateTime?
password String // Hashed password
name String
phone String?
role Role @default(USER)
status UserStatus @default(PENDING)
profileImage String?
dateOfBirth DateTime?
address String?
bio String? @db.Text

// Timestamps
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
lastLoginAt DateTime?

// Relations
accounts Account[]
sessions Session[]
familyNode FamilyNode?
forumThreads ForumThread[]
forumPosts ForumPost[]
blogPosts BlogPost[]
blogComments BlogComment[]
reactions Reaction[]
notifications Notification[]
activityLogs ActivityLog[]
reportsMade Report[] @relation("ReportedBy")
reportsReceived Report[] @relation("ReportedUser")
adminActions AdminAction[]
userPreferences UserPreferences?

@@index([email])
@@index([status])
@@index([role])
@@index([createdAt])
@@map("users")
}

// NextAuth.js Account model
model Account {
id String @id @default(cuid())
userId String
type String
provider String
providerAccountId String
refresh_token String? @db.Text
access_token String? @db.Text
expires_at Int?
token_type String?
scope String?
id_token String? @db.Text
session_state String?

user User @relation(fields: [userId], references: [id], onDelete: Cascade)

@@unique([provider, providerAccountId])
@@index([userId])
@@map("accounts")
}

// NextAuth.js Session model
model Session {
id String @id @default(cuid())
sessionToken String @unique
userId String
expires DateTime

user User @relation(fields: [userId], references: [id], onDelete: Cascade)

@@index([userId])
@@map("sessions")
}

// NextAuth.js Verification Token model
model VerificationToken {
identifier String
token String @unique
expires DateTime

@@unique([identifier, token])
@@map("verification_tokens")
}

// User Preferences
model UserPreferences {
id String @id @default(cuid())
userId String @unique
emailNotifications Boolean @default(true)
forumNotifications Boolean @default(true)
blogNotifications Boolean @default(true)
newsNotifications Boolean @default(true)
language String @default("en") // en, ne, hi
theme String @default("light") // light, dark, system

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

user User @relation(fields: [userId], references: [id], onDelete: Cascade)

@@map("user_preferences")
}

// ============================================
// FAMILY TREE
// ============================================

model FamilyNode {
id String @id @default(cuid())
userId String? @unique
fullName String
photo String?
dateOfBirth DateTime?
dateOfDeath DateTime?
gender Gender
occupation String?
currentLocation String?
biography String? @db.Text
isPrivate Boolean @default(false)
isDeceased Boolean @default(false)

// Family Relationships
parentId String?
spouseId String?

// Metadata
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
createdBy String? // Admin who created this node

// Relations
user User? @relation(fields: [userId], references: [id], onDelete: SetNull)
parent FamilyNode? @relation("ParentChild", fields: [parentId], references: [id], onDelete: SetNull)
children FamilyNode[] @relation("ParentChild")
spouse FamilyNode? @relation("Spouses", fields: [spouseId], references: [id], onDelete: SetNull)
spouseOf FamilyNode[] @relation("Spouses")

@@index([userId])
@@index([parentId])
@@index([spouseId])
@@index([fullName])
@@index([isPrivate])
@@map("family_nodes")
}

// ============================================
// FORUM SYSTEM
// ============================================

model ForumCategory {
id String @id @default(cuid())
name String
slug String @unique
description String? @db.Text
icon String?
color String? // Hex color for UI
order Int @default(0)
isActive Boolean @default(true)

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

threads ForumThread[]

@@index([slug])
@@index([isActive])
@@index([order])
@@map("forum_categories")
}

model ForumThread {
id String @id @default(cuid())
userId String
categoryId String
title String
slug String @unique
content String @db.Text
isPinned Boolean @default(false)
isLocked Boolean @default(false)
isFeatured Boolean @default(false)
views Int @default(0)

// SEO
metaTitle String?
metaDescription String?

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
lastActivityAt DateTime @default(now())

user User @relation(fields: [userId], references: [id], onDelete: Cascade)
category ForumCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)
posts ForumPost[]
reactions Reaction[]
reports Report[]

@@index([userId])
@@index([categoryId])
@@index([slug])
@@index([isPinned])
@@index([createdAt])
@@index([lastActivityAt])
@@index([views])
@@map("forum_threads")
}

model ForumPost {
id String @id @default(cuid())
userId String
threadId String
content String @db.Text
isEdited Boolean @default(false)
editedAt DateTime?

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

user User @relation(fields: [userId], references: [id], onDelete: Cascade)
thread ForumThread @relation(fields: [threadId], references: [id], onDelete: Cascade)
reactions Reaction[]
reports Report[]

@@index([userId])
@@index([threadId])
@@index([createdAt])
@@map("forum_posts")
}

// ============================================
// BLOG SYSTEM
// ============================================

enum PostStatus {
DRAFT
PUBLISHED
SCHEDULED
ARCHIVED
}

model BlogCategory {
id String @id @default(cuid())
name String
slug String @unique
description String? @db.Text
color String?
order Int @default(0)

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

posts BlogPost[]

@@index([slug])
@@map("blog_categories")
}

model BlogPost {
id String @id @default(cuid())
userId String
categoryId String
title String
slug String @unique
excerpt String? @db.Text
content String @db.Text
featuredImage String?
status PostStatus @default(DRAFT)
publishedAt DateTime?
scheduledAt DateTime?

// SEO
metaTitle String?
metaDescription String?
keywords String[]

// Stats
views Int @default(0)
readTime Int? // in minutes

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

user User @relation(fields: [userId], references: [id], onDelete: Cascade)
category BlogCategory @relation(fields: [categoryId], references: [id])
tags BlogTag[]
comments BlogComment[]
reactions Reaction[]

@@index([userId])
@@index([categoryId])
@@index([slug])
@@index([status])
@@index([publishedAt])
@@index([views])
@@map("blog_posts")
}

model BlogTag {
id String @id @default(cuid())
name String
slug String @unique

posts BlogPost[]

@@index([slug])
@@map("blog_tags")
}

model BlogComment {
id String @id @default(cuid())
userId String
blogPostId String
parentId String?
content String @db.Text
isApproved Boolean @default(true)

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

user User @relation(fields: [userId], references: [id], onDelete: Cascade)
blogPost BlogPost @relation(fields: [blogPostId], references: [id], onDelete: Cascade)
parent BlogComment? @relation("CommentReplies", fields: [parentId], references: [id], onDelete: Cascade)
replies BlogComment[] @relation("CommentReplies")
reactions Reaction[]
reports Report[]

@@index([userId])
@@index([blogPostId])
@@index([parentId])
@@index([createdAt])
@@index([isApproved])
@@map("blog_comments")
}

// ============================================
// NEWS SYSTEM
// ============================================

enum NewsPriority {
LOW
NORMAL
HIGH
URGENT
}

model NewsCategory {
id String @id @default(cuid())
name String
slug String @unique
description String? @db.Text
color String?
order Int @default(0)

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

news News[]

@@index([slug])
@@map("news_categories")
}

model News {
id String @id @default(cuid())
categoryId String
title String
slug String @unique
excerpt String? @db.Text
content String @db.Text
featuredImage String?
isFeatured Boolean @default(false)
priority NewsPriority @default(NORMAL)
publishedAt DateTime @default(now())
expiresAt DateTime? // For time-sensitive announcements

// SEO
metaTitle String?
metaDescription String?

// Stats
views Int @default(0)

// Author (Admin)
authorId String

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

category NewsCategory @relation(fields: [categoryId], references: [id])

@@index([categoryId])
@@index([slug])
@@index([isFeatured])
@@index([priority])
@@index([publishedAt])
@@index([views])
@@index([authorId])
@@map("news")
}

// ============================================
// EXECUTIVE MEMBERS
// ============================================

enum MemberStatus {
ACTIVE
INACTIVE
PAST
}

model ExecutiveMember {
id String @id @default(cuid())
name String
designation String
photo String?
email String?
phone String?
bio String? @db.Text

// Tenure
tenureStart DateTime
tenureEnd DateTime?
status MemberStatus @default(ACTIVE)

// Display
order Int @default(0)
priority Int @default(0) // For hierarchy (President=1, VP=2, etc.)

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

@@index([status])
@@index([order])
@@index([priority])
@@index([tenureStart])
@@map("executive_members")
}

// ============================================
// CONTACT INQUIRIES
// ============================================

enum InquiryStatus {
UNREAD
READ
REPLIED
RESOLVED
ARCHIVED
}

enum InquiryPriority {
LOW
NORMAL
HIGH
URGENT
}

model ContactInquiry {
id String @id @default(cuid())
name String
email String
phone String?
subject String
message String @db.Text
attachment String?
status InquiryStatus @default(UNREAD)
priority InquiryPriority @default(NORMAL)

// Response
response String? @db.Text
respondedBy String? // Admin user ID
respondedAt DateTime?

// Metadata
ipAddress String?
userAgent String?

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

@@index([status])
@@index([priority])
@@index([createdAt])
@@index([email])
@@map("contact_inquiries")
}

// ============================================
// REACTIONS SYSTEM
// ============================================

enum ReactionType {
LIKE
LOVE
HELPFUL
INSIGHTFUL
CELEBRATE
}

model Reaction {
id String @id @default(cuid())
userId String
reactionType ReactionType @default(LIKE)

// Polymorphic relation
itemType String // "thread", "post", "blog", "comment"
itemId String

createdAt DateTime @default(now())

user User @relation(fields: [userId], references: [id], onDelete: Cascade)

// Optional direct relations (for better querying)
forumThread ForumThread? @relation(fields: [threadId], references: [id], onDelete: Cascade)
threadId String?
forumPost ForumPost? @relation(fields: [postId], references: [id], onDelete: Cascade)
postId String?
blogPost BlogPost? @relation(fields: [blogPostId], references: [id], onDelete: Cascade)
blogPostId String?
blogComment BlogComment? @relation(fields: [commentId], references: [id], onDelete: Cascade)
commentId String?

@@unique([userId, itemType, itemId])
@@index([userId])
@@index([itemType, itemId])
@@index([threadId])
@@index([postId])
@@index([blogPostId])
@@index([commentId])
@@map("reactions")
}

// ============================================
// NOTIFICATIONS SYSTEM
// ============================================

enum NotificationType {
FORUM_REPLY
BLOG_COMMENT
MENTION
LIKE
ADMIN_MESSAGE
SYSTEM_ALERT
NEWS_UPDATE
EVENT_REMINDER
}

model Notification {
id String @id @default(cuid())
userId String
type NotificationType
title String
message String @db.Text
link String? // URL to the related content
isRead Boolean @default(false)

// Metadata
metadata Json? // Additional data (e.g., who mentioned you)

createdAt DateTime @default(now())
readAt DateTime?

user User @relation(fields: [userId], references: [id], onDelete: Cascade)

@@index([userId])
@@index([isRead])
@@index([createdAt])
@@index([type])
@@map("notifications")
}

// ============================================
// REPORTING & MODERATION
// ============================================

enum ReportReason {
SPAM
HARASSMENT
INAPPROPRIATE_CONTENT
MISINFORMATION
OFF_TOPIC
OTHER
}

enum ReportStatus {
PENDING
UNDER_REVIEW
RESOLVED
DISMISSED
}

model Report {
id String @id @default(cuid())
reportedBy String
reportedUserId String? // User who created the reported content
reason ReportReason
description String? @db.Text
status ReportStatus @default(PENDING)

// Polymorphic relation to reported item
itemType String // "thread", "post", "comment"
itemId String

// Resolution
resolvedBy String? // Admin who resolved
resolvedAt DateTime?
resolution String? @db.Text

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

reporter User @relation("ReportedBy", fields: [reportedBy], references: [id], onDelete: Cascade)
reportedUser User? @relation("ReportedUser", fields: [reportedUserId], references: [id], onDelete: SetNull)

// Optional direct relations
forumThread ForumThread? @relation(fields: [threadId], references: [id], onDelete: Cascade)
threadId String?
forumPost ForumPost? @relation(fields: [postId], references: [id], onDelete: Cascade)
postId String?
blogComment BlogComment? @relation(fields: [commentId], references: [id], onDelete: Cascade)
commentId String?

@@index([reportedBy])
@@index([reportedUserId])
@@index([status])
@@index([createdAt])
@@index([itemType, itemId])
@@map("reports")
}

// ============================================
// ADMIN ACTIONS LOG
// ============================================

enum AdminActionType {
USER_APPROVED
USER_SUSPENDED
USER_DELETED
CONTENT_DELETED
CONTENT_APPROVED
CONTENT_FEATURED
ROLE_CHANGED
REPORT_RESOLVED
SETTINGS_UPDATED
OTHER
}

model AdminAction {
id String @id @default(cuid())
adminId String
actionType AdminActionType
targetType String? // "user", "thread", "post", "blog", etc.
targetId String?
description String @db.Text
metadata Json? // Additional data about the action

createdAt DateTime @default(now())

admin User @relation(fields: [adminId], references: [id], onDelete: Cascade)

@@index([adminId])
@@index([actionType])
@@index([createdAt])
@@index([targetType, targetId])
@@map("admin_actions")
}

// ============================================
// ACTIVITY LOG
// ============================================

enum ActivityType {
LOGIN
LOGOUT
PROFILE_UPDATE
PASSWORD_CHANGE
POST_CREATED
COMMENT_CREATED
THREAD_CREATED
CONTENT_VIEWED
CONTENT_SHARED
FAMILY_TREE_UPDATED
OTHER
}

model ActivityLog {
id String @id @default(cuid())
userId String
activityType ActivityType
description String
metadata Json? // Additional context
ipAddress String?
userAgent String?

createdAt DateTime @default(now())

user User @relation(fields: [userId], references: [id], onDelete: Cascade)

@@index([userId])
@@index([activityType])
@@index([createdAt])
@@map("activity_logs")
}

// ============================================
// ANALYTICS & METRICS
// ============================================

model PageView {
id String @id @default(cuid())
path String
userId String? // Null for anonymous users
sessionId String?
referrer String?
ipAddress String?
userAgent String?
country String?
city String?

// Performance metrics
loadTime Int? // milliseconds

createdAt DateTime @default(now())

@@index([path])
@@index([userId])
@@index([sessionId])
@@index([createdAt])
@@index([country])
@@map("page_views")
}

model SiteMetrics {
id String @id @default(cuid())
date DateTime @unique @default(now())

// User metrics
totalUsers Int @default(0)
activeUsers Int @default(0)
newUsers Int @default(0)

// Content metrics
totalThreads Int @default(0)
totalPosts Int @default(0)
totalBlogs Int @default(0)
totalComments Int @default(0)
newThreads Int @default(0)
newPosts Int @default(0)
newBlogs Int @default(0)
newComments Int @default(0)

// Engagement metrics
totalViews Int @default(0)
totalReactions Int @default(0)
avgSessionDuration Float? // minutes
bounceRate Float? // percentage

// Family tree metrics
totalFamilyNodes Int @default(0)
newFamilyNodes Int @default(0)

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

@@index([date])
@@map("site_metrics")
}

// ============================================
// SEARCH & INDEXING
// ============================================

model SearchIndex {
id String @id @default(cuid())
itemType String // "thread", "post", "blog", "news"
itemId String
title String?
content String @db.Text
metadata Json?

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

@@unique([itemType, itemId])
@@index([itemType])
@@map("search_index")
}

// ============================================
// SITE SETTINGS
// ============================================

model SiteSetting {
id String @id @default(cuid())
key String @unique
value String @db.Text
type String @default("string") // string, number, boolean, json
category String @default("general") // general, seo, email, etc.
description String?

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

@@index([key])
@@index([category])
@@map("site_settings")
}

// ============================================
// EMAIL TEMPLATES
// ============================================

model EmailTemplate {
id String @id @default(cuid())
name String @unique
subject String
body String @db.Text
variables String[] // Array of available variables
isActive Boolean @default(true)

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

@@index([name])
@@map("email_templates")
}

// ============================================
// FILE UPLOADS
// ============================================

enum FileType {
IMAGE
DOCUMENT
VIDEO
OTHER
}

model Upload {
id String @id @default(cuid())
userId String?
filename String
originalName String
mimeType String
size Int // bytes
fileType FileType
url String
path String

// Metadata
width Int? // for images
height Int? // for images

createdAt DateTime @default(now())

@@index([userId])
@@index([fileType])
@@index([createdAt])
@@map("uploads")
}

// ============================================
// CACHE (Optional - for application-level caching)
// ============================================

model CacheEntry {
id String @id @default(cuid())
key String @unique
value String @db.Text
expiresAt DateTime?
tags String[]

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

@@index([key])
@@index([expiresAt])
@@map("cache_entries")
}

// ============================================
// BACKUP & AUDIT
// ============================================

model DataBackup {
id String @id @default(cuid())
tableName String
backupData Json
reason String?
createdBy String?

createdAt DateTime @default(now())

@@index([tableName])
@@index([createdAt])
@@map("data_backups")
}

// ============================================
// AUDIT LOG
// ============================================

model AuditLog {
id String @id @default(cuid())
userId String
action String
description String
metadata Json?

createdAt DateTime @default(now())

user User @relation(fields: [userId], references: [id], onDelete: Cascade)

@@index([userId])
@@index([action])
@@index([createdAt])
@@map("audit_logs")
}
