"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Scissors,
  Sparkles,
  Layers,
  Lightbulb,
  Wine,
  Wrench,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "Corte a Laser",
    description: "Precisão para MDF, acrílico e outros materiais.",
    icon: Scissors,
    image: "/images/hero_laser.png",
    color: "from-red-500 to-red-600",
  },
  {
    title: "Gravação Personalizada",
    description: "Personalização em brindes, placas, copos, lembranças e muito mais.",
    icon: Sparkles,
    image: "/images/laser_engraving.png",
    color: "from-slate-800 to-slate-900",
  },
  {
    title: "Acrílicos",
    description: "Peças decorativas, letras, displays, placas e comunicação visual.",
    icon: Layers,
    image: "/images/acrylic_letters.png",
    color: "from-blue-600 to-slate-900",
  },
  {
    title: "LED Personalizado",
    description: "Luminárias decorativas personalizadas com excelente acabamento.",
    icon: Lightbulb,
    image: "/images/led_lamp.png",
    color: "from-amber-500 to-red-600",
  },
  {
    title: "Copos Personalizados",
    description: "Copos para festas, aniversários, casamentos e eventos corporativos.",
    icon: Wine,
    image: "/images/custom_cups.png",
    color: "from-red-600 to-slate-900",
  },
  {
    title: "Projetos Especiais",
    description: "Desenvolvimento de peças sob medida conforme a necessidade do cliente.",
    icon: Wrench,
    image: "/images/mdf_decor.png",
    color: "from-slate-700 to-slate-900",
  },
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-red-100 text-[#E53935] text-xs font-bold uppercase tracking-wider">
            Nossos Serviços
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-poppins">
            Soluções completas em <span className="text-[#E53935]">corte & gravação</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Oferecemos uma ampla variedade de produtos e serviços personalizados para atender empresas, eventos e residências.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-card border border-slate-100 flex flex-col group"
              >
                {/* Card Image */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-[#E53935] group-hover:bg-[#E53935] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#E53935] transition-colors duration-200 font-poppins">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mt-2">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <a
                      href="#contato"
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#E53935] hover:text-red-700 transition-colors"
                    >
                      Pedir Orçamento
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
