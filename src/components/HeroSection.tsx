"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Layers, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-slate-950">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero_laser.png"
          alt="Corte a Laser em Acrílico - Play Arte Laser"
          fill
          priority
          className="object-cover object-center opacity-30 scale-105 transform animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-600/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Content Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-red-400 text-xs sm:text-sm font-semibold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-[#E53935]" />
              <span>Referência em Corte & Gravação a Laser em SP</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] font-poppins">
              Transformamos ideias em <span className="text-[#E53935] underline decoration-red-500/30 underline-offset-8">peças únicas</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
              Corte e gravação a laser com acabamento profissional para empresas, festas, decoração e presentes personalizados.
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#contato"
                className="bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold px-8 py-4 rounded-full shadow-xl shadow-red-600/30 transition-all duration-300 hover:scale-105 text-center flex items-center justify-center gap-3 text-base"
              >
                Solicitar orçamento
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="#galeria"
                className="bg-slate-900/90 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-full border border-slate-700/80 hover:border-slate-600 transition-all duration-300 text-center flex items-center justify-center gap-2 text-base backdrop-blur-sm"
              >
                Ver produtos
                <Layers className="w-4 h-4 text-slate-400" />
              </a>
            </div>



            {/* Highlights */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2.5 text-slate-300 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#E53935] flex-shrink-0" />
                <span>Alta Precisão CNC</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#E53935] flex-shrink-0" />
                <span>Acabamento Impecável</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#E53935] flex-shrink-0" />
                <span>Atendimento Rápido</span>
              </div>
            </div>
          </motion.div>

          {/* Right Card / Visual Feature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60 p-3 backdrop-blur-md shadow-2xl">
              <div className="relative h-96 sm:h-[420px] rounded-2xl overflow-hidden group">
                <Image
                  src="/images/hero_laser.png"
                  alt="Máquina de Corte a Laser em Ação"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Tecnologia Laser de Ponta</span>
                  </div>
                  <p className="text-sm font-medium text-slate-200 mt-1">
                    Corte em Acrílico, MDF, Gravação em Copos e LEDs sob medida.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
