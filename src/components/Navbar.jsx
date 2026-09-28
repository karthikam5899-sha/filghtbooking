import { Plane, Menu, X, UserRound } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ page, onNavigate }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-[#ded8cc] bg-[#f6f3ee]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <button onClick={() => onNavigate("home")} className="flex items-center gap-3">
          <div className="rounded-xl bg-[#27352f] p-2 text-[#d4b477]"><Plane size={20} /></div>
          <span className="font-serif text-xl font-semibold tracking-tight text-[#27352f]">Aurelia <span className="text-[#a2783a]">Air</span></span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {[['flights', 'Flights'], ['offers', 'Offers'], ['support', 'Support']].map(([key, label]) => <button type="button" key={key} onClick={() => onNavigate(key)} className={`text-sm font-semibold transition ${page === key ? "text-[#a2783a]" : "text-[#6f756d] hover:text-[#27352f]"}`}>{label}</button>)}
          <button type="button" onClick={() => onNavigate("profile")} className="flex items-center gap-2 rounded-full bg-[#27352f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a2783a]"><UserRound size={15} /> Profile</button>
        </div>

        <button className="text-[#27352f] md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="border-t border-[#ded8cc] bg-[#f6f3ee] px-5 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {[["flights", "Flights"], ["offers", "Offers"], ["support", "Support"], ["profile", "Profile"]].map(([key, label]) => <button type="button" key={key} onClick={() => { onNavigate(key); setOpen(false); }} className="text-left font-semibold text-[#27352f]">{label}</button>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}