CREATE DATABASE IF NOT EXISTS truvex_sourcing
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE truvex_sourcing;

DROP VIEW IF EXISTS category_supplier_counts;
DROP TABLE IF EXISTS service_leads;
DROP TABLE IF EXISTS subcategories;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS suppliers;
DROP TABLE IF EXISTS callback_requests;
DROP TABLE IF EXISTS newsletters;
DROP TABLE IF EXISTS enquiries;
DROP TABLE IF EXISTS rfq_requests;
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS buyers;
DROP TABLE IF EXISTS admin_users;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image VARCHAR(500),
  icon_name VARCHAR(100),
  tags JSON,
  trending BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_categories_active_sort (is_active, sort_order),
  INDEX idx_categories_slug (slug)
);

CREATE TABLE suppliers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NULL,
  company_name VARCHAR(255) NOT NULL,
  contact_person VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  core_product_segment VARCHAR(255) NOT NULL,
  company_details TEXT NOT NULL,
  factory_images JSON,
  status ENUM('pending','approved','rejected','suspended') DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_suppliers_category
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  INDEX idx_suppliers_status (status),
  INDEX idx_suppliers_category_status (category_id, status)
);

CREATE TABLE services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  price DECIMAL(10,2),
  price_unit VARCHAR(50) DEFAULT 'Piece',
  in_stock BOOLEAN DEFAULT true,
  icon_name VARCHAR(100),
  image VARCHAR(500),
  images JSON,
  features JSON,
  benefits JSON,
  process_steps JSON,
  stats JSON,
  specs JSON,
  delivery_info VARCHAR(255),
  moq INT DEFAULT 1,
  category_id INT,
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_services_category
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  INDEX idx_services_slug (slug),
  INDEX idx_services_category_active (category_id, is_active)
);

CREATE TABLE subcategories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  image VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_subcategories_category
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  UNIQUE KEY uq_subcategories_category_slug (category_id, slug),
  INDEX idx_subcategories_category_active (category_id, is_active, sort_order)
);

CREATE TABLE buyers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  buyer_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  requirement_details TEXT NOT NULL,
  estimated_budget VARCHAR(100),
  reference_image VARCHAR(500),
  status ENUM('new','contacted','in_progress','completed','rejected') DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_buyers_status_created (status, created_at)
);

CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  inquiry_type ENUM('General Support','Partnerships & Alliances','Press & Media','Other') NOT NULL,
  message TEXT NOT NULL,
  status ENUM('new','read','replied','closed') DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contacts_status_created (status, created_at)
);

CREATE TABLE rfq_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  quantity VARCHAR(100) NOT NULL,
  delivery_city VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  specifications TEXT,
  status ENUM('new','processing','quoted','closed') DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_rfq_status_created (status, created_at)
);

CREATE TABLE enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_service VARCHAR(255) NOT NULL,
  quantity_budget VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  requirement_details TEXT,
  source_page VARCHAR(255),
  status ENUM('new','contacted','closed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_enquiries_status_created (status, created_at)
);

CREATE TABLE newsletters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP NULL
);

CREATE TABLE callback_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  preferred_time VARCHAR(100),
  topic VARCHAR(255),
  status ENUM('new','called','no_answer','completed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_callbacks_status_created (status, created_at)
);

CREATE TABLE service_leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  service_id INT,
  full_name VARCHAR(255) NOT NULL,
  mobile VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  requirement_details TEXT,
  quantity VARCHAR(100),
  unit VARCHAR(50) DEFAULT 'Pieces',
  delivery_pincode VARCHAR(10),
  status ENUM('new','contacted','closed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_service_leads_service
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL,
  INDEX idx_service_leads_status_created (status, created_at)
);

CREATE TABLE admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('super_admin','admin','moderator') DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE VIEW category_supplier_counts AS
SELECT
  c.id AS category_id,
  COUNT(s.id) AS supplier_count
FROM categories c
LEFT JOIN suppliers s
  ON s.category_id = c.id
  AND s.status = 'approved'
GROUP BY c.id;
