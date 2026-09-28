import { AnimatePresence, motion } from "framer-motion";
import { CreditCard, Smartphone, Wallet } from "lucide-react";
import { useState } from "react";

export default function Payment({ onComplete, price = 6499 }) {
  const [method, setMethod] = useState("card");
  const [flipped, setFlipped] = useState(false);
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const update = (key, value) => setCard({ ...card, [key]: value });

  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-2 text-2xl font-black">Payment method</h2>
          <p className="mb-6 text-sm text-slate-500">Your payment information is securely handled.</p>

          <div className="mb-5 grid grid-cols-3 gap-3" role="tablist" aria-label="Payment methods">
            <PaymentMethod active={method === "card"} icon={<CreditCard />} title="Card" onClick={() => setMethod("card")} />
            <PaymentMethod active={method === "upi"} icon={<Smartphone />} title="UPI" onClick={() => setMethod("upi")} />
            <PaymentMethod active={method === "wallet"} icon={<Wallet />} title="Wallet" onClick={() => setMethod("wallet")} />
          </div>

          <AnimatePresence mode="wait">
          {method === "card" && (
            <motion.div key="card" role="tabpanel" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 18 }} transition={{ duration: 0.25 }} className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
              <input placeholder="Card number" value={card.number} onChange={(e) => update("number", e.target.value)} onFocus={() => setFlipped(false)} className="w-full rounded-xl border p-3 outline-none focus:border-blue-500" />
              <input placeholder="Name on card" value={card.name} onChange={(e) => update("name", e.target.value)} onFocus={() => setFlipped(false)} className="w-full rounded-xl border p-3 outline-none focus:border-blue-500" />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="MM/YY" value={card.expiry} onChange={(e) => update("expiry", e.target.value)} onFocus={() => setFlipped(false)} className="rounded-xl border p-3 outline-none" />
                <input placeholder="CVV" value={card.cvv} onChange={(e) => update("cvv", e.target.value)} onFocus={() => setFlipped(true)} className="rounded-xl border p-3 outline-none" />
              </div>
              <button onClick={onComplete} className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700">Pay ₹{price.toLocaleString("en-IN")}</button>
            </motion.div>
          )}

          {method === "upi" && (
            <motion.div key="upi" role="tabpanel" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 18 }} transition={{ duration: 0.25 }} className="rounded-3xl bg-white p-6 shadow-sm">
              <input placeholder="example@upi" className="mb-4 w-full rounded-xl border p-3 outline-none" />
              <button onClick={onComplete} className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white">Pay ₹{price.toLocaleString("en-IN")}</button>
            </motion.div>
          )}

          {method === "wallet" && (
            <motion.div key="wallet" role="tabpanel" initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 18 }} transition={{ duration: 0.25 }} className="rounded-3xl bg-white p-6 shadow-sm">
              <select className="mb-4 w-full rounded-xl border p-3"><option>Paytm</option><option>PhonePe</option><option>Google Pay</option></select>
              <button onClick={onComplete} className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white">Continue to payment</button>
            </motion.div>
          )}
          </AnimatePresence>
        </div>

        <div className="card-perspective">
          <motion.div animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: 0.6 }} className="relative h-60 w-full" style={{ transformStyle: "preserve-3d" }}>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-700 to-violet-700 p-6 text-white [backface-visibility:hidden]">
              <div className="flex justify-between"><span className="font-serif font-bold">Aurelia Air</span><CreditCard /></div>
              <p className="mt-12 text-xl tracking-[0.2em]">{card.number || "•••• •••• •••• ••••"}</p>
              <div className="mt-8 flex justify-between">
                <span><small className="block text-xs opacity-70">CARD HOLDER</small>{card.name || "YOUR NAME"}</span>
                <span><small className="block text-xs opacity-70">EXPIRES</small>{card.expiry || "MM/YY"}</span>
              </div>
            </div>
            <div className="absolute inset-0 rounded-3xl bg-slate-800 p-6 text-white [backface-visibility:hidden]" style={{ transform: "rotateY(180deg)" }}>
              <div className="mt-5 h-12 bg-black" /><div className="mt-6 text-right"><span className="rounded bg-white px-5 py-2 text-black">{card.cvv || "•••"}</span></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function PaymentMethod({ active, icon, title, onClick }) {
  return <motion.button type="button" role="tab" aria-selected={active} whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }} onClick={onClick}
    className={`relative rounded-2xl border p-4 transition ${active ? "border-blue-600 bg-blue-50 text-blue-600 shadow-md shadow-blue-600/10" : "border-slate-200 bg-white hover:border-blue-300"}`}>
    {active && <motion.span layoutId="payment-method-indicator" className="absolute inset-0 rounded-2xl ring-2 ring-blue-500/20" transition={{ type: "spring", stiffness: 400, damping: 25 }} />}
    <motion.div animate={{ scale: active ? 1.1 : 1, rotate: active ? [0, -5, 0] : 0 }} transition={{ duration: 0.3 }} className="relative mb-2 flex justify-center">{icon}</motion.div><p className="relative text-sm font-bold">{title}</p>
  </motion.button>;
}