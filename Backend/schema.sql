DROP TABLE IF EXISTS products;

CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image VARCHAR(255),
    category VARCHAR(100),
    dimensions VARCHAR(255),
    material VARCHAR(255)
);

INSERT INTO products (name, price, description, image, category, dimensions, material) VALUES
('Modern Velvet Sofa', 899.99, 'A comfortable modern sofa with sleek lines and plush cushions. Perfect for any contemporary living room.', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200', 'Living Room', '84"W x 35"D x 30"H', 'Premium Velvet, Solid Wood Frame'),
('Solid Oak Dining Table', 549.99, 'Solid wood dining table perfect for family gatherings. Seats up to 6 people comfortably.', 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=1200', 'Dining', '72"L x 36"W x 30"H', '100% Solid Oak, Natural Finish'),
('Ergonomic Office Chair', 249.99, 'Fully adjustable office chair for maximum productivity. Features lumbar support and breathable mesh.', 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200', 'Office', '26"W x 26"D x 42-46"H', 'Breathable Mesh, High-Density Foam, Steel Base'),
('Minimalist Platform Bed', 459.99, 'Minimalist queen bed frame with sturdy construction. No box spring required.', 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1200', 'Bedroom', '82"L x 63"W x 14"H', 'Powder-coated Steel, Pine Wood Slats'),
('Eames Style Lounge Chair', 799.99, 'A premium leather vintage lounge chair with matching ottoman for ultimate relaxation.', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=1200', 'Living Room', '33"W x 33"D x 32"H', 'Top-Grain Italian Leather, Walnut Veneer'),
('Brass Arc Floor Lamp', 129.99, 'Sleek and modern floor lamp with warm ambient lighting and heavy marble base.', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200', 'Lighting', '40"W x 15"D x 75"H', 'Brushed Brass, White Marble, Fabric Shade'),
('Emerald Accent Armchair', 329.99, 'A stylish emerald green velvet armchair with gold-tipped legs to accent any contemporary room.', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200', 'Living Room', '29"W x 31"D x 34"H', 'Stain-resistant Velvet, Foam, Brass Finished Steel'),
('Patio Wicker Set', 649.99, 'Durable wicker outdoor furniture set including a glass-top table and two lounge chairs.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200', 'Outdoor', 'Chairs: 28"W x 26"D x 30"H, Table: 20" Dia', 'All-Weather PE Wicker, Aluminum Frame, Tempered Glass'),
('Industrial Bookshelf', 189.99, 'A tall wooden and metal bookshelf with 5 spacious tiers for displaying decor and books.', 'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=1200', 'Office', '32"W x 12"D x 70"H', 'Engineered Wood, Matte Black Iron'),
('Faux-Marble Coffee Table', 219.99, 'Luxurious faux-marble top coffee table with gold-finish geometric legs.', 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=1200', 'Living Room', '42"W x 22"D x 18"H', 'Faux Marble Veneer, Steel Frame'),
('Mid-Century TV Stand', 279.99, 'Walnut finish media console with sliding slatted doors for hidden storage.', 'https://images.unsplash.com/photo-1601392740426-907c7b028119?auto=format&fit=crop&q=80&w=1200', 'Living Room', '60"W x 16"D x 24"H', 'Walnut Veneer, Solid Wood Legs'),
('Woven Rattan Pendant', 119.99, 'Boho-chic natural rattan pendant light that adds texture and warmth to any space.', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=1200', 'Lighting', '18" Diameter x 12"H', 'Natural Rattan, Braided Cord'),
('Cloud Sectional Sofa', 1499.99, 'Ultra-deep, modular sectional sofa that feels like sitting on a cloud.', 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200', 'Living Room', '120"W x 40"D (Chaise 60"D) x 32"H', 'Linen Blend Fabric, Down-Feather Fill'),
('Teak Outdoor Dining Table', 899.99, 'Weather-resistant solid teak wood dining table that seats 8.', 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1200', 'Outdoor', '84"L x 40"W x 30"H', 'Grade A Teak Wood'),
('Upholstered Headboard', 199.99, 'Tufted fabric headboard that attaches easily to most standard bed frames.', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200', 'Bedroom', 'Queen Size: 62"W x 4"D x 54"H', 'Polyester Blend, High-Density Foam');
