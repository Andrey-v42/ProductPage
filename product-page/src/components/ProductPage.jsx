import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Truck, Shield, CreditCard, Star, Heart, Share2, Menu, ShoppingCart, Search, User } from 'lucide-react';
import './css/ProductPage.css'

const ProductPage = () => {
  const product = {
    id: 1,
    name: "Tênis Nike Air Max Plus Drift",
    price: 899.90,
    oldPrice: 1299.90,
    rating: 4.5,
    reviews: 238,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800"
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Vermelho", hex: "#EF4444" },
      { name: "Preto", hex: "#000000" },
      { name: "Branco", hex: "#FFFFFF" },
      { name: "Azul", hex: "#3B82F6" }
    ],
    description: "O Nike Air Max Plus Drift combina o estilo icônico dos anos 90 com tecnologia moderna. Apresenta unidade Air Max visível no calcanhar e antepé para amortecimento excepcional.",
    features: [
      "Cabedal em mesh respirável",
      "Unidade Air Max dupla",
      "Solado em borracha para tração",
      "Design inspirado nos anos 90"
    ]
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showMobileGallery, setShowMobileGallery] = useState(false);

  const STORAGE_KEY = 'productPageData';
  const STORAGE_DURATION = 15 * 60 * 1000; // 15 minutos

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      const now = new Date().getTime();
      
      if (now - parsed.timestamp < STORAGE_DURATION) {
        setSelectedSize(parsed.selectedSize || "");
        setSelectedColor(parsed.selectedColor || "");
        setSelectedImage(parsed.selectedImage || 0);
        setCep(parsed.cep || "");
        setAddress(parsed.address || null);
        setQuantity(parsed.quantity || 1);
        setIsFavorite(parsed.isFavorite || false);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    const dataToSave = {
      selectedSize,
      selectedColor,
      selectedImage,
      cep,
      address,
      quantity,
      isFavorite,
      timestamp: new Date().getTime()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  }, [selectedSize, selectedColor, selectedImage, cep, address, quantity, isFavorite]);

  const formatCep = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 5) return numbers;
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`;
  };

  const searchCep = async () => {
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      setError("CEP deve conter 8 dígitos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError("CEP não encontrado");
        setAddress(null);
      } else {
        setAddress({
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
          cep: data.cep
        });
        setError("");
      }
    } catch (err) {
      setError("Erro ao buscar CEP");
      setAddress(null);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6 lg:hidden" />
            <h1 className="text-xl font-bold text-blue-600">ShopMax</h1>
          </div>
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Buscar produtos..." 
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <User className="w-6 h-6 text-gray-600 hidden sm:block" />
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {quantity}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto px-4 py-4 lg:py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 p-4 lg:p-8">
            
            <div className="lg:col-span-5 xl:col-span-5 space-y-4">
              <div className="relative group">
                <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <img 
                    src={product.images[selectedImage]} 
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 cursor-zoom-in"
                    onClick={() => setShowMobileGallery(true)}
                  />
                  {discount > 0 && (
                    <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      -{discount}%
                    </span>
                  )}
                </div>
                
                <button 
                  onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
                  className="hidden lg:block absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setSelectedImage(Math.min(product.images.length - 1, selectedImage + 1))}
                  className="hidden lg:block absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 right-4 bg-white/90 p-2 lg:p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart className={`w-4 h-4 lg:w-5 lg:h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
                <button className="absolute top-4 right-14 lg:right-16 bg-white/90 p-2 lg:p-3 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Share2 className="w-4 h-4 lg:w-5 lg:h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-2 lg:gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx 
                        ? 'border-blue-500 ring-2 ring-blue-200' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="flex justify-center gap-2 lg:hidden">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      selectedImage === idx ? 'bg-blue-600 w-8' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 xl:col-span-7 space-y-4 lg:space-y-6 mt-6 lg:mt-0">
              <div>
                <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 mb-3">{product.name}</h1>
                <div className="flex flex-wrap items-center gap-2 lg:gap-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 lg:w-5 lg:h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="ml-2 text-sm lg:text-base text-gray-600">{product.rating}</span>
                  </div>
                  <span className="text-sm lg:text-base text-gray-500">({product.reviews} avaliações)</span>
                </div>
              </div>

              <div className="space-y-2 pb-4 border-b">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span className="text-lg lg:text-xl text-gray-500 line-through">{formatPrice(product.oldPrice)}</span>
                  )}
                </div>
                <p className="text-sm lg:text-base text-green-600 font-medium">
                  Em até 12x de {formatPrice(product.price / 12)} sem juros
                </p>
              </div>

              <div>
                <h3 className="text-base lg:text-lg font-semibold mb-3">Cor: <span className="font-normal">{selectedColor || 'Selecione'}</span></h3>
                <div className="flex gap-2 lg:gap-3 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`relative w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 transition-all ${
                        selectedColor === color.name 
                          ? 'border-blue-500 ring-2 ring-blue-200 scale-110' 
                          : 'border-gray-300 hover:border-gray-500'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {color.hex === "#FFFFFF" && (
                        <div className="absolute inset-0 rounded-full border border-gray-200" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base lg:text-lg font-semibold mb-3">Tamanho</h3>
                <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-7 gap-2 lg:gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 lg:py-3 px-3 lg:px-4 rounded-lg border-2 text-sm lg:text-base font-medium transition-all ${
                        selectedSize === size
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-400 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-base lg:text-lg font-semibold">Quantidade</h3>
                <div className="flex items-center gap-3 lg:gap-4">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 lg:w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="border-t pt-4 lg:pt-6">
                <h3 className="text-base lg:text-lg font-semibold mb-3 flex items-center gap-2">
                  <Truck className="w-4 h-4 lg:w-5 lg:h-5" />
                  Calcular frete e prazo
                </h3>
                <div className="flex gap-2 lg:gap-3">
                  <input
                    type="text"
                    value={cep}
                    onChange={(e) => setCep(formatCep(e.target.value))}
                    placeholder="00000-000"
                    maxLength="9"
                    className="flex-1 px-3 lg:px-4 py-2 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button
                    onClick={searchCep}
                    disabled={loading}
                    className="w-full py-3 lg:py-4 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 disabled:border-gray-400 disabled:text-gray-400 transition-colors"
                  >
                    {loading ? 'Buscando...' : 'Calcular'}
                  </button>
                </div>
                
                {error && (
                  <p className="mt-3 text-sm text-red-600">{error}</p>
                )}
                
                {address && (
                  <div className="mt-4 p-3 lg:p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800 font-medium mb-2">Endereço encontrado:</p>
                    <p className="text-xs lg:text-sm text-gray-700">
                      {address.street}, {address.neighborhood}<br />
                      {address.city} - {address.state}<br />
                      CEP: {address.cep}
                    </p>
                    <div className="mt-3 space-y-2">
                      <p className="text-xs lg:text-sm text-gray-700">
                        <span className="font-medium">Frete Grátis:</span> Chegará entre 5 a 7 dias úteis
                      </p>
                      <p className="text-xs lg:text-sm text-gray-700">
                        <span className="font-medium">Expresso:</span> R$ 19,90 - 2 dias úteis
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="fixed bottom-0 left-0 right-0 lg:relative bg-white border-t lg:border-0 p-4 lg:p-0 z-30 lg:z-auto space-y-2 lg:space-y-3 lg:pt-4">
                <button 
                  disabled={!selectedSize || !selectedColor}
                  className="w-full py-3 lg:py-4 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 disabled:border-gray-400 disabled:text-gray-400 transition-colors"
                >
                  Comprar agora
                </button>
                <button 
                  disabled={!selectedSize || !selectedColor}
                  className="w-full py-3 lg:py-4 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 disabled:border-gray-400 disabled:text-gray-400 transition-colors"
                >
                  Adicionar ao carrinho
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 lg:gap-4 pt-4 border-t mb-20 lg:mb-0">
                <div className="text-center">
                  <Truck className="w-5 h-5 lg:w-6 lg:h-6 mx-auto mb-1 lg:mb-2 text-blue-600" />
                  <p className="text-xs text-gray-600">Entrega<br />rápida</p>
                </div>
                <div className="text-center">
                  <Shield className="w-5 h-5 lg:w-6 lg:h-6 mx-auto mb-1 lg:mb-2 text-blue-600" />
                  <p className="text-xs text-gray-600">Compra<br />segura</p>
                </div>
                <div className="text-center">
                  <CreditCard className="w-5 h-5 lg:w-6 lg:h-6 mx-auto mb-1 lg:mb-2 text-blue-600" />
                  <p className="text-xs text-gray-600">Parcelamento<br />sem juros</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t px-4 lg:px-8 py-6 lg:py-8 bg-gray-50">
            <div className="max-w-screen-xl mx-auto">
              <h2 className="text-xl lg:text-2xl font-bold mb-4">Sobre o produto</h2>
              <p className="text-sm lg:text-base text-gray-600 mb-6">{product.description}</p>
              
              <h3 className="text-base lg:text-lg font-semibold mb-3">Características principais</h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-sm lg:text-base text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showMobileGallery && (
        <div className="fixed inset-0 bg-black z-50 lg:hidden">
          <button 
            onClick={() => setShowMobileGallery(false)}
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full"
          >
            ✕
          </button>
          <div className="h-full flex items-center justify-center">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
            <button 
              onClick={() => setSelectedImage(Math.max(0, selectedImage - 1))}
              className="bg-white/20 backdrop-blur-sm p-3 rounded-full"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={() => setSelectedImage(Math.min(product.images.length - 1, selectedImage + 1))}
              className="bg-white/20 backdrop-blur-sm p-3 rounded-full"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;