"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, FileCode2, Cpu, CheckCircle } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Você envia sua ideia",
    description: "Envie um vetor, desenho, foto ou referência da peça que deseja personalizar.",
    icon: Send,
  },
  {
    step: "02",
    title: "Criamos o projeto",
    description: "Nossa equipe desenvolve a arte técnica e aprova os detalhes com você.",
    icon: FileCode2,
  },
  {
    step: "03",
    title: "Produção a laser",
    description: "Corte e gravação a laser com máxima precisão no material escolhido.",
    icon: Cpu,
  },
  {
    step: "04",
    title: "Entrega do produto pronto",
    description: "Peça finalizada, inspecionada e embalada com cuidado para você.",
    icon: CheckCircle,
  },
];

export default function ProcessSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-red-100 text-[#E53935] text-xs font-bold uppercase tracking-wider">
            Passo a Passo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-poppins">
            Como funciona nosso <span className="text-[#E53935]">Processo de Trabalho</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Um fluxo simples, rápido e transparente da sua ideia inicial até a entrega final.
          </p>
        </div>

        {/* Workflow Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-between group hover:bg-white hover:shadow-2xl hover:border-red-100 transition-all duration-300"
              >
                {/* Step Number Tag */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-black text-slate-300 group-hover:text-[#E53935] transition-colors font-poppins">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-white text-[#E53935] shadow-sm flex items-center justify-center group-hover:bg-[#E53935] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Arrow Connector for Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-5 top-1/2 -translate-y-1/2 z-20">
                    <div className="w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-[#E53935] text-xs font-bold">
                      ➔
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 font-poppins">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
