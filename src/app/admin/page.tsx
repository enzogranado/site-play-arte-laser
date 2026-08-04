"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  ShoppingBag,
  Clock,
  CheckCircle2,
  TrendingUp,
  Search,
  Filter,
  Download,
  Lock,
  MessageCircle,
  Eye,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  AlertCircle,
  Printer,
  Calendar,
  User,
  Phone,
  MapPin,
  FileText,
  ShieldCheck
} from "lucide-react";
import {
  Order,
  OrderStatus,
  PaymentStatus,
  getStoredOrders,
  updateOrderStatus,
  exportOrdersToCSV
} from "@/lib/ordersStore";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Todos");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<string>("Todos");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Default PIN for admin access
  const ADMIN_PIN = "1234";

  useEffect(() => {
    // Check if session admin token exists
    const auth = sessionStorage.getItem("play_arte_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    loadOrders();
  }, []);

  const loadOrders = () => {
    const data = getStoredOrders();
    setOrders(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      sessionStorage.setItem("play_arte_admin_auth", "true");
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("play_arte_admin_auth");
    setIsAuthenticated(false);
  };

  const handleStatusChange = (orderId: string, newOrderStatus: OrderStatus, newPaymentStatus?: PaymentStatus) => {
    const updated = updateOrderStatus(orderId, newOrderStatus, newPaymentStatus);
    if (updated) {
      loadOrders();
    }
  };

  const handleTogglePaymentStatus = (orderId: string, currentStatus: PaymentStatus) => {
    const nextStatus: PaymentStatus = currentStatus === "Pago" ? "Pendente" : "Pago";
    const order = orders.find(o => o.id === orderId);
    if (order) {
      updateOrderStatus(orderId, order.orderStatus, nextStatus);
      loadOrders();
    }
  };

  const sendWhatsAppUpdate = (order: Order) => {
    const phone = order.customer.phone.replace(/\D/g, "");
    let msg = `Olá, *${order.customer.name}*! Atualização do seu pedido *${order.id}* na *Play Arte Laser*:\n\n`;
    msg += `📦 *Status do Pedido:* ${order.orderStatus.toUpperCase()}\n`;
    msg += `💳 *Status do Pagamento:* ${order.paymentStatus.toUpperCase()}\n`;
    msg += `💰 *Valor Total:* R$ ${order.totalAmount.toFixed(2).replace('.', ',')}\n\n`;
    msg += `Qualquer dúvida estamos à disposição!`;

    const url = `https://wa.me/55${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  // Filtered orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.phone.includes(searchQuery) ||
      order.items.some(i => i.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = selectedStatus === "Todos" || order.orderStatus === selectedStatus;
    const matchesPayment = selectedPaymentStatus === "Todos" || order.paymentStatus === selectedPaymentStatus;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Calculate Metrics
  const totalRevenue = orders
    .filter(o => o.paymentStatus === "Pago")
    .reduce((acc, o) => acc + o.totalAmount, 0);

  const pendingRevenue = orders
    .filter(o => o.paymentStatus === "Pendente")
    .reduce((acc, o) => acc + o.totalAmount, 0);

  const paidOrdersCount = orders.filter(o => o.paymentStatus === "Pago").length;
  const pendingOrdersCount = orders.filter(o => o.paymentStatus === "Pendente").length;
  const averageTicket = orders.length > 0 ? orders.reduce((acc, o) => acc + o.totalAmount, 0) / orders.length : 0;

  // PIN Login Screen
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-[#E53935]/10 border border-[#E53935]/30 mx-auto flex items-center justify-center text-[#E53935]">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white">Painel de Gestão de Vendas</h1>
            <p className="text-slate-400 text-xs">
              Digite a senha/PIN de acesso administrativo para visualizar relatórios de vendas.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={8}
                placeholder="Digite o PIN (Padrão: 1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-bold px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-[#E53935]"
              />
              {pinError && (
                <p className="text-red-500 text-xs mt-2 font-bold flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> PIN incorreto. Tente &quot;1234&quot;.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#E53935] hover:bg-red-700 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-red-600/30 transition-all text-sm"
            >
              Acessar Painel de Vendas
            </button>
          </form>

          <p className="text-[11px] text-slate-500">
            Dica: O PIN padrão de demonstração é <span className="text-white font-bold">1234</span>.
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-6 rounded-3xl backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-red-500/10 text-[#E53935] border border-[#E53935]/30 text-[10px] uppercase font-bold px-3 py-1 rounded-full">
                Play Arte Laser Admin
              </span>
              <span className="text-slate-500 text-xs">• Atualizado em tempo real</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Gestão de Vendas & Relatórios
            </h1>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => exportOrdersToCSV(filteredOrders)}
              className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Exportar CSV
            </button>

            <button
              onClick={() => window.print()}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> Imprimir
            </button>

            <button
              onClick={handleLogout}
              className="bg-slate-800 hover:bg-red-900/40 text-red-400 text-xs font-bold px-3 py-2.5 rounded-xl transition-all"
            >
              Sair
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Faturamento Aprovado</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-emerald-400">
              {totalRevenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </div>
            <span className="text-[11px] text-slate-500 block">
              {paidOrdersCount} pedido(s) pago(s)
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>A Receber / Pendente</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-amber-400">
              {pendingRevenue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </div>
            <span className="text-[11px] text-slate-500 block">
              {pendingOrdersCount} pedido(s) a confirmar
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Total de Pedidos</span>
              <ShoppingBag className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-3xl font-black text-white">
              {orders.length}
            </div>
            <span className="text-[11px] text-slate-500 block">
              Registrados no sistema
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
              <span>Ticket Médio</span>
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-purple-400">
              {averageTicket.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </div>
            <span className="text-[11px] text-slate-500 block">
              Média por pedido
            </span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por ID, Cliente ou Produto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-2xl text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-[#E53935] outline-none"
              />
            </div>

            {/* Status Pedido Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400 whitespace-nowrap">Status Pedido:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl text-xs text-white py-2.5 px-3 focus:ring-2 focus:ring-[#E53935] outline-none"
              >
                <option value="Todos">Todos</option>
                <option value="Recebido">Recebido</option>
                <option value="Em Produção">Em Produção</option>
                <option value="Pronto / Enviado">Pronto / Enviado</option>
                <option value="Concluído">Concluído</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>

            {/* Status Pagamento Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400 whitespace-nowrap">Pagamento:</span>
              <select
                value={selectedPaymentStatus}
                onChange={(e) => setSelectedPaymentStatus(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-2xl text-xs text-white py-2.5 px-3 focus:ring-2 focus:ring-[#E53935] outline-none"
              >
                <option value="Todos">Todos</option>
                <option value="Pago">Pago</option>
                <option value="Pendente">Pendente</option>
                <option value="Reembolsado">Reembolsado</option>
              </select>
            </div>

          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Relatório de Pedidos ({filteredOrders.length})</h2>
            <button onClick={loadOrders} className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5" /> Atualizar lista
            </button>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-2">
              <p className="text-sm">Nenhum pedido localizado com os filtros selecionados.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 text-slate-400 uppercase font-bold border-b border-slate-800 text-[10px] tracking-wider">
                    <th className="py-4 px-6">ID Pedido</th>
                    <th className="py-4 px-6">Data</th>
                    <th className="py-4 px-6">Cliente</th>
                    <th className="py-4 px-6">Itens</th>
                    <th className="py-4 px-6">Valor Total</th>
                    <th className="py-4 px-6">Pagamento</th>
                    <th className="py-4 px-6">Status Pedido</th>
                    <th className="py-4 px-6 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {filteredOrders.map((order) => {
                    const isExpanded = expandedOrderId === order.id;

                    return (
                      <React.Fragment key={order.id}>
                        <tr className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-4 px-6 font-bold text-white">
                            {order.id}
                          </td>
                          <td className="py-4 px-6 text-slate-400 whitespace-nowrap">
                            {new Date(order.createdAt).toLocaleDateString("pt-BR")} <br />
                            <span className="text-[10px] text-slate-500">
                              {new Date(order.createdAt).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-bold text-slate-200">{order.customer.name}</div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3 text-slate-500" /> {order.customer.phone}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-slate-300 max-w-xs">
                            <span className="font-bold text-white">{order.items.length} produto(s)</span>
                            <p className="text-[11px] text-slate-400 truncate">
                              {order.items.map(i => `${i.quantity}x ${i.title}`).join(", ")}
                            </p>
                          </td>
                          <td className="py-4 px-6 font-black text-emerald-400 text-sm whitespace-nowrap">
                            {order.totalAmount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                          </td>
                          <td className="py-4 px-6">
                            <button
                              onClick={() => handleTogglePaymentStatus(order.id, order.paymentStatus)}
                              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-transform hover:scale-105 ${
                                order.paymentStatus === "Pago"
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              }`}
                            >
                              {order.paymentStatus === "Pago" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                              {order.paymentStatus}
                            </button>
                            <span className="text-[9px] text-slate-500 block mt-1">{order.paymentMethod}</span>
                          </td>
                          <td className="py-4 px-6">
                            <select
                              value={order.orderStatus}
                              onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                              className="bg-slate-950 border border-slate-700 text-xs rounded-xl px-2.5 py-1.5 text-slate-200 font-bold focus:ring-2 focus:ring-[#E53935] outline-none"
                            >
                              <option value="Recebido">Recebido</option>
                              <option value="Em Produção">Em Produção</option>
                              <option value="Pronto / Enviado">Pronto / Enviado</option>
                              <option value="Concluído">Concluído</option>
                              <option value="Cancelado">Cancelado</option>
                            </select>
                          </td>
                          <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                            <button
                              onClick={() => sendWhatsAppUpdate(order)}
                              title="Atualizar cliente no WhatsApp"
                              className="p-2 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 rounded-xl transition-colors"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
                            >
                              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          </td>
                        </tr>

                        {/* Expanded Item Details */}
                        {isExpanded && (
                          <tr className="bg-slate-950/60 border-b border-slate-800">
                            <td colSpan={8} className="p-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Items Detailed List */}
                                <div className="space-y-3">
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    Itens Detalhados do Pedido
                                  </h4>
                                  <div className="space-y-2">
                                    {order.items.map((item, idx) => (
                                      <div key={idx} className="flex items-center gap-3 p-3 bg-slate-900 rounded-2xl border border-slate-800">
                                        {item.image && (
                                          <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                          <div className="font-bold text-white">{item.title}</div>
                                          <span className="text-[10px] text-slate-400">{item.category} • Qtd: {item.quantity}</span>
                                        </div>
                                        <div className="font-bold text-slate-200">
                                          {item.totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Customer Notes & Delivery */}
                                <div className="space-y-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
                                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                    Informações do Cliente & Personalização
                                  </h4>
                                  <div className="space-y-2 text-xs text-slate-300">
                                    <div className="flex items-center gap-2">
                                      <User className="w-4 h-4 text-slate-500" />
                                      <span className="font-bold text-white">{order.customer.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Phone className="w-4 h-4 text-slate-500" />
                                      <span>{order.customer.phone}</span>
                                    </div>
                                    {order.customer.address && (
                                      <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                                        <span>{order.customer.address}</span>
                                      </div>
                                    )}
                                    {order.customer.notes && (
                                      <div className="pt-2 border-t border-slate-800">
                                        <span className="text-[10px] font-bold text-amber-400 uppercase block">Observação / Arte:</span>
                                        <p className="text-slate-300 italic text-xs mt-1 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                                          &quot;{order.customer.notes}&quot;
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
