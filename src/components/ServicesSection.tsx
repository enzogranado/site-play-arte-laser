"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Sparkles,
  Layers,
  Lightbulb,
  Wine,
  Wrench,
  ArrowRight,
  X,
  CheckCircle2,
  MessageCircle,
  Info,
  ShieldCheck,
  Zap,
  Tag
} from "lucide-react";

interface ServiceDetail {
  id: string;
  title: string;
  subtitle?: string;
  shortDesc: string;
  fullDesc: string;
  icon: React.ElementType;
  image: string;
  badge: string;
  highlights: string[];
  materials: string[];
  applications: string[];
}

const services: ServiceDetail[] = [
  {
    id: "corte-laser",
    title: "Corte a Laser",
    shortDesc: "Precisão micrométrica para MDF, acrílico, madeira e tecidos.",
    fullDesc:
      "O serviço de Corte a Laser CNC da Play Arte oferece altíssima precisão com bordas limpas e sem rebarbas. Ideal para produção de peças decorativas, comunicação visual, maquetes, caixas, painéis vazados e peças industriais sob medida.",
    icon: Scissors,
    image: "/images/hero_laser.png",
    badge: "Alta Precisão CNC",
    highlights: [
      "Corte limpo com bordas polidas",
      "Espessuras de 2mm até 15mm",
      "Aproveitamento máximo de material",
      "Produção de amostras rápidas e grandes lotes",
    ],
    materials: ["MDF 3mm a 15mm", "Acrílico Cristal & Colorido", "Madeira Nobre", "Papelão & EVA", "Tecidos & Couro"],
    applications: ["Letreiros 3D", "Painéis vazados", "Caixas decorativas", "Mandalas & Quadros", "Peças industriais"],
  },
  {
    id: "gravacao-personalizada",
    title: "Gravação Personalizada",
    subtitle: "Brindes, Copos, Facas, Troféus e Joias",
    shortDesc: "Gravação profunda e indelével a laser em qualquer superfície.",
    fullDesc:
      "A gravação a laser permanente é ideal para personalizar brindes corporativos, instrumentos de churrasco, troféus, facas de aço inox, bijuterias e lembranças de eventos. A marcação é feita diretamente no material sem usar tintas que descascam.",
    icon: Sparkles,
    image: "/images/laser_engraving.png",
    badge: "Gravação Permanente",
    highlights: [
      "Não desbota, não descasca e não sai com o tempo",
      "Alta definição para logotipos detalhados e frases pequenas",
      "Marcação a fibra para metais e inox",
      "Possibilidade de gravação sequencial de nomes",
    ],
    materials: ["Aço Inox & Metais", "Madeira & MDF", "Couro Legítimo", "Acrílico & Vidro", "Alumínio Anodizado"],
    applications: ["Facas & Tábuas gourmet", "Brindes corporativos", "Placas de homenagem", "Copos térmicos", "Chaveiros"],
  },
  {
    id: "acrilicos",
    title: "Acrílicos & Comunicação Visual",
    shortDesc: "Peças decorativas, letras caixa 3D, displays e troféus.",
    fullDesc:
      "Trabalhamos com chapas de acrílico cast de primeira linha. Desenvolvemos troféus luxuosos, Displays para PDV, letras caixas espelhadas, caixas organizadoras e elementos decorativos para clínicas, recepções e eventos de gala.",
    icon: Layers,
    image: "/images/acrylic_letters.png",
    badge: "Acabamento Premium",
    highlights: [
      "Acrílicos transparentes, coloridos e espelhados (Dourado/Prata)",
      "Polimento diamantado de alta transparência",
      "Fixação simplificada para ambientes internos e externos",
      "Alta durabilidade contra sol e intempéries",
    ],
    materials: ["Acrílico Cristal 3mm, 5mm e 10mm", "Acrílico Espelhado Dourado / Prata", "Acrílico Preto / Branco / Colorido"],
    applications: ["Letreiros para fachada & recepção", "Troféus & Medalhas", "Displays de mesa", "Caixas acrílicas", "Placas de sinalização"],
  },
  {
    id: "led-personalizado",
    title: "Luminárias LED Personalizadas",
    shortDesc: "Luminárias decorativas em acrílico com base iluminada.",
    fullDesc:
      "As luminárias em LED 3D combinam a transparência do acrílico cortado e gravado a laser com bases em madeira nobre ou ABS iluminadas por LEDs de alto brilho. Perfeitas para presentes marcantes, decorações de interiores e branding corporativo.",
    icon: Lightbulb,
    image: "/images/led_lamp.png",
    badge: "Design Exclusivo",
    highlights: [
      "Base iluminada bivolt com cabo USB",
      "Personalização total de desenhos, fotos ou nomes",
      "Efeito de iluminação 3D holográfico impressionante",
      "Excelente opção de presente inesquecível",
    ],
    materials: ["Acrílico Cast 3mm Cristal", "Base de Madeira Maciça", "LEDs de alta eficiência energetica"],
    applications: ["Luminárias de cabeceira", "Brindes de luxo", "Logos iluminadas de marcas", "Lembranças de casamento"],
  },
  {
    id: "copos-personalizados",
    title: "Copos & Canecas Personalizadas",
    shortDesc: "Personalização de copos térmicos, vidro e inox para eventos.",
    fullDesc:
      "Especialistas em gravação a laser em copos térmicos (estilo Stanley, Kouda, Arell), canecas chopp de vidro, garrafas de inox e copos para festas corporativas, formaturas e casamentos. Atendemos desde unidades até grandes lotes.",
    icon: Wine,
    image: "/images/custom_cups.png",
    badge: "Resistência Extrema",
    highlights: [
      "Gravação laser 360° no corpo do copo",
      "Suporta lavagens contínuas na máquina sem desbotar",
      "Descontos especiais para lotes acima de 10 unidades",
      "Agilidade no prazo de entrega para eventos",
    ],
    materials: ["Aço Inox com pintura fosca", "Vidro & Cristal", "Alumínio Térmico"],
    applications: ["Copos tipo Stanley", "Canecas de chopp", "Garrafas esportivas", "Kits de padrinhos"],
  },
  {
    id: "projetos-especiais",
    title: "Projetos Especiais Sob Medida",
    shortDesc: "Desenvolvimento de peças sob medida conforme sua ideia.",
    fullDesc:
      "Tem uma ideia ousada ou um protótipo complexo? Nossa equipe técnica auxilia desde a adequação dos arquivos vetoriais até a escolha dos materiais e execução do protótipo final.",
    icon: Wrench,
    image: "/images/mdf_decor.png",
    badge: "Prototipagem Rápida",
    highlights: [
      "Suporte na criação e ajuste de arquivos vetoriais",
      "Combinação de múltiplos materiais no mesmo projeto",
      "Atendimento consultivo para engenharia e design",
      "Sigilo industrial para novos lançamentos",
    ],
    materials: ["MDF", "Acrílico", "Metais", "Compósitos", "Materiais mistos"],
    applications: ["Protótipos industriais", "Cenografia de eventos", "Peças para arquitetura de interiores", "Maquetes técnicas"],
  },
];

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const whatsappNumber = "551120195711";

  const handleWhatsAppOrder = (serviceTitle: string) => {
    const text = encodeURIComponent(
      `Olá! Vi o serviço de *${serviceTitle}* no site da Play Arte Laser e gostaria de obter mais detalhes e solicitar um orçamento!`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  };

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
            Clique em qualquer serviço abaixo para ver os detalhes completos, materiais suportados e aplicações.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedService(service)}
                className="bg-white rounded-3xl overflow-hidden shadow-card border border-slate-200/90 flex flex-col justify-between group cursor-pointer hover:shadow-2xl hover:border-[#E53935]/50 transition-all duration-300"
              >
                {/* Card Image */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {/* Badge */}
                  <span className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full border border-slate-700">
                    {service.badge}
                  </span>

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
                    <p className="text-slate-600 text-sm leading-relaxed mt-2 line-clamp-2">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedService(service);
                      }}
                      className="w-full bg-slate-100 group-hover:bg-[#E53935] text-slate-800 group-hover:text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <Info className="w-4 h-4" />
                      Ver Detalhes do Serviço
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 via-slate-900 to-[#E53935] text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold font-poppins">
              Não encontrou exatamente o que procura?
            </h3>
            <p className="text-slate-300 text-sm max-w-xl">
              Desenvolvemos projetos sob medida para empresas e eventos de qualquer porte. Fale diretamente com nossa fábrica.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="#contato"
              className="bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-105 text-xs text-center flex items-center justify-center gap-2 whitespace-nowrap"
            >
              Usar Calculadora de Orçamento
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* SERVICE DETAILS MODAL (CENTERED OVERLAY CARD) */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative my-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Banner Header Image */}
              <div className="relative h-64 sm:h-72 bg-slate-900">
                <Image
                  src={selectedService.image}
                  alt={selectedService.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div className="space-y-1">
                    <span className="bg-[#E53935] text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full inline-block shadow-md">
                      {selectedService.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-poppins">
                      {selectedService.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#E53935] mb-2">
                    Sobre este Serviço
                  </h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {selectedService.fullDesc}
                  </p>
                </div>

                {/* Highlights List */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#E53935]" /> Principais Diferenciais Técnicos
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedService.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materials & Applications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  {/* Materiais */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#E53935]" /> Materiais Suportados
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedService.materials.map((mat, idx) => (
                        <span key={idx} className="bg-red-50 text-[#E53935] border border-red-100 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Aplicações */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2.5 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" /> Exemplos de Aplicações
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedService.applications.map((app, idx) => (
                        <span key={idx} className="bg-slate-100 text-slate-700 border border-slate-200 text-[11px] font-semibold px-2.5 py-1 rounded-lg">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <a
                    href="#contato"
                    onClick={() => setSelectedService(null)}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition-colors text-center"
                  >
                    Usar Calculadora de Orçamento
                  </a>

                  <button
                    onClick={() => {
                      const title = selectedService.title;
                      setSelectedService(null);
                      handleWhatsAppOrder(title);
                    }}
                    className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-600/30 transition-transform hover:scale-105 flex items-center justify-center gap-2 text-xs"
                  >
                    <MessageCircle className="w-4 h-4 fill-white stroke-emerald-600" />
                    Solicitar Orçamento deste Serviço via WhatsApp
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
