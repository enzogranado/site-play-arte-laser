"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  Sparkles,
  Zap,
  UserCheck,
  Crown,
  FileCheck2,
} from "lucide-react";

const differentials = [
  {
    title: "Alta precisão",
    description: "Cortes milimétricos com tecnologia laser CNC de última geração.",
    icon: Target,
  },
  {
    title: "Acabamento impecável",
    description: "Bordas perfeitas, sem rebarbas em acrílicos e MDF de alta qualidade.",
    icon: Sparkles,
  },
  {
    title: "Entrega rápida",
    description: "Processos otimizados para cumprir seus prazos com agilidade.",
    icon: Zap,
  },
  {
    title: "Atendimento personalizado",
    description: "Acompanhamento dedicado para adequar seu projeto sob medida.",
    icon: UserCheck,
  },
  {
    title: "Produtos exclusivos",
    description: "Desenvolvimento de peças únicas para marcar seus momentos e marca.",
    icon: Crown,
  },
  {
    title: "Orçamento sem compromisso",
    description: "Envie sua ideia e receba uma cotação rápida e transparente.",
    icon: FileCheck2,
  },
];

export default function DifferentialsSection() {
  return (
    <section id="diferenciais" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">
            Por que nos escolher?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-poppins">
            Diferenciais que garantem a <span className="text-[#E53935]">sua satisfação</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Combinamos maquinário moderno e dedicação aos detalhes para superar expectativas.
          </p>
        </div>

        {/* Differentials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-800/80 backdrop-blur-md p-8 rounded-3xl border border-slate-700/60 hover:border-[#E53935]/60 transition-all duration-300 group hover:-translate-y-2 shadow-xl"
              >
                {/* Big Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#E53935] to-red-500 flex items-center justify-center text-white shadow-lg shadow-red-600/30 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 font-poppins flex items-center gap-2">
                  <span className="text-[#E53935]">✓</span> {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
