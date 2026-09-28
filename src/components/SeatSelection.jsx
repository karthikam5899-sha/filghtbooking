import { AnimatePresence, motion } from "framer-motion";
import { Armchair, Check } from "lucide-react";
import { useState } from "react";

const rows = Array.from({ length: 8 }, (_, i) => i + 1);
const columns = ["A", "B", "C", "D", "E", "F"];
const unavailable = ["1C", "2A", "3F", "5B", "6E"];

export default function SeatSelection({ onNext }) {
  const [selected, setSelected] = useState(null);
  const selectSeat = (seat) => { if (!unavailable.includes(seat)) setSelected(seat); };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-7 text-center"><h2 className="text-2xl font-black">Choose your seat</h2><p className="mt-1 text-sm text-slate-500">Select one available seat.</p></div>
          <div className="mx-auto max-w-sm rounded-[50px] border-4 border-slate-200 bg-slate-50 p-6">
            <div className="mb-8 rounded-t-[80px] bg-slate-200 py-3 text-center text-xs font-bold text-slate-500">FRONT</div>
            <div className="space-y-3">
              {rows.map((row) => (
                <div key={row} className="grid grid-cols-[1fr_1fr_20px_1fr_1fr] gap-2">
                  {columns.map((col, index) => {
                    if (index === 3) return <div key={col} className="flex items-center justify-center text-xs text-slate-400">{row}</div>;
                    const seat = `${row}${col}`;
                    const disabled = unavailable.includes(seat);
                    const active = selected === seat;
                    return (
                      <motion.button key={seat} aria-label={`Seat ${seat}${disabled ? ", occupied" : active ? ", selected" : ", available"}`} whileHover={!disabled ? { scale: 1.1, y: -2 } : {}} whileTap={!disabled ? { scale: 0.9 } : {}}
                        animate={active ? { scale: 1.12, y: -1 } : { scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 400, damping: 18 }}
                        onClick={() => selectSeat(seat)} disabled={disabled}
                        className={`seat flex h-10 items-center justify-center rounded-lg border ${disabled ? "cursor-not-allowed border-slate-200 bg-slate-200 text-slate-400" : active ? "border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "border-blue-200 bg-white text-blue-600 hover:border-blue-500"}`}>
                        <motion.span animate={active ? { rotate: [0, -8, 0] } : { rotate: 0 }} transition={{ duration: 0.35 }}><Armchair size={16} /></motion.span>
                      </motion.button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="h-fit rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="mb-5 text-lg font-black">Seat summary</h3>
          <div className="mb-5 flex items-center justify-between"><span className="text-slate-500">Selected seat</span><AnimatePresence mode="wait"><motion.span key={selected || "none"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="font-bold">{selected || "None"}</motion.span></AnimatePresence></div>
          <div className="mb-6 space-y-3 text-sm">
            <div className="flex items-center gap-2"><span className="h-4 w-4 rounded bg-white ring-1 ring-blue-300" />Available</div>
            <div className="flex items-center gap-2"><span className="h-4 w-4 rounded bg-blue-600" />Selected</div>
            <div className="flex items-center gap-2"><span className="h-4 w-4 rounded bg-slate-300" />Occupied</div>
          </div>
          <button disabled={!selected} onClick={() => onNext(selected)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300">
            <Check size={18} /> Continue
          </button>
        </div>
      </div>
    </div>
  );
}