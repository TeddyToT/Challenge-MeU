
CREATE TABLE IF NOT EXISTS PRODUCT
(
    id uuid NOT NULL,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    quantity integer DEFAULT 0,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT product_unique UNIQUE (id, slug)
);

CREATE TABLE IF NOT EXISTS USERS
(
    uid uuid NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(100) DEFAULT 'user',
    email VARCHAR(100) NOT NULL,
	phone VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT pkey_user PRIMARY KEY ( uid )
);

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamp_product
BEFORE UPDATE ON PRODUCT
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

CREATE TRIGGER set_timestamp_product
BEFORE UPDATE ON USERS
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();

INSERT INTO PRODUCT (id,name, slug, quantity) VALUES 
('9c04364b-7425-445f-a37a-c3e61af9abe8', 'Product one', 'product1', 20),
('d1bc28aa-810e-4774-a820-b8a3f9a275cc', 'Product two', 'product2', 20),
('bad56541-1a31-4a02-9b8e-a71b8f705af4', 'Product three', 'product3', 20),
('bd2a5e9e-5342-4ba3-a1fc-1f9de6c9ae37', 'Product four', 'product4', 20);
