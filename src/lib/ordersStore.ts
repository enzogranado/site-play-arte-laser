export type PaymentStatus = "Pendente" | "Pago" | "Reembolsado" | "Cancelado";
export type OrderStatus = "Recebido" | "Em Produção" | "Pronto / Enviado" | "Concluído" | "Cancelado";
export type PaymentMethod = "WhatsApp / A combinar" | "Pix (Stripe)" | "Cartão de Crédito (Stripe)";

export interface OrderItem {
  id: string;
  title: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image?: string;
}

export interface CustomerInfo {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  notes?: string;
}

export interface Order {
  id: string;
  customer: CustomerInfo;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "play_arte_laser_orders";

// Initial initial mock orders if empty to showcase the dashboard immediately
const MOCK_INITIAL_ORDERS: Order[] = [
  {
    id: "PAL-1001",
    customer: {
      name: "Carlos Eduardo Silva",
      phone: "11987654321",
      email: "carlos@empresa.com.br",
      address: "Av. Paulista, 1000 - São Paulo, SP",
      notes: "Logotipo da empresa enviado por email"
    },
    items: [
      {
        id: "prod-garrafa-510",
        title: "Garrafa 510 ml",
        category: "Copos & Garrafas",
        quantity: 10,
        unitPrice: 59.90,
        totalPrice: 599.00,
        image: "/images/custom_cups.png"
      },
      {
        id: "prod-placa-pix",
        title: "Placa pix para balcão",
        category: "Acrílicos & Fachadas",
        quantity: 2,
        unitPrice: 29.90,
        totalPrice: 59.80,
        image: "/images/acrylic_letters.png"
      }
    ],
    totalAmount: 658.80,
    paymentMethod: "Pix (Stripe)",
    paymentStatus: "Pago",
    orderStatus: "Em Produção",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString()
  },
  {
    id: "PAL-1002",
    customer: {
      name: "Mariana Oliveira",
      phone: "11976543210",
      email: "mariana.festas@gmail.com",
      address: "Rua Augusta, 450 - SP",
      notes: "Escrever 'Juliana 30 Anos' na luminária"
    },
    items: [
      {
        id: "prod-luminaria-personalizada",
        title: "Luminária personalizada",
        category: "LEDs & Neon",
        quantity: 1,
        unitPrice: 70.00,
        totalPrice: 70.00,
        image: "/images/led_lamp.png"
      },
      {
        id: "prod-copo-420-som",
        title: "Copo 420ml com caixa de som",
        category: "Copos & Garrafas",
        quantity: 2,
        unitPrice: 79.90,
        totalPrice: 159.80,
        image: "/images/custom_cups.png"
      }
    ],
    totalAmount: 229.80,
    paymentMethod: "WhatsApp / A combinar",
    paymentStatus: "Pendente",
    orderStatus: "Recebido",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString()
  },
  {
    id: "PAL-1003",
    customer: {
      name: "Barba & Arte Barbearia",
      phone: "11955554444",
      email: "contato@barbaearte.com",
      address: "Rua Vergueiro, 1200 - SP"
    },
    items: [
      {
        id: "prod-cadeira-cabeleireiro-pix",
        title: "Cadeira de cabeleireiro para pix",
        category: "Brindes & Personalizados",
        quantity: 1,
        unitPrice: 150.00,
        totalPrice: 150.00,
        image: "/images/acrylic_letters.png"
      }
    ],
    totalAmount: 150.00,
    paymentMethod: "Cartão de Crédito (Stripe)",
    paymentStatus: "Pago",
    orderStatus: "Concluído",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString()
  }
];

export function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return MOCK_INITIAL_ORDERS;

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_INITIAL_ORDERS));
      return MOCK_INITIAL_ORDERS;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao carregar pedidos do localStorage:", error);
    return MOCK_INITIAL_ORDERS;
  }
}

export function saveOrders(orders: Order[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error("Erro ao salvar pedidos no localStorage:", error);
  }
}

export function createOrder(
  customer: CustomerInfo,
  items: OrderItem[],
  paymentMethod: PaymentMethod,
  isPaidImmediately: boolean = false
): Order {
  const orders = getStoredOrders();
  const nextNumber = 1000 + orders.length + 1;
  const newOrder: Order = {
    id: `PAL-${nextNumber}`,
    customer,
    items,
    totalAmount: items.reduce((acc, item) => acc + item.totalPrice, 0),
    paymentMethod,
    paymentStatus: isPaidImmediately ? "Pago" : "Pendente",
    orderStatus: "Recebido",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const updated = [newOrder, ...orders];
  saveOrders(updated);
  return newOrder;
}

export function updateOrderStatus(orderId: string, orderStatus: OrderStatus, paymentStatus?: PaymentStatus): Order | null {
  const orders = getStoredOrders();
  const index = orders.findIndex(o => o.id === orderId);
  if (index === -1) return null;

  orders[index].orderStatus = orderStatus;
  if (paymentStatus) {
    orders[index].paymentStatus = paymentStatus;
  }
  orders[index].updatedAt = new Date().toISOString();

  saveOrders(orders);
  return orders[index];
}

export function exportOrdersToCSV(orders: Order[]): void {
  if (typeof window === "undefined") return;

  const headers = ["ID Pedido", "Data", "Cliente", "Telefone", "Email", "Itens", "Valor Total", "Forma Pagamento", "Status Pagamento", "Status Pedido"];
  
  const rows = orders.map(o => {
    const itemsSummary = o.items.map(i => `${i.quantity}x ${i.title}`).join(" | ");
    return [
      o.id,
      new Date(o.createdAt).toLocaleDateString("pt-BR") + " " + new Date(o.createdAt).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' }),
      `"${o.customer.name.replace(/"/g, '""')}"`,
      `"${o.customer.phone}"`,
      `"${o.customer.email || ''}"`,
      `"${itemsSummary.replace(/"/g, '""')}"`,
      `"R$ ${o.totalAmount.toFixed(2).replace('.', ',')}"`,
      `"${o.paymentMethod}"`,
      `"${o.paymentStatus}"`,
      `"${o.orderStatus}"`
    ];
  });

  const csvContent = "\uFEFF" + [headers.join(";"), ...rows.map(r => r.join(";"))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `Relatorio_Vendas_PlayArteLaser_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
