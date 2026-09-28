import { motion } from "framer-motion";
import { PlaneTakeoff, ArrowRight } from "lucide-react";

export default function FlightCard({ flight, onDetails, onSelect }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, boxShadow: "0 25px 50px rgba(15,23,42,.10)" }}
      transition={{ layout: { duration: 0.3 }, y: { duration: 0.2 } }}
      className="rounded-2xl bg-white p-5 shadow-sm transition-colors hover:ring-1 hover:ring-blue-100">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ rotate: -6, scale: 1.08 }} className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">{flight.logo}</motion.div>
          <div><h3 className="font-bold">{flight.airline}</h3><p className="text-xs text-slate-500">{flight.flightNumber}</p></div>
        </div>
        <div className="rounded-lg bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">★ {flight.rating}</div>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div><p className="text-2xl font-bold">{flight.departure}</p><p className="font-semibold text-slate-600">{flight.from}</p><p className="text-xs text-slate-400">{flight.fromCity}</p></div>
        <div className="min-w-[100px] text-center">
          <p className="mb-2 text-xs text-slate-400">{flight.duration}</p>
          <div className="flex items-center gap-2"><div className="h-px flex-1 bg-slate-300" /><PlaneTakeoff size={16} className="text-blue-600" /><div className="h-px flex-1 bg-slate-300" /></div>
          <p className="mt-2 text-xs font-medium text-emerald-600">{flight.stops}</p>
        </div>
        <div className="text-right"><p className="text-2xl font-bold">{flight.arrival}</p><p className="font-semibold text-slate-600">{flight.to}</p><p className="text-xs text-slate-400">{flight.toCity}</p></div>
      </div>

      <div className="my-5 border-t border-dashed border-slate-200" />

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div><p className="text-xs text-slate-400">Starting from</p><p className="text-2xl font-black text-slate-900">₹{flight.price.toLocaleString("en-IN")}</p></div>
        <div className="flex gap-2">
          <button onClick={() => onDetails(flight)} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold transition hover:border-blue-500 hover:text-blue-600">Details</button>
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => onSelect(flight)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-blue-700">
            Select <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}