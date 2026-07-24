"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Star, Users, CheckCircle2, ShieldCheck, Clock } from "lucide-react";

const stats = [
  {
    icon: Award,
    value: "+2.500",
    label: "Peças Entregues",
    description: "Cortes e gravações de extrema precisão em MDF, Acrílico e Copos.",
    color: "from-red-500 to-rose-600",
  },
  {
    icon: Star,
    value: "4.9 / 5.0",
    label: "Avaliação no Google",
    description: "Baseado em mais de 180+ avaliações reais de clientes satisfeitos.",
    color: "from-amber-500 to-yellow-500",
  },
  {
    icon: Users,
    value: "+500",
    label: "Clientes Atendidos",
    description: "Empresas, organizadores de eventos e clientes em todo o Brasil.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: Clock,
    value: "99.8%",
    label: "Pontualidade de Entrega",
    description: "Agilidade no envio e prazos rigorosamente cumpridos.",
    color: "from-emerald-500 to-teal-600",
  },
];

export default function SocialProofStats() {
  return (
    <section className="py-16 bg-slate-900 border-y border-slate-800 relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-red-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-950/70 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${stat.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Verificado
                    </span>
                  </div>

                  <h3 className="text-3xl font-extrabold text-white tracking-tight font-poppins mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm font-bold text-slate-200 font-poppins mb-2">
                    {stat.label}
                  </p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed border-t border-slate-800/80 pt-3 mt-2">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
