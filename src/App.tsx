/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Truck, 
  Hand, 
  Search,
  ArrowRight,
  User,
  Phone,
  MapPin,
  QrCode,
  CheckCircle2
} from 'lucide-react';

// --- Data ---

const COLLECTIONS = [
  // --- SEIKO CUSTOM MODS ---
  { 
    id: 1, 
    name: "Seikojust | Geometric Blue", 
    tag: "Seiko Mod", 
    category: "Watch",
    price: "₹999", 
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1000&auto=format&fit=crop",
    description: "A stunning custom-built timepiece featuring a geometric blue dial and a classic Datejust-inspired case. Built with precision and style.",
    specs: { movement: "Japanese NH35 Automatic", glass: "Sapphire Crystal", waterResistance: "50m", caseSize: "36mm" }
  },
  { 
    id: 2, 
    name: "Seikotona | Tiffany Blue", 
    tag: "Seiko Mod", 
    category: "Watch",
    price: "₹999", 
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000&auto=format&fit=crop",
    description: "The iconic Tiffany Blue dial meets the reliability of Japanese engineering. A perfect summer statement piece.",
    specs: { movement: "Japanese NH35 Automatic", glass: "Sapphire Crystal", waterResistance: "50m", caseSize: "36mm" }
  },
  { 
    id: 3, 
    name: "GMTeiko | Sprite Edition", 
    tag: "Seiko Mod", 
    category: "Watch",
    price: "₹999", 
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1000&auto=format&fit=crop",
    description: "Featuring the sought-after green and black bezel, this GMT mod is as functional as it is beautiful.",
    specs: { movement: "Japanese NH34 GMT Automatic", glass: "Hardlex Crystal", waterResistance: "100m", caseSize: "40mm" }
  },
  { 
    id: 7, 
    name: "Seitona | Arabic Rose Gold", 
    tag: "Seiko Mod", 
    category: "Watch",
    price: "₹999", 
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000&auto=format&fit=crop",
    description: "Exquisite Arabic numerals on a rose gold sunburst dial. A fusion of Middle Eastern luxury and Japanese craft.",
    specs: { movement: "Japanese NH35 Automatic", glass: "Sapphire Crystal", waterResistance: "50m", caseSize: "40mm" }
  },
  { 
    id: 8, 
    name: "GMTeiko | Pepsi Bezel", 
    tag: "Seiko Mod", 
    category: "Watch",
    price: "₹999", 
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    description: "The classic red and blue GMT look. A rugged, versatile companion for the global traveler.",
    specs: { movement: "Japanese NH34 GMT Automatic", glass: "Hardlex Crystal", waterResistance: "100m", caseSize: "40mm" }
  },
  // --- ROLEX LUXURY ---
  { 
    id: 15, 
    name: "Explorer | Adventure", 
    tag: "Luxury", 
    category: "Watch",
    price: "₹999", 
    image: "https://images.unsplash.com/photo-1510017803434-a899398421b3?q=80&w=1000&auto=format&fit=crop",
    description: "A tool watch created for the extremes. Legibility and durability in its purest form.",
    specs: { movement: "Calibre 3230", glass: "Scratch-resistant Sapphire", waterResistance: "100m", caseSize: "36mm" }
  },
  { 
    id: 16, 
    name: "Yacht-Master | Everose", 
    tag: "Luxury", 
    category: "Watch",
    price: "₹999", 
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1000&auto=format&fit=crop",
    description: "Elegant, sporty and distinguished. The Everose gold case with an Oysterflex strap redefined luxury.",
    specs: { movement: "Calibre 3235", glass: "Scratch-resistant Sapphire", waterResistance: "100m", caseSize: "40mm" }
  },
  { 
    id: 17, 
    name: "Sky-Dweller | Blue", 
    tag: "Luxury", 
    category: "Watch",
    price: "₹999", 
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1000&auto=format&fit=crop",
    description: "The master of travel. Features an annual calendar and dual time-zone display on a stunning blue dial.",
    specs: { movement: "Calibre 9001", glass: "Scratch-resistant Sapphire", waterResistance: "100m", caseSize: "42mm" }
  },
  { 
    id: 19, 
    name: "Air-King | Modern", 
    tag: "Luxury", 
    category: "Watch",
    price: "₹999", 
    image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1000&auto=format&fit=crop",
    description: "A tribute to the pioneers of flight. Bold black dial with large 3, 6, and 9 numerals for instant legibility.",
    specs: { movement: "Calibre 3131", glass: "Scratch-resistant Sapphire", waterResistance: "100m", caseSize: "40mm" }
  },

  // --- LIFESTYLE ---
  { 
    id: 21, 
    name: "Essential Baggy Denim", 
    tag: "Lifestyle", 
    category: "Baggy Jeans",
    price: "₹999", 
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1000&auto=format&fit=crop",
    description: "Heavyweight 14oz denim with a relaxed, architectural silhouette. Built for durability and efforteless style.",
    specs: { movement: "Hand-Stitched", glass: "100% Cotton", waterResistance: "Pre-washed", caseSize: "Relaxed Fit" }
  },
  { 
    id: 22, 
    name: "Signature Footwear", 
    tag: "Lifestyle", 
    category: "Shoes",
    price: "₹999", 
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop",
    description: "Hand-crafted leather sneakers featuring artisanal stitching and premium comfort soles. A new standard in luxury footwear.",
    specs: { movement: "Leather Hand-built", glass: "Memory Foam", waterResistance: "Weather-proofed", caseSize: "True to Size" }
  },
  { 
    id: 23, 
    name: "Aesthetic Curated Outfits", 
    tag: "Lifestyle", 
    category: "Aesthetic Outfit",
    price: "₹1,499", 
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1000&auto=format&fit=crop",
    description: "A complete hand-picked bundle designed for the modern aesthetic. Includes premium top and bottom co-ords.",
    specs: { movement: "Curated Set", glass: "Organic Blend", waterResistance: "Delicate Wash", caseSize: "Versatile" }
  }
];

const CATEGORIES = ["All", "Watch", "Shoes", "Baggy Jeans", "Aesthetic Outfit"];

const INSTAGRAM_URL = "https://www.instagram.com/honeysfashion.store?igsh=bGlmYzJ0NXR3MWNk";

const TESTIMONIALS = [
  { id: 1, name: "Aria Smith", rating: 5, text: "The movement is simply unmatched. I've never seen such beautiful craftsmanship. It's truly hand-built perfection." },
  { id: 2, name: "James Miller", rating: 5, text: "Honey Fashion Store exceeded my expectations. The custom mod fits perfectly on my wrist and looks stunning." },
  { id: 3, name: "Elena Rossi", rating: 5, text: "A beautiful fusion of modern aesthetics and traditional watchmaking. Fast shipping too!" },
];

const FAQS = [
  { q: "What is 'Hand-Built' horology?", a: "Every watch at Honey Fashion Store is crafted by skilled watch modders, not mass-produced in factory lines. We prioritize precision over volume." },
  { q: "Do you provide a warranty?", a: "Yes, we offer a 2nd-year support and craftsmanship warranty on all our premium watch collections." },
  { q: "How long does it take to ship?", a: "Since our watches are often finished to order, shipping typically takes 5-7 business days across PAN India." },
  { q: "Are the watches waterproof?", a: "Our custom mods are tested for water resistance, but we recommend professional testing if you plan on diving." },
  { q: "What movements do you use?", a: "We primarily use genuine Japanese NH35 and NH34 movements for their legendary reliability and accuracy." }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-4 shadow-sm' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <a href="#" className="text-2xl font-display font-bold tracking-tight text-brand-black">
            honeyfashion<span className="text-brand-gold">.store</span>
          </a>
          <div className="hidden md:flex gap-8 items-center text-sm font-semibold uppercase tracking-widest opacity-80">
            <a href="#collections" className="hover:text-brand-gold transition-colors">Collections</a>
            <a href="#about" className="hover:text-brand-gold transition-colors">About</a>
            <a href="#faq" className="hover:text-brand-gold transition-colors">FAQ</a>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-black/5 rounded-full transition-colors text-brand-black">
            <Search size={20} className="hidden md:block" />
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-black/5 rounded-full transition-colors text-brand-black">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Star size={20} className="text-brand-gold" fill="currentColor" />
            </motion.div>
          </a>
          <div className="relative p-2 hover:bg-black/5 rounded-full transition-colors cursor-pointer group">
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 bg-brand-gold text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">0</span>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col gap-6 md:hidden z-40 border-t border-gray-100"
          >
            <a href="#collections" className="text-lg font-bold uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Collections</a>
            <a href="#about" className="text-lg font-bold uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#faq" className="text-lg font-bold uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>FAQ</a>
            <hr className="border-gray-100" />
            <button className="flex items-center gap-2 font-bold uppercase tracking-widest text-brand-gold">
              <Search size={20} /> Search
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FAQItem = ({ faq }: { faq: typeof FAQS[0] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-6 last:border-0 overflow-hidden">
      <button 
        className="w-full flex justify-between items-center text-left group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg md:text-xl font-medium group-hover:text-brand-gold transition-colors">{faq.q}</span>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-600 mt-4 leading-relaxed"
          >
            <p className="pb-2">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductDetail = ({ product, onBack }: { product: typeof COLLECTIONS[0], onBack: () => void }) => {
  const [orderStep, setOrderStep] = useState<'viewing' | 'details' | 'payment' | 'success'>('viewing');
  const [formData, setFormData] = useState({ name: '', address: '', phone: '' });

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStep('payment');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-white overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
        {orderStep === 'viewing' && (
          <button 
            onClick={onBack}
            className="flex items-center gap-2 font-bold uppercase tracking-widest text-xs mb-12 hover:text-brand-gold transition-colors group"
          >
            <X size={18} className="group-hover:rotate-90 transition-transform" />
            Back to Collection
          </button>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Side: Product Image */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className={`aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 ${orderStep !== 'viewing' ? 'hidden lg:block opacity-40 scale-95' : ''}`}
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>

          {/* Right Side: Step Content */}
          <div className="flex flex-col justify-center min-h-[500px]">
            <AnimatePresence mode="wait">
              {orderStep === 'viewing' && (
                <motion.div 
                  key="viewing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{product.tag}</span>
                  <h1 className="text-luxury text-5xl md:text-7xl mb-6">{product.name}</h1>
                  <p className="text-3xl font-display text-gray-400 mb-8">{product.price}</p>
                  
                  <p className="text-gray-600 text-lg leading-relaxed mb-12 border-l-4 border-brand-gold pl-6 py-2">
                    {product.description}
                  </p>

                  <div className="grid grid-cols-2 gap-8 mb-12">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="uppercase tracking-widest text-[10px] font-bold text-gray-400 mb-1">Movement</p>
                      <p className="font-semibold">{product.specs.movement}</p>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                      <p className="uppercase tracking-widest text-[10px] font-bold text-gray-400 mb-1">Glass</p>
                      <p className="font-semibold">{product.specs.glass}</p>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                      <p className="uppercase tracking-widest text-[10px] font-bold text-gray-400 mb-1">Resistance</p>
                      <p className="font-semibold">{product.specs.waterResistance}</p>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                      <p className="uppercase tracking-widest text-[10px] font-bold text-gray-400 mb-1">Case Size</p>
                      <p className="font-semibold">{product.specs.caseSize}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setOrderStep('details')}
                    className="w-full bg-brand-black text-white py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-gold transition-all shadow-xl hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                  >
                    Order Now <ArrowRight size={18} />
                  </button>
                  
                  <div className="mt-8 flex flex-col gap-4 border-t border-gray-100 pt-8 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2"><Truck size={14} className="text-brand-gold" /> Delivery in 2-3 Days</div>
                      <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-brand-gold" /> Open Box Delivery</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2"><Star size={14} className="text-brand-gold" /> 7 Day Easy Return</div>
                      <div className="flex items-center gap-2 tracking-tighter opacity-80">UPI • QR • COD</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {orderStep === 'details' && (
                <motion.div 
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-brand-offwhite p-8 md:p-12 rounded-[2.5rem] border border-gray-100"
                >
                  <h2 className="text-luxury text-4xl mb-8">Delivery Details</h2>
                  <form onSubmit={handleOrderSubmit} className="flex flex-col gap-6">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        required
                        type="text" 
                        placeholder="Full Name" 
                        className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-gold transition-colors text-brand-black font-semibold"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input 
                        required
                        type="tel" 
                        placeholder="Mobile Number" 
                        className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-gold transition-colors text-brand-black font-semibold"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-6 text-gray-400" size={18} />
                      <textarea 
                        required
                        placeholder="Shipping Address" 
                        rows={4}
                        className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-gold transition-colors text-brand-black font-semibold"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                    <div className="flex gap-4 mt-4">
                      <button 
                        type="button"
                        onClick={() => setOrderStep('viewing')}
                        className="flex-1 border border-brand-black/10 py-5 rounded-full font-bold uppercase tracking-widest text-[10px] text-brand-black"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="flex-[2] bg-brand-black text-white py-5 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-brand-gold transition-all"
                      >
                        Proceed to Payment
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {orderStep === 'payment' && (
                <motion.div 
                  key="payment"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-brand-black text-white p-8 rounded-[2.5rem] text-center"
                >
                  <div className="bg-[#FDEFD9] p-4 rounded-[2rem] mb-6 shadow-inner">
                    <div className="aspect-square w-full max-w-[320px] mx-auto bg-white p-0 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                      <img 
                        src="/payment_qr.jpg" 
                        alt="UPI Payment QR Code" 
                        className="w-full h-full object-contain" 
                      />
                    </div>
                  </div>

                  <h2 className="text-luxury text-2xl mb-2">Scan & Pay</h2>
                  <p className="text-gray-400 mb-6 text-xs uppercase tracking-widest font-bold">Total Payable: {product.price}</p>

                  <p className="text-[10px] text-gray-500 mb-2 px-6 uppercase tracking-widest font-bold leading-relaxed">
                    Scan the QR above with any UPI app to complete your order. Our team will contact you once the transaction is reflected.
                  </p>
                </motion.div>
              )}

              {orderStep === 'success' && (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-24 h-24 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={48} className="text-brand-gold" />
                  </div>
                  <h2 className="text-luxury text-5xl mb-6">Order Received!</h2>
                  <p className="text-gray-500 mb-12 text-lg leading-relaxed max-w-sm mx-auto">
                    Thank you <span className="text-brand-black font-bold">{formData.name}</span>! Your request for the <span className="text-brand-black font-bold">{product.name}</span> is being processed. Our team will contact you within 24 hours.
                  </p>
                  <button 
                    onClick={onBack}
                    className="bg-brand-black text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl"
                  >
                    Back to Store
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState<typeof COLLECTIONS[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  const HERO_SLIDES = [
    {
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
      title: "SILVER",
      subtitle: "PRECISION"
    },
    {
      image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1200&auto=format&fit=crop",
      title: "SAPPHIRE",
      subtitle: "DEPTH"
    },
    {
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1200&auto=format&fit=crop",
      title: "TIFFANY",
      subtitle: "LEGACY"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedProduct]);

  const filteredItems = activeCategory === "All" 
    ? COLLECTIONS 
    : COLLECTIONS.filter(item => item.category === activeCategory);

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-[#020202] perspective-2000">
        {/* Immersive Dark Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-radial-at-c from-brand-gold/5 to-transparent opacity-50" />
          <motion.div 
            key={currentHeroSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.15, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute inset-0"
          >
            <img 
              src={HERO_SLIDES[currentHeroSlide].image} 
              alt="Luxury Backdrop" 
              className="w-full h-full object-cover mix-blend-overlay blur-sm"
            />
          </motion.div>
          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020202]" />
          <div className="absolute inset-0 shadow-[inset_0_0_300px_rgba(0,0,0,1)]" />
        </div>

        {/* Cinematic Particles / Bubbles */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: "110%", x: `${Math.random() * 100}%` }}
              animate={{ 
                opacity: [0, 0.6, 0],
                y: "-10%",
                x: [`${Math.random() * 100}%`, `${(Math.random() * 100) + (Math.sin(i) * 4)}%`],
                scale: [0.2, 1.2, 0.2]
              }}
              transition={{
                duration: 15 + Math.random() * 20,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear"
              }}
              className="absolute w-[2px] h-[2px] bg-white brightness-150 rounded-full shadow-[0_0_10px_white]"
            />
          ))}
        </div>

        <div className="relative z-20 max-w-7xl mx-auto flex flex-col items-center">
          {/* Main Content Container */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 w-full">
            
            {/* 3D Masterpiece Slider */}
            <div className="relative w-72 h-72 md:w-[36rem] md:h-[36rem] perspective-1000">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHeroSlide}
                  initial={{ opacity: 0, scale: 0.8, rotateY: 30, x: 50 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotateY: -30, x: -50 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full relative"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    animate={{ 
                      y: [-15, 15, -15],
                      rotateY: [-5, 5, -5]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full relative group"
                  >
                    {/* Glow Effect */}
                    <div className="absolute -inset-16 bg-brand-gold/10 blur-[120px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
                    
                    <div className="w-full h-full rounded-2xl md:rounded-[5rem] overflow-hidden border border-white/10 shadow-[0_80px_160px_-40px_rgba(0,0,0,1)] bg-brand-black p-1">
                      <img 
                        src={HERO_SLIDES[currentHeroSlide].image} 
                        alt="Premium Watch Slide" 
                        className="w-full h-full object-cover rounded-2xl md:rounded-[4.8rem] transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-white/5 pointer-events-none" />
                    </div>

                    {/* Orbital Rings */}
                    <div className="absolute -inset-8 border border-white/5 rounded-full pointer-events-none" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-16 border border-brand-gold/10 rounded-full border-dashed pointer-events-none"
                    />
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-[1px] w-8 bg-brand-gold" />
                  <span className="text-brand-gold font-bold uppercase tracking-[0.6em] text-[10px]">Est. Atelier 2024</span>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentHeroSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col gap-2"
                  >
                    <h1 className="text-luxury text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-white tracking-tighter">
                      {HERO_SLIDES[currentHeroSlide].title} <br /> 
                      <span className="text-brand-gold italic">{HERO_SLIDES[currentHeroSlide].subtitle}</span>
                    </h1>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-white/40 font-bold uppercase tracking-[0.4em] text-[10px] mb-12 max-w-sm"
              >
                Hand-Built Masterpieces. Built. Not Factory Made.
              </motion.p>


            </div>
          </div>
        </div>

        {/* Floating Policy Badge - Integrated Better */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
          className="absolute left-8 bottom-32 hidden lg:flex flex-col gap-4 z-20"
        >
          <div className="bg-brand-black/40 backdrop-blur-xl p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col gap-4">
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/80">
              <Truck size={14} className="text-brand-gold" /> 2-3 Day Delivery
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/80">
              <ShieldCheck size={14} className="text-brand-gold" /> Open Box Delivery
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/80">
              <Star size={14} className="text-brand-gold" /> 7 Day Returns
            </div>
          </div>
        </motion.div>

        {/* Marquee Bar */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden bg-brand-black border-t border-white/5 text-white py-5">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...Array(20)].map((_, i) => (
              <span key={i} className="mx-12 font-bold uppercase tracking-[0.4em] text-[9px] flex items-center gap-4 text-white/40">
                <div className="w-1.5 h-1.5 bg-brand-gold rounded-full" /> Hand-Built Mastery
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Policy Bar */}
      <div className="bg-brand-black text-white py-12 border-y border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-12 text-[10px] filter saturate-50 hover:saturate-100 transition-all font-bold uppercase tracking-[0.3em]">
          <div className="flex items-center gap-3">
            <Truck size={18} className="text-brand-gold" /> Delivery Within 2-3 Days
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck size={18} className="text-brand-gold" /> Open Box Delivery Available
          </div>
          <div className="flex items-center gap-3">
            <Star size={18} className="text-brand-gold" /> 7 Day Return Policy
          </div>
          <div className="flex items-center gap-3">
            <Hand size={18} className="text-brand-gold" /> 100% Eco-Friendly Packing
          </div>
        </div>
      </div>

      {/* Stats/Why Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16" id="about">
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center gap-4"
        >
          <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold mb-4">
            <Hand size={32} />
          </div>
          <h3 className="text-2xl font-display font-bold">Artisanal Built</h3>
          <p className="text-gray-500 leading-relaxed max-w-xs">No assembly lines. Every timepiece is hand-built by single artisans dedicated to perfection.</p>
        </motion.div>
        
        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center text-center gap-4"
        >
          <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold mb-4">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-2xl font-display font-bold">Unmatched Quality</h3>
          <p className="text-gray-500 leading-relaxed max-w-xs">We use only the finest movements, rigorous testing, and precise detailing for every client.</p>
        </motion.div>

        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center text-center gap-4"
        >
          <div className="w-16 h-16 bg-brand-gold/10 rounded-2xl flex items-center justify-center text-brand-gold mb-4">
            <Truck size={32} />
          </div>
          <h3 className="text-2xl font-display font-bold">White Glove Care</h3>
          <p className="text-gray-500 leading-relaxed max-w-xs">From order to unboxing, enjoy a premium concierge experience and secure global delivery.</p>
        </motion.div>
      </section>

      {/* Grid Collections */}
      <section className="py-24 px-6 bg-white" id="collections">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-luxury text-5xl md:text-7xl mb-4">CURATED <br />SELECTIONS</h2>
              <p className="uppercase tracking-widest text-xs font-bold text-gray-400">Discover our latest masterpiece drops</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat 
                      ? "bg-brand-black text-white shadow-lg" 
                      : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredItems.map((item, index) => (
              <motion.div 
                key={item.id}
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.95 }}
                viewport={{ once: true }}
                transition={{ delay: index % 3 * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl mb-6 shadow-sm group-hover:shadow-2xl transition-shadow duration-500">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-black shadow-sm">
                      {item.tag}
                    </span>
                  </div>
                  <div 
                    onClick={() => setSelectedProduct(item)}
                    className="absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
                  >
                    <button className="bg-white text-brand-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-xs transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                      View Details
                    </button>
                  </div>
                </div>
                <h3 className="text-2xl font-display font-medium mb-1 group-hover:text-brand-gold transition-colors">{item.name}</h3>
                <p className="text-gray-400 font-semibold text-sm tracking-wide">{item.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Banner / Quote */}
      <section className="py-40 bg-brand-black text-white px-6 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 z-0">
          <img src="https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=2000&auto=format&fit=crop" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-luxury text-4xl md:text-6xl lg:text-7xl mb-12">"TIME IS THE ULTIMATE LUXURY. IT IS NOT ABOUT THE HOURS, BUT THE ARTISTRY OF EVERY SECOND."</h2>
          <div className="w-20 h-1 bg-brand-gold mx-auto mb-12"></div>
          <p className="uppercase tracking-[0.4em] text-xs font-bold text-brand-gold">Crafted with Purpose</p>
        </div>
      </section>

      {/* FAQ & Support */}
      <section className="py-32 px-6 bg-brand-offwhite" id="faq">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-luxury text-5xl md:text-6xl mb-4">CURATED QUESTIONS</h2>
            <p className="uppercase tracking-widest text-xs font-bold text-gray-400">Everything you need to know about our atelier</p>
          </div>
          <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-gray-100">
            {FAQS.map((faq, i) => (
              <div key={i}>
                <FAQItem faq={faq} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-luxury text-4xl md:text-5xl text-center mb-16 italic">Voices of Elegance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div 
                key={t.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white p-10 rounded-3xl border border-gray-50 flex flex-col gap-6"
              >
                <div className="flex gap-1 text-brand-gold">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 italic leading-relaxed text-lg">"{t.text}"</p>
                <div className="mt-auto pt-6 border-t border-gray-50 uppercase tracking-widest text-xs font-bold">
                  {t.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-black text-white pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-2">
              <a href="#" className="text-3xl font-display font-bold tracking-tight mb-8 block">
                honeyfashion<span className="text-brand-gold">.store</span>
              </a>
              <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
                Hand-built watches and custom-designed luxury timepieces for the modern collector. Built Not Factory Made.
              </p>
              <div className="flex gap-4">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-brand-gold/20 hover:text-brand-gold transition-all cursor-pointer">
                  <Star size={20} />
                </a>
                <div className="p-3 bg-white/5 rounded-full hover:bg-brand-gold/20 hover:text-brand-gold transition-all cursor-pointer">
                  <ShieldCheck size={20} />
                </div>
                <div className="p-3 bg-white/5 rounded-full hover:bg-brand-gold/20 hover:text-brand-gold transition-all cursor-pointer">
                  <Truck size={20} />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Collections</h4>
              <ul className="flex flex-col gap-4 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Seiko Mods</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rolex Premium</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Limited Editions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Custom Orders</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-widest text-sm mb-6">Support</h4>
              <ul className="flex flex-col gap-4 text-gray-500 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-gray-600 text-xs uppercase tracking-widest">
              © 2026 Honey Fashion Store. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6 grayscale opacity-30">
              <span className="font-bold tracking-tighter text-sm">UPI</span>
              <span className="font-bold tracking-tighter text-2xl">VISA</span>
              <span className="font-bold tracking-tighter text-2xl">MASTER</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Extra Marquee CSS for continuous movement */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
