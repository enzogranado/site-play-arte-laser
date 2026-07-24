"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, CheckCircle2, MapPin, MessageCircle, ThumbsUp } from "lucide-react";

type Category = "todos" | "eventos" | "corporativo" | "brindes";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  category: Category;
  content: string;
  stars: number;
  productTag: string;
  date: string;
  avatarBg: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Mariana Souza",
    role: "Organizadora de Eventos",
    location: "São Paulo – SP",
    category: "eventos",
    content: "Encomendei 150 copos personalizados e centros de mesa em acrílico para um casamento. A qualidade do acabamento superou todas as expectativas! Sem NENHUMA rebarba, corte perfeito e entrega feita 2 dias antes do prazo.",
    stars: 5,
    productTag: "Copos & Decoração de Eventos",
    date: "Avaliado no Google Reviews",
    avatarBg: "from-[#E53935] to-rose-600",
  },
  {
    id: 2,
    name: "Carlos Eduardo Mendes",
    role: "Diretor Comercial",
    location: "Santo André – SP",
    category: "corporativo",
    content: "Fizemos os troféus corporativos da nossa convenção anual na Play Arte Laser. O acrílico transparente com a gravação a laser fina ficou absurdamente elegante. Toda a diretoria elogiou o resultado!",
    stars: 5,
    productTag: "Troféus Corporativos em Acrílico",
    date: "Cliente Corporativo",
    avatarBg: "from-blue-600 to-indigo-700",
  },
  {
    id: 3,
    name: "Fernanda Lima",
    role: "Arquitetura & Decoração",
    location: "São Paulo – SP",
    category: "corporativo",
    content: "Os LEDs personalizados com letreiro em acrílico que encomendei para o escritório ficaram espetaculares. Atendimento técnico nota 10, tiraram todas as minhas dúvidas de medidas e iluminação.",
    stars: 5,
    productTag: "Luminárias LED & Letreiro 3D",
    date: "Projeto de Interiores",
    avatarBg: "from-purple-600 to-indigo-600",
  },
  {
    id: 4,
    name: "Rodrigo Pires",
    role: "Empresário",
    location: "Campinas – SP",
    category: "brindes",
    content: "Precisei de um lote urgente de caixas em MDF cortadas no laser para os kits de final de ano dos nossos clientes. Atendimento rápido no WhatsApp, preço justo e material impecável.",
    stars: 5,
    productTag: "Caixas & Embalagens MDF",
    date: "Pedido em Lote",
    avatarBg: "from-amber-500 to-red-600",
  },
  {
    id: 5,
    name: "Juliana Rossi",
    role: "Cliente Residencial",
    location: "Guarulhos – SP",
    category: "eventos",
    content: "Fiz o topo de bolo em acrílico espelhado e os chaveiros de lembrança. Ficou lindo demais! Todo mundo na festa perguntou onde tinha mandado fazer. Veio super protegido na embalagem.",
    stars: 5,
    productTag: "Topo de Bolo Espelhado & Lembranças",
    date: "Avaliado no Google Reviews",
    avatarBg: "from-emerald-500 to-teal-600",
  },
  {
    id: 6,
    name: "Lucas Fonseca",
    role: "Proprietário de Bar & Resto",
    location: "São Caetano do Sul – SP",
    category: "brindes",
    content: "Gravação a laser nos nossos copos térmicos e numeração de mesas em acrílico. Resistente ao uso diário e lavagens, não descasca de jeito nenhum. Parceria de longa data!",
    stars: 5,
    productTag: "Gravação em Copos Térmicos",
    date: "Cliente Recorrente",
    avatarBg: "from-cyan-600 to-blue-700",
  },
];

export default function TestimonialsSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("todos");

  const filteredTestimonials = activeCategory === "todos"
    ? testimonials
    : testimonials.filter((t) => t.category === activeCategory);

  const whatsappNumber = "551120195711";

  return (
    <section id="depoimentos" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-100 text-[#E53935] text-xs font-bold uppercase tracking-wider">
            <ThumbsUp className="w-3.5 h-3.5" /> Prova Social & Depoimentos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-poppins">
            O que nossos clientes dizem sobre a <span className="text-[#E53935]">Play Arte Laser</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Confira avaliações reais de quem já transformou ideias em produtos incríveis conosco.
          </p>
        </div>

        {/* Google Reviews Summary Card */}
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-3xl shadow-lg border border-slate-200/80 mb-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center p-2 flex-shrink-0">
              {/* Google G Icon SVG */}
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-900 font-poppins">4.9</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Excelente no Google • Mais de <strong className="text-slate-800">16+ avaliações reais</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Clientes Verificados
            </span>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {[
            { id: "todos", label: "Todos os Depoimentos" },
            { id: "eventos", label: "Eventos & Festas" },
            { id: "corporativo", label: "Corporativo & Acrílicos" },
            { id: "brindes", label: "Lembranças & Brindes" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as Category)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === tab.id
                  ? "bg-[#E53935] text-white shadow-md shadow-red-600/20"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredTestimonials.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-7 rounded-3xl shadow-card border border-slate-200/80 flex flex-col justify-between relative group hover:shadow-xl hover:border-red-200 transition-all duration-300"
              >
                <Quote className="absolute top-6 right-6 w-9 h-9 text-slate-100 group-hover:text-red-100 transition-colors" />

                <div className="space-y-4 relative z-10">
                  {/* Top Bar: Stars + Product Badge */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(item.stars)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        {item.date}
                      </span>
                    </div>

                    <div className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                      {item.productTag}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-700 text-sm leading-relaxed italic">
                    "{item.content}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-5 mt-6 border-t border-slate-100 flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-tr ${item.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-md font-poppins flex-shrink-0`}>
                    {item.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-slate-900 text-sm font-poppins truncate flex items-center gap-1.5">
                      {item.name}
                      <span title="Cliente Verificado">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      </span>
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span>{item.role}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-slate-400">
                        <MapPin className="w-3 h-3" /> {item.location}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* WhatsApp Callout / Social Proof CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-slate-900 to-slate-950 text-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-bold font-poppins text-white">
              Quer ver mais exemplos de peças e avaliações?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Fale diretamente com nossa equipe no WhatsApp. Enviamos fotos de projetos recentes e tiramos suas dúvidas na hora.
            </p>
          </div>

          <a
            href={`https://wa.me/${whatsappNumber}?text=Ol%C3%A1!%20Vi%20as%20avalia%C3%A7%C3%B5es%20no%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-2 text-sm whitespace-nowrap"
          >
            <MessageCircle className="w-5 h-5" />
            Falar no WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
