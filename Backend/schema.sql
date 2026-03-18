DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(255)    NOT NULL,
    price           DECIMAL(10, 2)  NOT NULL,
    original_price  DECIMAL(10, 2),
    discount        INTEGER         DEFAULT 0,
    view_count      INTEGER         DEFAULT 0,
    demand_score    INTEGER         DEFAULT 50,
    description     TEXT,
    images          TEXT[]          DEFAULT '{}',  -- Array of image URLs
    category        VARCHAR(100),
    dimensions      VARCHAR(255),
    material        VARCHAR(255)
);

INSERT INTO products (
    name, price, original_price, discount, view_count, demand_score,
    description, images, category, dimensions, material
) VALUES
(
    'Modern Velvet Sofa', 764.99, 899.99, 15, 47, 85,
    'A comfortable modern sofa with sleek lines and plush cushions. Perfect for any contemporary living room.',
    ARRAY[
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.4&fp-z=1.5',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.2&fp-y=0.6&fp-z=2',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.8&fp-y=0.6&fp-z=2'
    ],
    'Living Room', '84"W x 35"D x 30"H', 'Premium Velvet, Solid Wood Frame'
),
(
    'Solid Oak Dining Table', 549.99, 549.99, 0, 23, 60,
    'Solid wood dining table perfect for family gatherings. Seats up to 6 people comfortably.',
    ARRAY[
        'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.4&fp-y=0.7&fp-z=1.8',
        'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.8&fp-y=0.8&fp-z=2',
        'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.3'
    ],
    'Dining', '72"L x 36"W x 30"H', '100% Solid Oak, Natural Finish'
),
(
    'Ergonomic Office Chair', 199.99, 249.99, 20, 68, 92,
    'Fully adjustable office chair for maximum productivity. Features lumbar support and breathable mesh.',
    ARRAY[
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1.5',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.8&fp-z=1.8',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.6&fp-y=0.5&fp-z=1.2'
    ],
    'Office', '26"W x 26"D x 42-46"H', 'Breathable Mesh, High-Density Foam, Steel Base'
),
(
    'Minimalist Platform Bed', 459.99, 459.99, 0, 15, 45,
    'Minimalist queen bed frame with sturdy construction. No box spring required.',
    ARRAY[
        'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.6&fp-z=1.4',
        'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.8&fp-y=0.8&fp-z=2',
        'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.2&fp-y=0.5&fp-z=1.2'
    ],
    'Bedroom', '82"L x 63"W x 14"H', 'Powder-coated Steel, Pine Wood Slats'
),
(
    'Eames Style Lounge Chair', 679.99, 799.99, 15, 34, 78,
    'A premium leather vintage lounge chair with matching ottoman for ultimate relaxation.',
    ARRAY[
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.4&fp-y=0.5&fp-z=1.8',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.7&fp-y=0.7&fp-z=1.5',
        'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.6&fp-y=0.3&fp-z=1.3'
    ],
    'Living Room', '33"W x 33"D x 32"H', 'Top-Grain Italian Leather, Walnut Veneer'
),
(
    'Brass Arc Floor Lamp', 103.99, 129.99, 20, 52, 88,
    'Sleek and modern floor lamp with warm ambient lighting and heavy marble base.',
    ARRAY[
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.2&fp-z=2',
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.8&fp-z=2',
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.2'
    ],
    'Lighting', '40"W x 15"D x 75"H', 'Brushed Brass, White Marble, Fabric Shade'
),
(
    'Emerald Accent Armchair', 329.99, 329.99, 0, 19, 55,
    'A stylish emerald green velvet armchair with gold-tipped legs to accent any contemporary room.',
    ARRAY[
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.4&fp-z=1.5',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.6&fp-y=0.8&fp-z=2',
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.3&fp-y=0.5&fp-z=1.2'
    ],
    'Living Room', '29"W x 31"D x 34"H', 'Stain-resistant Velvet, Foam, Brass Finished Steel'
),
(
    'Patio Wicker Set', 519.99, 649.99, 20, 41, 80,
    'Durable wicker outdoor furniture set including a glass-top table and two lounge chairs.',
    ARRAY[
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.6&fp-z=1.5',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.8&fp-y=0.7&fp-z=1.8',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.3&fp-y=0.5&fp-z=1.2'
    ],
    'Outdoor', 'Chairs: 28"W x 26"D x 30"H, Table: 20" Dia', 'All-Weather PE Wicker, Aluminum Frame, Tempered Glass'
),
(
    'Industrial Bookshelf', 189.99, 189.99, 0, 12, 40,
    'A tall wooden and metal bookshelf with 5 spacious tiers for displaying decor and books.',
    ARRAY[
        'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1.5',
        'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.7&fp-y=0.6&fp-z=2',
        'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.2'
    ],
    'Office', '32"W x 12"D x 70"H', 'Engineered Wood, Matte Black Iron'
),
(
    'Faux-Marble Coffee Table', 175.99, 219.99, 20, 56, 90,
    'Luxurious faux-marble top coffee table with gold-finish geometric legs.',
    ARRAY[
        'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.6&fp-z=2',
        'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.8&fp-y=0.7&fp-z=2',
        'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.4&fp-y=0.5&fp-z=1.2'
    ],
    'Living Room', '42"W x 22"D x 18"H', 'Faux Marble Veneer, Steel Frame'
),
(
    'Mid-Century TV Stand', 237.99, 279.99, 15, 29, 65,
    'Walnut finish media console with sliding slatted doors for hidden storage.',
    ARRAY[
        'https://images.unsplash.com/photo-1601392740426-907c7b028119?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1601392740426-907c7b028119?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.3&fp-y=0.5&fp-z=1.8',
        'https://images.unsplash.com/photo-1601392740426-907c7b028119?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.8&fp-y=0.8&fp-z=2',
        'https://images.unsplash.com/photo-1601392740426-907c7b028119?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.6&fp-y=0.4&fp-z=1.2'
    ],
    'Living Room', '60"W x 16"D x 24"H', 'Walnut Veneer, Solid Wood Legs'
),
(
    'Woven Rattan Pendant', 119.99, 119.99, 0, 8, 30,
    'Boho-chic natural rattan pendant light that adds texture and warmth to any space.',
    ARRAY[
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.4&fp-z=1.8',
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.2&fp-z=2',
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.8&fp-z=1.5'
    ],
    'Lighting', '18" Diameter x 12"H', 'Natural Rattan, Braided Cord'
),
(
    'Cloud Sectional Sofa', 1274.99, 1499.99, 15, 73, 95,
    'Ultra-deep, modular sectional sofa that feels like sitting on a cloud.',
    ARRAY[
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.4&fp-y=0.6&fp-z=1.5',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.8&fp-y=0.5&fp-z=1.8',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.2'
    ],
    'Living Room', '120"W x 40"D (Chaise 60"D) x 32"H', 'Linen Blend Fabric, Down-Feather Fill'
),
(
    'Teak Outdoor Dining Table', 899.99, 899.99, 0, 18, 50,
    'Weather-resistant solid teak wood dining table that seats 8.',
    ARRAY[
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.6&fp-z=1.8',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.7&fp-y=0.8&fp-z=2',
        'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.4&fp-y=0.5&fp-z=1.3'
    ],
    'Outdoor', '84"L x 40"W x 30"H', 'Grade A Teak Wood'
),
(
    'Upholstered Headboard', 169.99, 199.99, 15, 37, 72,
    'Tufted fabric headboard that attaches easily to most standard bed frames.',
    ARRAY[
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=2',
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.2&fp-y=0.5&fp-z=1.5',
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.6&fp-y=0.6&fp-z=1.2'
    ],
    'Bedroom', 'Queen Size: 62"W x 4"D x 54"H', 'Polyester Blend, High-Density Foam'
);

-- ─── Helper view: normalise column names to camelCase for the Node layer ───
-- If you prefer to keep snake_case in SQL and map in JS, you can skip this.
CREATE OR REPLACE VIEW products_view AS
SELECT
    id,
    name,
    price,
    original_price   AS "originalPrice",
    discount,
    view_count       AS "viewCount",
    demand_score     AS "demandScore",
    description,
    images,
    category,
    dimensions,
    material
FROM products;
