"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, MessageCircle } from "lucide-react";

export default function CtaSection() {
  const whatsappNumber = "551120195711";
  const defaultMessage = encodeURIComponent(
    "Olá! Gostaria de solicitar um orçamento para um projeto personalizado."
  );

  return (
    <section className="py-20 bg-[#E53935] text-white relative overflow-hidden">
      {/* Background Glow & Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.15),_transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" /> Faça seu Projeto Conosco
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-poppins leading-tight">
            Vamos transformar sua ideia em realidade?
          </h2>

          <p className="text-lg sm:text-xl text-red-50 font-light max-w-2xl mx-auto">
            Solicite um orçamento sem compromisso e descubra como podemos criar uma peça exclusiva para você ou sua empresa.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contato"
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-950 text-white font-bold px-8 py-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 text-base"
          >
            Solicitar orçamento
            <ArrowRight className="w-5 h-5" />
          </a>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white hover:bg-slate-100 text-[#E53935] font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 text-base"
          >
            <MessageCircle className="w-5 h-5 fill-[#E53935] stroke-white" />
            WhatsApp Direto
          </a>
        </motion.div>

      </div>
    </section>
  );
}
