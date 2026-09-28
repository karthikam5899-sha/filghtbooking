import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, Headphones, MapPin, Plane, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { useState } from "react";
import { flights } from "../data/flights";

const destinations = [
  { city: "Amalfi Coast", country: "Italy", price: "₹42,900", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=85" },
  { city: "Kyoto", country: "Japan", price: "₹58,400", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85" },
  { city: "Santorini", country: "Greece", price: "₹36,700", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85" },
];

export default function Explore({ view, onHome, onSelectFlight, onSignOut }) {
  if (view === "flights") return <FlightsView onHome={onHome} onSelectFlight={onSelectFlight} />;
  if (view === "offers") return <OffersView onHome={onHome} onSelectFlight={onSelectFlight} />;
  if (view === "support") return <SupportView onHome={onHome} />;
  return <ProfileView onHome={onHome} onSignOut={onSignOut} />;
}

function PageFrame({ eyebrow, title, description, children, onHome }) {
  return <main className="min-h-[calc(100vh-76px)] bg-[#f6f3ee] px-5 py-14 md:py-20">
    <div className="mx-auto max-w-7xl">
      <button type="button" onClick={onHome} className="mb-10 text-sm font-semibold text-[#a2783a] transition hover:text-[#27352f]">AURELIA AIR / Home</button>
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#a2783a]">{eyebrow}</p>
        <h1 className="font-serif text-5xl font-semibold leading-[1.05] text-[#27352f] md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6f756d]">{description}</p>
      </motion.div>
      {children}
    </div>
  </main>;
}

function FlightsView({ onHome, onSelectFlight }) {
  return <PageFrame eyebrow="The Aurelia schedule" title="Flights, chosen with intention." description="Compare our curated network of reliable routes, considered connections, and quietly excellent service." onHome={onHome}>
    <div className="mt-12 grid gap-5 lg:grid-cols-2">
      {flights.map((flight, index) => <motion.article key={flight.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} whileHover={{ y: -5 }} className="overflow-hidden rounded-[2rem] border border-[#e3ddd2] bg-white shadow-[0_20px_60px_rgba(39,53,47,.07)]">
        <div className="flex items-center justify-between border-b border-[#eee9e0] bg-[#27352f] p-6 text-white"><div><p className="text-sm text-[#d4b477]">{flight.airline}</p><h2 className="mt-1 text-xl font-bold">{flight.flightNumber}</h2></div><span className="rounded-full bg-white/10 px-3 py-1 text-xs">{flight.stops}</span></div>
        <div className="p-6"><div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4"><div><p className="text-3xl font-semibold text-[#27352f]">{flight.departure}</p><p className="font-bold">{flight.from}</p><p className="text-sm text-[#8b9088]">{flight.fromCity}</p></div><div className="text-center text-xs text-[#8b9088]"><Plane className="mx-auto mb-2 text-[#a2783a]" size={18} /><span>{flight.duration}</span></div><div className="text-right"><p className="text-3xl font-semibold text-[#27352f]">{flight.arrival}</p><p className="font-bold">{flight.to}</p><p className="text-sm text-[#8b9088]">{flight.toCity}</p></div></div><div className="mt-7 flex items-center justify-between border-t border-dashed border-[#ded8cc] pt-5"><div><p className="text-xs text-[#8b9088]">From</p><p className="text-xl font-bold text-[#27352f]">₹{flight.price.toLocaleString("en-IN")}</p></div><button type="button" onClick={() => onSelectFlight(flight)} className="flex items-center gap-2 rounded-full bg-[#a2783a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8b632d]">Book this flight <ArrowRight size={16} /></button></div></div>
      </motion.article>)}
    </div>
  </PageFrame>;
}

function OffersView({ onHome, onSelectFlight }) {
  return <PageFrame eyebrow="Aurelia privileges" title="The long way around, made beautiful." description="Seasonal fares and considered extras for journeys that deserve more than a transaction." onHome={onHome}>
    <div className="mt-12 grid gap-6 md:grid-cols-3">{destinations.map((destination, index) => <motion.article key={destination.city} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -7 }} className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(39,53,47,.08)]"><div className="relative h-72 overflow-hidden"><img src={destination.image} alt={`${destination.city}, ${destination.country}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#17241f]/70 to-transparent" /><div className="absolute bottom-5 left-5 text-white"><p className="text-sm text-[#e7c98e]">{destination.country}</p><h2 className="font-serif text-3xl">{destination.city}</h2></div></div><div className="flex items-center justify-between p-6"><div><p className="text-xs text-[#8b9088]">Round trip from</p><p className="font-bold text-[#27352f]">{destination.price}</p></div><button type="button" onClick={() => onSelectFlight(flights[index])} className="rounded-full border border-[#d4b477] p-3 text-[#a2783a] transition hover:bg-[#a2783a] hover:text-white" aria-label={`Book offer to ${destination.city}`}><ArrowRight size={18} /></button></div></motion.article>)}</div>
    <div className="mt-10 rounded-[2rem] bg-[#e7dfd1] p-8 md:flex md:items-center md:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a2783a]">Aurelia first</p><h2 className="mt-2 font-serif text-3xl text-[#27352f]">Complimentary lounge access on select routes.</h2></div><button type="button" onClick={onHome} className="mt-6 flex items-center gap-2 rounded-full bg-[#27352f] px-5 py-3 text-sm font-bold text-white md:mt-0">Plan a journey <ArrowRight size={16} /></button></div>
  </PageFrame>;
}

function SupportView({ onHome }) {
  const [open, setOpen] = useState(0);
  const questions = [["Can I change my travel date?", "Yes. Open your booking from your profile and choose Manage trip. Fare differences are shown before you confirm."], ["What is included in my fare?", "Every Aurelia fare includes cabin baggage, complimentary refreshments, and access to our digital travel desk."], ["How early should I arrive?", "We recommend arriving two hours before a domestic departure and three hours before an international departure."]];
  return <PageFrame eyebrow="Here when you need us" title="A calmer way to get help." description="Our travel desk is available around the clock for changes, questions, and the details between take-off and landing." onHome={onHome}><div className="mt-12 grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><div className="rounded-[2rem] bg-[#27352f] p-8 text-white"><Headphones size={28} className="text-[#d4b477]" /><h2 className="mt-8 font-serif text-4xl">Your journey has a human touch.</h2><p className="mt-4 leading-7 text-white/65">Reach the Aurelia travel desk any time. A real person will help you find the clearest next step.</p><button type="button" onClick={() => window.alert("The Aurelia travel desk is available at +91 1800 123 456.")} className="mt-8 rounded-full bg-[#d4b477] px-5 py-3 text-sm font-bold text-[#27352f] transition hover:bg-white">Call travel desk</button></div><div className="rounded-[2rem] border border-[#e3ddd2] bg-white p-6 md:p-8">{questions.map(([question, answer], index) => <div key={question} className="border-b border-[#eee9e0] last:border-0"><button type="button" onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between py-5 text-left font-bold text-[#27352f]"><span>{question}</span><motion.span animate={{ rotate: open === index ? 180 : 0 }}><ChevronDown size={18} /></motion.span></button><AnimatePresence>{open === index && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-5 text-sm leading-7 text-[#6f756d]">{answer}</motion.p>}</AnimatePresence></div>)}</div></div></PageFrame>;
}

function ProfileView({ onHome, onSignOut }) {
  return <PageFrame eyebrow="Your private travel desk" title="Welcome back, Alex." description="Your preferences, upcoming journeys, and Aurelia privileges are all in one place." onHome={onHome}><div className="mt-12 grid gap-6 lg:grid-cols-[.8fr_1.2fr]"><div className="rounded-[2rem] bg-[#27352f] p-8 text-white"><div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d4b477] text-2xl font-serif text-[#27352f]">AS</div><h2 className="mt-6 font-serif text-3xl">Alex Morgan</h2><p className="mt-2 text-white/60">alex.morgan@email.com</p><div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/10 pt-6"><div><p className="text-xs text-white/50">Aurelia tier</p><p className="mt-1 font-bold text-[#e7c98e]">Silver</p></div><div><p className="text-xs text-white/50">Journeys</p><p className="mt-1 font-bold">12</p></div></div><button type="button" onClick={onSignOut} className="mt-10 flex items-center gap-2 text-sm font-bold text-[#e7c98e] transition hover:text-white"><UserRound size={16} /> Sign out</button></div><div className="space-y-5"><div className="rounded-[2rem] border border-[#e3ddd2] bg-white p-7"><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a2783a]">Next journey</p><div className="mt-5 flex items-center justify-between"><div><p className="text-3xl font-semibold text-[#27352f]">MAA <span className="text-[#a2783a]">→</span> DEL</p><p className="mt-2 text-sm text-[#8b9088]">IndiGo · 6E 512 · 14 Jun 2026</p></div><Plane className="text-[#a2783a]" /></div></div><div className="grid gap-5 sm:grid-cols-2"><ProfileStat icon={<ShieldCheck />} title="Travel documents" value="Verified" /><ProfileStat icon={<Sparkles />} title="Saved preference" value="Window seat" /></div></div></div></PageFrame>;
}

function ProfileStat({ icon, title, value }) {
  return <motion.div whileHover={{ y: -3 }} className="rounded-[1.5rem] border border-[#e3ddd2] bg-white p-5"><div className="mb-5 text-[#a2783a]">{icon}</div><p className="text-xs text-[#8b9088]">{title}</p><p className="mt-1 font-bold text-[#27352f]">{value}</p><Check size={15} className="mt-3 text-emerald-600" /></motion.div>;
}
