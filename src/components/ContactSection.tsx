"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  CheckCircle2,
  AlertCircle,
  Scissors,
  Sparkles,
  Box,
  Lightbulb,
  Coffee,
  Wrench,
  ChevronRight,
  ChevronLeft,
  Clock,
  Layers,
  FileCheck,
  Building2,
  User,
  ArrowRight,
  RotateCcw,
  Check,
  TrendingDown,
  Zap,
  Calculator,
  Send
} from "lucide-react";

interface QuoteData {
  serviceType: string;
  material: string;
  quantity: string;
  vectorArt: string;
  urgency: string;
  description: string;
  name: string;
  phone: string;
  email: string;
  company: string;
}

const SERVICE_OPTIONS = [
  {
    id: "Corte a Laser",
    title: "Corte a Laser",
    subtitle: "MDF, Acrílico, Madeira, Papelão e Tecido",
    icon: Scissors,
    badge: "Mais Pedido",
    basePrice: 45,
  },
  {
    id: "Gravação Personalizada",
    title: "Gravação Personalizada",
    subtitle: "Brindes, Copos, Facas, Troféus e Joias",
    icon: Sparkles,
    basePrice: 35,
  },
  {
    id: "Acrílicos & Displays",
    title: "Acrílicos & Displays",
    subtitle: "Troféus, Caixas, Letreiros e Placas",
    icon: Box,
    basePrice: 85,
  },
  {
    id: "Luminárias LED",
    title: "Luminárias LED",
    subtitle: "Acrílico gravado com base iluminada",
    icon: Lightbulb,
    basePrice: 65,
  },
  {
    id: "Copos & Térmicos",
    title: "Copos & Canecas",
    subtitle: "Copos térmicos tipo Stanley, vidro e inox",
    icon: Coffee,
    basePrice: 55,
  },
  {
    id: "Projeto Especial",
    title: "Projeto Sob Medida",
    subtitle: "Prototipagem, peças industriais ou artesanais",
    icon: Wrench,
    basePrice: 120,
  },
];

const MATERIAL_OPTIONS = [
  { label: "MDF / Madeira", multiplier: 1.0 },
  { label: "Acrílico (Transparente / Colorido / Espelhado)", multiplier: 1.6 },
  { label: "Inox / Metal / Alumínio", multiplier: 1.8 },
  { label: "Copo / Caneca / Térmico", multiplier: 1.4 },
  { label: "Couro / Tecido / EVA", multiplier: 1.2 },
  { label: "Não sei / Quero indicação do especialista", multiplier: 1.3 },
];

const QUANTITY_OPTIONS = [
  { label: "1 a 5 peças (Protótipo / Unidade)", count: 3, discount: 0 },
  { label: "6 a 20 peças (Pequeno lote)", count: 12, discount: 0.12 },
  { label: "21 a 100 peças (Médio lote / Eventos)", count: 45, discount: 0.22 },
  { label: "Mais de 100 peças (Grande lote corporativo)", count: 120, discount: 0.35 },
];

const VECTOR_OPTIONS = [
  { label: "Sim, tenho a arte em vetor (.CDR, .AI, .DXF, .PDF)", extraCost: 0 },
  { label: "Tenho apenas a imagem ou foto (.JPG, .PNG)", extraCost: 20 },
  { label: "Não tenho arte (Preciso que a Play Arte crie)", extraCost: 40 },
];

const URGENCY_OPTIONS = [
  { label: "Sem urgência (Prazo normal: 3 a 5 dias úteis)", urgencyMultiplier: 1.0, days: "3 a 5 dias úteis" },
  { label: "Urgência Média (Necessário em 1 a 2 dias)", urgencyMultiplier: 1.25, days: "1 a 2 dias úteis" },
  { label: "Super Urgente (Hoje ou próximas 24 horas)", urgencyMultiplier: 1.5, days: "Express (Próximas 24h)" },
];

export default function ContactSection() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  const [formData, setFormData] = useState<QuoteData>({
    serviceType: "Corte a Laser",
    material: "MDF / Madeira",
    quantity: "1 a 5 peças (Protótipo / Unidade)",
    vectorArt: "Sim, tenho a arte em vetor (.CDR, .AI, .DXF, .PDF)",
    urgency: "Sem urgência (Prazo normal: 3 a 5 dias úteis)",
    description: "",
    name: "",
    phone: "",
    email: "",
    company: "",
  });

  const whatsappNumber = "551120195711";

  // CALCULATOR LOGIC
  const calculation = useMemo(() => {
    const selectedServiceObj = SERVICE_OPTIONS.find((s) => s.id === formData.serviceType) || SERVICE_OPTIONS[0];
    const selectedMatObj = MATERIAL_OPTIONS.find((m) => m.label === formData.material) || MATERIAL_OPTIONS[0];
    const selectedQtyObj = QUANTITY_OPTIONS.find((q) => q.label === formData.quantity) || QUANTITY_OPTIONS[0];
    const selectedVectorObj = VECTOR_OPTIONS.find((v) => v.label === formData.vectorArt) || VECTOR_OPTIONS[0];
    const selectedUrgencyObj = URGENCY_OPTIONS.find((u) => u.label === formData.urgency) || URGENCY_OPTIONS[0];

    const baseUnitCost = selectedServiceObj.basePrice * selectedMatObj.multiplier;
    const rawTotal = (baseUnitCost * selectedQtyObj.count) + selectedVectorObj.extraCost;
    const discountedTotal = rawTotal * (1 - selectedQtyObj.discount);
    const finalTotal = discountedTotal * selectedUrgencyObj.urgencyMultiplier;

    const minEstimate = Math.round(finalTotal * 0.9);
    const maxEstimate = Math.round(finalTotal * 1.15);
    const unitEstimate = (finalTotal / selectedQtyObj.count).toFixed(2);
    const discountPercentage = Math.round(selectedQtyObj.discount * 100);

    return {
      minEstimate,
      maxEstimate,
      unitEstimate,
      discountPercentage,
      estimatedDays: selectedUrgencyObj.days,
    };
  }, [formData.serviceType, formData.material, formData.quantity, formData.vectorArt, formData.urgency]);

  // Phone masking
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    setFormData((prev) => ({ ...prev, phone: value }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const validateStep4 = () => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!formData.name.trim() || formData.name.trim().length < 3) {
      newErrors.name = "Por favor, informe seu nome completo (mínimo 3 caracteres).";
    }
    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!formData.phone.trim() || cleanPhone.length < 10) {
      newErrors.phone = "Por favor, informe um WhatsApp válido com DDD.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 4) {
      if (!validateStep4()) return;
    }
    setStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Build dynamic WhatsApp text message containing form data
  const generateWhatsAppMessage = () => {
    let msg = `Olá, equipe *Play Arte Laser*! Montei meu orçamento no site com a *Calculadora Instantânea*:\n\n`;
    
    msg += `📊 *ESTIMATIVA DE INVESTIMENTO:* \n`;
    msg += `• *Investimento Estimado:* R$ ${calculation.minEstimate},00 ~ R$ ${calculation.maxEstimate},00\n`;
    msg += `• *Estimativa por Unidade:* R$ ${calculation.unitEstimate} / un\n`;
    if (calculation.discountPercentage > 0) {
      msg += `• *Desconto de Lote Aplicado:* ${calculation.discountPercentage}% OFF (Fábrica)\n`;
    }
    msg += `• *Prazo de Produção:* ${calculation.estimatedDays}\n\n`;

    msg += `📋 *ESPECIFICAÇÕES DO PEDIDO:*\n`;
    msg += `• *Serviço:* ${formData.serviceType}\n`;
    msg += `• *Material:* ${formData.material}\n`;
    msg += `• *Quantidade:* ${formData.quantity}\n`;
    msg += `• *Arte/Vetor:* ${formData.vectorArt}\n`;
    msg += `• *Urgência:* ${formData.urgency}\n`;

    if (formData.description.trim()) {
      msg += `• *Medidas/Observações:* ${formData.description.trim()}\n`;
    }

    msg += `\n👤 *DADOS DO CLIENTE:*\n`;
    msg += `• *Nome:* ${formData.name.trim()}\n`;
    msg += `• *WhatsApp:* ${formData.phone.trim()}\n`;
    if (formData.email.trim()) {
      msg += `• *E-mail:* ${formData.email.trim()}\n`;
    }
    if (formData.company.trim()) {
      msg += `• *Empresa:* ${formData.company.trim()}\n`;
    }

    msg += `\nAguardando confirmação e atendimento prioritário!`;
    return encodeURIComponent(msg);
  };

  const openWhatsApp = () => {
    const encoded = generateWhatsAppMessage();
    window.open(`https://wa.me/${whatsappNumber}?text=${encoded}`, "_blank");
  };

  const resetForm = () => {
    setFormData({
      serviceType: "Corte a Laser",
      material: "MDF / Madeira",
      quantity: "1 a 5 peças (Protótipo / Unidade)",
      vectorArt: "Sim, tenho a arte em vetor (.CDR, .AI, .DXF, .PDF)",
      urgency: "Sem urgência (Prazo normal: 3 a 5 dias úteis)",
      description: "",
      name: "",
      phone: "",
      email: "",
      company: "",
    });
    setErrors({});
    setStep(1);
  };

  return (
    <section id="contato" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider shadow-md">
            <Calculator className="w-4 h-4 text-red-500" /> Calculadora de Orçamento Instantâneo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-poppins">
            Simule seu <span className="text-[#E53935]">Orçamento em Poucos Segundos</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Monte os detalhes do seu pedido abaixo e obtenha a estimativa de preço instantânea antes de enviar ao nosso WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Information & Google Maps */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl border border-slate-800 space-y-6">
              <h3 className="text-2xl font-bold font-poppins text-white">
                Informações de Contato
              </h3>
              <p className="text-slate-400 text-sm">
                Entre em contato pelos nossos canais oficiais ou visite nossa fábrica em São Paulo.
              </p>

              <div className="space-y-6 pt-2">
                {/* Endereço */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E53935]/20 text-[#E53935] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 text-sm">Endereço</h4>
                    <p className="text-slate-400 text-sm mt-0.5 leading-relaxed">
                      Rua Alberto Popovici, 202<br />
                      Jardim Sapopemba — São Paulo – SP
                    </p>
                  </div>
                </div>

                {/* Telefone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#E53935]/20 text-[#E53935] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 text-sm">Telefone Fixo</h4>
                    <a
                      href="tel:1120195711"
                      className="text-slate-300 hover:text-[#E53935] text-sm mt-0.5 block transition-colors"
                    >
                      (11) 2019-5711
                    </a>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 text-sm">WhatsApp Comercial</h4>
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 text-sm mt-0.5 block font-medium transition-colors"
                    >
                      (11) 2019-5711 — Clique para conversar
                    </a>
                  </div>
                </div>

                {/* E-mail */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-200 text-sm">E-mail Comercial</h4>
                    <span className="text-slate-400 text-sm mt-0.5 block">
                      contato@playartelaser.com.br
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-64 relative bg-slate-100">
              <iframe
                title="Google Maps Location - Play Arte Laser"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.60228399587!2d-46.50549022375836!3d-23.618536863704255!2m3!1f0!2f0!3f0!2m3!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5d7208d08595%3A0x6b1edbb4477db1fa!2sR.%20Alberto%20Popovici%2C%20202%20-%20Jardim%20Sapopemba%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Multi-step Interactive Form + INSTANT CALCULATOR */}
          <div className="lg:col-span-8 bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl relative min-h-[560px] flex flex-col justify-between">
            
            <div>
              {/* LIVE CALCULATOR PREVIEW CARD */}
              <div className="mb-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 sm:p-5 rounded-2xl shadow-lg border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-400 flex items-center gap-1">
                      <Calculator className="w-3.5 h-3.5" /> Calculadora de Preço Automática
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-extrabold font-poppins text-white flex items-baseline gap-2">
                    <span>R$ {calculation.minEstimate},00</span>
                    <span className="text-xs text-slate-400 font-normal">a</span>
                    <span>R$ {calculation.maxEstimate},00</span>
                  </div>
                  <p className="text-[11px] text-slate-300 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" /> ~R$ {calculation.unitEstimate} por unidade | Prazo: {calculation.estimatedDays}
                  </p>
                </div>

                {calculation.discountPercentage > 0 && (
                  <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-emerald-400" />
                    <span>{calculation.discountPercentage}% Desconto de Fábrica</span>
                  </div>
                )}
              </div>

              {/* Step Progress Header */}
              {step <= 4 && (
                <div className="mb-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#E53935]">
                        Etapa {step} de 4
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold font-poppins text-slate-900 mt-0.5">
                        {step === 1 && "Qual tipo de serviço você precisa?"}
                        {step === 2 && "Especificações e Quantidade"}
                        {step === 3 && "Detalhes do Projeto & Urgência"}
                        {step === 4 && "Seus Dados para Receber o Orçamento"}
                      </h3>
                    </div>

                    <span className="text-xs font-semibold text-slate-500 bg-slate-200/70 px-3 py-1.5 rounded-full">
                      {Math.round((step / 4) * 100)}% Concluído
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-[#E53935]"
                      initial={{ width: "25%" }}
                      animate={{ width: `${(step / 4) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Step Breadcrumbs */}
                  <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                    {[
                      { num: 1, label: "Serviço" },
                      { num: 2, label: "Especificações" },
                      { num: 3, label: "Detalhes" },
                      { num: 4, label: "Contato" },
                    ].map((st) => (
                      <div
                        key={st.num}
                        onClick={() => st.num < step && setStep(st.num)}
                        className={`cursor-pointer transition-colors text-xs font-medium flex items-center justify-center gap-1 py-1 rounded-md ${
                          step === st.num
                            ? "text-[#E53935] font-bold"
                            : st.num < step
                            ? "text-emerald-600 font-medium hover:bg-emerald-50"
                            : "text-slate-400"
                        }`}
                      >
                        {st.num < step ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 inline" />
                        ) : (
                          <span>{st.num}.</span>
                        )}
                        <span className="hidden sm:inline">{st.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step Forms */}
              <AnimatePresence mode="wait">
                
                {/* STEP 1: SERVICE SELECTION */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <p className="text-slate-600 text-sm">
                      Selecione a categoria do seu projeto para calcular a estimativa base:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {SERVICE_OPTIONS.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = formData.serviceType === opt.id;
                        return (
                          <div
                            key={opt.id}
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, serviceType: opt.id }));
                            }}
                            className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 relative flex items-start gap-4 ${
                              isSelected
                                ? "border-[#E53935] bg-red-50/60 shadow-md ring-2 ring-red-100"
                                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                            }`}
                          >
                            {opt.badge && (
                              <span className="absolute top-3 right-3 bg-[#E53935] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                                {opt.badge}
                              </span>
                            )}
                            <div
                              className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                isSelected
                                  ? "bg-[#E53935] text-white"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              <Icon className="w-6 h-6" />
                            </div>
                            <div className="pr-6">
                              <h4 className="font-bold text-slate-900 text-sm font-poppins">
                                {opt.title}
                              </h4>
                              <p className="text-slate-500 text-xs mt-1 leading-snug">
                                {opt.subtitle}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: SPECS & QUANTITY */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {/* Material */}
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-[#E53935]" /> Material Desejado
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {MATERIAL_OPTIONS.map((mat) => (
                          <button
                            key={mat.label}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, material: mat.label }))}
                            className={`px-4 py-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                              formData.material === mat.label
                                ? "border-[#E53935] bg-red-50 text-[#E53935] ring-1 ring-[#E53935]"
                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {mat.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantidade */}
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Box className="w-4 h-4 text-[#E53935]" /> Quantidade Estimada
                        </span>
                        <span className="text-xs text-emerald-600 font-normal">
                          ⚡ Desconto automático por quantidade
                        </span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {QUANTITY_OPTIONS.map((qty) => (
                          <button
                            key={qty.label}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, quantity: qty.label }))}
                            className={`px-4 py-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                              formData.quantity === qty.label
                                ? "border-[#E53935] bg-red-50 text-[#E53935] ring-1 ring-[#E53935]"
                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {qty.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Arte / Vetor */}
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                        <FileCheck className="w-4 h-4 text-[#E53935]" /> Possui a arte/logo vetorizada?
                      </label>
                      <div className="space-y-2">
                        {VECTOR_OPTIONS.map((vec) => (
                          <button
                            key={vec.label}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, vectorArt: vec.label }))}
                            className={`w-full px-4 py-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                              formData.vectorArt === vec.label
                                ? "border-[#E53935] bg-red-50 text-[#E53935] ring-1 ring-[#E53935]"
                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {vec.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: DETAILS & URGENCY */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {/* Urgência */}
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#E53935]" /> Prazo / Urgência Desejada
                      </label>
                      <div className="space-y-2.5">
                        {URGENCY_OPTIONS.map((urg) => (
                          <button
                            key={urg.label}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, urgency: urg.label }))}
                            className={`w-full px-4 py-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                              formData.urgency === urg.label
                                ? "border-[#E53935] bg-red-50 text-[#E53935] ring-1 ring-[#E53935]"
                                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            {urg.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Descrição Adicional */}
                    <div>
                      <label className="block text-sm font-bold text-slate-800 mb-1">
                        Descrição / Medidas do Projeto (Opcional)
                      </label>
                      <p className="text-xs text-slate-500 mb-2">
                        Informe as dimensões aproximadas (ex: 30x40cm), espessura (ex: MDF 3mm) ou detalhes das frases e artes.
                      </p>
                      <textarea
                        rows={4}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, description: e.target.value }))
                        }
                        placeholder="Ex: Gostaria de 50 placas em acrílico transparente 3mm no tamanho 20x15cm com meu logotipo gravado no canto superior direito..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#E53935] focus:ring-2 focus:ring-red-100 transition-all"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: CONTACT INFO */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <p className="text-slate-600 text-sm mb-4">
                      Preencha seus dados para receber o relatório de orçamento no seu WhatsApp:
                    </p>

                    {/* Nome */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                        <User className="w-4 h-4 text-[#E53935]" /> Seu Nome Completo *
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: João Silva"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, name: e.target.value }));
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? "border-red-500 focus:ring-red-200"
                            : "border-slate-300 focus:border-[#E53935] focus:ring-red-100"
                        }`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Telefone / WhatsApp */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4 text-emerald-600" /> WhatsApp com DDD *
                      </label>
                      <input
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.phone
                            ? "border-red-500 focus:ring-red-200"
                            : "border-slate-300 focus:border-[#E53935] focus:ring-red-100"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Email & Empresa Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                          <Mail className="w-4 h-4 text-blue-500" /> E-mail (Opcional)
                        </label>
                        <input
                          type="email"
                          placeholder="seuemail@dominio.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, email: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#E53935] focus:ring-2 focus:ring-red-100 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-purple-500" /> Empresa (Opcional)
                        </label>
                        <input
                          type="text"
                          placeholder="Nome da sua empresa"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, company: e.target.value }))
                          }
                          className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#E53935] focus:ring-2 focus:ring-red-100 transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: FINAL WHATSAPP REDIRECT SCREEN WITH BREAKDOWN */}
                {step === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 text-center py-2"
                  >
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold font-poppins text-slate-900">
                        Orçamento Calculado com Sucesso!
                      </h3>
                      <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto">
                        Confira a estimativa abaixo e envie o relatório detalhado diretamente para o nosso WhatsApp comercial.
                      </p>
                    </div>

                    {/* Calculation Summary Card */}
                    <div className="bg-gradient-to-tr from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-xl text-left space-y-4 border border-slate-700">
                      <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                        <span className="font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                          <Calculator className="w-4 h-4" /> Relatório da Calculadora de Orçamento
                        </span>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="text-slate-400 hover:text-white text-xs underline font-medium flex items-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" /> Reconfigurar
                        </button>
                      </div>

                      {/* Estimated Price Pill */}
                      <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold block">
                            Investimento Estimado
                          </span>
                          <span className="text-2xl font-extrabold text-white font-poppins">
                            R$ {calculation.minEstimate},00 ~ R$ {calculation.maxEstimate},00
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-emerald-400 font-bold block">
                            ~R$ {calculation.unitEstimate} / un
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Prazo: {calculation.estimatedDays}
                          </span>
                        </div>
                      </div>

                      {/* Specs List */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                        <div><strong className="text-white">Serviço:</strong> {formData.serviceType}</div>
                        <div><strong className="text-white">Material:</strong> {formData.material}</div>
                        <div><strong className="text-white">Quantidade:</strong> {formData.quantity}</div>
                        <div><strong className="text-white">Vetor/Arte:</strong> {formData.vectorArt}</div>
                        <div><strong className="text-white">Prazo:</strong> {formData.urgency}</div>
                        <div><strong className="text-white">Cliente:</strong> {formData.name}</div>
                      </div>

                      {formData.description.trim() && (
                        <div className="pt-2 border-t border-slate-700 text-xs text-slate-300">
                          <strong className="text-white">Observações:</strong> {formData.description}
                        </div>
                      )}
                    </div>

                    {/* Direct WhatsApp CTA Button */}
                    <div className="space-y-3 pt-2">
                      <button
                        type="button"
                        onClick={openWhatsApp}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-2xl shadow-xl shadow-emerald-600/30 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 text-base sm:text-lg animate-pulse"
                      >
                        <MessageCircle className="w-6 h-6 fill-white stroke-emerald-600" />
                        Enviar Orçamento pelo WhatsApp
                        <ArrowRight className="w-5 h-5" />
                      </button>

                      <p className="text-[11px] text-slate-500">
                        Ao clicar, o WhatsApp abrirá com todos os detalhes e estimativas preenchidos.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="text-xs text-slate-500 hover:text-slate-800 underline transition-colors"
                      >
                        Simular outro orçamento do zero
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Navigation Controls (Steps 1 to 4) */}
            {step <= 4 && (
              <div className="pt-8 mt-6 border-t border-slate-200/80 flex items-center justify-between gap-4">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-200/60 font-semibold text-sm transition-all flex items-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-7 py-3 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold text-sm shadow-lg shadow-red-600/20 transition-all duration-200 hover:scale-105 flex items-center gap-2"
                >
                  {step === 4 ? (
                    <>
                      Calcular & Enviar via WhatsApp
                      <Send className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Próxima Etapa
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
