"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function FloatingCartButton() {
  const { totalItems, totalPrice, setIsCartOpen } = useCart();

  // If cart is empty, DO NOT show anything at all
  if (totalItems === 0) return null;

  const totalPriceFormatted = totalPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-24 right-6 md:bottom-6 md:left-6 md:right-auto z-40 bg-slate-900 hover:bg-slate-800 text-white p-1.5 pr-5 rounded-full shadow-2xl border border-slate-700 backdrop-blur-md transition-all duration-300 transform hover:scale-105 flex items-center gap-3 group"
        title="Abrir carrinho de compras"
      >
        <div className="relative w-11 h-11 rounded-full bg-[#E53935] flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-110 transition-transform">
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-[#E53935] text-[10px] font-black flex items-center justify-center shadow-md animate-bounce">
            {totalItems}
          </span>
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            {totalItems} {totalItems === 1 ? "item no carrinho" : "itens no carrinho"}
          </span>
          <span className="text-sm font-extrabold text-white group-hover:text-red-400 transition-colors">
            Ver Carrinho • <span className="text-emerald-400">{totalPriceFormatted}</span>
          </span>
        </div>

        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all ml-1" />
      </motion.button>
    </AnimatePresence>
  );
}
