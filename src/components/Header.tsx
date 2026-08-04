"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sparkles, Phone, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Início", href: "#inicio" },
    { name: "Produtos & Preços", href: "#produtos" },
    { name: "Serviços", href: "#servicos" },
    { name: "Galeria", href: "#galeria" },
    { name: "Diferenciais", href: "#diferenciais" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-100"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="#inicio" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E53935] to-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/30 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className={`font-extrabold text-xl sm:text-2xl tracking-tight transition-colors duration-300 font-poppins ${
                isScrolled ? "text-slate-900" : "text-white"
              }`}>
                PLAY ARTE <span className="text-[#E53935] drop-shadow-sm">LASER</span>
              </span>
              <span className={`text-[10px] tracking-widest uppercase font-bold transition-colors duration-300 -mt-1 ${
                isScrolled ? "text-slate-500" : "text-slate-300"
              }`}>
                Corte & Gravação
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 ${
                  isScrolled
                    ? "text-slate-700 hover:text-[#E53935]"
                    : "text-slate-200 hover:text-[#E53935]"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:1120195711"
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                isScrolled
                  ? "text-slate-700 hover:text-[#E53935]"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              <Phone className="w-4 h-4 text-[#E53935]" />
              (11) 2019-5711
            </a>
            <a
              href="#contato"
              className="bg-[#E53935] hover:bg-[#D32F2F] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-red-600/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Solicitar orçamento
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? "text-slate-900 hover:bg-slate-100"
                : "text-white hover:bg-slate-800/60"
            }`}
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 overflow-hidden shadow-xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-800 hover:text-[#E53935] py-2 border-b border-slate-100"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href="tel:1120195711"
                  className="flex items-center gap-2 text-sm font-semibold text-slate-700 justify-center py-2"
                >
                  <Phone className="w-4 h-4 text-[#E53935]" />
                  (11) 2019-5711
                </a>
                <a
                  href="#contato"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-[#E53935] hover:bg-[#D32F2F] text-white font-semibold py-3 rounded-full text-center shadow-md flex items-center justify-center gap-2"
                >
                  Solicitar orçamento
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
