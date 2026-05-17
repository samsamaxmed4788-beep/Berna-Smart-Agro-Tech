import { useState, useEffect } from 'react';
import { ShoppingCart, Leaf, CheckCircle2, AlertCircle, X, Sprout } from 'lucide-react';

const products = [
  {
    id: 1,
    nameEn: 'Hydroponic Barley Fodder',
    nameSo: 'Calafka Shaciirka (Barley)',
    descEn: 'High-protein barley sprouts, perfect for rapid livestock fattening and increased milk production.',
    descSo: 'Calaf shaciir ah oo nafaqo badan, wuxuu ku fiican yahay naaxinta xoolaha iyo badinta caanaha.',
    price: 5,
    unit: '10 kg Tray',
    image: 'https://images.unsplash.com/photo-1530836369250-ef71a3b5e4cf?auto=format&fit=crop&q=80&w=800',
    color: 'berna-green'
  },
  {
    id: 2,
    nameEn: 'Hydroponic Corn Fodder',
    nameSo: 'Calafka Galayda (Corn)',
    descEn: 'Energy-rich corn sprouts, excellent for maintaining livestock weight during drought seasons.',
    descSo: 'Calaf galay ah oo tamar badan, wuxuu ilaaliyaa miisaanka xoolaha xilliyada abaaraha.',
    price: 5,
    unit: '10 kg Tray',
    image: 'https://farmboxfoods.com/wp-content/uploads/elementor/thumbs/Fodder-trays-copy-puraslt7z4izemdni5vfvxxyjg7t7d50ttyfqqi3s0.jpg',
    color: 'yellow-500'
  },
  {
    id: 3,
    nameEn: 'Hydroponic Wheat Fodder',
    nameSo: 'Calafka Qamadiga (Wheat)',
    descEn: 'Nutrient-dense wheat sprouts providing essential vitamins and enzymes for overall animal health.',
    descSo: 'Calaf qamadi ah oo buuxa fiitamiino iyo nafaqo, wuxuu xoojiya caafimaadka guud ee xoolaha.',
    price: 5,
    unit: '10 kg Tray',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=800',
    color: 'berna-blue'
  }
];

const Store = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, error

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOrder = (e) => {
    e.preventDefault();
    if (!phone || quantity < 1) return;
    
    setPaymentStatus('processing');
    
    // Simulate Zaad API call
    setTimeout(() => {
      setPaymentStatus('success');
      setTimeout(() => {
        setSelectedProduct(null);
        setPaymentStatus('idle');
        setQuantity(1);
        setPhone('');
      }, 3000);
    }, 2000);
  };

  const openOrderModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setPaymentStatus('idle');
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 md:px-12 selection:bg-berna-green selection:text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-berna-green/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-berna-blue/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <span className="inline-block py-1 px-3 rounded-full bg-berna-green/10 text-berna-green font-semibold text-sm mb-4 border border-berna-green/20">
            Smart Fodder Market
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-slate-900 dark:text-white tracking-tight">
            Fresh Fodder <span className="text-gradient">Store</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Drought-proof your livestock with our 7-day hydroponic fodder. Fresh, highly nutritious, and available year-round.
          </p>
          <p className="text-lg text-slate-500 font-serif italic border-l-4 border-berna-green pl-4 inline-block text-left">
            "Ka iibso calaf cagaaran oo daray ah, kana badbaadi xoolahaaga abaaraha."
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="glass rounded-[2rem] overflow-hidden group hover:-translate-y-2 transition-all duration-500 animate-fade-in-up border border-white/20 dark:border-white/10 hover:shadow-2xl hover:shadow-berna-green/20 flex flex-col"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.nameEn} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-white font-bold text-sm backdrop-blur-md border border-white/20 shadow-lg">
                  In Stock
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-2xl font-extrabold drop-shadow-md">${product.price}</div>
                  <div className="text-sm font-medium text-white/80">per {product.unit}</div>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-berna-green transition-colors">{product.nameEn}</h3>
                <h4 className="text-sm font-semibold text-berna-green mb-4">{product.nameSo}</h4>
                
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1">
                  {product.descEn}
                </p>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 mb-6">
                  <p className="text-sm text-slate-500 font-serif italic text-center">"{product.descSo}"</p>
                </div>
                
                <button 
                  onClick={() => openOrderModal(product)}
                  className="w-full py-4 rounded-xl bg-berna-green text-white font-bold flex items-center justify-center gap-2 hover:bg-berna-green-dark transition-colors shadow-lg shadow-berna-green/30"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Order Now / Dalbo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in-up">
          <div className="relative w-full max-w-lg glass bg-white/90 dark:bg-slate-800/90 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 dark:border-slate-700">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-200 dark:bg-slate-700 rounded-full hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              <X className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            </button>

            {/* Modal Content */}
            <div className="p-8">
              {paymentStatus === 'success' ? (
                <div className="text-center py-8 animate-fade-in-up">
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Payment Successful!</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-2">Waad ku mahadsantahay dalabkaaga.</p>
                  <p className="text-sm text-slate-500">We will deliver your {quantity} trays of {selectedProduct.nameEn} shortly.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                      <img src={selectedProduct.image} alt="Product" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">{selectedProduct.nameEn}</h3>
                      <div className="text-berna-green font-semibold text-sm">{selectedProduct.nameSo}</div>
                    </div>
                  </div>

                  <form onSubmit={handleOrder} className="space-y-6">
                    <div className="space-y-4">
                      {/* Quantity Input */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          Number of Trays (10kg each) / Cadadka
                        </label>
                        <div className="flex items-center">
                          <button 
                            type="button" 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-l-xl text-slate-700 dark:text-white font-bold text-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                          >-</button>
                          <input 
                            type="number" 
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                            className="w-20 h-12 text-center bg-slate-50 dark:bg-slate-900 border-y border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white font-bold focus:outline-none"
                          />
                          <button 
                            type="button"
                            onClick={() => setQuantity(quantity + 1)} 
                            className="w-12 h-12 flex items-center justify-center bg-slate-100 dark:bg-slate-700 rounded-r-xl text-slate-700 dark:text-white font-bold text-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                          >+</button>
                        </div>
                      </div>

                      {/* Phone Input */}
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                          Zaad / e-Dahab Number
                        </label>
                        <div className="relative">
                          <input 
                            type="tel" 
                            required
                            placeholder="e.g. 063 448 2134"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-4 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-berna-green dark:text-white transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-600 dark:text-slate-400">Price per unit</span>
                        <span className="font-semibold text-slate-900 dark:text-white">${selectedProduct.price.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-600 dark:text-slate-400">Quantity</span>
                        <span className="font-semibold text-slate-900 dark:text-white">x {quantity}</span>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
                        <span className="font-bold text-slate-900 dark:text-white text-lg">Total Amount</span>
                        <span className="font-extrabold text-berna-green text-2xl">${(selectedProduct.price * quantity).toFixed(2)}</span>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={paymentStatus === 'processing'}
                      className="w-full py-4 rounded-xl font-bold text-white bg-berna-green hover:bg-berna-green-dark transition-all disabled:opacity-70 flex justify-center items-center gap-2 shadow-lg shadow-berna-green/30"
                    >
                      {paymentStatus === 'processing' ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing Payment...
                        </>
                      ) : (
                        <>Pay Now / Bixi Lacagta</>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;
