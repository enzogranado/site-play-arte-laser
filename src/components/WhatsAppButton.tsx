"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappNumber = "551120195711";
  const defaultMessage = encodeURIComponent(
    "Olá! Gostaria de solicitar um orçamento com a Play Arte Laser."
  );

  return (
    <a
      href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 animate-pulse-whatsapp group"
    >
      <div className="relative">
        <MessageCircle className="w-7 h-7 fill-white stroke-[#25D366]" />
      </div>
      <span className="hidden md:inline font-semibold text-sm pr-1 group-hover:block">
        Fazer Orçamento
      </span>
    </a>
  );
}
