const express = require('express');
const router = express.Router();
const { products: allProducts } = require('../data/mockData');

// ──────────────────────────────────────────────────────────
//  POST /api/ai/room-design
//  Receives: { imageBase64, mimeType, style, prompt, roomSize, budget }
//  Returns:  { description, suggestions, recommendedProducts, totalPrice }
// ──────────────────────────────────────────────────────────

const STYLE_DESCRIPTIONS = {
    modern: 'Temiz çizgiler, nötr renkler ve metalik vurgularla tanımlanan modern/çağdaş',
    skandinav: 'Doğal ahşap, beyaz/bej tonlar ve minimalist sadeliğin hükmettiği Skandinav',
    bohem: 'Katmanlı dokular, zengin renkler ve organik şekillerin bir arada olduğu bohem',
    'endüstriyel': 'Ham beton, siyah demir ve deri detaylarıyla sert ama şık endüstriyel',
    klasik: 'Simetrik yerleşim, yumuşak renkler ve zarif dokunuşların oluşturduğu klasik',
};

const FALLBACK_ROOM_SUGGESTIONS = [
    {
        img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=900&q=80&auto=format&fit=crop',
        label: 'Oturma Odası',
    },
    {
        img: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=900&q=80&auto=format&fit=crop',
        label: 'Yatak Odası',
    },
    {
        img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=80&auto=format&fit=crop',
        label: 'Mutfak / Yemek Odası',
    },
];

// ─── Style → Category mapping for smart product recommendations ───
const STYLE_CATEGORY_MAP = {
    modern: ['Living Room', 'Lighting', 'Office'],
    skandinav: ['Living Room', 'Dining', 'Lighting'],
    bohem: ['Living Room', 'Lighting', 'Bedroom'],
    'endüstriyel': ['Office', 'Living Room', 'Lighting'],
    klasik: ['Living Room', 'Dining', 'Bedroom'],
};

function getRecommendedProducts(style, budget) {
    const preferredCategories = STYLE_CATEGORY_MAP[style] || STYLE_CATEGORY_MAP.modern;
    const maxBudget = budget || Infinity;

    // Score products based on style affinity
    const scored = allProducts.map(p => {
        let score = 0;
        const catIndex = preferredCategories.indexOf(p.category);
        if (catIndex !== -1) score += (3 - catIndex) * 10; // higher score for primary categories
        if (p.demandScore) score += p.demandScore / 10;
        if (p.discount > 0) score += 5; // bonus for discounted items
        return { ...p, _score: score };
    });

    // Sort by score descending
    scored.sort((a, b) => b._score - a._score);

    // Pick products within budget, max 5 items
    const selected = [];
    let runningTotal = 0;

    for (const product of scored) {
        if (selected.length >= 5) break;
        if (runningTotal + product.price <= maxBudget) {
            selected.push({
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                discount: product.discount,
                image: product.images?.[0] || product.image,
                category: product.category,
                quantity: 1,
            });
            runningTotal += product.price;
        }
    }

    return {
        products: selected,
        totalPrice: Math.round(runningTotal * 100) / 100,
    };
}

router.post('/room-design', async (req, res) => {
    const { imageBase64, mimeType = 'image/jpeg', style = 'modern', prompt, roomSize, budget } = req.body;

    if (!imageBase64) {
        return res.status(400).json({ error: 'imageBase64 alanı zorunludur.' });
    }

    // Get product recommendations based on style and budget
    const { products: recommendedProducts, totalPrice } = getRecommendedProducts(style, budget);

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    // ─── If Gemini API key is available, use it ──────────────
    if (GEMINI_API_KEY) {
        try {
            const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

            const styleLabel = STYLE_DESCRIPTIONS[style] || style;
            const sizeInfo = roomSize ? `Oda boyutu: ${roomSize}m².` : '';
            const budgetInfo = budget ? `Bütçe limiti: $${budget}.` : '';
            const userPrompt = prompt || `Bu odanın ${styleLabel} tarz mobilya ve dekorasyon önerilerini belirt.`;

            const body = {
                contents: [
                    {
                        parts: [
                            {
                                inline_data: {
                                    mime_type: mimeType,
                                    data: imageBase64,
                                },
                            },
                            {
                                text: `Sen profesyonel bir iç mimar ve mobilya uzmanısın. Aşağıdaki oda fotoğrafını analiz et ve şunları yap:\n\n1. Odanın mevcut yapısını kısaca değerlendir (zemin, duvar rengi, ışık)\n2. ${styleLabel} estetiğine uygun 3-5 mobilya/aksesuar önerisi sun\n3. Renk paleti ve yerleşim düzeni hakkında pratik tavsiyeler ver\n${sizeInfo} ${budgetInfo}\n\nKullanıcının notu: ${userPrompt}\n\nCevapta kesinlikle Türkçe yaz, samimi ve yardımsever bir dille konuş.`,
                            },
                        ],
                    },
                ],
                generationConfig: {
                    temperature: 0.8,
                    maxOutputTokens: 750,
                },
            };

            const geminiRes = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                }
            );

            const geminiData = await geminiRes.json();

            if (!geminiRes.ok) {
                throw new Error(geminiData.error?.message || 'Gemini API hatası.');
            }

            const description =
                geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ||
                'Analiz tamamlandı ancak sonuç alınamadı.';

            return res.json({
                description,
                suggestions: FALLBACK_ROOM_SUGGESTIONS,
                recommendedProducts,
                totalPrice,
            });
        } catch (err) {
            console.error('Gemini API Error:', err.message);
            // Fall through to mock response on error
        }
    }

    // ─── Fallback: intelligent mock response ─────────────────
    const styleLabel = STYLE_DESCRIPTIONS[style] || style;

    const mockDescriptions = {
        modern: `Odanız için modern tarz öneriler: Temiz çizgili, düşük profilli bir kanepe ile merkezi bir sehpa kombinasyonu çok şık durur. Renk paletinde antrasit gri, beyaz ve mat siyah detaylar kullanın. Köşeye yerleştireceğiniz yüksek bir kare raf ünitesi hem estetik hem fonksiyonel bir çözüm sunar. Zemin lambası olarak ince metal gövdeli bir model, modern estetiği tamamlar.${roomSize ? ` ${roomSize}m² bir alan için bu parçalar ideal bir yerleşim sunar.` : ''}`,
        skandinav: `Bu odaya Skandinav estetiği mükemmel oturur. Açık ahşap tonlarında (meşe, kayın) bir sehpa ve koltuk grubu seçin. Krem, bej ve soft yeşil renk paletini tercih edin. Doğal keten kırlentler ve yün bir battaniye hem sıcaklık hem doku katar.${roomSize ? ` ${roomSize}m² alanınız için bu parçalar dengeli bir oran sağlar.` : ''}`,
        bohem: `Bohem tarz için katmanlı, renkli ve kişisel bir yaklaşım benimsemenizi öneririm. Farklı doku ve renklerde kırlentler, Türk kilim veya Hint halısı, hasır taban sepetler ve makrome duvar süsleri bu estetiği mükemmel yaşatır.${roomSize ? ` ${roomSize}m² alanınızda bu unsurlar harika bir atmosfer yaratır.` : ''}`,
        'endüstriyel': `Endüstriyel tarz için siyah metal çerçeveli mobilyaları tercih edin. Deri koltuk veya kanepe, ahşap ve demir kombini sehpa ile duvar boyunca uzanan açık raf sistemi bu estetiği mükemmel yansıtır.${roomSize ? ` ${roomSize}m² alanınızda bu parçalar güçlü bir karakter oluşturur.` : ''}`,
        klasik: `Klasik tarz için simetrik bir yerleşim planı oluşturun. Kanepelerin karşısına simetrik tekli koltuklar yerleştirin, aralarına yuvarlak klasik bir sehpa koyun. Lacivert, bordo veya zümrüt yeşili kadife kumaş seçimler zarifliği artırır.${roomSize ? ` ${roomSize}m² alanınız için bu parçalar zarif bir denge oluşturur.` : ''}`,
    };

    const description = mockDescriptions[style] || mockDescriptions.modern;

    return res.json({
        description,
        suggestions: FALLBACK_ROOM_SUGGESTIONS,
        recommendedProducts,
        totalPrice,
    });
});

module.exports = router;
