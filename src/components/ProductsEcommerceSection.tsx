"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Sparkles,
  Star,
  Check,
  MessageCircle,
  Plus,
  Minus,
  Eye,
  X,
  Filter,
  Search,
  ShieldCheck,
  Truck,
  ArrowRight,
  Zap
} from "lucide-react";

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  priceUnit?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  features: string[];
  capacity?: string;
}

const PRODUCTS: Product[] = [
  // COPOS E GARRAFAS
  {
    id: "prod-garrafa-510",
    title: "Garrafa 510 ml",
    category: "Copos & Garrafas",
    price: 59.90,
    rating: 5.0,
    reviewsCount: 84,
    image: "/images/custom_cups.png",
    badge: "Mais Vendido",
    badgeColor: "bg-[#E53935]",
    description: "Garrafa de aço inox 510ml com parede dupla e gravação a laser personalizada do seu nome, logo ou frase.",
    features: ["Aço inox com pintura fosca", "Mantém gelado por até 12h", "Gravação a laser permanente"],
    capacity: "510ml"
  },
  {
    id: "prod-garrafa-mosquetao-750",
    title: "Garrafa mosquetão 750ml",
    category: "Copos & Garrafas",
    price: 69.90,
    rating: 4.9,
    reviewsCount: 52,
    image: "/images/custom_cups.png",
    description: "Garrafa esportiva 750ml com tampa mosquetão para transporte prático e marcação a laser.",
    features: ["Tampa mosquetão reforçada", "Alta capacidade 750ml", "Gravação em fibra laser"]
  },
  {
    id: "prod-garrafa-termica-1l",
    title: "Garrafa térmica 1 litro",
    category: "Copos & Garrafas",
    price: 89.90,
    rating: 5.0,
    reviewsCount: 67,
    image: "/images/custom_cups.png",
    badge: "Alta Capacidade",
    badgeColor: "bg-blue-600",
    description: "Garrafa térmica gigante de 1 litro com isolamento a vácuo e gravação personalizada.",
    features: ["Capacidade 1 Litro", "Mantém a temperatura por longo período", "Inox 18/8 livre de BPA"]
  },
  {
    id: "prod-caneca-350-tampa",
    title: "Caneca 350ml com tampa",
    category: "Copos & Garrafas",
    price: 49.90,
    rating: 4.8,
    reviewsCount: 39,
    image: "/images/custom_cups.png",
    description: "Caneca térmica de 350ml com tampa hermética antiderrame e gravação a laser.",
    features: ["Tampa acrílica com vedação", "Ideal para café ou bebidas geladas", "Personalização a laser"]
  },
  {
    id: "prod-garrafa-infantil",
    title: "Garrafa infantil com canudo",
    category: "Copos & Garrafas",
    price: 59.90,
    rating: 5.0,
    reviewsCount: 45,
    image: "/images/custom_cups.png",
    badge: "Linha Kids",
    badgeColor: "bg-amber-500",
    description: "Garrafa infantil colorida com canudo de silicone retrátil e gravação do nome da criança.",
    features: ["Canudo retrátil antivazamento", "Cores vibrantes", "Gravação de nomes e personagens"]
  },
  {
    id: "prod-caneca-700",
    title: "Caneca 700ml",
    category: "Copos & Garrafas",
    price: 69.90,
    rating: 4.9,
    reviewsCount: 31,
    image: "/images/custom_cups.png",
    description: "Caneca chopp/bebidas 700ml em aço inox com alça resistente e gravação personalizada.",
    features: ["Alça anatômica", "Capacidade 700ml", "Gravação inalterável no inox"]
  },
  {
    id: "prod-copo-420-som",
    title: "Copo 420ml com caixa de som",
    category: "Copos & Garrafas",
    price: 79.90,
    rating: 5.0,
    reviewsCount: 112,
    image: "/images/custom_cups.png",
    badge: "Caixa Bluetooth",
    badgeColor: "bg-purple-600",
    description: "Copo térmico 420ml equipado com caixa de som Bluetooth removível na base e iluminação LED.",
    features: ["Caixa de som Bluetooth acoplada", "LEDs sincronizados", "Gravação a laser personalizada"]
  },
  {
    id: "prod-copo-473",
    title: "Copo 473ml",
    category: "Copos & Garrafas",
    price: 45.00,
    rating: 4.9,
    reviewsCount: 156,
    image: "/images/custom_cups.png",
    badge: "Super Preço",
    badgeColor: "bg-emerald-600",
    description: "Copo térmico clássico estilo Stanley 473ml para cerveja e drinks com gravação a laser.",
    features: ["Modelo clássico 473ml", "Isolamento a vácuo", "Gravação permanente inclusa"]
  },
  {
    id: "prod-copao-1200",
    title: "Copão 1200ml",
    category: "Copos & Garrafas",
    price: 79.90,
    rating: 5.0,
    reviewsCount: 94,
    image: "/images/custom_cups.png",
    badge: "Tendência",
    badgeColor: "bg-rose-600",
    description: "Copão gigante 1200ml com alça e canudo. Sucesso absoluto para hidratação diária.",
    features: ["Capacidade 1.200ml", "Acompanha canudo em inox/silicone", "Gravação personalizada"]
  },
  {
    id: "prod-copao-890",
    title: "Copão 890ml",
    category: "Copos & Garrafas",
    price: 60.00,
    rating: 4.8,
    reviewsCount: 42,
    image: "/images/custom_cups.png",
    description: "Copão térmico de 890ml com canudo e tampa rosqueável.",
    features: ["890ml de capacidade", "Vedação eficiente", "Personalizado a laser"]
  },
  {
    id: "prod-garrafa-650-canudo",
    title: "Garrafa 650ml com canudo",
    category: "Copos & Garrafas",
    price: 60.00,
    rating: 4.9,
    reviewsCount: 28,
    image: "/images/custom_cups.png",
    description: "Garrafa térmica 650ml com bico articulável e canudo interno.",
    features: ["650ml", "Canudo interno acoplado", "Gravação de alta definição"]
  },
  {
    id: "prod-copao-termico-1200",
    title: "Copão térmico 1200ml",
    category: "Copos & Garrafas",
    price: 100.00,
    rating: 5.0,
    reviewsCount: 78,
    image: "/images/custom_cups.png",
    badge: "Linha Luxo",
    badgeColor: "bg-amber-600",
    description: "Copão térmico premium 1200ml em aço inox reforçado com parede dupla a vácuo.",
    features: ["Inox de altíssima espessura", "Conservação térmica extrema", "Personalização exclusiva"]
  },
  {
    id: "prod-kit-garrafa-2-xicaras",
    title: "Kit garrafa + 2 xícaras 500ml",
    category: "Copos & Garrafas",
    price: 60.00,
    rating: 5.0,
    reviewsCount: 63,
    image: "/images/laser_engraving.png",
    badge: "Kit Presente",
    badgeColor: "bg-blue-600",
    description: "Kit luxo de presente contendo garrafa térmica de 500ml e 2 xícaras metálicas com estojo.",
    features: ["Garrafa 500ml + 2 Xícaras", "Estojo de presente", "Gravação em todas as peças"]
  },
  {
    id: "prod-garrafa-900-canudo",
    title: "Garrafa 900ml com canudo",
    category: "Copos & Garrafas",
    price: 70.00,
    rating: 4.9,
    reviewsCount: 37,
    image: "/images/custom_cups.png",
    description: "Garrafa estilo tumblers 900ml com canudo e tampa antiderramamento.",
    features: ["900ml de capacidade", "Canudo incluso", "Gravação a laser permanente"]
  },
  {
    id: "prod-copos-360",
    title: "Copos 360 graus",
    category: "Copos & Garrafas",
    price: 79.90,
    priceUnit: "a partir de",
    rating: 5.0,
    reviewsCount: 88,
    image: "/images/custom_cups.png",
    badge: "Gravação 360°",
    badgeColor: "bg-purple-700",
    description: "Gravação circular 360° em toda a superfície do copo com artes detalhadas e logotipos.",
    features: ["Sem emendas visíveis", "Arte completa no copo todo", "A partir de R$ 79,90 com arte pronta"]
  },
  {
    id: "prod-garrafa-360",
    title: "Garrafa 360 graus",
    category: "Copos & Garrafas",
    price: 79.90,
    priceUnit: "a partir de",
    rating: 5.0,
    reviewsCount: 51,
    image: "/images/custom_cups.png",
    description: "Gravação a laser 360° em garrafas térmicas em vários temas e estilos.",
    features: ["Desenho em volta de toda a garrafa", "Vários temas disponíveis", "Arte customizável"]
  },
  {
    id: "prod-garrafa-800",
    title: "Garrafa 800ml",
    category: "Copos & Garrafas",
    price: 70.00,
    rating: 4.8,
    reviewsCount: 29,
    image: "/images/custom_cups.png",
    description: "Garrafa térmica de 800ml com acabamento fosco em cores variadas.",
    features: ["800ml", "Vedação antivazamento", "Gravação a laser"]
  },
  {
    id: "prod-garrafa-termometro-500",
    title: "Garrafa com termômetro digital 500ml",
    category: "Copos & Garrafas",
    price: 45.00,
    rating: 4.9,
    reviewsCount: 140,
    image: "/images/custom_cups.png",
    badge: "Display LED",
    badgeColor: "bg-cyan-600",
    description: "Garrafa inteligente 500ml com sensor de temperatura com display LED no topo da tampa.",
    features: ["Termômetro digital na tampa", "Inox 500ml", "Gravação a laser personalizada"]
  },
  {
    id: "prod-copo-longneck-2-tampas",
    title: "Copo longneck 2 tampas",
    category: "Copos & Garrafas",
    price: 69.90,
    rating: 4.9,
    reviewsCount: 46,
    image: "/images/custom_cups.png",
    description: "Copo porta longneck e latão com 2 tampas intercambiáveis para máxima versatilidade.",
    features: ["Serve garrafa longneck e lata", "Duas tampas inclusas", "Gravação a laser de alta precisão"]
  },
  {
    id: "prod-taca-termica-2x1",
    title: "Taça térmica 2x1",
    category: "Copos & Garrafas",
    price: 49.90,
    rating: 5.0,
    reviewsCount: 38,
    image: "/images/custom_cups.png",
    description: "Taça térmica 2x1 versátil que funciona como taça de vinho/gin ou copo térmico.",
    features: ["Função taça + copo", "Inox térmico", "Gravação a laser inclusa"]
  },

  // LEDS E NEON
  {
    id: "prod-led-neon-anos",
    title: "Led neon (anos)",
    category: "LEDs & Neon",
    price: 149.90,
    rating: 5.0,
    reviewsCount: 42,
    image: "/images/led_lamp.png",
    badge: "Decoração Festas",
    badgeColor: "bg-[#E53935]",
    description: "Letreiro LED Neon de números (tamanho 40cm). Opções de cor em branco quente ou frio.",
    features: ["Tamanho: 40cm", "Branco quente ou frio", "Acrílico 3mm + Fita Neon LED"]
  },
  {
    id: "prod-pool-party-neon",
    title: "Pool party LED Neon",
    category: "LEDs & Neon",
    price: 380.00,
    rating: 5.0,
    reviewsCount: 29,
    image: "/images/led_lamp.png",
    badge: "Painel Gigante",
    badgeColor: "bg-amber-500",
    description: "Painel luminoso em acrílico 3mm recortado a laser 'Pool Party' com LED neon super brilhante.",
    features: ["Dimensões 60x40cm", "Acrílico cristal 3mm", "Fonte bivolt inclusa"]
  },
  {
    id: "prod-luminaria-personalizada",
    title: "Luminária personalizada",
    category: "LEDs & Neon",
    price: 70.00,
    rating: 5.0,
    reviewsCount: 95,
    image: "/images/led_lamp.png",
    badge: "Com Controle",
    badgeColor: "bg-purple-600",
    description: "Luminária acrílica gravada a laser em qualquer tema desejado com controle remoto RGB.",
    features: ["Personalização de qualquer tema ou foto", "Acompanha controle remoto RGB", "Base com iluminação LED"]
  },
  {
    id: "prod-led-celebre-a-vida",
    title: "Led Neon celebre a vida!",
    category: "LEDs & Neon",
    price: 380.00,
    rating: 5.0,
    reviewsCount: 33,
    image: "/images/led_lamp.png",
    description: "Letreiro neon 'Celebre a vida!' tamanho 60cm em acrílico cristal com iluminação LED premium.",
    features: ["Tamanho: 60cm", "Opção de cor branco quente ou frio", "Fonte inclusa"]
  },
  {
    id: "prod-numero-neon-led",
    title: "Número neon led",
    category: "LEDs & Neon",
    price: 120.00,
    rating: 4.9,
    reviewsCount: 57,
    image: "/images/led_lamp.png",
    description: "Número em LED Neon para aniversários e cenários com 60cm de altura contando com a base.",
    features: ["60cm de altura com base", "Design moderno", "Branco quente ou frio"]
  },

  // ACRÍLICOS E FACHADAS
  {
    id: "prod-letreiro-luminoso",
    title: "Letreiro luminoso",
    category: "Acrílicos & Fachadas",
    price: 400.00,
    priceUnit: "a partir de",
    rating: 5.0,
    reviewsCount: 71,
    image: "/images/hero_laser.png",
    badge: "Empresarial",
    badgeColor: "bg-slate-900",
    description: "Letreiro luminoso em acrílico com iluminação LED traseira/interna feito com a sua logomarca.",
    features: ["Produzido sob medida com sua logo", "Iluminação LED de alto brilho", "Acrílico espelhado ou colorido"]
  },
  {
    id: "prod-letreiro-sem-led",
    title: "Letreiro sem LED",
    category: "Acrílicos & Fachadas",
    price: 150.00,
    priceUnit: "a partir de",
    rating: 4.9,
    reviewsCount: 48,
    image: "/images/acrylic_letters.png",
    description: "Letreiro de parede recortado a laser em acrílico espelhado ou fosco sem iluminação.",
    features: ["Acrílico espelhado dourado, prata ou preto", "Corte preciso a laser", "Gabarito de instalação incluso"]
  },
  {
    id: "prod-oh-baby-espelhado",
    title: "Oh baby acrílico espelhado",
    category: "Acrílicos & Fachadas",
    price: 79.90,
    rating: 5.0,
    reviewsCount: 64,
    image: "/images/acrylic_letters.png",
    badge: "Chá de Bebê",
    badgeColor: "bg-rose-500",
    description: "Letreiro recortado 'Oh baby' em acrílico espelhado 2mm com tamanho de 45cm.",
    features: ["Acrílico espelhado 2mm", "Tamanho 45cm", "Ideal para painéis e cenários"]
  },
  {
    id: "prod-espelho-personalizado",
    title: "Espelho personalizado",
    category: "Acrílicos & Fachadas",
    price: 59.90,
    rating: 4.9,
    reviewsCount: 36,
    image: "/images/acrylic_letters.png",
    description: "Espelho em acrílico personalizado com gravação ou recorte no formato da sua marca.",
    features: ["Acrílico espelhado inquebrável", "Design sob medida", "Super leve e seguro"]
  },
  {
    id: "prod-placa-menu-cardapio",
    title: "Placa de menu, cardápio ou recado",
    category: "Acrílicos & Fachadas",
    price: 49.90,
    rating: 5.0,
    reviewsCount: 82,
    image: "/images/acrylic_letters.png",
    badge: "Para Restaurantes",
    badgeColor: "bg-blue-600",
    description: "Placa display em acrílico transparente para cardápio, recados ou menu de balcão com sua logo.",
    features: ["Acrílico cristal de alta transparência", "Gravação da sua logomarca", "Base estável de balcão"]
  },
  {
    id: "prod-identificacao-porta",
    title: "Identificação de porta",
    category: "Acrílicos & Fachadas",
    price: 35.00,
    rating: 4.8,
    reviewsCount: 53,
    image: "/images/acrylic_letters.png",
    description: "Placa de sinalização para portas de escritórios, consultórios, banheiros e espaços estéticos.",
    features: ["Design elegante em acrílico 3D", "Fácil fixação com fita dupla face 3M", "Personalizável"]
  },
  {
    id: "prod-placa-pix",
    title: "Placa pix para balcão",
    category: "Acrílicos & Fachadas",
    price: 29.90,
    priceUnit: "a partir de",
    rating: 5.0,
    reviewsCount: 210,
    image: "/images/acrylic_letters.png",
    badge: "Campeão de Vendas",
    badgeColor: "bg-emerald-600",
    description: "Placa de balcão em acrílico gravada com QR Code do Pix, Instagram e redes sociais.",
    features: ["QR Code Pix legível e durável", "Gravação em acrílico luxo", "A partir de R$ 29,90"]
  },
  {
    id: "prod-kit-estetica",
    title: "Kit estética",
    category: "Acrílicos & Fachadas",
    price: 149.90,
    rating: 5.0,
    reviewsCount: 29,
    image: "/images/acrylic_letters.png",
    description: "Conjunto organizador em acrílico para clínicas de estética, salões de beleza e maquiadores.",
    features: ["Acrílico cristal e espelhado", "Organizador funcional", "Acabamento de luxo"]
  },
  {
    id: "prod-slick-cake-30x30",
    title: "Slick cake 30x30x10",
    category: "Acrílicos & Fachadas",
    price: 95.00,
    rating: 4.9,
    reviewsCount: 44,
    image: "/images/acrylic_letters.png",
    description: "Forma de acrílico cristal atóxico para bolo Slick Cake nas dimensões 30x30x10cm.",
    features: ["Dimensões: 30x30x10cm", "Acrílico atóxico transparente", "Facilita a montagem perfeita do bolo"]
  },
  {
    id: "prod-slick-cake-30x20",
    title: "Slick cake 30x20x10",
    category: "Acrílicos & Fachadas",
    price: 85.00,
    rating: 4.9,
    reviewsCount: 38,
    image: "/images/acrylic_letters.png",
    description: "Forma de acrílico para bolo Slick Cake com dimensões 30x20x10cm.",
    features: ["Dimensões: 30x20x10cm", "Acrílico cast reforçado", "Super fácil de higienizar"]
  },
  {
    id: "prod-slick-cake-30x10",
    title: "Slick cake 30x10x10",
    category: "Acrílicos & Fachadas",
    price: 75.00,
    rating: 5.0,
    reviewsCount: 51,
    image: "/images/acrylic_letters.png",
    badge: "Com Espátula",
    badgeColor: "bg-blue-600",
    description: "Forma de acrílico para bolo Slick Cake 30x10x10cm + tampa + espátula profissional inclusa.",
    features: ["Dimensões: 30x10x10cm", "Acompanha tampa e espátula", "Acrílico cristal de alta qualidade"]
  },

  // BRINDES E PERSONALIZADOS
  {
    id: "prod-porta-medalha-70",
    title: "Porta medalha 70 unidades",
    category: "Brindes & Personalizados",
    price: 89.90,
    rating: 5.0,
    reviewsCount: 47,
    image: "/images/mdf_decor.png",
    badge: "Atletas",
    badgeColor: "bg-[#E53935]",
    description: "Suporte porta-medalhas recortado a laser com capacidade para organizar até 70 medalhas.",
    features: ["Capacidade para até 70 medalhas", "Estrutura reforçada cortada a laser", "Design temático para esportes"]
  },
  {
    id: "prod-cadeira-cabeleireiro-pix",
    title: "Cadeira de cabeleireiro para pix",
    category: "Brindes & Personalizados",
    price: 150.00,
    rating: 5.0,
    reviewsCount: 62,
    image: "/images/acrylic_letters.png",
    badge: "Exclusividade",
    badgeColor: "bg-amber-600",
    description: "Miniatura decorativa de cadeira de cabeleireiro em acrílico/MDF personalizada com sua logo, chave Pix e telefone.",
    features: ["Miniatura temática 3D", "Personalizada com QR Code Pix", "Ideal para balcões de barbearias e salões"]
  },
  {
    id: "prod-chaveiros-acrilico",
    title: "Chaveiros em acrílico",
    category: "Brindes & Personalizados",
    price: 3.00,
    priceUnit: "a partir de",
    rating: 4.9,
    reviewsCount: 180,
    image: "/images/corporate_laser_engraving.png",
    description: "Chaveiros em acrílico personalizados gravados a laser. R$ 3,00 a unidade para pedidos acima de 20 peças.",
    features: ["R$ 3,00 a unidade acima de 20 peças", "Corte no formato desejado", "Gravação em acrílico cristal ou espelhado"]
  },
  {
    id: "prod-chaveiros-espelhos",
    title: "Chaveiros com espelhos",
    category: "Brindes & Personalizados",
    price: 5.00,
    priceUnit: "a partir de",
    rating: 5.0,
    reviewsCount: 124,
    image: "/images/corporate_laser_engraving.png",
    description: "Chaveiro com espelho acoplado na parte traseira. R$ 5,00 cada para pedidos acima de 20 unidades.",
    features: ["Chaveiro + Espelho acoplado", "A partir de R$ 5,00 acima de 20 un.", "Lembrança útil e elegante"]
  },
  {
    id: "prod-canetas",
    title: "Canetas gravadas a laser",
    category: "Brindes & Personalizados",
    price: 3.00,
    priceUnit: "a partir de",
    rating: 4.9,
    reviewsCount: 145,
    image: "/images/laser_engraving.png",
    description: "Canetas metálicas com gravação indelével a laser do nome ou empresa (a partir de 50 unidades por R$ 3,00/un).",
    features: ["Gravação a laser em metal", "R$ 3,00/un para mais de 50 peças", "Brinde corporativo de alto impacto"]
  },
  {
    id: "prod-clips-personalizado",
    title: "Clips personalizado",
    category: "Brindes & Personalizados",
    price: 1.00,
    priceUnit: "a partir de",
    rating: 4.8,
    reviewsCount: 89,
    image: "/images/corporate_laser_engraving.png",
    description: "Clips acrílicos recortados a laser no formato da sua logo. R$ 1,00/unidade para compras acima de 50 peças.",
    features: ["R$ 1,00/unidade acima de 50 peças", "Papelaria personalizada", "Recorte com a sua logomarca"]
  },
  {
    id: "prod-banner",
    title: "Banner publicitário",
    category: "Brindes & Personalizados",
    price: 49.90,
    rating: 4.8,
    reviewsCount: 35,
    image: "/images/hero_laser.png",
    description: "Banner impresso em lona de alta resolução com acabamento em madeira e cordão pronto para pendurar.",
    features: ["Lona de alta durabilidade", "Acabamento completo com bastão e cordão", "Impressão em cores vivas"]
  }
];

const CATEGORIES = ["Todos", "Copos & Garrafas", "LEDs & Neon", "Acrílicos & Fachadas", "Brindes & Personalizados"];

import { useCart } from "@/context/CartContext";

export default function ProductsEcommerceSection() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [addedItemIds, setAddedItemIds] = useState<{ [key: string]: boolean }>({});

  const handleAddToCartWithFeedback = (product: Product, qty: number) => {
    addToCart(product, qty);
    setAddedItemIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const whatsappNumber = "551120195711";

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesCategory = selectedCategory === "Todos" || p.category === selectedCategory;
    const matchesSearch = searchQuery === "" || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const handleOrderWhatsApp = (product: Product) => {
    const qty = quantities[product.id] || 1;
    const unitPrice = product.priceUnit ? `${product.priceUnit} R$ ${product.price.toFixed(2).replace('.', ',')}` : `R$ ${product.price.toFixed(2).replace('.', ',')}`;
    const totalPrice = (product.price * qty).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    let msg = `Olá, equipe *Play Arte Laser*! Gostaria de fazer um pedido do catálogo oficial:\n\n`;
    msg += `🛍️ *PRODUTO:* ${product.title}\n`;
    msg += `🏷️ *Categoria:* ${product.category}\n`;
    msg += `📦 *Quantidade:* ${qty} unidade(s)\n`;
    msg += `💰 *Valor Unitário:* ${unitPrice}\n`;
    msg += `💵 *Valor Total Estimado:* ${totalPrice}\n\n`;
    msg += `Gostaria de enviar minha arte / dados para personalização!`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="produtos" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#E53935_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-100 text-[#E53935] text-xs font-bold uppercase tracking-wider">
            <ShoppingBag className="w-4 h-4" /> Catálogo Oficial & Tabela de Preços
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-poppins">
            Catálogo Completo <span className="text-[#E53935]">Play Arte Laser</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Valores reais e atualizados. Escolha seus produtos e envie o pedido diretamente para nosso WhatsApp.
          </p>
        </div>

        {/* Controls Bar: Search & Categories */}
        <div className="space-y-6 mb-12">
          {/* Search Input */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar produtos (ex: garrafa, copão, neon, placa pix, slick cake)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-full text-slate-900 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#E53935] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Categories Filter Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? "bg-[#E53935] text-white shadow-lg shadow-red-600/25 scale-105"
                    : "bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200"
                }`}
              >
                {cat === "Todos" && <Filter className="w-3.5 h-3.5" />}
                {cat}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center text-xs font-medium text-slate-500">
            Exibindo <span className="font-bold text-slate-900">{filteredProducts.length}</span> produtos no catálogo
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const qty = quantities[product.id] || 1;
              const unitPriceFormatted = (product.price).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });
              const totalPriceFormatted = (product.price * qty).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Area */}
                    <div className="relative h-56 overflow-hidden bg-slate-900 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />

                      {/* Badge Tag */}
                      {product.badge && (
                        <span
                          className={`absolute top-4 left-4 ${
                            product.badgeColor || "bg-[#E53935]"
                          } text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md`}
                        >
                          {product.badge}
                        </span>
                      )}

                      {/* Quick Detail View Button */}
                      <button
                        onClick={() => setActiveModalProduct(product)}
                        className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-slate-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Eye className="w-3.5 h-3.5" /> Detalhes
                      </button>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                        <span>{product.category}</span>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="font-bold text-slate-800">{product.rating.toFixed(1)}</span>
                          <span>({product.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#E53935] transition-colors leading-snug">
                        {product.title}
                      </h3>

                      <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Features Bullets */}
                      <ul className="space-y-1.5 pt-1">
                        {product.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing & Footer Actions */}
                  <div className="p-6 pt-0 space-y-4">
                    <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                      <div>
                        {product.priceUnit && (
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">
                            {product.priceUnit}
                          </span>
                        )}
                        <div className="text-2xl font-black text-slate-900 tracking-tight">
                          {unitPriceFormatted}
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-full bg-slate-50 p-1">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="w-7 h-7 rounded-full bg-white hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold transition-colors shadow-sm"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-slate-900">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="w-7 h-7 rounded-full bg-white hover:bg-slate-200 flex items-center justify-center text-slate-700 font-bold transition-colors shadow-sm"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Action Button: Add to Cart */}
                    <button
                      onClick={() => handleAddToCartWithFeedback(product, qty)}
                      className={`w-full font-bold py-3 px-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm ${
                        addedItemIds[product.id]
                          ? "bg-emerald-600 text-white scale-105"
                          : "bg-[#E53935] hover:bg-red-700 text-white shadow-red-600/25 hover:shadow-xl"
                      }`}
                    >
                      {addedItemIds[product.id] ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Adicionado ao Carrinho! ✓</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Adicionar ao Carrinho ({totalPriceFormatted})</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
            <p className="text-slate-500 font-medium text-base">Nenhum produto encontrado para &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("Todos"); }}
              className="text-[#E53935] font-bold text-sm hover:underline"
            >
              Limpar busca e categorias
            </button>
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-slate-200"
            >
              <button
                onClick={() => setActiveModalProduct(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="h-64 sm:h-full bg-slate-900 relative">
                  <img
                    src={activeModalProduct.image}
                    alt={activeModalProduct.title}
                    className="w-full h-full object-cover"
                  />
                  {activeModalProduct.badge && (
                    <span className="absolute top-4 left-4 bg-[#E53935] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {activeModalProduct.badge}
                    </span>
                  )}
                </div>

                <div className="p-6 sm:p-8 space-y-5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-[#E53935] uppercase tracking-wider">
                      {activeModalProduct.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {activeModalProduct.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {activeModalProduct.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Especificações & Detalhes:</h4>
                      <ul className="space-y-1.5">
                        {activeModalProduct.features.map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">Valor unitário</span>
                      <span className="text-2xl font-black text-slate-900">
                        {activeModalProduct.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(activeModalProduct, 1);
                        setActiveModalProduct(null);
                      }}
                      className="w-full bg-[#E53935] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Adicionar ao Carrinho</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
