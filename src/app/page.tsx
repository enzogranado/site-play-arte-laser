import React from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SocialProofStats from "@/components/SocialProofStats";
import ContactSection from "@/components/ContactSection";
import ProductsEcommerceSection from "@/components/ProductsEcommerceSection";
import ServicesSection from "@/components/ServicesSection";
import GallerySection from "@/components/GallerySection";
import DifferentialsSection from "@/components/DifferentialsSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Header />
      <HeroSection />
      <SocialProofStats />
      
      {/* Interactive Quote Calculator placed high up for maximum conversions */}
      <ContactSection />
      
      {/* E-Commerce Catalog & Prices */}
      <ProductsEcommerceSection />
      
      <ServicesSection />
      <GallerySection />
      <DifferentialsSection />
      <ProcessSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
