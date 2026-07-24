"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Utensils, PartyPopper, Home, Sparkles, Trophy, Check } from "lucide-react";

const sectors = [
  {
    icon: Building2,
    title: "Empresas & Escritórios",
    description: "Letreiros em acrílico 3D, placas de sinalização e brindes de fim de ano corporativos.",
    tag: "+150 empresas atendidas",
  },
  {
    icon: PartyPopper,
    title: "Eventos & Formaturas",
    description: "Copos personalizados, toppers de bolo, caixas personalizadas e chaveiros em lote.",
    tag: "Projetos em escala",
  },
  {
    icon: Home,
    title: "Arquitetura & Decoração",
    description: "Luminárias LED gravadas, painéis vazados e detalhes personalizados para interiores.",
    tag: "Design exclusivo",
  },
  {
    icon: Trophy,
    title: "Premiações & Troféus",
    description: "Troféus e medalhas em acrílico de alta transparência com gravação a laser fina.",
    tag: "Acabamento de luxo",
  },
];

export default function TrustLogosSection() {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-[#E53935] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Confiança Comprovada
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-poppins">
            Quem confia no nosso <span className="text-[#E53935]">Corte e Gravação a Laser</span>
          </h3>
          <p className="text-slate-600 text-sm sm:text-base">
            Desenvolvemos soluções sob medida para diversos segmentos com garantia de prazos e acabamento impecável.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sectors.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-[#E53935] flex items-center justify-center font-bold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-base font-poppins">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#E53935]">
                  <Check className="w-3.5 h-3.5" />
                  <span>{item.tag}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
