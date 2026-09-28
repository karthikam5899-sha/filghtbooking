import { motion } from "framer-motion";
import { CheckCircle2, Plane, Download } from "lucide-react";

export default function Confirmation({ flight, passenger, seat }) {
  const printTicket = () => window.print();

  return (
    <section className="min-h-screen bg-slate-50 px-5 py-16">
      <div className="mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, scale: 0.85, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: "spring", duration: 0.7 }} className="mb-7 text-center">
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
            <motion.span initial={{ scale: 0.7, opacity: 0.8 }} animate={{ scale: 1.45, opacity: 0 }} transition={{ delay: 0.45, duration: 1, repeat: Infinity, repeatDelay: 1.5 }} className="absolute inset-0 rounded-full bg-emerald-200" />
            <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 14 }} className="relative flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-lg shadow-emerald-600/15"><CheckCircle2 size={55} /></motion.div>
          </div>
          <h1 className="mt-6 text-4xl font-black">Booking confirmed!</h1>
          <p className="mt-2 text-slate-500">Your flight has been successfully booked.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }} className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <motion.div initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="bg-blue-600 p-6 text-white">
            <div className="flex items-center justify-between"><div><p className="text-sm opacity-70">Aurelia Air · Booking reference</p><p className="text-2xl font-black">AUR7X92</p></div><motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}><Plane size={30} /></motion.div></div>
          </motion.div>
          <div className="p-6">
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.7 } } }} className="grid grid-cols-3 items-center gap-4">
              <TicketStop time={flight?.departure || "06:15"} airport={flight?.from || "MAA"} />
              <motion.div variants={{ hidden: { opacity: 0, scaleX: 0.5 }, visible: { opacity: 1, scaleX: 1 } }} className="text-center"><div className="h-px bg-slate-300" /><p className="mt-2 text-xs text-slate-400">{flight?.duration || "2h 50m"}</p></motion.div>
              <TicketStop time={flight?.arrival || "09:05"} airport={flight?.to || "DEL"} align="right" />
            </motion.div>
            <div className="my-7 border-t border-dashed border-slate-200" />
            <div className="grid gap-5 sm:grid-cols-2">
              <Info label="Passenger" value={passenger ? `${passenger.firstName} ${passenger.lastName}` : "Guest Passenger"} delay={0.8} />
              <Info label="Seat" value={seat || "12A"} delay={0.9} />
              <Info label="Airline" value={flight?.airline || "IndiGo"} delay={1} />
              <Info label="Flight" value={flight?.flightNumber || "6E 512"} delay={1.1} />
            </div>
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} onClick={printTicket} className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 font-bold transition hover:border-blue-500 hover:text-blue-600"><Download size={18} />Download Ticket</motion.button>
          </div>
        </motion.div>
        <p className="mt-7 text-center text-sm text-slate-400">A confirmation email has been sent to your registered email address.</p>
      </div>
    </section>
  );
}
function TicketStop({ time, airport, align = "left" }) {
  return <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} className={align === "right" ? "text-right" : "text-left"}><p className="text-3xl font-black">{time}</p><p className="font-bold">{airport}</p></motion.div>;
}
function Info({ label, value, delay }) {
  return <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}><p className="text-xs font-medium text-slate-400">{label}</p><p className="mt-1 font-bold">{value}</p></motion.div>;
}