import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const ROOM_STYLES = [
    { id: 'modern', label: 'Modern', icon: '◼' },
    { id: 'skandinav', label: 'Skandinav', icon: '◇' },
    { id: 'bohem', label: 'Bohem', icon: '○' },
    { id: 'endüstriyel', label: 'Endüstriyel', icon: '▲' },
    { id: 'klasik', label: 'Klasik', icon: '◆' },
];

const SUGGESTIONS_POOL = [
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
        label: 'Mutfak',
    },
];

const ROOM_SIZES = [
    { value: 30, label: '30 m²' },
    { value: 50, label: '50 m²' },
    { value: 80, label: '80 m²' },
    { value: 120, label: '120 m²' },
    { value: 200, label: '200+ m²' },
];

const steps = ['Fotoğraf Yükle', 'Stil & Bütçe', 'AI Öneriler'];

const AiDesigner = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [roomImage, setRoomImage] = useState(null);
    const [roomImageFile, setRoomImageFile] = useState(null);
    const [selectedStyle, setSelectedStyle] = useState('modern');
    const [roomSize, setRoomSize] = useState(80);
    const [budget, setBudget] = useState(3000);
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);
    const fileInputRef = useRef();
    const { addToCart } = useCart();

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setRoomImage(URL.createObjectURL(file));
            setRoomImageFile(file);
            setResult(null);
            setError(null);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setRoomImage(URL.createObjectURL(file));
            setRoomImageFile(file);
            setResult(null);
            setError(null);
        }
    };

    const handleGenerate = async () => {
        if (!roomImage) return;
        setIsGenerating(true);
        setError(null);
        setResult(null);
        setAddedToCart(false);

        try {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64 = reader.result.split(',')[1];
                const mimeType = roomImageFile?.type || 'image/jpeg';

                const res = await fetch('http://localhost:5001/api/ai/room-design', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        imageBase64: base64,
                        mimeType,
                        style: selectedStyle,
                        roomSize,
                        budget,
                        prompt: prompt || `Bu odaya ${selectedStyle} tarzında mobilya öner.`,
                    }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Bir hata oluştu.');
                setResult(data);
                setCurrentStep(2);
                setIsGenerating(false);
            };
            if (roomImageFile) {
                reader.readAsDataURL(roomImageFile);
            } else {
                // Fallback mock for example images (no file object)
                const res = await fetch('http://localhost:5001/api/ai/room-design', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        imageBase64: 'MOCK_IMAGE_PLACEHOLDER',
                        style: selectedStyle,
                        roomSize,
                        budget,
                        prompt: prompt || `Bu odaya ${selectedStyle} tarzında mobilya öner.`,
                    }),
                });
                const data = await res.json();
                setResult(data);
                setCurrentStep(2);
                setIsGenerating(false);
            }
        } catch (err) {
            setError(err.message);
            setIsGenerating(false);
        }
    };

    const handleAddAllToCart = () => {
        if (result?.recommendedProducts) {
            result.recommendedProducts.forEach(product => {
                addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    images: [product.image],
                    category: product.category,
                });
            });
            setAddedToCart(true);
        }
    };

    const reset = () => {
        setCurrentStep(0);
        setRoomImage(null);
        setRoomImageFile(null);
        setResult(null);
        setSelectedStyle('modern');
        setRoomSize(80);
        setBudget(3000);
        setPrompt('');
        setError(null);
        setAddedToCart(false);
    };

    return (
        <div className="min-h-screen bg-cream pt-24 pb-32">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="max-w-4xl mx-auto px-6 lg:px-8 text-center mb-16"
            >
                <p className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.22em] uppercase text-accent font-medium mb-5 before:content-[''] before:block before:w-6 before:h-[1px] before:bg-accent">
                    Yapay Zeka Destekli
                </p>
                <h1 className="font-serif text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.1] font-light text-dark mb-5">
                    AI İç <em className="not-italic italic text-brown">Mimar</em>
                </h1>
                <p className="text-base leading-[1.75] text-muted font-light max-w-xl mx-auto">
                    Odanın fotoğrafını yükle, tarzını ve bütçeni seç — yapay zeka sizin için en uygun mobilya kombinasyonunu oluştursun.
                </p>
            </motion.div>

            {/* Step Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="max-w-lg mx-auto px-6 mb-12"
            >
                <div className="flex items-center justify-between">
                    {steps.map((step, i) => (
                        <React.Fragment key={i}>
                            <div className="flex flex-col items-center gap-2">
                                <div className={`w-8 h-8 flex items-center justify-center border text-[0.7rem] font-medium transition-all duration-500 ${i <= currentStep ? 'bg-dark border-dark text-cream' : 'bg-cream border-sand/50 text-muted'}`}>
                                    {i < currentStep ? (
                                        <svg width="12" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 12 10">
                                            <polyline points="1,5 4.5,9 11,1" />
                                        </svg>
                                    ) : (i + 1)}
                                </div>
                                <span className={`text-[0.6rem] tracking-[0.12em] uppercase ${i <= currentStep ? 'text-dark' : 'text-muted'}`}>
                                    {step}
                                </span>
                            </div>
                            {i < steps.length - 1 && (
                                <div className={`flex-1 h-[1px] mx-3 mt-[-16px] transition-all duration-700 ${i < currentStep ? 'bg-dark' : 'bg-sand/40'}`} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-6 lg:px-8">
                <AnimatePresence mode="wait">
                    {/* STEP 0 & 1 — Upload + Style + Budget */}
                    {currentStep < 2 && (
                        <motion.div
                            key="upload-style"
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        >
                            {/* Upload Panel */}
                            <div className="bg-white border border-sand/40 p-8">
                                <p className="text-[0.7rem] tracking-[0.18em] uppercase text-muted mb-6 flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-sand"></span> Adım 1
                                </p>
                                <h2 className="font-serif text-2xl font-light text-dark mb-6">Odanın Fotoğrafı</h2>

                                {roomImage ? (
                                    <div className="relative">
                                        <img src={roomImage} alt="Yüklenen oda" className="w-full h-52 object-cover" />
                                        <button
                                            onClick={() => { setRoomImage(null); setRoomImageFile(null); }}
                                            className="absolute top-3 right-3 bg-dark/80 text-cream w-7 h-7 flex items-center justify-center text-xs hover:bg-dark transition-colors"
                                        >
                                            ✕
                                        </button>
                                        <p className="mt-3 text-[0.7rem] tracking-[0.1em] uppercase text-accent">✓ Fotoğraf hazır</p>
                                    </div>
                                ) : (
                                    <div
                                        onDrop={handleDrop}
                                        onDragOver={(e) => e.preventDefault()}
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-sand/60 h-52 flex flex-col items-center justify-center cursor-pointer hover:border-accent/50 hover:bg-accent/3 transition-all duration-300 group"
                                    >
                                        <svg className="w-8 h-8 text-sand mb-3 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <p className="text-[0.75rem] text-muted group-hover:text-dark transition-colors">Fotoğraf sürükle veya <span className="text-accent underline">seç</span></p>
                                        <p className="text-[0.65rem] text-muted/70 mt-1">JPG, PNG — Max 10MB</p>
                                    </div>
                                )}
                                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

                                {!roomImage && (
                                    <div className="mt-6">
                                        <p className="text-[0.65rem] tracking-[0.12em] uppercase text-muted mb-3">Örnek fotoğraflar</p>
                                        <div className="flex gap-2">
                                            {SUGGESTIONS_POOL.map((s, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => { setRoomImage(s.img); setRoomImageFile(null); }}
                                                    className="flex-1 overflow-hidden border border-sand/40 hover:border-accent/40 transition-colors"
                                                >
                                                    <img src={s.img} alt={s.label} className="w-full h-14 object-cover" />
                                                    <p className="text-[0.55rem] text-muted py-1">{s.label}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Style + Budget + Prompt Panel */}
                            <div className="bg-white border border-sand/40 p-8">
                                <p className="text-[0.7rem] tracking-[0.18em] uppercase text-muted mb-6 flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-sand"></span> Adım 2
                                </p>
                                <h2 className="font-serif text-2xl font-light text-dark mb-6">Stil & Bütçe</h2>

                                {/* Style selector */}
                                <div className="grid grid-cols-5 gap-2 mb-6">
                                    {ROOM_STYLES.map((s) => (
                                        <button
                                            key={s.id}
                                            onClick={() => setSelectedStyle(s.id)}
                                            className={`py-3 flex flex-col items-center gap-1.5 border transition-all duration-200 ${selectedStyle === s.id ? 'border-dark bg-dark text-cream' : 'border-sand/40 text-muted hover:border-brown/40 hover:text-dark'}`}
                                        >
                                            <span className="text-base">{s.icon}</span>
                                            <span className="text-[0.6rem] tracking-[0.06em] uppercase">{s.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* Room Size */}
                                <div className="mb-5">
                                    <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-2">
                                        Oda Büyüklüğü
                                    </label>
                                    <div className="flex gap-2">
                                        {ROOM_SIZES.map((rs) => (
                                            <button
                                                key={rs.value}
                                                onClick={() => setRoomSize(rs.value)}
                                                className={`flex-1 py-2 text-[0.65rem] border transition-all duration-200 ${roomSize === rs.value ? 'border-dark bg-dark text-cream' : 'border-sand/40 text-muted hover:border-brown/40'}`}
                                            >
                                                {rs.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Budget */}
                                <div className="mb-5">
                                    <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-2">
                                        Bütçe: <span className="text-dark font-medium">${budget.toLocaleString()}</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="500"
                                        max="10000"
                                        step="250"
                                        value={budget}
                                        onChange={(e) => setBudget(Number(e.target.value))}
                                        className="w-full h-1 bg-sand/50 rounded-lg appearance-none cursor-pointer accent-dark"
                                    />
                                    <div className="flex justify-between text-[0.55rem] text-muted/60 mt-1">
                                        <span>$500</span>
                                        <span>$10,000</span>
                                    </div>
                                </div>

                                {/* Prompt */}
                                <label className="block text-[0.65rem] tracking-[0.15em] uppercase text-muted mb-2">
                                    Ek notlar (isteğe bağlı)
                                </label>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    rows={2}
                                    placeholder="Örn: 'Küçük çocuğum var, dayanıklı kumaş tercih ederim'"
                                    className="w-full border border-sand/50 bg-cream/50 p-4 text-sm text-dark placeholder:text-muted/60 focus:outline-none focus:border-brown/50 resize-none transition-colors"
                                />

                                {error && (
                                    <p className="mt-4 text-xs text-red-600 bg-red-50 border border-red-100 px-4 py-3">{error}</p>
                                )}

                                <motion.button
                                    onClick={() => {
                                        if (currentStep === 0 && roomImage) setCurrentStep(1);
                                        else if (currentStep === 1) handleGenerate();
                                    }}
                                    disabled={!roomImage || isGenerating}
                                    whileTap={{ scale: 0.98 }}
                                    className={`mt-6 w-full py-4 text-[0.8rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 flex items-center justify-center gap-3 ${!roomImage || isGenerating
                                        ? 'bg-sand/40 text-muted cursor-not-allowed'
                                        : 'bg-dark text-cream hover:bg-accent'
                                        }`}
                                >
                                    {isGenerating ? (
                                        <>
                                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            AI Analiz Ediyor...
                                        </>
                                    ) : currentStep === 0 && roomImage ? (
                                        <>Devam Et — Bütçe & Stil</>
                                    ) : (
                                        <>🪄 AI Mobilya Öner</>
                                    )}
                                </motion.button>

                                {!roomImage && (
                                    <p className="text-center text-[0.65rem] text-muted mt-4">Devam etmek için bir fotoğraf yükleyin</p>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2 — Result with Product Recommendations */}
                    {currentStep === 2 && result && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                                {/* Original Room */}
                                <div className="bg-white border border-sand/40 p-6">
                                    <p className="text-[0.6rem] tracking-[0.18em] uppercase text-muted mb-4">Mevcut Odanız</p>
                                    <img src={roomImage} alt="Orijinal oda" className="w-full h-64 object-cover" />
                                    <div className="flex gap-4 mt-4 text-[0.65rem] text-muted">
                                        <span className="flex items-center gap-1.5">📐 {roomSize}m²</span>
                                        <span className="flex items-center gap-1.5">💰 ${budget.toLocaleString()} bütçe</span>
                                        <span className="flex items-center gap-1.5 capitalize">🎨 {selectedStyle}</span>
                                    </div>
                                </div>

                                {/* AI Analysis */}
                                <div className="bg-white border border-sand/40 p-8 flex flex-col">
                                    <div className="flex items-center gap-2 mb-6">
                                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                                        <p className="text-[0.65rem] tracking-[0.18em] uppercase text-accent">AI Analizi Tamamlandı</p>
                                    </div>
                                    <h3 className="font-serif text-xl font-light text-dark mb-4 capitalize">{selectedStyle} Tarz Önerileri</h3>
                                    <p className="text-sm leading-[1.85] text-muted font-light flex-1">{result.description}</p>
                                </div>
                            </div>

                            {/* Recommended Products */}
                            {result.recommendedProducts && result.recommendedProducts.length > 0 && (
                                <div className="bg-white border border-sand/40 p-8 mb-8">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <p className="text-[0.65rem] tracking-[0.18em] uppercase text-accent mb-2">AI Mobilya Kombinasyonu</p>
                                            <h3 className="font-serif text-2xl font-light text-dark">Sizin İçin Seçtiklerimiz</h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[0.6rem] tracking-[0.12em] uppercase text-muted mb-1">Toplam Fiyat</p>
                                            <p className="font-serif text-3xl text-brown font-normal">${result.totalPrice}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                                        {result.recommendedProducts.map((product, i) => (
                                            <motion.div
                                                key={product.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 * i, duration: 0.5 }}
                                                className="border border-sand/40 overflow-hidden group"
                                            >
                                                <div className="aspect-square bg-sand/20 overflow-hidden relative">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                    {product.discount > 0 && (
                                                        <span className="absolute top-2 left-2 bg-red-600 text-white text-[0.5rem] tracking-[0.08em] uppercase px-1.5 py-0.5 font-semibold">
                                                            -%{product.discount}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="p-3">
                                                    <p className="text-[0.55rem] tracking-[0.1em] uppercase text-muted mb-1">{product.category}</p>
                                                    <p className="text-[0.8rem] text-dark font-medium leading-tight mb-2">{product.name}</p>
                                                    <div className="flex items-center gap-2">
                                                        <p className={`text-[0.85rem] font-medium ${product.discount > 0 ? 'text-red-600' : 'text-brown'}`}>
                                                            ${product.price}
                                                        </p>
                                                        {product.discount > 0 && (
                                                            <p className="text-[0.7rem] text-muted line-through">${product.originalPrice}</p>
                                                        )}
                                                    </div>
                                                    <p className="text-[0.6rem] text-muted mt-1">Adet: {product.quantity}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Add All to Cart */}
                                    <div className="mt-8 pt-6 border-t border-sand/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm text-muted">
                                                <span className="font-medium text-dark">{result.recommendedProducts.length} ürün</span> seçildi · Toplam: <span className="font-medium text-brown">${result.totalPrice}</span>
                                            </p>
                                        </div>
                                        <motion.button
                                            onClick={handleAddAllToCart}
                                            disabled={addedToCart}
                                            whileTap={{ scale: 0.97 }}
                                            className={`px-10 py-4 text-[0.8rem] tracking-[0.18em] uppercase font-medium transition-all duration-300 ${addedToCart
                                                    ? 'bg-green-600 text-white cursor-default'
                                                    : 'bg-dark text-cream hover:bg-accent'
                                                }`}
                                        >
                                            {addedToCart ? '✓ Sepete Eklendi!' : '🛒 Hepsini Sepete Ekle'}
                                        </motion.button>
                                    </div>
                                </div>
                            )}

                            {/* Suggested Rooms */}
                            {result.suggestions && result.suggestions.length > 0 && (
                                <div className="bg-white border border-sand/40 p-8">
                                    <p className="text-[0.65rem] tracking-[0.18em] uppercase text-muted mb-6">İlham Alınabilecek Mekanlar</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {result.suggestions.map((s, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 * i, duration: 0.5 }}
                                                className="overflow-hidden group cursor-pointer"
                                            >
                                                <div className="overflow-hidden">
                                                    <img src={s.img} alt={s.label} className="w-full h-40 object-cover transition-transform duration-700 group-hover:scale-105" />
                                                </div>
                                                <p className="text-[0.65rem] tracking-[0.12em] uppercase text-muted mt-2">{s.label}</p>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4 mt-8">
                                <button
                                    onClick={reset}
                                    className="text-[0.75rem] tracking-[0.15em] uppercase border border-sand/50 px-8 py-3.5 text-muted hover:border-dark hover:text-dark transition-all duration-300"
                                >
                                    Yeni Tasarım
                                </button>
                                <Link
                                    to="/#products"
                                    className="text-[0.75rem] tracking-[0.15em] uppercase bg-dark text-cream px-8 py-3.5 hover:bg-accent transition-all duration-300 relative overflow-hidden group"
                                >
                                    Koleksiyona Göz At
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AiDesigner;
