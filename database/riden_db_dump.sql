-- RidenTech Database Dump
-- Generated on 2026-03-11 05:38:33

TRUNCATE TABLE blogs;
INSERT INTO blogs (id, title, slug, category, image, short_description, content, published_at, is_featured, status, created_at, updated_at) VALUES ('1', 'Revolutionizing Business with AI', 'revolutionizing-business-with-ai', 'AI & Machine Learning', 'https://via.placeholder.com/640x480.png/00eeff?text=AI+Blog', 'Discover how Riden is using AI to transform modern enterprises.', 'Full blog content for AI transformation goes here...', '2026-03-10', '1', 'published', '2026-03-10 08:49:22', '2026-03-10 08:49:22');
INSERT INTO blogs (id, title, slug, category, image, short_description, content, published_at, is_featured, status, created_at, updated_at) VALUES ('2', 'The Future of Web Development', 'the-future-of-web-development', 'Web Development', 'https://via.placeholder.com/640x480.png/0044ff?text=Web+Blog', 'Latest trends in Next.js and Laravel integration.', 'Deep dive into full-stack development...', '2026-03-10', '0', 'published', '2026-03-10 08:49:22', '2026-03-10 08:49:22');

-- Table: company_settings
TRUNCATE TABLE company_settings;
INSERT INTO company_settings (id, key, value, created_at, updated_at) VALUES ('1', 'address', '123 Creative Street, Tech City, Pakistan', '2026-03-10 08:49:22', '2026-03-10 08:49:22');
INSERT INTO company_settings (id, key, value, created_at, updated_at) VALUES ('2', 'email', 'contact@ritovex.com', '2026-03-10 08:49:22', '2026-03-10 08:49:22');
INSERT INTO company_settings (id, key, value, created_at, updated_at) VALUES ('3', 'phone', '+92 312 3456789', '2026-03-10 08:49:22', '2026-03-10 08:49:22');
INSERT INTO company_settings (id, key, value, created_at, updated_at) VALUES ('4', 'facebook_url', 'https://facebook.com/ritovex', '2026-03-10 08:49:22', '2026-03-10 08:49:22');
INSERT INTO company_settings (id, key, value, created_at, updated_at) VALUES ('5', 'footer_description', 'Innovative Agency delivering premium digital solutions globally.', '2026-03-10 08:49:22', '2026-03-10 08:49:22');
