"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, ChevronLeft, ChevronRight, Filter } from "lucide-react";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  categoryName: string;
  image: string;
  description: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Copos Personalizados para Festas",
    category: "copos",
    categoryName: "Copos",
    image: "/images/custom_cups.png",
    description: "Gravação a laser em copos térmicos e inox para eventos e festas corporativas.",
  },
  {
    title: "Placa em Acrílico Recepção",
    id: 2,
    category: "acrilico",
    categoryName: "Acrílico",
    image: "/images/acrylic_letters.png",
    description: "Letreiro e comunicação visual em acrílico de alta durabilidade e brilho.",
  },
  {
    id: 3,
    title: "Letras em MDF Decorativo",
    category: "mdf",
    categoryName: "MDF & Madeira",
    image: "/images/mdf_decor.png",
    description: "Corte vazado e entalhe preciso em placas MDF para decoração de interiores.",
  },
  {
    id: 4,
    title: "LED Personalizado 3D",
    category: "led",
    categoryName: "LEDs",
    image: "/images/led_lamp.png",
    description: "Luminária acrílica gravada a laser com base iluminada em iluminação LED.",
  },
  {
    id: 5,
    title: "Gravação a Laser em Brindes",
    category: "gravacao",
    categoryName: "Gravações",
    image: "/images/laser_engraving.png",
    description: "Personalização de peças em madeira e itens promocionais para empresas.",
  },
  {
    id: 6,
    title: "Letreiro Iluminado para Logotipo",
    category: "acrilico",
    categoryName: "Acrílico",
    image: "/images/hero_laser.png",
    description: "Corte CNC laser de letras caixa e fachadas modernas para recepção.",
  },
  {
    id: 7,
    title: "Lembranças e Peças Decorativas",
    category: "lembrancas",
    categoryName: "Lembranças",
    image: "/images/corporate_laser_engraving_1784870530307.png",
    description: "Caixas e porta-copos personalizados gravados a laser com altíssima qualidade.",
  },
  {
    id: 8,
    title: "Trabalhos Especiais em Madeira",
    category: "mdf",
    categoryName: "MDF & Madeira",
    image: "/images/mdf_decor.png",
    description: "Painéis geométricos e artesanato sob medida cortado a laser.",
  },
];

const categories = [
  { key: "all", label: "Todos os Produtos" },
  { key: "copos", label: "Copos Personalizados" },
  { key: "acrilico", label: "Placas em Acrílico" },
  { key: "mdf", label: "MDF & Madeira" },
  { key: "led", label: "LEDs Personalizados" },
  { key: "gravacao", label: "Gravações a Laser" },
];

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeFilter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === 0 ? filteredItems.length - 1 : (prev as number) - 1
    );
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) =>
      prev === filteredItems.length - 1 ? 0 : (prev as number) + 1
    );
  };

  return (
    <section id="galeria" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-red-100 text-[#E53935] text-xs font-bold uppercase tracking-wider">
            Portfólio & Produtos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-poppins">
            Galeria de <span className="text-[#E53935]">Trabalhos Realizados</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Confira a qualidade do nosso acabamento em copos, placas de acrílico, MDF, luminárias LED e peças exclusivas.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-12">
          <div className="hidden sm:flex items-center gap-2 mr-2 text-slate-400 text-sm font-semibold">
            <Filter className="w-4 h-4" /> Filtrar:
          </div>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeFilter === cat.key
                  ? "bg-[#E53935] text-white shadow-lg shadow-red-600/20 scale-105"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxIndex(index)}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-card border border-slate-100 cursor-pointer bg-slate-900"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                  <div className="flex justify-end">
                    <span className="p-2 rounded-full bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <ZoomIn className="w-5 h-5 text-white" />
                    </span>
                  </div>

                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-md bg-[#E53935] text-[11px] font-bold uppercase tracking-wider mb-2">
                      {item.categoryName}
                    </span>
                    <h3 className="text-lg font-bold font-poppins leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-slate-800 text-white hover:bg-red-600 transition-colors z-50"
                aria-label="Fechar"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/80 text-white hover:bg-[#E53935] transition-colors z-50"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-800/80 text-white hover:bg-[#E53935] transition-colors z-50"
                aria-label="Próximo"
              >
                <ChevronRight className="w-7 h-7" />
              </button>

              {/* Modal Content */}
              <div
                className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-[60vh] rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
                  <Image
                    src={filteredItems[lightboxIndex].image}
                    alt={filteredItems[lightboxIndex].title}
                    fill
                    className="object-contain bg-slate-950"
                  />
                </div>
                <div className="mt-4 text-center text-white space-y-1">
                  <h3 className="text-xl font-bold font-poppins">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                  <p className="text-sm text-slate-300 max-w-xl">
                    {filteredItems[lightboxIndex].description}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
