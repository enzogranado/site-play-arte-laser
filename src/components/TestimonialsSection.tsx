"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Mariana Souza",
    role: "Organizadora de Eventos",
    content: "Produtos impecáveis, muito bem embalados e com excelente acabamento. Recomendo de olhos fechados!",
    stars: 5,
  },
  {
    name: "Carlos Eduardo",
    role: "Cliente Residencial",
    content: "Os copos personalizados fizeram sucesso na festa. Atendimento excelente e entrega antes do prazo.",
    stars: 5,
  },
  {
    name: "Fernanda Lima",
    role: "Arquitetura & Decoração",
    content: "Os LEDs personalizados ficaram incríveis na decoração do escritório. Qualidade surreal!",
    stars: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-red-100 text-[#E53935] text-xs font-bold uppercase tracking-wider">
            Opinião dos Clientes
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-poppins">
            O que dizem sobre a <span className="text-[#E53935]">Play Arte Laser</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Compromisso com a satisfação e qualidade em cada produto entregue.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white p-8 rounded-3xl shadow-card border border-slate-100 flex flex-col justify-between relative group hover:shadow-2xl transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-slate-100 group-hover:text-red-100 transition-colors" />

              <div className="space-y-4 relative z-10">
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-slate-700 italic text-base leading-relaxed">
                  "{item.content}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#E53935] to-red-500 text-white font-bold flex items-center justify-center text-sm shadow-md font-poppins">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base font-poppins">
                    {item.name}
                  </h4>
                  <span className="text-xs text-slate-500 font-medium">
                    {item.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
