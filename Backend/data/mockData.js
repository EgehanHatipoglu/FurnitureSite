const products = [
    {
        id: "1",
        name: "Modern Velvet Sofa",
        price: 764.99,
        originalPrice: 899.99,
        discount: 15,
        viewCount: 47,
        demandScore: 85,
        description: "A comfortable modern sofa with sleek lines and plush cushions. Perfect for any contemporary living room.",
        images: [
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.4&fp-z=1.5",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.2&fp-y=0.6&fp-z=2",
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.8&fp-y=0.6&fp-z=2"
        ],
        category: "Living Room",
        dimensions: "84\"W x 35\"D x 30\"H",
        material: "Premium Velvet, Solid Wood Frame"
    },
    {
        id: "2",
        name: "Solid Oak Dining Table",
        price: 549.99,
        originalPrice: 549.99,
        discount: 0,
        viewCount: 23,
        demandScore: 60,
        description: "Solid wood dining table perfect for family gatherings. Seats up to 6 people comfortably.",
        images: [
            "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.4&fp-y=0.7&fp-z=1.8",
            "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.8&fp-y=0.8&fp-z=2",
            "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.3"
        ],
        category: "Dining",
        dimensions: "72\"L x 36\"W x 30\"H",
        material: "100% Solid Oak, Natural Finish"
    },
    {
        id: "3",
        name: "Ergonomic Office Chair",
        price: 199.99,
        originalPrice: 249.99,
        discount: 20,
        viewCount: 68,
        demandScore: 92,
        description: "Fully adjustable office chair for maximum productivity. Features lumbar support and breathable mesh.",
        images: [
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1.5",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.8&fp-z=1.8",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.6&fp-y=0.5&fp-z=1.2"
        ],
        category: "Office",
        dimensions: "26\"W x 26\"D x 42-46\"H",
        material: "Breathable Mesh, High-Density Foam, Steel Base"
    },
    {
        id: "4",
        name: "Minimalist Platform Bed",
        price: 459.99,
        originalPrice: 459.99,
        discount: 0,
        viewCount: 15,
        demandScore: 45,
        description: "Minimalist queen bed frame with sturdy construction. No box spring required.",
        images: [
            "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.6&fp-z=1.4",
            "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.8&fp-y=0.8&fp-z=2",
            "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.2&fp-y=0.5&fp-z=1.2"
        ],
        category: "Bedroom",
        dimensions: "82\"L x 63\"W x 14\"H",
        material: "Powder-coated Steel, Pine Wood Slats"
    },
    {
        id: "5",
        name: "Eames Style Lounge Chair",
        price: 679.99,
        originalPrice: 799.99,
        discount: 15,
        viewCount: 34,
        demandScore: 78,
        description: "A premium leather vintage lounge chair with matching ottoman for ultimate relaxation.",
        images: [
            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.4&fp-y=0.5&fp-z=1.8",
            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.7&fp-y=0.7&fp-z=1.5",
            "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.6&fp-y=0.3&fp-z=1.3"
        ],
        category: "Living Room",
        dimensions: "33\"W x 33\"D x 32\"H",
        material: "Top-Grain Italian Leather, Walnut Veneer"
    },
    {
        id: "6",
        name: "Brass Arc Floor Lamp",
        price: 103.99,
        originalPrice: 129.99,
        discount: 20,
        viewCount: 52,
        demandScore: 88,
        description: "Sleek and modern floor lamp with warm ambient lighting and heavy marble base.",
        images: [
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.2&fp-z=2",
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.8&fp-z=2",
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.2"
        ],
        category: "Lighting",
        dimensions: "40\"W x 15\"D x 75\"H",
        material: "Brushed Brass, White Marble, Fabric Shade"
    },
    {
        id: "7",
        name: "Emerald Accent Armchair",
        price: 329.99,
        originalPrice: 329.99,
        discount: 0,
        viewCount: 19,
        demandScore: 55,
        description: "A stylish emerald green velvet armchair with gold-tipped legs to accent any contemporary room.",
        images: [
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.4&fp-z=1.5",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.6&fp-y=0.8&fp-z=2",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.3&fp-y=0.5&fp-z=1.2"
        ],
        category: "Living Room",
        dimensions: "29\"W x 31\"D x 34\"H",
        material: "Stain-resistant Velvet, Foam, Brass Finished Steel"
    },
    {
        id: "8",
        name: "Patio Wicker Set",
        price: 519.99,
        originalPrice: 649.99,
        discount: 20,
        viewCount: 41,
        demandScore: 80,
        description: "Durable wicker outdoor furniture set including a glass-top table and two lounge chairs.",
        images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.6&fp-z=1.5",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.8&fp-y=0.7&fp-z=1.8",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.3&fp-y=0.5&fp-z=1.2"
        ],
        category: "Outdoor",
        dimensions: "Chairs: 28\"W x 26\"D x 30\"H, Table: 20\" Dia",
        material: "All-Weather PE Wicker, Aluminum Frame, Tempered Glass"
    },
    {
        id: "9",
        name: "Industrial Bookshelf",
        price: 189.99,
        originalPrice: 189.99,
        discount: 0,
        viewCount: 12,
        demandScore: 40,
        description: "A tall wooden and metal bookshelf with 5 spacious tiers for displaying decor and books.",
        images: [
            "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1.5",
            "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.7&fp-y=0.6&fp-z=2",
            "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.2"
        ],
        category: "Office",
        dimensions: "32\"W x 12\"D x 70\"H",
        material: "Engineered Wood, Matte Black Iron"
    },
    {
        id: "10",
        name: "Faux-Marble Coffee Table",
        price: 175.99,
        originalPrice: 219.99,
        discount: 20,
        viewCount: 56,
        demandScore: 90,
        description: "Luxurious faux-marble top coffee table with gold-finish geometric legs.",
        images: [
            "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.6&fp-z=2",
            "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.8&fp-y=0.7&fp-z=2",
            "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.4&fp-y=0.5&fp-z=1.2"
        ],
        category: "Living Room",
        dimensions: "42\"W x 22\"D x 18\"H",
        material: "Faux Marble Veneer, Steel Frame"
    },
    {
        id: "11",
        name: "Mid-Century TV Stand",
        price: 237.99,
        originalPrice: 279.99,
        discount: 15,
        viewCount: 29,
        demandScore: 65,
        description: "Walnut finish media console with sliding slatted doors for hidden storage.",
        images: [
            "https://images.unsplash.com/photo-1601392740426-907c7b028119?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1601392740426-907c7b028119?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.3&fp-y=0.5&fp-z=1.8",
            "https://images.unsplash.com/photo-1601392740426-907c7b028119?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.8&fp-y=0.8&fp-z=2",
            "https://images.unsplash.com/photo-1601392740426-907c7b028119?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.6&fp-y=0.4&fp-z=1.2"
        ],
        category: "Living Room",
        dimensions: "60\"W x 16\"D x 24\"H",
        material: "Walnut Veneer, Solid Wood Legs"
    },
    {
        id: "12",
        name: "Woven Rattan Pendant",
        price: 119.99,
        originalPrice: 119.99,
        discount: 0,
        viewCount: 8,
        demandScore: 30,
        description: "Boho-chic natural rattan pendant light that adds texture and warmth to any space.",
        images: [
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.4&fp-z=1.8",
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.2&fp-z=2",
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.8&fp-z=1.5"
        ],
        category: "Lighting",
        dimensions: "18\" Diameter x 12\"H",
        material: "Natural Rattan, Braided Cord"
    },
    {
        id: "13",
        name: "Cloud Sectional Sofa",
        price: 1274.99,
        originalPrice: 1499.99,
        discount: 15,
        viewCount: 73,
        demandScore: 95,
        description: "Ultra-deep, modular sectional sofa that feels like sitting on a cloud.",
        images: [
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.4&fp-y=0.6&fp-z=1.5",
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.8&fp-y=0.5&fp-z=1.8",
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=1.2"
        ],
        category: "Living Room",
        dimensions: "120\"W x 40\"D (Chaise 60\"D) x 32\"H",
        material: "Linen Blend Fabric, Down-Feather Fill"
    },
    {
        id: "14",
        name: "Teak Outdoor Dining Table",
        price: 899.99,
        originalPrice: 899.99,
        discount: 0,
        viewCount: 18,
        demandScore: 50,
        description: "Weather-resistant solid teak wood dining table that seats 8.",
        images: [
            "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.6&fp-z=1.8",
            "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.7&fp-y=0.8&fp-z=2",
            "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.4&fp-y=0.5&fp-z=1.3"
        ],
        category: "Outdoor",
        dimensions: "84\"L x 40\"W x 30\"H",
        material: "Grade A Teak Wood"
    },
    {
        id: "15",
        name: "Upholstered Headboard",
        price: 169.99,
        originalPrice: 199.99,
        discount: 15,
        viewCount: 37,
        demandScore: 72,
        description: "Tufted fabric headboard that attaches easily to most standard bed frames.",
        images: [
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.5&fp-y=0.5&fp-z=2",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.2&fp-y=0.5&fp-z=1.5",
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200&crop=focalpoint&fp-x=0.6&fp-y=0.6&fp-z=1.2"
        ],
        category: "Bedroom",
        dimensions: "Queen Size: 62\"W x 4\"D x 54\"H",
        material: "Polyester Blend, High-Density Foam"
    }
];

const users = []; // Array to store mock users
const orders = []; // Array to store mock orders

module.exports = { products, users, orders };
