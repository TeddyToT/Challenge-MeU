CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE IF NOT EXISTS PRODUCT
(
    id uuid NOT NULL,
    name VARCHAR(100) NOT NULL ,
    slug VARCHAR(100) NOT NULL,
    quantity integer DEFAULT 0,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    CONSTRAINT product_unique UNIQUE (id, slug)
);


CREATE TRIGGER set_timestamp
BEFORE UPDATE ON PRODUCT
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();