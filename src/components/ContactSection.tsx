"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const quoteSchema = z.object({
  name: z.string().min(3, { message: "Informe seu nome completo (mínimo 3 caracteres)." }),
  email: z.string().email({ message: "Informe um e-mail válido." }),
  phone: z
    .string()
    .min(10, { message: "Informe um telefone válido com DDD." }),
  serviceType: z.string().min(1, { message: "Selecione o tipo de serviço." }),
  description: z.string().min(10, { message: "Descreva brevemente o seu projeto (mínimo 10 caracteres)." }),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceType: "Corte a Laser",
      description: "",
    },
  });

  // Simple phone format helper
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

    setValue("phone", value, { shouldValidate: true });
  };

  const onSubmit = async (data: QuoteFormData) => {
    // Simulate sending quote / API request
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form Submitted:", data);
    setIsSubmitted(true);
    reset();
  };

  const whatsappNumber = "551120195711";

  return (
    <section id="contato" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-red-100 text-[#E53935] text-xs font-bold uppercase tracking-wider">
            Fale Conosco
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-poppins">
            Solicite seu <span className="text-[#E53935]">Orçamento</span>
          </h2>
          <p className="text-slate-600 text-lg">
            Estamos prontos para atender seu projeto corporativo, festas ou personalização rápida.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-8">
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
                    <h4 className="font-semibold text-slate-200 text-sm">WhatsApp</h4>
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

          {/* Right Column: Quote Form */}
          <div className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl">
            <h3 className="text-2xl font-bold font-poppins text-slate-900 mb-2">
              Envie sua Mensagem
            </h3>
            <p className="text-slate-600 text-sm mb-6">
              Preencha os dados abaixo com as informações do seu projeto. Retornamos rapidamente com a cotação.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-6 rounded-2xl text-center space-y-3"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-xl font-poppins">Orçamento enviado com sucesso!</h4>
                <p className="text-sm text-emerald-700">
                  Obrigado pelo contato! Nossa equipe analisará sua solicitação e responderá em breve.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold text-sm transition-colors"
                >
                  Enviar Novo Orçamento
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Nome */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    placeholder="Seu nome ou nome da empresa"
                    {...register("name")}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? "border-red-500 focus:ring-red-200"
                        : "border-slate-300 focus:border-[#E53935] focus:ring-red-100"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      placeholder="seuemail@dominio.com"
                      {...register("email")}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                        errors.email
                          ? "border-red-500 focus:ring-red-200"
                          : "border-slate-300 focus:border-[#E53935] focus:ring-red-100"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-1">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      placeholder="(11) 99999-9999"
                      {...register("phone")}
                      onChange={handlePhoneChange}
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                        errors.phone
                          ? "border-red-500 focus:ring-red-200"
                          : "border-slate-300 focus:border-[#E53935] focus:ring-red-100"
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Tipo de Serviço */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    Tipo de Serviço
                  </label>
                  <select
                    {...register("serviceType")}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-[#E53935] focus:ring-2 focus:ring-red-100 transition-all"
                  >
                    <option value="Corte a Laser">Corte a Laser (MDF / Acrílico)</option>
                    <option value="Gravação Personalizada">Gravação Personalizada em Brindes</option>
                    <option value="Acrílicos">Peças & Comunicação Visual em Acrílico</option>
                    <option value="LED Personalizado">Luminárias LED Personalizadas</option>
                    <option value="Copos Personalizados">Copos Personalizados para Eventos</option>
                    <option value="Projetos Especiais">Projeto Sob Medida / Outros</option>
                  </select>
                </div>

                {/* Descrição */}
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1">
                    Detalhes do Projeto *
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Descreva as dimensões, quantidade, material ou ideia da sua peça..."
                    {...register("description")}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-900 focus:outline-none focus:ring-2 transition-all ${
                      errors.description
                        ? "border-red-500 focus:ring-red-200"
                        : "border-slate-300 focus:border-[#E53935] focus:ring-red-100"
                    }`}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#E53935] hover:bg-[#D32F2F] text-white font-bold py-4 rounded-xl shadow-lg shadow-red-600/30 transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2 text-base disabled:opacity-50"
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      Solicitar Orçamento Agora
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
