import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock3, RotateCcw, SlidersHorizontal } from "lucide-react";
import { flights } from "../data/flights";
import FlightCard from "../components/FlightCard";
import FlightDetailsModal from "../components/FlightDetailsModal";
import SkeletonCard from "../components/SkeletonCard";

export default function Results({ searchData, onSelect }) {
  const [loading, setLoading] = useState(true);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [airline, setAirline] = useState("All");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [departureWindow, setDepartureWindow] = useState("Any time");
  const [sort, setSort] = useState("price-low");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredFlights = useMemo(() => {
    let result = [...flights];
    if (airline !== "All") result = result.filter((flight) => flight.airline === airline);
    result = result.filter((flight) => flight.price <= maxPrice);
    if (departureWindow !== "Any time") {
      result = result.filter((flight) => {
        const minutes = toMinutes(flight.departure);
        if (departureWindow === "Before 09:00") return minutes < 540;
        if (departureWindow === "09:00 - 15:00") return minutes >= 540 && minutes <= 900;
        return minutes > 900;
      });
    }
    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "departure") result.sort((a, b) => toMinutes(a.departure) - toMinutes(b.departure));
    return result;
  }, [airline, departureWindow, maxPrice, sort]);

  const resetFilters = () => {
    setAirline("All");
    setMaxPrice(10000);
    setDepartureWindow("Any time");
    setSort("price-low");
  };

  return (
    <section className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-8">
          <p className="text-sm font-semibold text-blue-600">SEARCH RESULTS</p>
          <h1 className="mt-1 text-3xl font-black">{searchData.from} → {searchData.to}</h1>
          <p className="mt-2 text-sm text-slate-500">{searchData.passengers} passenger · {searchData.travelClass} · {searchData.tripType === "one-way" ? "One way" : searchData.tripType === "multi" ? "Multi city" : "Round trip"}</p>
        </div>

        <div className="grid gap-7 lg:grid-cols-[260px_1fr]">
          <motion.aside layout className="h-fit rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between"><div className="flex items-center gap-2"><SlidersHorizontal size={18} /><h3 className="font-bold">Filters</h3></div><button type="button" title="Reset filters" onClick={resetFilters} className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600"><RotateCcw size={16} /></button></div>
            <label className="mb-2 block text-sm font-semibold">Airline</label>
            <motion.select layout value={airline} onChange={(e) => setAirline(e.target.value)} className="mb-6 w-full rounded-xl border p-3 outline-none focus:border-blue-500">
              <option>All</option><option>IndiGo</option><option>Air India</option><option>Vistara</option><option>Akasa Air</option>
            </motion.select>
            <div className="mb-6"><div className="mb-2 flex items-center justify-between"><label htmlFor="max-price" className="text-sm font-semibold">Price</label><motion.span key={maxPrice} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-bold text-blue-600">₹{maxPrice.toLocaleString("en-IN")}</motion.span></div>
              <input id="max-price" type="range" min="5000" max="10000" step="100" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-blue-600" />
              <div className="mt-2 flex justify-between text-xs text-slate-500"><span>₹5,000</span><span>₹10,000</span></div>
            </div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold"><Clock3 size={15} />Departure time</label>
            <select value={departureWindow} onChange={(e) => setDepartureWindow(e.target.value)} className="w-full rounded-xl border p-3 outline-none focus:border-blue-500">
              <option>Any time</option><option>Before 09:00</option><option>09:00 - 15:00</option><option>After 15:00</option>
            </select>
          </motion.aside>

          <main>
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-slate-500">{filteredFlights.length} flights found</p>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl border bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-blue-500">
                <option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="departure">Departure time</option>
              </select>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {loading ? [1, 2, 3].map((item) => <SkeletonCard key={`skeleton-${item}`} />) : filteredFlights.map((flight) => (
                  <motion.div key={flight.id} layout initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}>
                    <FlightCard flight={flight} onDetails={setSelectedFlight} onSelect={onSelect} />
                  </motion.div>
                ))}
              </AnimatePresence>
              {!loading && filteredFlights.length === 0 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl bg-white p-10 text-center shadow-sm"><p className="font-bold">No flights match these filters</p><button type="button" onClick={resetFilters} className="mt-3 text-sm font-semibold text-blue-600 hover:text-blue-700">Reset filters</button></motion.div>}
            </div>
          </main>
        </div>
      </div>

      {selectedFlight && <FlightDetailsModal flight={selectedFlight} onClose={() => setSelectedFlight(null)} />}
    </section>
  );
}

function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}