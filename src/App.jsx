import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plane } from "lucide-react";
import Navbar from "./components/Navbar";
import BookingStepper from "./components/BookingStepper";
import Home from "./pages/Home";
import Results from "./pages/Results";
import PassengerForm from "./components/PassengerForm";
import SeatSelection from "./components/SeatSelection";
import Payment from "./components/Payment";
import Confirmation from "./pages/Confirmation";
import Explore from "./pages/Explore";
import { flights } from "./data/flights";

export default function App() {
  const [booting, setBooting] = useState(true);
  const [page, setPage] = useState("home");
  const [searchData, setSearchData] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passenger, setPassenger] = useState(null);
  const [seat, setSeat] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setBooting(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navigate = (nextPage) => {
    setPage(nextPage);
    scrollTop();
  };

  const signOut = () => {
    setSearchData(null);
    setSelectedFlight(null);
    setPassenger(null);
    setSeat(null);
    navigate("home");
  };

  const searchFlights = (data) => {
    setSearchData(data);
    setPage("results");
    scrollTop();
  };

  const selectFlight = (flight) => {
    setSelectedFlight(flight);
    setPage("passenger");
    scrollTop();
  };

  const passengerComplete = (data) => {
    setPassenger(data);
    setPage("seat");
    scrollTop();
  };

  const seatComplete = (selectedSeat) => {
    setSeat(selectedSeat);
    setPage("payment");
    scrollTop();
  };

  const paymentComplete = () => {
    setPage("confirmation");
    scrollTop();
  };

  const currentStep = { passenger: 0, seat: 1, payment: 2, confirmation: 3 }[page];

  return (
    <div className="min-h-screen bg-slate-50">
      <AnimatePresence>
        {booting && <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.55 }} className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#27352f] text-white">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(115deg, transparent 0%, transparent 48%, #d4b477 48.2%, transparent 48.5%), linear-gradient(25deg, transparent 0%, transparent 72%, #d4b477 72.2%, transparent 72.5%)", backgroundSize: "420px 420px" }} />
          <div className="absolute bottom-24 left-1/2 flex w-[min(82vw,520px)] -translate-x-1/2 items-center justify-between text-[10px] uppercase tracking-[0.22em] text-white/35">
            <motion.span initial={{ opacity: 0.25, scale: 0.8 }} animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.15, 0.8] }} transition={{ duration: 1.8, repeat: Infinity }} className="relative z-10 flex h-3 w-3 rounded-full bg-[#d4b477] shadow-[0_0_18px_#d4b477]"><span className="absolute left-5 -top-1">MAA</span></motion.span>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3, duration: 0.9 }} className="h-px flex-1 origin-left bg-gradient-to-r from-[#d4b477] to-white/20" />
            <motion.span initial={{ opacity: 0.25, scale: 0.8 }} animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.15, 0.8] }} transition={{ delay: 0.55, duration: 1.8, repeat: Infinity }} className="relative z-10 flex h-3 w-3 rounded-full bg-[#d4b477] shadow-[0_0_18px_#d4b477]"><span className="absolute left-5 -top-1">DXB</span></motion.span>
            <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 0.9 }} className="h-px flex-1 origin-left bg-gradient-to-r from-[#d4b477] to-white/20" />
            <motion.span initial={{ opacity: 0.25, scale: 0.8 }} animate={{ opacity: [0.25, 1, 0.25], scale: [0.8, 1.15, 0.8] }} transition={{ delay: 1, duration: 1.8, repeat: Infinity }} className="relative z-10 flex h-3 w-3 rounded-full bg-[#d4b477] shadow-[0_0_18px_#d4b477]"><span className="absolute right-5 -top-1">LHR</span></motion.span>
          </div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45 }} className="relative z-10 text-center">
            <motion.div initial={{ scale: 0.8, rotate: -8 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 220, damping: 16 }} className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d4b477] text-[#27352f] shadow-2xl shadow-black/20"><Plane size={32} /></motion.div>
            <motion.p initial={{ opacity: 0, letterSpacing: "0.35em" }} animate={{ opacity: 1, letterSpacing: "0.02em" }} transition={{ delay: 0.25, duration: 0.7 }} className="mt-6 font-serif text-3xl font-semibold">Aurelia <span className="text-[#d4b477]">Air</span></motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="mt-2 text-xs uppercase tracking-[0.3em] text-white/50">Travel, considered.</motion.p>
            <div className="mx-auto mt-9 h-px w-56 overflow-hidden bg-white/15"><motion.div initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.2, ease: "easeInOut" }} className="h-full bg-[#d4b477]" /></div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }} className="mt-3 text-[10px] uppercase tracking-[0.25em] text-white/35">Preparing your journey</motion.p>
          </motion.div>
          <motion.div initial={{ x: "-20vw", y: 120, opacity: 0 }} animate={{ x: "120vw", y: -130, opacity: [0, 0.7, 0.7, 0] }} transition={{ duration: 1.5, ease: "easeInOut" }} className="absolute text-[#e7c98e]"><Plane size={42} /></motion.div>
        </motion.div>}
      </AnimatePresence>
      <Navbar page={page} onNavigate={navigate} />

      {page === "home" && <Home onSearch={searchFlights} onNavigate={navigate} />}

      {["flights", "offers", "support", "profile"].includes(page) && <Explore view={page} onHome={() => navigate("home")} onSelectFlight={selectFlight} onSignOut={signOut} />}

      {page === "results" && searchData && <Results searchData={searchData} onSelect={selectFlight} />}

      {["passenger", "seat", "payment"].includes(page) && (
        <main className="px-5 py-12">
          <BookingStepper current={currentStep} />
          {page === "passenger" && <PassengerForm onNext={passengerComplete} />}
          {page === "seat" && <SeatSelection onNext={seatComplete} />}
          {page === "payment" && <Payment price={selectedFlight?.price || 6499} onComplete={paymentComplete} />}
        </main>
      )}

      {page === "confirmation" && <Confirmation flight={selectedFlight || flights[0]} passenger={passenger} seat={seat} />}

      <footer className="border-t border-[#ded8cc] bg-[#27352f] px-5 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row">
          <div><h3 className="font-serif text-2xl font-semibold">Aurelia <span className="text-[#d4b477]">Air</span></h3><p className="mt-2 text-sm text-white/50">Travel, considered.</p></div>
          <div className="text-sm text-white/45">© 2026 Aurelia Air. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}