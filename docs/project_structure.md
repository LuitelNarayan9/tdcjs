tumin-dhanbari-sanstha/
├── .github/
│ ├── workflows/
│ │ ├── ci.yml
│ │ ├── deploy-production.yml
│ │ ├── deploy-staging.yml
│ │ ├── test.yml
│ │ └── lint.yml
│ ├── ISSUE*TEMPLATE/
│ │ ├── bug_report.md
│ │ ├── feature_request.md
│ │ └── security_report.md
│ ├── PULL_REQUEST_TEMPLATE.md
│ └── dependabot.yml
│
├── public/
│ ├── images/
│ │ ├── logo/
│ │ │ ├── logo.svg
│ │ │ ├── logo-dark.svg
│ │ │ ├── logo-light.svg
│ │ │ └── favicon.ico
│ │ ├── hero/
│ │ │ ├── village-hero-1.jpg
│ │ │ ├── village-hero-2.jpg
│ │ │ ├── village-hero-mobile.jpg
│ │ │ └── village-banner.jpg
│ │ ├── placeholders/
│ │ │ ├── avatar-placeholder.png
│ │ │ ├── image-placeholder.png
│ │ │ ├── no-image.svg
│ │ │ └── no-video.svg
│ │ ├── icons/
│ │ │ ├── forum-icon.svg
│ │ │ ├── blog-icon.svg
│ │ │ ├── tree-icon.svg
│ │ │ ├── news-icon.svg
│ │ │ ├── event-icon.svg
│ │ │ ├── gallery-icon.svg
│ │ │ ├── document-icon.svg
│ │ │ ├── donation-icon.svg
│ │ │ ├── message-icon.svg
│ │ │ └── video-icon.svg
│ │ ├── about/
│ │ │ ├── village-history.jpg
│ │ │ ├── village-culture.jpg
│ │ │ └── village-landscape.jpg
│ │ └── badges/
│ │ ├── badge-bronze.svg
│ │ ├── badge-silver.svg
│ │ ├── badge-gold.svg
│ │ └── badge-platinum.svg
│ ├── fonts/
│ │ ├── inter/
│ │ │ ├── inter-var.woff2
│ │ │ └── inter-var.woff
│ │ ├── poppins/
│ │ │ ├── poppins-regular.woff2
│ │ │ ├── poppins-medium.woff2
│ │ │ └── poppins-bold.woff2
│ │ └── noto-sans-devanagari/
│ │ ├── noto-sans-devanagari.woff2
│ │ └── noto-sans-devanagari.woff
│ ├── documents/
│ │ ├── constitution.pdf
│ │ ├── privacy-policy.pdf
│ │ └── terms-of-service.pdf
│ ├── locales/
│ │ ├── en/
│ │ │ ├── common.json
│ │ │ ├── auth.json
│ │ │ ├── forum.json
│ │ │ ├── blog.json
│ │ │ └── errors.json
│ │ ├── ne/
│ │ │ ├── common.json
│ │ │ ├── auth.json
│ │ │ └── errors.json
│ │ └── hi/
│ │ ├── common.json
│ │ ├── auth.json
│ │ └── errors.json
│ ├── sw.js # Service Worker for PWA
│ ├── manifest.json # PWA manifest
│ ├── robots.txt
│ └── sitemap.xml
│
├── src/
│ ├── app/
│ │ ├── [locale]/ # i18n support
│ │ │ ├── (public)/ # Public routes (no auth)
│ │ │ │ ├── layout.tsx
│ │ │ │ ├── page.tsx # Landing page
│ │ │ │ ├── loading.tsx
│ │ │ │ ├── news/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── loading.tsx
│ │ │ │ │ ├── [slug]/
│ │ │ │ │ │ ├── page.tsx
│ │ │ │ │ │ └── loading.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── news-card.tsx
│ │ │ │ │ ├── news-grid.tsx
│ │ │ │ │ ├── news-filters.tsx
│ │ │ │ │ └── featured-news.tsx
│ │ │ │ ├── contact/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── contact-form.tsx
│ │ │ │ │ ├── contact-info.tsx
│ │ │ │ │ └── map-embed.tsx
│ │ │ │ └── about-village/
│ │ │ │ ├── page.tsx
│ │ │ │ └── \_components/
│ │ │ │ └── village-info.tsx
│ │ │ │
│ │ │ ├── (auth)/ # Auth routes
│ │ │ │ ├── layout.tsx
│ │ │ │ ├── login/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ └── login-form.tsx
│ │ │ │ ├── register/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ └── register-form.tsx
│ │ │ │ ├── forgot-password/
│ │ │ │ │ └── page.tsx
│ │ │ │ ├── reset-password/
│ │ │ │ │ └── page.tsx
│ │ │ │ └── verify-email/
│ │ │ │ └── page.tsx
│ │ │ │
│ │ │ ├── (protected)/ # Protected routes (auth required)
│ │ │ │ ├── layout.tsx
│ │ │ │ ├── dashboard/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── loading.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── stats-overview.tsx
│ │ │ │ │ ├── recent-activity.tsx
│ │ │ │ │ ├── quick-actions.tsx
│ │ │ │ │ ├── upcoming-events.tsx
│ │ │ │ │ └── notifications-widget.tsx
│ │ │ │ │
│ │ │ │ ├── forum/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── loading.tsx
│ │ │ │ │ ├── [categorySlug]/
│ │ │ │ │ │ ├── page.tsx
│ │ │ │ │ │ └── loading.tsx
│ │ │ │ │ ├── thread/
│ │ │ │ │ │ ├── [threadSlug]/
│ │ │ │ │ │ │ ├── page.tsx
│ │ │ │ │ │ │ └── loading.tsx
│ │ │ │ │ │ └── new/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── category-card.tsx
│ │ │ │ │ ├── thread-card.tsx
│ │ │ │ │ ├── thread-list.tsx
│ │ │ │ │ ├── post-card.tsx
│ │ │ │ │ ├── post-editor.tsx
│ │ │ │ │ ├── thread-filters.tsx
│ │ │ │ │ ├── forum-search.tsx
│ │ │ │ │ └── thread-actions.tsx
│ │ │ │ │
│ │ │ │ ├── blogs/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── loading.tsx
│ │ │ │ │ ├── [slug]/
│ │ │ │ │ │ ├── page.tsx
│ │ │ │ │ │ └── loading.tsx
│ │ │ │ │ ├── category/
│ │ │ │ │ │ └── [categorySlug]/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── blog-card.tsx
│ │ │ │ │ ├── blog-grid.tsx
│ │ │ │ │ ├── blog-list.tsx
│ │ │ │ │ ├── blog-filters.tsx
│ │ │ │ │ ├── blog-sidebar.tsx
│ │ │ │ │ ├── comment-section.tsx
│ │ │ │ │ ├── comment-item.tsx
│ │ │ │ │ ├── comment-form.tsx
│ │ │ │ │ └── related-posts.tsx
│ │ │ │ │
│ │ │ │ ├── family-tree/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── loading.tsx
│ │ │ │ │ ├── edit/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── tree-canvas.tsx
│ │ │ │ │ ├── d3-tree-visualization.tsx
│ │ │ │ │ ├── tree-controls.tsx
│ │ │ │ │ ├── tree-zoom-controls.tsx
│ │ │ │ │ ├── node-card.tsx
│ │ │ │ │ ├── node-detail-modal.tsx
│ │ │ │ │ ├── edit-node-form.tsx
│ │ │ │ │ ├── search-tree.tsx
│ │ │ │ │ ├── tree-legend.tsx
│ │ │ │ │ ├── tree-list-view.tsx
│ │ │ │ │ └── ai-suggestions.tsx
│ │ │ │ │
│ │ │ │ ├── events/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── loading.tsx
│ │ │ │ │ ├── [slug]/
│ │ │ │ │ │ ├── page.tsx
│ │ │ │ │ │ └── loading.tsx
│ │ │ │ │ ├── create/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ ├── my-events/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── event-card.tsx
│ │ │ │ │ ├── event-grid.tsx
│ │ │ │ │ ├── event-calendar.tsx
│ │ │ │ │ ├── event-filters.tsx
│ │ │ │ │ ├── rsvp-button.tsx
│ │ │ │ │ ├── attendees-list.tsx
│ │ │ │ │ └── event-form.tsx
│ │ │ │ │
│ │ │ │ ├── gallery/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── loading.tsx
│ │ │ │ │ ├── albums/
│ │ │ │ │ │ ├── page.tsx
│ │ │ │ │ │ ├── [slug]/
│ │ │ │ │ │ │ ├── page.tsx
│ │ │ │ │ │ │ └── loading.tsx
│ │ │ │ │ │ └── create/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── album-card.tsx
│ │ │ │ │ ├── album-grid.tsx
│ │ │ │ │ ├── photo-grid.tsx
│ │ │ │ │ ├── photo-lightbox.tsx
│ │ │ │ │ ├── photo-upload.tsx
│ │ │ │ │ ├── photo-tagging.tsx
│ │ │ │ │ └── album-form.tsx
│ │ │ │ │
│ │ │ │ ├── documents/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── loading.tsx
│ │ │ │ │ ├── [slug]/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ ├── category/
│ │ │ │ │ │ └── [categorySlug]/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── document-card.tsx
│ │ │ │ │ ├── document-list.tsx
│ │ │ │ │ ├── document-viewer.tsx
│ │ │ │ │ ├── version-history.tsx
│ │ │ │ │ └── document-permissions.tsx
│ │ │ │ │
│ │ │ │ ├── donations/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── campaigns/
│ │ │ │ │ │ ├── page.tsx
│ │ │ │ │ │ └── [slug]/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ ├── my-donations/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── campaign-card.tsx
│ │ │ │ │ ├── donation-form.tsx
│ │ │ │ │ ├── payment-gateway.tsx
│ │ │ │ │ ├── donation-receipt.tsx
│ │ │ │ │ └── progress-bar.tsx
│ │ │ │ │
│ │ │ │ ├── members/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── loading.tsx
│ │ │ │ │ ├── [userId]/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── member-card.tsx
│ │ │ │ │ ├── member-grid.tsx
│ │ │ │ │ ├── member-search.tsx
│ │ │ │ │ ├── member-filters.tsx
│ │ │ │ │ └── badges-display.tsx
│ │ │ │ │
│ │ │ │ ├── messages/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── loading.tsx
│ │ │ │ │ ├── [conversationId]/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── conversation-list.tsx
│ │ │ │ │ ├── conversation-item.tsx
│ │ │ │ │ ├── message-list.tsx
│ │ │ │ │ ├── message-item.tsx
│ │ │ │ │ ├── message-input.tsx
│ │ │ │ │ ├── file-attachment.tsx
│ │ │ │ │ └── typing-indicator.tsx
│ │ │ │ │
│ │ │ │ ├── videos/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── loading.tsx
│ │ │ │ │ ├── [slug]/
│ │ │ │ │ │ ├── page.tsx
│ │ │ │ │ │ └── loading.tsx
│ │ │ │ │ ├── upload/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ ├── live/
│ │ │ │ │ │ ├── page.tsx
│ │ │ │ │ │ └── [streamId]/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── video-card.tsx
│ │ │ │ │ ├── video-grid.tsx
│ │ │ │ │ ├── video-player.tsx
│ │ │ │ │ ├── video-upload-form.tsx
│ │ │ │ │ ├── live-stream-player.tsx
│ │ │ │ │ └── video-comments.tsx
│ │ │ │ │
│ │ │ │ ├── leaderboard/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── leaderboard-table.tsx
│ │ │ │ │ ├── user-rank-card.tsx
│ │ │ │ │ └── points-breakdown.tsx
│ │ │ │ │
│ │ │ │ ├── about-sanstha/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── history-section.tsx
│ │ │ │ │ ├── mission-vision.tsx
│ │ │ │ │ ├── executive-members.tsx
│ │ │ │ │ ├── member-card.tsx
│ │ │ │ │ ├── achievements.tsx
│ │ │ │ │ └── documents-section.tsx
│ │ │ │ │
│ │ │ │ └── profile/
│ │ │ │ ├── page.tsx
│ │ │ │ ├── loading.tsx
│ │ │ │ ├── edit/
│ │ │ │ │ └── page.tsx
│ │ │ │ ├── settings/
│ │ │ │ │ └── page.tsx
│ │ │ │ ├── achievements/
│ │ │ │ │ └── page.tsx
│ │ │ │ └── \_components/
│ │ │ │ ├── profile-header.tsx
│ │ │ │ ├── profile-stats.tsx
│ │ │ │ ├── activity-feed.tsx
│ │ │ │ ├── edit-profile-form.tsx
│ │ │ │ ├── settings-form.tsx
│ │ │ │ ├── badges-showcase.tsx
│ │ │ │ └── achievements-grid.tsx
│ │ │ │
│ │ │ └── (admin)/ # Admin routes
│ │ │ ├── layout.tsx
│ │ │ ├── admin/
│ │ │ │ ├── page.tsx # Admin dashboard
│ │ │ │ ├── loading.tsx
│ │ │ │ │
│ │ │ │ ├── users/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── [userId]/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── user-table.tsx
│ │ │ │ │ ├── user-filters.tsx
│ │ │ │ │ ├── user-actions.tsx
│ │ │ │ │ └── bulk-actions.tsx
│ │ │ │ │
│ │ │ │ ├── forum/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── categories/
│ │ │ │ │ │ ├── page.tsx
│ │ │ │ │ │ └── \_components/
│ │ │ │ │ │ └── category-manager.tsx
│ │ │ │ │ ├── reported/
│ │ │ │ │ │ ├── page.tsx
│ │ │ │ │ │ └── \_components/
│ │ │ │ │ │ └── report-queue.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── moderation-dashboard.tsx
│ │ │ │ │ └── report-card.tsx
│ │ │ │ │
│ │ │ │ ├── blogs/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── new/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ ├── edit/
│ │ │ │ │ │ └── [blogId]/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ ├── categories/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── blog-editor.tsx
│ │ │ │ │ ├── blog-list-admin.tsx
│ │ │ │ │ ├── category-manager.tsx
│ │ │ │ │ └── media-library.tsx
│ │ │ │ │
│ │ │ │ ├── news/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── new/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ ├── edit/
│ │ │ │ │ │ └── [newsId]/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── news-editor.tsx
│ │ │ │ │ ├── news-list-admin.tsx
│ │ │ │ │ └── news-scheduler.tsx
│ │ │ │ │
│ │ │ │ ├── events/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── new/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ ├── edit/
│ │ │ │ │ │ └── [eventId]/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── event-editor.tsx
│ │ │ │ │ ├── event-list-admin.tsx
│ │ │ │ │ └── attendees-manager.tsx
│ │ │ │ │
│ │ │ │ ├── family-tree/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── import/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ ├── export/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── admin-tree-editor.tsx
│ │ │ │ │ ├── bulk-import.tsx
│ │ │ │ │ ├── merge-nodes.tsx
│ │ │ │ │ └── tree-analytics.tsx
│ │ │ │ │
│ │ │ │ ├── gallery/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── albums/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── album-manager.tsx
│ │ │ │ │ └── photo-moderation.tsx
│ │ │ │ │
│ │ │ │ ├── documents/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── upload/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── document-manager.tsx
│ │ │ │ │ └── access-control.tsx
│ │ │ │ │
│ │ │ │ ├── donations/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── campaigns/
│ │ │ │ │ │ ├── page.tsx
│ │ │ │ │ │ ├── new/
│ │ │ │ │ │ │ └── page.tsx
│ │ │ │ │ │ └── edit/
│ │ │ │ │ │ └── [campaignId]/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── donation-list.tsx
│ │ │ │ │ ├── campaign-manager.tsx
│ │ │ │ │ └── transaction-history.tsx
│ │ │ │ │
│ │ │ │ ├── videos/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── moderation/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── video-manager.tsx
│ │ │ │ │ └── streaming-settings.tsx
│ │ │ │ │
│ │ │ │ ├── executive-members/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── new/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ ├── edit/
│ │ │ │ │ │ └── [memberId]/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── member-form.tsx
│ │ │ │ │ ├── member-list-admin.tsx
│ │ │ │ │ └── tenure-manager.tsx
│ │ │ │ │
│ │ │ │ ├── contact/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── [inquiryId]/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── inquiry-list.tsx
│ │ │ │ │ ├── inquiry-detail.tsx
│ │ │ │ │ └── reply-form.tsx
│ │ │ │ │
│ │ │ │ ├── gamification/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── badges/
│ │ │ │ │ │ ├── page.tsx
│ │ │ │ │ │ └── \_components/
│ │ │ │ │ │ └── badge-manager.tsx
│ │ │ │ │ ├── achievements/
│ │ │ │ │ │ ├── page.tsx
│ │ │ │ │ │ └── \_components/
│ │ │ │ │ │ └── achievement-manager.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── points-system.tsx
│ │ │ │ │ └── leaderboard-settings.tsx
│ │ │ │ │
│ │ │ │ ├── analytics/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── users/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ ├── content/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ ├── engagement/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── analytics-overview.tsx
│ │ │ │ │ ├── charts/
│ │ │ │ │ │ ├── line-chart.tsx
│ │ │ │ │ │ ├── bar-chart.tsx
│ │ │ │ │ │ ├── pie-chart.tsx
│ │ │ │ │ │ └── area-chart.tsx
│ │ │ │ │ ├── user-metrics.tsx
│ │ │ │ │ ├── content-metrics.tsx
│ │ │ │ │ └── engagement-metrics.tsx
│ │ │ │ │
│ │ │ │ ├── settings/
│ │ │ │ │ ├── page.tsx
│ │ │ │ │ ├── general/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ ├── seo/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ ├── email/
│ │ │ │ │ │ ├── page.tsx
│ │ │ │ │ │ └── templates/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ ├── payments/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ ├── integrations/
│ │ │ │ │ │ └── page.tsx
│ │ │ │ │ └── \_components/
│ │ │ │ │ ├── settings-form.tsx
│ │ │ │ │ ├── seo-settings.tsx
│ │ │ │ │ ├── email-templates.tsx
│ │ │ │ │ ├── payment-settings.tsx
│ │ │ │ │ └── integration-cards.tsx
│ │ │ │ │
│ │ │ │ └── \_components/
│ │ │ │ ├── admin-sidebar.tsx
│ │ │ │ ├── admin-header.tsx
│ │ │ │ ├── stats-widget.tsx
│ │ │ │ ├── quick-actions.tsx
│ │ │ │ └── recent-activities.tsx
│ │ │
│ │ ├── api/ # API Routes
│ │ │ ├── auth/
│ │ │ │ └── [...nextauth]/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── users/
│ │ │ │ ├── route.ts # GET, POST
│ │ │ │ ├── [userId]/
│ │ │ │ │ └── route.ts # GET, PUT, DELETE
│ │ │ │ ├── approve/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── suspend/
│ │ │ │ │ └── route.ts
│ │ │ │ └── profile/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── forum/
│ │ │ │ ├── categories/
│ │ │ │ │ ├── route.ts
│ │ │ │ │ └── [categoryId]/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── threads/
│ │ │ │ │ ├── route.ts
│ │ │ │ │ └── [threadId]/
│ │ │ │ │ ├── route.ts
│ │ │ │ │ ├── posts/
│ │ │ │ │ │ └── route.ts
│ │ │ │ │ └── views/
│ │ │ │ │ └── route.ts
│ │ │ │ └── posts/
│ │ │ │ └── [postId]/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── blogs/
│ │ │ │ ├── route.ts
│ │ │ │ ├── [blogId]/
│ │ │ │ │ ├── route.ts
│ │ │ │ │ └── comments/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── categories/
│ │ │ │ │ └── route.ts
│ │ │ │ └── tags/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── news/
│ │ │ │ ├── route.ts
│ │ │ │ └── [newsId]/
│ │ │ │ ├── route.ts
│ │ │ │ └── views/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── events/
│ │ │ │ ├── route.ts
│ │ │ │ ├── [eventId]/
│ │ │ │ │ ├── route.ts
│ │ │ │ │ ├── rsvp/
│ │ │ │ │ │ └── route.ts
│ │ │ │ │ └── attendees/
│ │ │ │ │ └── route.ts
│ │ │ │ └── categories/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── family-tree/
│ │ │ │ ├── route.ts
│ │ │ │ ├── nodes/
│ │ │ │ │ ├── route.ts
│ │ │ │ │ └── [nodeId]/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── search/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── suggestions/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── import/
│ │ │ │ │ └── route.ts
│ │ │ │ └── export/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── gallery/
│ │ │ │ ├── albums/
│ │ │ │ │ ├── route.ts
│ │ │ │ │ └── [albumId]/
│ │ │ │ │ ├── route.ts
│ │ │ │ │ └── photos/
│ │ │ │ │ └── route.ts
│ │ │ │ └── photos/
│ │ │ │ ├── route.ts
│ │ │ │ └── [photoId]/
│ │ │ │ ├── route.ts
│ │ │ │ ├── comments/
│ │ │ │ │ └── route.ts
│ │ │ │ └── reactions/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── documents/
│ │ │ │ ├── route.ts
│ │ │ │ ├── [documentId]/
│ │ │ │ │ ├── route.ts
│ │ │ │ │ ├── download/
│ │ │ │ │ │ └── route.ts
│ │ │ │ │ └── versions/
│ │ │ │ │ └── route.ts
│ │ │ │ └── categories/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── donations/
│ │ │ │ ├── route.ts
│ │ │ │ ├── campaigns/
│ │ │ │ │ ├── route.ts
│ │ │ │ │ └── [campaignId]/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── payment/
│ │ │ │ │ ├── razorpay/
│ │ │ │ │ │ ├── create/
│ │ │ │ │ │ │ └── route.ts
│ │ │ │ │ │ └── verify/
│ │ │ │ │ │ └── route.ts
│ │ │ │ │ └── stripe/
│ │ │ │ │ ├── create/
│ │ │ │ │ │ └── route.ts
│ │ │ │ │ └── webhook/
│ │ │ │ │ └── route.ts
│ │ │ │ └── receipt/
│ │ │ │ └── [donationId]/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── members/
│ │ │ │ ├── route.ts
│ │ │ │ ├── [userId]/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── search/
│ │ │ │ │ └── route.ts
│ │ │ │ └── badges/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── messages/
│ │ │ │ ├── conversations/
│ │ │ │ │ ├── route.ts
│ │ │ │ │ └── [conversationId]/
│ │ │ │ │ ├── route.ts
│ │ │ │ │ └── messages/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── messages/
│ │ │ │ │ ├── route.ts
│ │ │ │ │ └── [messageId]/
│ │ │ │ │ ├── route.ts
│ │ │ │ │ └── read/
│ │ │ │ │ └── route.ts
│ │ │ │ └── typing/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── videos/
│ │ │ │ ├── route.ts
│ │ │ │ ├── [videoId]/
│ │ │ │ │ ├── route.ts
│ │ │ │ │ ├── comments/
│ │ │ │ │ │ └── route.ts
│ │ │ │ │ └── views/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── upload/
│ │ │ │ │ └── route.ts
│ │ │ │ └── live/
│ │ │ │ ├── route.ts
│ │ │ │ └── [streamId]/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── executive-members/
│ │ │ │ ├── route.ts
│ │ │ │ └── [memberId]/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── contact/
│ │ │ │ ├── route.ts
│ │ │ │ └── [inquiryId]/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── reactions/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── notifications/
│ │ │ │ ├── route.ts
│ │ │ │ └── [notificationId]/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── reports/
│ │ │ │ ├── route.ts
│ │ │ │ └── [reportId]/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── gamification/
│ │ │ │ ├── points/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── badges/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── achievements/
│ │ │ │ │ └── route.ts
│ │ │ │ └── leaderboard/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── analytics/
│ │ │ │ ├── page-views/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── metrics/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── export/
│ │ │ │ │ └── route.ts
│ │ │ │ └── track/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── upload/
│ │ │ │ ├── image/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── document/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── video/
│ │ │ │ │ └── route.ts
│ │ │ │ └── avatar/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── search/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── i18n/
│ │ │ │ └── [locale]/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── push-notifications/
│ │ │ │ ├── subscribe/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── unsubscribe/
│ │ │ │ │ └── route.ts
│ │ │ │ └── send/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ ├── webhooks/
│ │ │ │ ├── razorpay/
│ │ │ │ │ └── route.ts
│ │ │ │ ├── stripe/
│ │ │ │ │ └── route.ts
│ │ │ │ └── cloudinary/
│ │ │ │ └── route.ts
│ │ │ │
│ │ │ └── settings/
│ │ │ ├── route.ts
│ │ │ └── [key]/
│ │ │ └── route.ts
│ │ │
│ │ ├── error.tsx
│ │ ├── loading.tsx
│ │ ├── not-found.tsx
│ │ ├── layout.tsx
│ │ └── globals.css
│ │
│ ├── components/
│ │ ├── ui/ # Reusable UI components
│ │ │ ├── button.tsx
│ │ │ ├── input.tsx
│ │ │ ├── textarea.tsx
│ │ │ ├── select.tsx
│ │ │ ├── checkbox.tsx
│ │ │ ├── radio.tsx
│ │ │ ├── switch.tsx
│ │ │ ├── slider.tsx
│ │ │ ├── card.tsx
│ │ │ ├── badge.tsx
│ │ │ ├── avatar.tsx
│ │ │ ├── avatar-group.tsx
│ │ │ ├── modal.tsx
│ │ │ ├── dialog.tsx
│ │ │ ├── dropdown.tsx
│ │ │ ├── menu.tsx
│ │ │ ├── tabs.tsx
│ │ │ ├── accordion.tsx
│ │ │ ├── tooltip.tsx
│ │ │ ├── popover.tsx
│ │ │ ├── alert.tsx
│ │ │ ├── toast.tsx
│ │ │ ├── skeleton.tsx
│ │ │ ├── spinner.tsx
│ │ │ ├── progress.tsx
│ │ │ ├── separator.tsx
│ │ │ ├── table.tsx
│ │ │ ├── pagination.tsx
│ │ │ ├── breadcrumb.tsx
│ │ │ ├── calendar.tsx
│ │ │ ├── date-picker.tsx
│ │ │ ├── time-picker.tsx
│ │ │ ├── command.tsx
│ │ │ ├── sheet.tsx
│ │ │ └── scroll-area.tsx
│ │ │
│ │ ├── layouts/ # Layout components
│ │ │ ├── header/
│ │ │ │ ├── header.tsx
│ │ │ │ ├── nav-menu.tsx
│ │ │ │ ├── mobile-menu.tsx
│ │ │ │ ├── user-menu.tsx
│ │ │ │ ├── search-bar.tsx
│ │ │ │ ├── notification-bell.tsx
│ │ │ │ └── language-switcher.tsx
│ │ │ ├── footer/
│ │ │ │ ├── footer.tsx
│ │ │ │ ├── footer-column.tsx
│ │ │ │ ├── social-links.tsx
│ │ │ │ └── newsletter-form.tsx
│ │ │ ├── sidebar/
│ │ │ │ ├── sidebar.tsx
│ │ │ │ ├── sidebar-nav.tsx
│ │ │ │ ├── sidebar-item.tsx
│ │ │ │ └── sidebar-toggle.tsx
│ │ │ └── container.tsx
│ │ │
│ │ ├── features/ # Feature-specific components
│ │ │ ├── auth/
│ │ │ │ ├── auth-guard.tsx
│ │ │ │ ├── role-guard.tsx
│ │ │ │ ├── session-provider.tsx
│ │ │ │ └── social-login.tsx
│ │ │ │
│ │ │ ├── landing/
│ │ │ │ ├── hero-section.tsx
│ │ │ │ ├── about-section.tsx
│ │ │ │ ├── features-section.tsx
│ │ │ │ ├── stats-section.tsx
│ │ │ │ ├── news-highlights.tsx
│ │ │ │ ├── events-preview.tsx
│ │ │ │ ├── testimonials.tsx
│ │ │ │ └── cta-section.tsx
│ │ │ │
│ │ │ ├── forum/
│ │ │ │ ├── thread-composer.tsx
│ │ │ │ ├── post-composer.tsx
│ │ │ │ ├── thread-actions.tsx
│ │ │ │ ├── post-actions.tsx
│ │ │ │ └── mention-autocomplete.tsx
│ │ │ │
│ │ │ ├── blog/
│ │ │ │ ├── blog-card-grid.tsx
│ │ │ │ ├── blog-card-list.tsx
│ │ │ │ ├── blog-header.tsx
│ │ │ │ ├── blog-content.tsx
│ │ │ │ ├── blog-meta.tsx
│ │ │ │ ├── share-buttons.tsx
│ │ │ │ └── reading-progress.tsx
│ │ │ │
│ │ │ ├── family-tree/
│ │ │ │ ├── d3-tree-visualization.tsx
│ │ │ │ ├── tree-zoom-controls.tsx
│ │ │ │ ├── tree-node.tsx
│ │ │ │ ├── tree-tooltip.tsx
│ │ │ │ └── relationship-connector.tsx
│ │ │ │
│ │ │ ├── events/
│ │ │ │ ├── event-calendar-view.tsx
│ │ │ │ ├── event-list-view.tsx
│ │ │ │ ├── event-detail.tsx
│ │ │ │ └── rsvp-widget.tsx
│ │ │ │
│ │ │ ├── gallery/
│ │ │ │ ├── masonry-grid.tsx
│ │ │ │ ├── lightbox.tsx
│ │ │ │ ├── image-zoom.tsx
│ │ │ │ └── photo-tagging-ui.tsx
│ │ │ │
│ │ │ ├── documents/
│ │ │ │ ├── pdf-viewer.tsx
│ │ │ │ ├── document-preview.tsx
│ │ │ │ └── version-diff.tsx
│ │ │ │
│ │ │ ├── donations/
│ │ │ │ ├── payment-form.tsx
│ │ │ │ ├── campaign-progress.tsx
│ │ │ │ └── donor-wall.tsx
│ │ │ │
│ │ │ ├── messaging/
│ │ │ │ ├── chat-window.tsx
│ │ │ │ ├── message-bubble.tsx
│ │ │ │ ├── emoji-picker.tsx
│ │ │ │ └── voice-recorder.tsx
│ │ │ │
│ │ │ ├── video/
│ │ │ │ ├── video-player.tsx
│ │ │ │ ├── video-controls.tsx
│ │ │ │ ├── quality-selector.tsx
│ │ │ │ └── live-indicator.tsx
│ │ │ │
│ │ │ ├── gamification/
│ │ │ │ ├── points-display.tsx
│ │ │ │ ├── level-progress.tsx
│ │ │ │ ├── badge-showcase.tsx
│ │ │ │ └── achievement-popup.tsx
│ │ │ │
│ │ │ ├── news/
│ │ │ │ ├── news-card.tsx
│ │ │ │ ├── news-grid.tsx
│ │ │ │ ├── featured-news.tsx
│ │ │ │ └── urgent-banner.tsx
│ │ │ │
│ │ │ ├── profile/
│ │ │ │ ├── profile-avatar.tsx
│ │ │ │ ├── profile-info.tsx
│ │ │ │ ├── profile-tabs.tsx
│ │ │ │ └── profile-stats-card.tsx
│ │ │ │
│ │ │ ├── notifications/
│ │ │ │ ├── notification-bell.tsx
│ │ │ │ ├── notification-list.tsx
│ │ │ │ ├── notification-item.tsx
│ │ │ │ └── notification-settings.tsx
│ │ │ │
│ │ │ └── admin/
│ │ │ ├── admin-sidebar.tsx
│ │ │ ├── admin-header.tsx
│ │ │ ├── stats-widget.tsx
│ │ │ ├── action-button.tsx
│ │ │ └── data-table.tsx
│ │ │
│ │ ├── forms/ # Form components
│ │ │ ├── form-field.tsx
│ │ │ ├── form-error.tsx
│ │ │ ├── form-label.tsx
│ │ │ ├── form-description.tsx
│ │ │ ├── rich-text-editor.tsx
│ │ │ ├── markdown-editor.tsx
│ │ │ ├── image-upload.tsx
│ │ │ ├── multi-image-upload.tsx
│ │ │ ├── file-upload.tsx
│ │ │ ├── drag-drop-upload.tsx
│ │ │ ├── date-picker.tsx
│ │ │ ├── time-picker.tsx
│ │ │ ├── color-picker.tsx
│ │ │ └── tag-input.tsx
│ │ │
│ │ ├── shared/ # Shared utility components
│ │ │ ├── empty-state.tsx
│ │ │ ├── error-message.tsx
│ │ │ ├── loading-spinner.tsx
│ │ │ ├── loading-skeleton.tsx
│ │ │ ├── image-with-fallback.tsx
│ │ │ ├── lazy-image.tsx
│ │ │ ├── copy-button.tsx
│ │ │ ├── back-button.tsx
│ │ │ ├── scroll-to-top.tsx
│ │ │ ├── seo-head.tsx
│ │ │ ├── infinite-scroll.tsx
│ │ │ ├── virtual-list.tsx
│ │ │ └── responsive-image.tsx
│ │ │
│ │ └── providers/ # Context providers
│ │ ├── theme-provider.tsx
│ │ ├── toast-provider.tsx
│ │ ├── modal-provider.tsx
│ │ ├── query-provider.tsx
│ │ ├── i18n-provider.tsx
│ │ ├── auth-provider.tsx
│ │ └── socket-provider.tsx
│ │
│ ├── lib/ # Core library functions
│ │ ├── db/
│ │ │ ├── index.ts # Prisma client singleton
│ │ │ ├── queries/
│ │ │ │ ├── users.ts
│ │ │ │ ├── forum.ts
│ │ │ │ ├── blogs.ts
│ │ │ │ ├── news.ts
│ │ │ │ ├── events.ts
│ │ │ │ ├── family-tree.ts
│ │ │ │ ├── gallery.ts
│ │ │ │ ├── documents.ts
│ │ │ │ ├── donations.ts
│ │ │ │ ├── members.ts
│ │ │ │ ├── messages.ts
│ │ │ │ ├── videos.ts
│ │ │ │ ├── executive-members.ts
│ │ │ │ ├── contact.ts
│ │ │ │ ├── reactions.ts
│ │ │ │ ├── notifications.ts
│ │ │ │ ├── reports.ts
│ │ │ │ ├── gamification.ts
│ │ │ │ └── analytics.ts
│ │ │ ├── mutations/
│ │ │ │ ├── users.ts
│ │ │ │ ├── forum.ts
│ │ │ │ ├── blogs.ts
│ │ │ │ ├── news.ts
│ │ │ │ ├── events.ts
│ │ │ │ ├── family-tree.ts
│ │ │ │ ├── gallery.ts
│ │ │ │ ├── documents.ts
│ │ │ │ ├── donations.ts
│ │ │ │ ├── members.ts
│ │ │ │ ├── messages.ts
│ │ │ │ ├── videos.ts
│ │ │ │ ├── executive-members.ts
│ │ │ │ ├── contact.ts
│ │ │ │ ├── reactions.ts
│ │ │ │ ├── notifications.ts
│ │ │ │ ├── reports.ts
│ │ │ │ ├── gamification.ts
│ │ │ │ └── analytics.ts
│ │ │ └── cache/
│ │ │ │ ├── index.ts
│ │ │ │ ├── keys.ts
│ │ │ │ └── strategies.ts
│ │ │
│ │ ├── auth/
│ │ │ ├── index.ts
│ │ │ ├── config.ts # NextAuth.js v5 config
│ │ │ ├── options.ts # Auth options
│ │ │ ├── callbacks.ts # NextAuth callbacks
│ │ │ ├── providers.ts # Auth providers
│ │ │ ├── session.ts # Session helpers
│ │ │ ├── password.ts # Password hashing/verification
│ │ │ ├── tokens.ts # Token generation
│ │ │ └── permissions.ts # Permission checks
│ │ │
│ │ ├── email/
│ │ │ ├── index.ts
│ │ │ ├── client.ts # Resend/SendGrid client
│ │ │ ├── templates/
│ │ │ │ ├── welcome.tsx
│ │ │ │ ├── verify-email.tsx
│ │ │ │ ├── reset-password.tsx
│ │ │ │ ├── notification.tsx
│ │ │ │ ├── event-reminder.tsx
│ │ │ │ └── donation-receipt.tsx
│ │ │ └── send.ts # Email sending functions
│ │ │
│ │ ├── storage/
│ │ │ ├── index.ts
│ │ │ ├── s3.ts # AWS S3 client
│ │ │ ├── cloudinary.ts # Cloudinary client
│ │ │ ├── upload.ts # File upload helpers
│ │ │ ├── delete.ts # File deletion helpers
│ │ │ └── optimize.ts # Image optimization
│ │ │
│ │ ├── cache/
│ │ │ ├── index.ts
│ │ │ ├── redis.ts # Redis client (optional)
│ │ │ ├── memory.ts # In-memory cache
│ │ │ └── tags.ts # Cache tag helpers
│ │ │
│ │ ├── analytics/
│ │ │ ├── index.ts
│ │ │ ├── track.ts # Event tracking
│ │ │ ├── page-view.ts # Page view tracking
│ │ │ ├── metrics.ts # Metrics calculation
│ │ │ └── report.ts # Report generation
│ │ │
│ │ ├── search/
│ │ │ ├── index.ts
│ │ │ ├── full-text-search.ts # PostgreSQL full-text search
│ │ │ ├── indexing.ts # Search indexing
│ │ │ └── filters.ts # Search filters
│ │ │
│ │ ├── payment/
│ │ │ ├── razorpay.ts # Razorpay integration
│ │ │ ├── stripe.ts # Stripe integration
│ │ │ ├── verify.ts # Payment verification
│ │ │ └── webhook.ts # Webhook handlers
│ │ │
│ │ ├── notifications/
│ │ │ ├── index.ts
│ │ │ ├── push.ts # Push notifications
│ │ │ ├── email.ts # Email notifications
│ │ │ ├── in-app.ts # In-app notifications
│ │ │ └── service-worker.ts # SW notification helpers
│ │ │
│ │ ├── ai/
│ │ │ ├── index.ts
│ │ │ ├── family-tree-suggestions.ts
│ │ │ ├── content-moderation.ts
│ │ │ └── recommendations.ts
│ │ │
│ │ ├── utils/
│ │ │ ├── index.ts
│ │ │ ├── cn.ts # Class name merger
│ │ │ ├── format-date.ts
│ │ │ ├── format-currency.ts
│ │ │ ├── format-number.ts
│ │ │ ├── slugify.ts
│ │ │ ├── truncate.ts
│ │ │ ├── sanitize.ts # HTML sanitization
│ │ │ ├── validate.ts # Custom validators
│ │ │ ├── file-helpers.ts
│ │ │ ├── url-helpers.ts
│ │ │ ├── array-helpers.ts
│ │ │ ├── string-helpers.ts
│ │ │ ├── object-helpers.ts
│ │ │ ├── crypto.ts # Encryption/decryption
│ │ │ └── constants.ts # App constants
│ │
│ ├── middleware/
│ │ ├── rate-limit.ts
│ │ ├── cors.ts
│ │ ├── error-handler.ts
│ │ └── logger.ts
│ │
│ ├── validations/ # Zod schemas
│ │ ├── auth.ts
│ │ ├── user.ts
│ │ ├── forum.ts
│ │ ├── blog.ts
│ │ ├── news.ts
│ │ ├── event.ts
│ │ ├── family-tree.ts
│ │ ├── gallery.ts
│ │ ├── document.ts
│ │ ├── donation.ts
│ │ ├── member.ts
│ │ ├── message.ts
│ │ ├── video.ts
│ │ ├── executive-member.ts
│ │ ├── contact.ts
│ │ ├── comment.ts
│ │ ├── reaction.ts
│ │ ├── report.ts
│ │ ├── notification.ts
│ │ ├── settings.ts
│ │ └── common.ts # Shared schemas
│ │
│ ├── hooks/ # Custom React hooks
│ │ ├── use-auth.ts
│ │ ├── use-user.ts
│ │ ├── use-session.ts
│ │ ├── use-toast.ts
│ │ ├── use-modal.ts
│ │ ├── use-debounce.ts
│ │ ├── use-throttle.ts
│ │ ├── use-local-storage.ts
│ │ ├── use-media-query.ts
│ │ ├── use-intersection-observer.ts
│ │ ├── use-click-outside.ts
│ │ ├── use-copy-to-clipboard.ts
│ │ ├── use-form-persist.ts
│ │ ├── use-infinite-scroll.ts
│ │ ├── use-upload.ts
│ │ ├── use-notifications.ts
│ │ ├── use-websocket.ts
│ │ ├── use-geolocation.ts
│ │ ├── use-permissions.ts
│ │ └── use-analytics.ts
│ │
│ ├── actions/ # Next.js 16 Server Actions
│ │ ├── auth/
│ │ │ ├── login.ts
│ │ │ ├── register.ts
│ │ │ ├── logout.ts
│ │ │ ├── verify-email.ts
│ │ │ ├── forgot-password.ts
│ │ │ ├── reset-password.ts
│ │ │ ├── users/
│ │ │ │ ├── update-profile.ts
│ │ │ │ ├── update-avatar.ts
│ │ │ │ ├── update-password.ts
│ │ │ │ ├── delete-account.ts
│ │ │ │ └── update-preferences.ts
│ │ │ ├── forum/
│ │ │ │ ├── create-thread.ts
│ │ │ │ ├── update-thread.ts
│ │ │ │ ├── delete-thread.ts
│ │ │ │ ├── create-post.ts
│ │ │ │ ├── update-post.ts
│ │ │ │ ├── delete-post.ts
│ │ │ │ └── pin-thread.ts
│ │ │ ├── blogs/
│ │ │ │ ├── create-blog.ts
│ │ │ │ ├── update-blog.ts
│ │ │ │ ├── delete-blog.ts
│ │ │ │ ├── publish-blog.ts
│ │ │ │ └── add-comment.ts
│ │ │ ├── news/
│ │ │ │ ├── create-news.ts
│ │ │ │ ├── update-news.ts
│ │ │ │ ├── delete-news.ts
│ │ │ │ └── feature-news.ts
│ │ │ ├── events/
│ │ │ │ ├── create-event.ts
│ │ │ │ ├── update-event.ts
│ │ │ │ ├── delete-event.ts
│ │ │ │ ├── rsvp-event.ts
│ │ │ │ └── cancel-rsvp.ts
│ │ │ ├── family-tree/
│ │ │ │ ├── create-node.ts
│ │ │ │ ├── update-node.ts
│ │ │ │ ├── delete-node.ts
│ │ │ │ ├── add-relationship.ts
│ │ │ │ └── remove-relationship.ts
│ │ │ ├── gallery/
│ │ │ │ ├── create-album.ts
│ │ │ │ ├── update-album.ts
│ │ │ │ ├── delete-album.ts
│ │ │ │ ├── upload-photo.ts
│ │ │ │ ├── delete-photo.ts
│ │ │ │ └── tag-person.ts
│ │ │ ├── documents/
│ │ │ │ ├── upload-document.ts
│ │ │ │ ├── update-document.ts
│ │ │ │ ├── delete-document.ts
│ │ │ │ └── update-permissions.ts
│ │ │ ├── donations/
│ │ │ │ ├── create-campaign.ts
│ │ │ │ ├── process-donation.ts
│ │ │ │ └── generate-receipt.ts
│ │ │ ├── messages/
│ │ │ │ ├── send-message.ts
│ │ │ │ ├── delete-message.ts
│ │ │ │ ├── mark-as-read.ts
│ │ │ │ └── create-conversation.ts
│ │ │ ├── videos/
│ │ │ │ ├── upload-video.ts
│ │ │ │ ├── delete-video.ts
│ │ │ │ ├── start-stream.ts
│ │ │ │ └── end-stream.ts
│ │ │ ├── reactions/
│ │ │ │ ├── add-reaction.ts
│ │ │ │ └── remove-reaction.ts
│ │ │ ├── reports/
│ │ │ │ ├── create-report.ts
│ │ │ │ └── resolve-report.ts
│ │ │ ├── notifications/
│ │ │ │ ├── mark-as-read.ts
│ │ │ │ └── mark-all-as-read.ts
│ │ │ ├── admin/
│ │ │ │ ├── approve-user.ts
│ │ │ │ ├── suspend-user.ts
│ │ │ │ ├── delete-content.ts
│ │ │ │ └── update-settings.ts
│ │ │ └── contact/
│ │ │ └── send-inquiry.ts
│ │
│ ├── types/ # TypeScript types
│ │ ├── index.ts
│ │ ├── auth.ts
│ │ ├── user.ts
│ │ ├── forum.ts
│ │ ├── blog.ts
│ │ ├── news.ts
│ │ ├── event.ts
│ │ ├── family-tree.ts
│ │ ├── gallery.ts
│ │ ├── document.ts
│ │ ├── donation.ts
│ │ ├── member.ts
│ │ ├── message.ts
│ │ ├── video.ts
│ │ ├── executive-member.ts
│ │ ├── contact.ts
│ │ ├── reaction.ts
│ │ ├── notification.ts
│ │ ├── report.ts
│ │ ├── gamification.ts
│ │ ├── analytics.ts
│ │ ├── api.ts
│ │ └── next-auth.d.ts # NextAuth type augmentation
│ │
│ ├── config/ # Configuration files
│ │ ├── site.ts # Site config
│ │ ├── navigation.ts # Navigation config
│ │ ├── dashboard.ts # Dashboard config
│ │ ├── email.ts # Email config
│ │ ├── upload.ts # Upload limits & settings
│ │ ├── payment.ts # Payment config
│ │ ├── features.ts # Feature flags
│ │ └── seo.ts # SEO defaults
│ │
│ ├── styles/ # Global styles
│ │ ├── globals.css # Tailwind directives & global styles
│ │ ├── fonts.css # Font face declarations
│ │ ├── themes.css # Theme variables
│ │ └── animations.css # Custom animations
│ │
├── prisma/
│ ├── schema.prisma # Prisma schema (from database.md)
│ ├── seed.ts # Database seeding
│ └── migrations/ # Database migrations
│ └── [timestamp]*[description]/
│ └── migration.sql
│
├── tests/
│ ├── unit/
│ │ ├── lib/
│ │ │ ├── utils.test.ts
│ │ │ ├── auth.test.ts
│ │ │ └── validation.test.ts
│ │ ├── actions/
│ │ │ ├── auth.test.ts
│ │ │ ├── forum.test.ts
│ │ │ └── blog.test.ts
│ │ └── components/
│ │ ├── button.test.tsx
│ │ ├── form.test.tsx
│ │ └── modal.test.tsx
│ ├── integration/
│ │ ├── api/
│ │ │ ├── auth.test.ts
│ │ │ ├── users.test.ts
│ │ │ ├── forum.test.ts
│ │ │ └── blogs.test.ts
│ │ └── db/
│ │ ├── queries.test.ts
│ │ └── mutations.test.ts
│ ├── e2e/
│ │ ├── auth.spec.ts
│ │ ├── forum.spec.ts
│ │ ├── blog.spec.ts
│ │ ├── family-tree.spec.ts
│ │ └── donation.spec.ts
│ ├── setup.ts # Test setup
│ ├── helpers.ts # Test helpers
│ └── fixtures/ # Test fixtures
│ ├── users.ts
│ ├── posts.ts
│ └── blogs.ts
│
├── scripts/
│ ├── seed-database.ts
│ ├── migrate-data.ts
│ ├── generate-sitemap.ts
│ ├── backup-database.ts
│ ├── optimize-images.ts
│ ├── clear-cache.ts
│ └── deploy.sh
│
├── docs/
│ ├── README.md
│ ├── ARCHITECTURE.md
│ ├── API.md
│ ├── DEPLOYMENT.md
│ ├── CONTRIBUTING.md
│ ├── DATABASE.md
│ ├── SECURITY.md
│ ├── TESTING.md
│ └── CHANGELOG.md
│
├── .env.local # Local environment (gitignored)
├── .gitignore
├── .eslintrc.json
├── .prettierrc
├── .prettierignore
├── next.config.ts # Next.js 16 config (TypeScript)
├── tailwind.config.ts # Tailwind CSS v4 config
├── postcss.config.js
├── tsconfig.json
├── package.json
├── turbo.json # Turbopack config (optional)
├── playwright.config.ts # E2E testing config
├── vitest.config.ts # Unit testing config
├── LICENSE
└── README.md

# ============================================

# KEY DIRECTORIES EXPLANATION

# ============================================

## /app Directory (Next.js 16 App Router)

- **[locale]** → i18n wrapper for multi-language support (en, ne, hi)
- **(public)** → Routes accessible without authentication
- **(auth)** → Authentication-related routes (login, register, etc.)
- **(protected)** → Routes requiring user authentication
- **(admin)** → Routes requiring admin role
- **api** → API route handlers (Next.js Route Handlers)

## /components Directory

- **ui** → Reusable, atomic UI components (buttons, inputs, etc.)
- **layouts** → Layout components (header, footer, sidebar)
- **features** → Feature-specific components organized by domain
- **forms** → Form-related components (rich text editor, file upload)
- **shared** → Shared utility components (empty state, loading)
- **providers** → React context providers (theme, toast, auth)

## /lib Directory

- **db** → Database queries and mutations (Prisma)
  - queries/ → Read operations (GET)
  - mutations/ → Write operations (POST, PUT, DELETE)
  - cache/ → Caching strategies and helpers
- **auth** → Authentication utilities (NextAuth.js v5)
- **email** → Email sending and templates (Resend/SendGrid)
- **storage** → File storage utilities (AWS S3/Cloudinary)
- **cache** → Caching utilities (Redis/Memory)
- **analytics** → Analytics tracking
- **search** → Full-text search functionality
- **payment** → Payment gateway integration (Razorpay/Stripe)
- **notifications** → Push, email, and in-app notifications
- **ai** → AI features (family tree suggestions, moderation)
- **utils** → General utility functions
- **middleware** → Custom middleware (rate limiting, CORS)

## /validations Directory

- Zod schemas for form validation and API input validation
- One file per domain/feature
- Shared schemas in common.ts

## /hooks Directory

- Custom React hooks for reusable logic
- Follow naming convention: use-[feature-name].ts
- Examples: use-auth, use-toast, use-infinite-scroll

## /actions Directory

- **Next.js 16 Server Actions** for mutations
- Organized by domain/feature
- Replace traditional API routes for form submissions
- Automatic serialization and type safety

## /types Directory

- TypeScript type definitions
- Interface and type declarations
- next-auth.d.ts for NextAuth type augmentation

## /config Directory

- Application configuration files
- Site settings, navigation, feature flags
- Centralized configuration management

## /prisma Directory

- Prisma schema (from database.md)
- Database migrations
- Seed scripts for initial data

## /tests Directory

- **unit** → Unit tests (Vitest)
- **integration** → Integration tests
- **e2e** → End-to-end tests (Playwright)
- setup.ts for test configuration
- fixtures/ for test data

## /scripts Directory

- Utility scripts for development and deployment
- Database seeding, migration, backup
- Image optimization, cache clearing

## /docs Directory

- Project documentation
- Architecture, API docs, deployment guides
- Contributing guidelines

# ============================================

# IMPORTANT FILE PATTERNS

# ============================================

## Route Handlers (API)

```
/app/api/[resource]/route.ts → GET, POST
/app/api/[resource]/[id]/route.ts → GET, PUT, DELETE
```

## Page Routes

```
/app/(group)/[feature]/page.tsx → Page component
/app/(group)/[feature]/loading.tsx → Loading state
/app/(group)/[feature]/error.tsx → Error boundary
```

## Component Patterns

- Components in `_components` folder are route-specific
- Components in `/components` folder are reusable
- Each feature has its own `_components` subfolder

## Database Patterns

```
queries/[resource].ts → Read operations (SELECT)
mutations/[resource].ts → Write operations (INSERT, UPDATE, DELETE)
```

## Server Actions Pattern

```typescript
// actions/forum/create-thread.ts
'use server';

export async function createThread(data: ThreadInput) {
  // Validation
  // Authentication check
  // Database operation
  // Revalidation
  // Return result
}
```

## Testing Patterns

```
*.test.ts → Unit/Integration tests
*.spec.ts → E2E tests
```

# ============================================

# NAMING CONVENTIONS

# ============================================

## Files

- **Components**: PascalCase (Button.tsx, UserCard.tsx)
- **Utilities**: kebab-case (format-date.ts, api-helpers.ts)
- **Types**: kebab-case (user-types.ts, api-types.ts)
- **Actions**: kebab-case (create-user.ts, update-profile.ts)
- **Hooks**: kebab-case with 'use-' prefix (use-auth.ts)

## Folders

- **kebab-case** for all folders
- **(group)** for route groups in App Router
- **\_components** for route-specific components

## Variables & Functions

- **camelCase** for variables and functions
- **PascalCase** for components and types
- **UPPER_CASE** for constants

## Component Export Pattern

```typescript
// Prefer named exports for better tree-shaking
export function Button({ children }: ButtonProps) {
  return <button>{children}</button>
}

// Default export for pages only
export default function HomePage() {
  return <main>...</main>
}
```

# ============================================

# NEXT.JS 16 SPECIFIC FEATURES

# ============================================

## "use cache" Directive

```typescript
// app/(protected)/blogs/page.tsx
import { cache } from 'react'

export const revalidate = 3600 // 1 hour

export default async function BlogsPage() {
  'use cache'
  const blogs = await getBlogs()
  return <BlogList blogs={blogs} />
}
```

## Cache Tags for Revalidation

```typescript
// lib/db/queries/blogs.ts
import { unstable_cache } from 'next/cache';

export const getBlogs = unstable_cache(
  async () => {
    return await prisma.blogPost.findMany();
  },
  ['blogs-list'],
  { tags: ['blogs'], revalidate: 3600 }
);

// In server action - revalidate after mutation
import { revalidateTag } from 'next/cache';

export async function createBlog(data: BlogInput) {
  const blog = await prisma.blogPost.create({ data });
  revalidateTag('blogs');
  return blog;
}
```

## Server Actions Best Practices

```typescript
'use server';

import { z } from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';
import { getServerSession } from '@/lib/auth';

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(10)
});

export async function createPost(formData: FormData) {
  // 1. Validate input
  const validatedData = schema.parse({
    title: formData.get('title'),
    content: formData.get('content')
  });

  // 2. Check authentication
  const session = await getServerSession();
  if (!session) throw new Error('Unauthorized');

  // 3. Database operation
  const post = await prisma.post.create({
    data: { ...validatedData, userId: session.user.id }
  });

  // 4. Revalidate cache
  revalidatePath('/forum');
  revalidateTag('forum-posts');

  // 5. Return result
  return { success: true, post };
}
```

## Progressive Enhancement with useFormStatus

```typescript
// components/features/forum/post-form.tsx
"use client"

import { useFormStatus } from 'react-dom'
import { createPost } from '@/actions/forum/create-post'

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create Post'}
    </button>
  )
}

export function PostForm() {
  return (
    <form action={createPost}>
      <input name="title" required />
      <textarea name="content" required />
      <SubmitButton />
    </form>
  )
}
```

## Parallel Routes for Loading States

```typescript
// app/(protected)/dashboard/@stats/loading.tsx
export default function StatsLoading() {
  return <StatsSkeleton />
}

// app/(protected)/dashboard/@activity/loading.tsx
export default function ActivityLoading() {
  return <ActivitySkeleton />
}

// app/(protected)/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  stats,
  activity
}: {
  children: React.ReactNode
  stats: React.ReactNode
  activity: React.ReactNode
}) {
  return (
    <div>
      {children}
      {stats}
      {activity}
    </div>
  )
}
```

# ============================================

# CACHING STRATEGY

# ============================================

## What to Cache (with "use cache" or unstable_cache)

- ✅ Static content: News list, Blog posts, About page
- ✅ Semi-static: Executive members, Event list
- ✅ User-specific with long TTL: User profile, Badges
- ❌ Dynamic/Real-time: Forum threads, Messages, Notifications
- ❌ Personalized: Dashboard stats, Recommendations

## Cache Tags Organization

```typescript
// By feature
('blogs', 'news', 'events', 'forum');

// By resource
('blog-{id}', 'news-{id}', 'event-{id}');

// By user
('user-{userId}', 'user-{userId}-profile');

// By relationship
('family-tree', 'family-node-{nodeId}');
```

## Revalidation Strategy

```typescript
// Time-based (ISR)
export const revalidate = 3600; // 1 hour

// On-demand (after mutations)
revalidateTag('blogs');
revalidatePath('/blogs');

// Mixed approach
export const revalidate = 3600; // Background revalidation
// + on-demand revalidation after mutations
```

# ============================================

# ENVIRONMENT VARIABLES

# ============================================

## Required Variables (.env.example)

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/tumin_dhanbari"
DIRECT_URL="postgresql://user:password@localhost:5432/tumin_dhanbari"

# NextAuth.js v5
AUTH_SECRET="generate-with-openssl-rand-base64-32"
AUTH_URL="http://localhost:3000"
AUTH_TRUST_HOST=true

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
FACEBOOK_CLIENT_ID=""
FACEBOOK_CLIENT_SECRET=""

# Email
RESEND_API_KEY=""
EMAIL_FROM="noreply@tumin-dhanbari.org"

# Storage (AWS S3)
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="ap-south-1"
AWS_S3_BUCKET=""

# Storage (Cloudinary - Alternative)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""

# Payment (Razorpay)
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""

# Payment (Stripe - Alternative)
STRIPE_PUBLIC_KEY=""
STRIPE_SECRET_KEY=""
STRIPE_WEBHOOK_SECRET=""

# Analytics
NEXT_PUBLIC_GA_ID=""
VERCEL_ANALYTICS_ID=""

# Site Configuration
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Tumin Dhanbari Chandra Jyoti Sanstha"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PWA=true
NEXT_PUBLIC_ENABLE_I18N=true

# Redis (Optional - for caching)
REDIS_URL=""

# Monitoring (Optional)
SENTRY_DSN=""
```

# ============================================

# PACKAGE.JSON SCRIPTS

# ============================================

```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:migrate:deploy": "prisma migrate deploy",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio",
    "db:reset": "prisma migrate reset",
    "postinstall": "prisma generate",
    "prepare": "husky install",
    "analyze": "ANALYZE=true next build",
    "clean": "rm -rf .next node_modules"
  }
}
```

# ============================================

# KEY DEPENDENCIES (package.json)

# ============================================

## Core Dependencies

```json
{
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "@prisma/client": "^6.0.0",
    "next-auth": "^5.0.0-beta",
    "zod": "^3.22.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/typography": "^0.5.10",
    "lucide-react": "^0.263.1",
    "date-fns": "^3.0.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "react-hook-form": "^7.50.0",
    "@hookform/resolvers": "^3.3.4",
    "sonner": "^1.4.0",
    "vaul": "^0.9.0",
    "d3": "^7.8.5",
    "@types/d3": "^7.4.3",
    "sharp": "^0.33.0",
    "bcryptjs": "^2.4.3",
    "@types/bcryptjs": "^2.4.6",
    "nanoid": "^5.0.0",
    "resend": "^3.2.0",
    "react-email": "^2.0.0",
    "@aws-sdk/client-s3": "^3.490.0",
    "@aws-sdk/s3-request-presigner": "^3.490.0",
    "razorpay": "^2.9.2",
    "stripe": "^14.0.0",
    "dompurify": "^3.0.0",
    "@types/dompurify": "^3.0.5",
    "isomorphic-dompurify": "^2.9.0"
  }
}
```

## Dev Dependencies

```json
{
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.3.0",
    "prisma": "^6.0.0",
    "eslint": "^8.56.0",
    "eslint-config-next": "^16.0.0",
    "prettier": "^3.2.0",
    "prettier-plugin-tailwindcss": "^0.5.11",
    "husky": "^9.0.0",
    "lint-staged": "^15.2.0",
    "vitest": "^1.2.0",
    "@vitest/ui": "^1.2.0",
    "@testing-library/react": "^14.1.0",
    "@testing-library/jest-dom": "^6.2.0",
    "@playwright/test": "^1.41.0",
    "tsx": "^4.7.0",
    "@commitlint/cli": "^18.6.0",
    "@commitlint/config-conventional": "^18.6.0"
  }
}
```

# ============================================

# CONFIGURATION FILES

# ============================================

## next.config.ts (Next.js 16)

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable Turbopack (default in Next.js 16)
  experimental: {
    turbo: {
      // Turbopack-specific configuration
    }
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ],
    formats: ['image/avif', 'image/webp']
  },

  // i18n configuration
  i18n: {
    locales: ['en', 'ne', 'hi'],
    defaultLocale: 'en'
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true
      }
    ];
  },

  // Webpack configuration (if needed)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side specific configuration
    }
    return config;
  }
};

export default nextConfig;
```

## tailwind.config.ts (Tailwind CSS v4)

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'slide-in': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' }
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out'
      }
    }
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')]
};

export default config;
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/types/*": ["./src/types/*"],
      "@/actions/*": ["./src/actions/*"],
      "@/validations/*": ["./src/validations/*"],
      "@/config/*": ["./src/config/*"],
      "@/styles/*": ["./src/styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## .eslintrc.json

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/exhaustive-deps": "warn",
    "no-console": ["warn", { "allow": ["warn", "error"] }]
  }
}
```

## .prettierrc

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/', '**/*.d.ts', '**/*.config.*', '**/dist/**']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

## playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] }
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] }
    }
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI
  }
});
```

## .husky/pre-commit

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm lint-staged
```

## .husky/pre-push

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm type-check
pnpm test
```

## .husky/commit-msg

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm commitlint --edit "$1"
```

## package.json (lint-staged)

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md,css}": ["prettier --write"]
  }
}
```

## .gitignore

```
# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage
.nyc_output

# Next.js
.next
out
build
dist

# Production
.vercel

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# IDE
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.idea
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Misc
*.pem

# Turbopack
.turbo

# Prisma
prisma/migrations/dev.db
prisma/migrations/dev.db-journal

# Playwright
test-results/
playwright-report/
playwright/.cache/
```

# ============================================

# FILE ORGANIZATION BEST PRACTICES

# ============================================

## Component Structure

```typescript
// src/components/features/forum/thread-card.tsx

import { type FC } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils/format-date'
import type { Thread } from '@/types/forum'

interface ThreadCardProps {
  thread: Thread
  onDelete?: (id: string) => void
}

export const ThreadCard: FC<ThreadCardProps> = ({ thread, onDelete }) => {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow">
      {/* Component content */}
    </Card>
  )
}
```

## Server Component with Caching

```typescript
// app/(protected)/blogs/page.tsx

import { Suspense } from 'react'
import { unstable_cache } from 'next/cache'
import { prisma } from '@/lib/db'
import { BlogList } from './_components/blog-list'
import { BlogListSkeleton } from './_components/blog-list-skeleton'

// Cached data fetching
const getBlogs = unstable_cache(
  async () => {
    return await prisma.blogPost.findMany({
      where: { status: 'PUBLISHED' },
      include: { user: true, category: true },
      orderBy: { publishedAt: 'desc' },
    })
  },
  ['blogs-list'],
  { tags: ['blogs'], revalidate: 3600 }
)

export default async function BlogsPage() {
  const blogs = await getBlogs()

  return (
    <main>
      <h1>Blogs</h1>
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogList blogs={blogs} />
      </Suspense>
    </main>
  )
}
```

## Server Action with Validation

```typescript
// src/actions/forum/create-thread.ts

'use server';

import { z } from 'zod';
import { revalidateTag, revalidatePath } from 'next/cache';
import { getServerSession } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { threadSchema } from '@/validations/forum';

export async function createThread(data: z.infer<typeof threadSchema>) {
  try {
    // 1. Validate input
    const validated = threadSchema.parse(data);

    // 2. Check authentication
    const session = await getServerSession();
    if (!session?.user) {
      return { error: 'Unauthorized' };
    }

    // 3. Create thread
    const thread = await prisma.forumThread.create({
      data: {
        ...validated,
        userId: session.user.id,
        slug: generateSlug(validated.title)
      }
    });

    // 4. Revalidate cache
    revalidateTag('forum-threads');
    revalidatePath('/forum');

    // 5. Return success
    return { success: true, thread };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: 'Validation failed', details: error.errors };
    }
    return { error: 'Failed to create thread' };
  }
}
```

## Custom Hook Example

```typescript
// src/hooks/use-toast.ts

import { create } from 'zustand';

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useToast = create<ToastStore>(set => ({
  toasts: [],
  addToast: toast => {
    const id = Math.random().toString(36).slice(2, 9);
    set(state => ({
      toasts: [...state.toasts, { ...toast, id }]
    }));
    setTimeout(() => {
      set(state => ({
        toasts: state.toasts.filter(t => t.id !== id)
      }));
    }, 5000);
  },
  removeToast: id =>
    set(state => ({
      toasts: state.toasts.filter(t => t.id !== id)
    }))
}));
```

# ============================================

# DEPLOYMENT CHECKLIST

# ============================================

## Pre-deployment

- [ ] Run `pnpm type-check` - No TypeScript errors
- [ ] Run `pnpm lint` - No linting errors
- [ ] Run `pnpm test` - All tests passing
- [ ] Run `pnpm build` - Build succeeds
- [ ] Check environment variables are set
- [ ] Review security headers
- [ ] Test authentication flow
- [ ] Test payment integration (if applicable)
- [ ] Verify database migrations
- [ ] Check image optimization
- [ ] Test in production mode locally

## Post-deployment

- [ ] Verify all pages load correctly
- [ ] Test critical user flows
- [ ] Check analytics tracking
- [ ] Monitor error logs
- [ ] Verify email sending
- [ ] Test file uploads
- [ ] Check database connections
- [ ] Verify caching is working
- [ ] Test payment webhooks
- [ ] Monitor performance metrics

# ============================================

# PERFORMANCE OPTIMIZATION TIPS

# ============================================

1. **Use Next.js 16 Caching Effectively**
   - Apply "use cache" to static/semi-static pages
   - Use cache tags for granular revalidation
   - Implement proper cache invalidation strategy

2. **Image Optimization**
   - Use next/image for all images
   - Specify width and height
   - Use appropriate formats (WebP, AVIF)
   - Implement lazy loading

3. **Code Splitting**
   - Dynamic imports for large components
   - Lazy load route components
   - Split vendor bundles appropriately

4. **Database Optimization**
   - Add indexes to frequently queried columns
   - Use connection pooling
   - Implement pagination
   - Optimize N+1 queries with includes

5. **Bundle Size**
   - Analyze bundle with `pnpm analyze`
   - Remove unused dependencies
   - Use tree-shaking friendly imports
   - Minimize client-side JavaScript

# ============================================

# SECURITY BEST PRACTICES

# ============================================

1. **Authentication**
   - Use NextAuth.js v5
   - Implement CSRF protection
   - Use secure session cookies
   - Implement rate limiting

2. **Input Validation**
   - Validate all user inputs with Zod
   - Sanitize HTML content
   - Validate file uploads
   - Check file types and sizes

3. **Database Security**
   - Use parameterized queries (Prisma)
   - Implement role-based access control
   - Encrypt sensitive data
   - Regular backups

4. **API Security**
   - Implement rate limiting
   - Validate API inputs
   - Use CORS appropriately
   - Implement proper error handling

5. **Environment Variables**
   - Never commit .env files
   - Use different keys for dev/prod
   - Rotate secrets regularly
   - Use secret management tools

# ============================================

# END OF PROJECT STRUCTURE

# ============================================
