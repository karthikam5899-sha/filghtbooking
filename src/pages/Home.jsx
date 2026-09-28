import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Clock3, BadgePercent, Headphones, Plane } from "lucide-react";
import FlightSearch from "../components/FlightSearch";

export default function Home({ onSearch, onNavigate }) {
  return (
    <div>
      <section className="relative min-h-[620px] overflow-hidden bg-[#27352f] text-white">
        <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2200&q=85" alt="Aurelia Air aircraft wing above the clouds" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#17241f]/95 via-[#27352f]/70 to-transparent" />
        <motion.div initial={{ x: "-15vw", y: 30, opacity: 0 }} animate={{ x: "105vw", y: -120, opacity: [0, 0.9, 0.9, 0] }} transition={{ duration: 12, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }} className="absolute left-0 top-28 z-10 text-[#e7c98e]/80"><Plane size={34} /></motion.div>
        <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-end px-5 pb-44 pt-28">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <span className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.26em] text-[#e7c98e]"><span className="h-px w-8 bg-[#d4b477]" /> A considered way to travel</span>
            <h1 className="font-serif text-6xl font-semibold leading-[.95] md:text-8xl">Go further.<span className="block text-[#e7c98e]">Feel more.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/70">Aurelia Air brings calm, thoughtful service and the world closer together.</p>
            <button type="button" onClick={() => onNavigate("offers")} className="mt-8 flex items-center gap-2 rounded-full bg-[#d4b477] px-6 py-3 text-sm font-bold text-[#27352f] transition hover:bg-white">Explore our offers <ArrowRight size={16} /></button>
          </motion.div>
        </div>
      </section>

      <FlightSearch onSearch={onSearch} />

      <section className="mx-auto max-w-7xl px-5 py-24">
        <div className="mb-10"><p className="font-bold uppercase tracking-[0.2em] text-[#a2783a]">The Aurelia difference</p><h2 className="mt-3 max-w-xl font-serif text-4xl text-[#27352f] md:text-5xl">Details that make the distance feel shorter.</h2></div>
        <div className="grid gap-5 md:grid-cols-4">
          <Feature icon={<ShieldCheck />} title="Secure Booking" text="Your booking information is handled securely." />
          <Feature icon={<BadgePercent />} title="Great Prices" text="Compare multiple flights and fare options." />
          <Feature icon={<Clock3 />} title="Fast Experience" text="Search and book your flight in minutes." />
          <Feature icon={<Headphones />} title="24/7 Support" text="Get assistance throughout your journey." />
        </div>
      </section>

      <section className="bg-[#e7dfd1] py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex items-end justify-between gap-5"><div><p className="font-bold uppercase tracking-[0.2em] text-[#a2783a]">Inspiration</p><h2 className="mt-2 font-serif text-4xl text-[#27352f]">Where will you go next?</h2></div><button type="button" onClick={() => onNavigate("offers")} className="hidden items-center gap-2 text-sm font-bold text-[#27352f] transition hover:text-[#a2783a] sm:flex">View all offers <ArrowRight size={16} /></button></div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[{ name: "Amalfi Coast", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1000&q=85" }, { name: "Kyoto", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=85" }, { name: "Santorini", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=85" }].map((destination) => (
              <motion.button type="button" key={destination.name} onClick={() => onNavigate("offers")} whileHover={{ y: -6 }} className="group relative h-64 overflow-hidden rounded-[2rem] text-left text-white shadow-lg">
                <img src={destination.image} alt={destination.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#17241f]/80 to-transparent" /><div className="absolute bottom-6 left-6"><p className="text-sm text-[#e7c98e]">Discover</p><h3 className="mt-1 font-serif text-3xl">{destination.name}</h3></div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
function Feature({ icon, title, text }) {
  return <motion.div whileHover={{ y: -5 }} className="rounded-2xl bg-white p-6 shadow-sm">
    <div className="mb-4 inline-flex rounded-xl bg-blue-50 p-3 text-blue-600">{icon}</div>
    <h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
  </motion.div>;
}