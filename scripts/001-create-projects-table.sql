-- Create projects table for LoopTech portfolio
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  image TEXT,
  link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read projects (public portfolio)
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert projects
CREATE POLICY "Allow authenticated insert" ON projects
  FOR INSERT WITH CHECK (true);

-- Create policy to allow authenticated users to delete projects
CREATE POLICY "Allow authenticated delete" ON projects
  FOR DELETE USING (true);

-- Insert default projects
INSERT INTO projects (title, description, category, image, link) VALUES
  ('متجر إلكتروني متكامل', 'متجر إلكتروني كامل مع نظام دفع وإدارة المنتجات', 'تطوير ويب', '/ecommerce-store.png', ''),
  ('تطبيق توصيل طعام', 'تطبيق موبايل لتوصيل الطعام مع تتبع الطلبات', 'تطبيقات موبايل', '/food-delivery-app-screen.png', ''),
  ('نظام إدارة مخزون', 'نظام متكامل لإدارة المخزون والمستودعات', 'أنظمة مخصصة', '/inventory-system.jpg', ''),
  ('منصة تعليمية', 'منصة تعليمية تفاعلية مع دروس فيديو', 'تطوير ويب', '/learning-platform.png', ''),
  ('تطبيق حجز مواعيد', 'تطبيق لحجز المواعيد مع إشعارات تذكير', 'تطبيقات موبايل', '/booking-app.jpg', ''),
  ('لوحة تحكم تحليلات', 'لوحة تحكم متقدمة لعرض التحليلات والإحصائيات', 'UI/UX Design', '/analytics-dashboard.png', '');
