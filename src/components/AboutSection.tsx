"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Zap, ShieldCheck, HeartHandshake } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="sobre" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Showcase Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Image */}
              <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-50">
                <Image
                  src="/images/acrylic_letters.png"
                  alt="Letreiro e Acrílico Personalizado Play Arte Laser"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Secondary Card */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 w-64 bg-slate-900 text-white p-5 rounded-2xl shadow-2xl border border-slate-800 hidden sm:block">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-lg bg-[#E53935]/20 text-[#E53935]">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Garantia de Qualidade</h4>
                    <p className="text-xs text-slate-400">Inspeção em 100% das peças</p>
                  </div>
                </div>
              </div>

              {/* Floating Pill */}
              <div className="absolute -top-6 -left-4 bg-red-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3">
                <Zap className="w-5 h-5" />
                <span className="font-bold text-sm">Corte de Alta Precisão</span>
              </div>
            </div>
          </motion.div>

          {/* Text Content Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-[#E53935] text-xs font-bold uppercase tracking-wider">
              Sobre a empresa
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-poppins">
              Precisão, qualidade e criatividade em <span className="text-[#E53935]">cada detalhe</span>.
            </h2>

            <div className="space-y-4 text-slate-600 leading-relaxed text-base sm:text-lg">
              <p>
                A <strong className="text-slate-900 font-semibold">Play Arte Laser</strong> trabalha com corte e gravação a laser de alta precisão, produzindo peças personalizadas em diversos materiais com rigor técnico e sensibilidade estética.
              </p>
              <p>
                Atendemos empresas, decoradores, organizadores de eventos e clientes finais que procuram produtos exclusivos com acabamento impecável e durabilidade.
              </p>
              <p>
                Nosso compromisso é entregar excelente relação custo-benefício, rapidez no cumprimento dos prazos e um atendimento próximo e dedicado a cada projeto.
              </p>
            </div>

            {/* Core Values / Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 text-[#E53935] mt-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Materiais Nobres</h4>
                  <p className="text-xs text-slate-500">Acrílico cast premium, MDF de alta densidade e metais gravados.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-slate-100 text-[#E53935] mt-1">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">Atendimento Personalizado</h4>
                  <p className="text-xs text-slate-500">Suporte completo desde a ideia gráfica até a produção final.</p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
