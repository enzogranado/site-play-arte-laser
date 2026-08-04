"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, Trash2, MessageCircle, CreditCard, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { createOrder, OrderItem } from "@/lib/ordersStore";

export default function CartDrawer() {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isCartOpen, setIsCartOpen } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  const [checkoutMode, setCheckoutMode] = useState<"cart" | "checkout">("cart");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappNumber = "551120195711";

  const handleWhatsAppCheckout = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Por favor, preencha seu Nome e Telefone para concluir o pedido.");
      return;
    }

    setIsSubmitting(true);

    const orderItems: OrderItem[] = items.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      quantity: item.quantity,
      unitPrice: item.price,
      totalPrice: item.price * item.quantity,
      image: item.image,
    }));

    // Register order in administrative store
    const newOrder = createOrder(
      {
        name: customerName,
        phone: customerPhone,
        address: customerAddress,
        notes: customerNotes,
      },
      orderItems,
      "WhatsApp / A combinar",
      false
    );

    // Format WhatsApp message
    let msg = `Olá, equipe *Play Arte Laser*! Acabei de fazer o pedido *${newOrder.id}* pelo site:\n\n`;
    msg += `👤 *Cliente:* ${customerName}\n`;
    msg += `📱 *Telefone:* ${customerPhone}\n`;
    if (customerAddress) msg += `📍 *Endereço/Entrega:* ${customerAddress}\n`;
    if (customerNotes) msg += `📝 *Observações/Personalização:* ${customerNotes}\n`;
    msg += `\n📦 *ITENS DO PEDIDO:*\n`;

    items.forEach((item, idx) => {
      const priceFormatted = (item.price * item.quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
      msg += `${idx + 1}. ${item.quantity}x *${item.title}* (${priceFormatted})\n`;
    });

    const totalFormatted = totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    msg += `\n💰 *VALOR TOTAL DO PEDIDO:* ${totalFormatted}\n\n`;
    msg += `Aguardando confirmação para envio de dados e início da produção!`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;

    clearCart();
    setIsSubmitting(false);
    setIsCartOpen(false);
    setCheckoutMode("cart");

    window.open(url, "_blank");
  };

  const handleStripeCheckout = async () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Por favor, preencha seu Nome e Telefone antes de ir para o pagamento.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems: OrderItem[] = items.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        quantity: item.quantity,
        unitPrice: item.price,
        totalPrice: item.price * item.quantity,
        image: item.image,
      }));

      const newOrder = createOrder(
        {
          name: customerName,
          phone: customerPhone,
          address: customerAddress,
          notes: customerNotes,
        },
        orderItems,
        "Pix (Stripe)",
        false
      );

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: newOrder.id,
          items: orderItems,
          customer: { name: customerName, phone: customerPhone },
        }),
      });

      const data = await res.json();

      if (data.url) {
        clearCart();
        setIsCartOpen(false);
        setCheckoutMode("cart");
        window.location.href = data.url;
      } else {
        alert("Modo de teste: O pedido " + newOrder.id + " foi registrado no Painel de Vendas!");
        clearCart();
        setIsCartOpen(false);
        setCheckoutMode("cart");
      }
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao conectar ao checkout.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          {/* Overlay click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0"
          />

          {/* Centered Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200 z-10 max-h-[85vh] flex flex-col my-auto"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E53935] flex items-center justify-center font-bold text-white shadow-lg">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Seu Carrinho de Compras</h2>
                  <p className="text-xs text-slate-300">
                    {totalItems} {totalItems === 1 ? "item selecionado" : "itens selecionados"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-20 h-20 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">Seu carrinho está vazio</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Explore nosso catálogo e adicione copos, luminárias, acrílicos ou letreiros ao seu pedido.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E53935] text-white text-xs font-bold shadow-md hover:bg-red-700 transition-colors"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : checkoutMode === "cart" ? (
                /* Cart Items List */
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <span>Produtos no Carrinho</span>
                    <button onClick={clearCart} className="text-red-500 hover:underline">
                      Limpar tudo
                    </button>
                  </div>

                  <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 rounded-xl object-cover bg-slate-900 border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{item.title}</h4>
                          <span className="text-[10px] text-slate-500 block">{item.category}</span>
                          <div className="text-sm font-extrabold text-[#E53935] mt-1">
                            {(item.price * item.quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                          </div>
                        </div>

                        {/* Stepper & Remove */}
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                            title="Remover item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="flex items-center border border-slate-200 rounded-full bg-white px-1.5 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-5 h-5 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-5 h-5 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-700 font-bold"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Customer Info Form */
                <div className="space-y-4">
                  <button
                    onClick={() => setCheckoutMode("cart")}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Voltar para os itens do carrinho
                  </button>

                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">Identificação para o Pedido</h3>
                    <p className="text-xs text-slate-500">
                      Informe seus dados para podermos preparar seu orçamento/pedido com precisão.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Nome Completo *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: João da Silva"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#E53935] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">WhatsApp / Telefone *</label>
                      <input
                        type="tel"
                        required
                        placeholder="Ex: (11) 98765-4321"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#E53935] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Endereço de Entrega (Opcional)</label>
                      <input
                        type="text"
                        placeholder="Rua, número, bairro, cidade - SP"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#E53935] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Observações / Detalhes da Arte</label>
                      <textarea
                        rows={2}
                        placeholder="Digite o nome, frase ou logotipo que deseja gravar..."
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#E53935] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {items.length > 0 && (
              <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-sm font-extrabold text-slate-900">
                  <span>Total Estimado ({totalItems} itens):</span>
                  <span className="text-xl text-[#E53935]">
                    {totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                </div>

                {checkoutMode === "cart" ? (
                  <button
                    onClick={() => setCheckoutMode("checkout")}
                    className="w-full bg-[#E53935] hover:bg-red-700 text-white font-bold py-3 px-4 rounded-2xl shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <span>Avançar para Identificação</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      disabled={isSubmitting}
                      onClick={handleWhatsAppCheckout}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-xs"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      <span>Enviar Pedido no WhatsApp & Registrar</span>
                    </button>

                    <button
                      disabled={isSubmitting}
                      onClick={handleStripeCheckout}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 text-xs"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Pagar Online (Pix / Cartão Stripe)</span>
                    </button>
                  </div>
                )}

                {/* Continue Shopping Button */}
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-300 hover:bg-slate-100 rounded-2xl transition-colors shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>Continuar Comprando</span>
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Seus dados estão seguros e salvos no sistema.</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
