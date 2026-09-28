import { AnimatePresence, motion } from "framer-motion";
import { X, Plane, Clock, Luggage, Coffee, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function FlightDetailsModal({ flight, onClose }) {
  const [open, setOpen] = useState("flight");

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  if (!flight) return null;

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[100] flex justify-end bg-slate-950/50 backdrop-blur-sm"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
        <motion.div role="dialog" aria-modal="true" aria-labelledby="flight-details-title" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }}
          className="h-full max-h-screen w-full max-w-2xl overflow-y-auto bg-white p-6 shadow-2xl md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div><p className="text-sm text-slate-400">Flight details</p><h2 id="flight-details-title" className="text-2xl font-black">{flight.airline} · {flight.flightNumber}</h2></div>
            <button type="button" aria-label="Close flight details" onClick={onClose} className="rounded-full bg-slate-100 p-2 transition hover:bg-red-50 hover:text-red-500"><X /></button>
          </div>

          <div className="rounded-2xl bg-blue-50 p-5">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center">
              <div><p className="text-3xl font-black">{flight.departure}</p><p className="font-bold">{flight.from}</p><p className="text-sm text-slate-500">{flight.fromCity}</p></div>
              <Plane className="text-blue-600" />
              <div className="text-right"><p className="text-3xl font-black">{flight.arrival}</p><p className="font-bold">{flight.to}</p><p className="text-sm text-slate-500">{flight.toCity}</p></div>
            </div>
          </div>

          <Accordion title="Flight information" icon={<Clock size={18} />} open={open === "flight"} onClick={() => setOpen(open === "flight" ? "" : "flight")}>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <Info label="Aircraft" value={flight.aircraft} /><Info label="Duration" value={flight.duration} />
              <Info label="Stops" value={flight.stops} /><Info label="Flight" value={flight.flightNumber} />
            </div>
          </Accordion>

          <Accordion title="Baggage" icon={<Luggage size={18} />} open={open === "baggage"} onClick={() => setOpen(open === "baggage" ? "" : "baggage")}>
            <p className="text-sm text-slate-500">Cabin baggage: 7 kg<br />Check-in baggage: 15 kg</p>
          </Accordion>

          <Accordion title="On-board services" icon={<Coffee size={18} />} open={open === "services"} onClick={() => setOpen(open === "services" ? "" : "services")}>
            <p className="text-sm text-slate-500">Complimentary water and selected refreshments are available depending on fare type.</p>
          </Accordion>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Accordion({ title, icon, open, onClick, children }) {
  return (
    <div className="border-b border-slate-200">
      <button type="button" aria-expanded={open} onClick={onClick} className="flex w-full items-center justify-between py-5 text-left">
        <span className="flex items-center gap-3 font-bold">{icon}{title}</span><motion.span animate={{ rotate: open ? 180 : 0 }}><ChevronDown size={18} /></motion.span>
      </button>
      <AnimatePresence>
        {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden pb-5">{children}</motion.div>}
      </AnimatePresence>
    </div>
  );
}
function Info({ label, value }) {
  return <div><p className="text-xs text-slate-400">{label}</p><p className="font-semibold">{value}</p></div>;
}