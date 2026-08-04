"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Sparkles,
  Star,
  Check,
  MessageCircle,
  Plus,
  Minus,
  Eye,
  X,
  Filter,
  Tag,
  ShieldCheck,
  Truck,
  ArrowRight
} from "lucide-react";

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  priceUnit?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  features: string[];
  dimensions?: string;
  material?: string;
}

const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Luminária LED 3D de Acrílico Personalizada",
    category: "Luminárias LED",
    price: 69.90,
    rating: 5.0,
    reviewsCount: 48,
    image: "/images/led_lamp.png",
    badge: "Mais Vendido",
    badgeColor: "bg-[#E53935]",
    description: "Luminária em acrílico 3mm gravada a laser com base em madeira nobre iluminada por LEDs de alta intensidade. Personalize com foto, nome ou frase.",
    features: ["Acrílico cast 3mm cristal", "Base em madeira com LED bivolt", "Gravação a laser permanente", "Cabo USB incluso"],
    dimensions: "18cm x 15cm x 5cm",
    material: "Acrílico 3mm + Madeira Nobre",
  },
  {
    id: "prod-2",
    title: "Copo Térmico 473ml Gravado a Laser (Estilo Stanley)",
    category: "Copos Térmicos",
    price: 79.90,
    rating: 4.9,
    reviewsCount: 92,
    image: "/images/custom_cups.png",
    badge: "Pronta Entrega",
    badgeColor: "bg-emerald-600",
    description: "Copo térmico em inox com parede dupla de isolamento a vácuo. Gravação a laser permanente de alta precisão que não desbota nem descasca.",
    features: ["Inox 18/8 livre de BPA", "Gravação em fibra laser ultradefinida", "Mantém bebida gelada por 4h", "Diversas cores disponíveis"],
    dimensions: "473ml",
    material: "Aço Inox com pintura fosca",
  },
  {
    id: "prod-3",
    title: "Troféu Corporativo de Acrílico Espelhado com LED",
    category: "Acrílicos",
    price: 119.00,
    rating: 5.0,
    reviewsCount: 34,
    image: "/images/acrylic_letters.png",
    badge: "Corporativo",
    badgeColor: "bg-blue-600",
    description: "Troféu de alta sofisticação para premiações corporativas, homenagens e eventos esportivos. Acabamento polido diamantado.",
    features: ["Acrílico cristal 5mm + detalhes espelhados", "Corte a laser de alta precisão", "Personalização total da logo e nomes", "Embalagem individual aveludada"],
    dimensions: "25cm x 15cm",
    material: "Acrílico Cristal 5mm & Espelhado",
  },
  {
    id: "prod-4",
    title: "Mandala Decorativa 50cm em MDF 6mm Relevo",
    category: "Corte em MDF",
    price: 49.90,
    rating: 4.8,
    reviewsCount: 65,
    image: "/images/mdf_decor.png",
    badge: "Tendência",
    badgeColor: "bg-amber-600",
    description: "Mandala sacra recortada a laser em camadas de MDF cru ou amadeirado. Peça exclusiva para harmonização de ambientes residenciais e comerciais.",
    features: ["MDF ecológico 6mm", "Corte sem rebarbas nem imperfeições", "Pronto para pintura ou uso natural", "Fixação fácil na parede"],
    dimensions: "50cm de diâmetro",
    material: "MDF 6mm Premium",
  },
  {
    id: "prod-5",
    title: "Kit Faca Gourmet & Tábua com Gravação Personalizada",
    category: "Brindes Gravados",
    price: 189.00,
    rating: 5.0,
    reviewsCount: 27,
    image: "/images/laser_engraving.png",
    badge: "Kit Promocional",
    badgeColor: "bg-purple-600",
    description: "Kit luxo de churrasco composto por tábua em madeira nobre e faca em inox com cabo anatômico. Gravação a laser de nomes, escudos ou logos.",
    features: ["Tábua tratada com óleos minerais", "Faca 8 polegadas em inox temperado", "Gravação profunda a laser", "Presente inesquecível para eventos"],
    dimensions: "Tábua: 40x25cm | Faca: 8\"",
    material: "Madeira Teca / Inox 420",
  },
  {
    id: "prod-6",
    title: "Letreiro 3D em Acrílico para Recepção & Fachadas",
    category: "Acrílicos",
    price: 149.00,
    priceUnit: "a partir de",
    rating: 4.9,
    reviewsCount: 41,
    image: "/images/hero_laser.png",
    badge: "Sob Medida",
    badgeColor: "bg-slate-900",
    description: "Letras e logotipos em acrílico 3D recortados a laser para empresas, escritórios e lojas. Aumente o valor percebido da sua marca.",
    features: ["Acrílico espelhado dourado, prata ou cores sólidas", "Resistente a sol e chuva", "Gabarito de montagem fácil incluso", "Fita 3M VHB para fixação sem furos"],
    dimensions: "Dimensões personalizáveis",
    material: "Acrílico Cast Espelhado 3mm",
  },
];

const CATEGORIES = ["Todos", "Luminárias LED", "Copos Térmicos", "Acrílicos", "Corte em MDF", "Brindes Gravados"];

export default function ProductsEcommerceSection() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    "prod-1": 1,
    "prod-2": 1,
    "prod-3": 1,
    "prod-4": 1,
    "prod-5": 1,
    "prod-6": 1,
  });

  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const whatsappNumber = "551120195711";

  const filteredProducts = selectedCategory === "Todos"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === selectedCategory);

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleOrderWhatsApp = (product: Product) => {
    const qty = quantities[product.id] || 1;
    const totalPrice = (product.price * qty).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    let msg = `Olá, equipe *Play Arte Laser*! Gostaria de encomendar o seguinte produto do catálogo online:\n\n`;
    msg += `🛍️ *PRODUTO:* ${product.title}\n`;
    msg += `🏷️ *Categoria:* ${product.category}\n`;
    msg += `📦 *Quantidade:* ${qty} unidade(s)\n`;
    msg += `💰 *Valor Total Estimado:* ${totalPrice}\n\n`;
    msg += `Gostaria de combinar os detalhes da personalização e entrega!`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="produtos" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#E53935_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-[#E53935] text-xs font-bold uppercase tracking-wider">
            <ShoppingBag className="w-4 h-4" /> Catálogo E-Commerce & Preços
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-poppins">
            Produtos em Destaque com <span className="text-[#E53935]">Preço Transparente</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Escolha seu produto, veja o valor na tela e faça seu pedido diretamente pelo WhatsApp em poucos segundos.
          </p>
        </div>

        {/* Categories Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? "bg-[#E53935] text-white shadow-lg shadow-red-600/25 scale-105"
                  : "bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200"
              }`}
            >
              {cat === "Todos" && <Filter className="w-3.5 h-3.5" />}
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const qty = quantities[product.id] || 1;
              const unitPriceFormatted = product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });
              const totalPriceFormatted = (product.price * qty).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative h-64 overflow-hidden bg-slate-900 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />

                      {/* Badge Tag */}
                      {product.badge && (
                        <span
                          className={`absolute top-4 left-4 ${
                            product.badgeColor || "bg-[#E53935]"
                          } text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md`}
                        >
                          {product.badge}
                        </span>
                      )}

                      {/* Quick View Floating Button */}
                      <button
                        onClick={() => setActiveModalProduct(product)}
                        className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-900 p-2.5 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 flex items-center gap-1.5 text-xs font-semibold px-3.5"
                      >
                        <Eye className="w-4 h-4 text-[#E53935]" /> Ver Detalhes
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#E53935] bg-red-50 px-2.5 py-1 rounded-md">
                          {product.category}
                        </span>

                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                          <span>{product.rating}</span>
                          <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="font-bold text-slate-900 text-lg font-poppins line-clamp-2 group-hover:text-[#E53935] transition-colors">
                        {product.title}
                      </h3>

                      <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing & Actions Footer */}
                  <div className="p-6 pt-0 space-y-4">
                    <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
                      <div>
                        {product.priceUnit && (
                          <span className="text-[11px] text-slate-400 block font-medium">
                            {product.priceUnit}
                          </span>
                        )}
                        <span className="text-2xl font-extrabold text-slate-900 font-poppins">
                          {unitPriceFormatted}
                        </span>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="p-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Diminuir quantidade"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-900">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="p-1.5 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Aumentar quantidade"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Total Price preview if qty > 1 */}
                    {qty > 1 && (
                      <div className="text-right text-xs text-slate-500 font-semibold">
                        Total ({qty}x): <span className="text-emerald-600 font-bold">{totalPriceFormatted}</span>
                      </div>
                    )}

                    {/* WhatsApp CTA Button */}
                    <button
                      onClick={() => handleOrderWhatsApp(product)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 text-sm"
                    >
                      <MessageCircle className="w-4 h-4 fill-white stroke-emerald-600" />
                      Comprar / Pedir no WhatsApp
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Ecommerce Guarantee Banner */}
        <div className="mt-16 bg-slate-900 text-white p-8 rounded-3xl shadow-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E53935]/20 text-[#E53935] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-200">Garantia de Qualidade</h4>
              <p className="text-slate-400 text-xs mt-0.5">Acabamento impecável com tecnologia a laser alemã.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-200">Envio para Todo o Brasil</h4>
              <p className="text-slate-400 text-xs mt-0.5">Embalagens reforçadas anti-impacto.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Tag className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-200">Desconto para Atacado</h4>
              <p className="text-slate-400 text-xs mt-0.5">Preços especiais para lotes acima de 20 unidades.</p>
            </div>
          </div>
        </div>

      </div>

      {/* QUICK VIEW PRODUCT MODAL */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full flex items-center justify-center transition-transform hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="md:w-1/2 bg-slate-900 h-64 md:h-auto relative">
                <img
                  src={activeModalProduct.image}
                  alt={activeModalProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Modal Details */}
              <div className="md:w-1/2 p-6 sm:p-8 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E53935] bg-red-50 px-2.5 py-1 rounded-md">
                    {activeModalProduct.category}
                  </span>

                  <h3 className="font-bold text-xl font-poppins text-slate-900 leading-snug">
                    {activeModalProduct.title}
                  </h3>

                  <div className="text-2xl font-extrabold text-[#E53935] font-poppins">
                    {activeModalProduct.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>

                  <p className="text-slate-600 text-xs leading-relaxed">
                    {activeModalProduct.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Destaques do Produto:
                    </span>
                    {activeModalProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <button
                    onClick={() => {
                      const prod = activeModalProduct;
                      setActiveModalProduct(null);
                      handleOrderWhatsApp(prod);
                    }}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <MessageCircle className="w-5 h-5 fill-white stroke-emerald-600" />
                    Solicitar este Produto via WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
