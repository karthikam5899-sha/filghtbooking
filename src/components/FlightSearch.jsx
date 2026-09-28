import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightLeft, CalendarDays, Search, Users, MapPin, ChevronDown, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";

const cities = ["Chennai", "Delhi", "Mumbai", "Bengaluru", "Dubai", "Singapore", "London"];

const getDateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDate = (date) => new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
}).format(new Date(`${date}T00:00:00`));

export default function FlightSearch({ onSearch }) {
  const [from, setFrom] = useState("Chennai");
  const [to, setTo] = useState("Delhi");
  const [date, setDate] = useState("");
  const [tripType, setTripType] = useState("round");
  const [secondLeg, setSecondLeg] = useState({ from: "Delhi", to: "Mumbai", date: "" });
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState("Economy");
  const [openMenu, setOpenMenu] = useState(null);
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [swapRotation, setSwapRotation] = useState(0);
  const [errors, setErrors] = useState({});
  const menuRef = useRef(null);

  const today = useMemo(() => {
    const current = new Date();
    current.setHours(0, 0, 0, 0);
    return current;
  }, []);

  useEffect(() => {
    const closeMenus = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setOpenMenu(null);
    };
    document.addEventListener("mousedown", closeMenus);
    return () => document.removeEventListener("mousedown", closeMenus);
  }, []);

  const swapCities = () => {
    setFrom(to);
    setTo(from);
    setSwapRotation((rotation) => rotation + 180);
    setErrors((current) => ({ ...current, from: undefined, to: undefined }));
  };

  const updateCity = (field, city) => {
    field === "from" ? setFrom(city) : setTo(city);
    setErrors((current) => ({ ...current, [field]: undefined }));
    setOpenMenu(null);
  };

  const updateDate = (value) => {
    setDate(value);
    setErrors((current) => ({ ...current, date: undefined }));
    setOpenMenu(null);
  };

  const monthStart = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), 1);
  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate();
  const calendarDays = Array.from({ length: monthStart.getDay() + daysInMonth }, (_, index) => {
    if (index < monthStart.getDay()) return null;
    return new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), index - monthStart.getDay() + 1);
  });

  const changeMonth = (amount) => {
    setCalendarMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  };

  const validate = () => {
    const newErrors = {};
    if (!from) newErrors.from = "Select departure city";
    if (!to) newErrors.to = "Select destination";
    if (from && to && from === to) newErrors.to = "Cities must be different";
    if (!date) newErrors.date = "Select a travel date";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitSearch = () => {
    if (!validate()) return;
    onSearch({ from, to, date, passengers, travelClass, tripType, secondLeg: tripType === "multi" ? secondLeg : null });
  };

  const changeTripType = (type) => {
    setTripType(type);
    setErrors({});
  };

  return (
    <section className="relative z-20 -mt-20 px-4">
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl rounded-3xl bg-white p-5 shadow-2xl shadow-slate-900/10 md:p-7">
        <div className="mb-6 flex flex-wrap items-center gap-5">
          {[['round', 'Round Trip'], ['one-way', 'One Way'], ['multi', 'Multi City']].map(([type, label]) => <button type="button" key={type} onClick={() => changeTripType(type)} className={`rounded-full px-5 py-2 text-sm font-semibold transition ${tripType === type ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-500 hover:bg-blue-50 hover:text-blue-600"}`}>{label}</button>)}
        </div>

        <div ref={menuRef} className="grid gap-4 lg:grid-cols-[1fr_60px_1fr_1fr_1fr_auto]">
          <CityField icon={<MapPin size={20} />} label="From" value={from} error={errors.from}
            open={openMenu === "from"} onToggle={() => setOpenMenu(openMenu === "from" ? null : "from")}
            onSelect={(city) => updateCity("from", city)} />
          <div className="flex items-center justify-center">
            <motion.button animate={{ rotate: swapRotation }} whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} onClick={swapCities}
              className="rounded-full border border-slate-200 bg-white p-3 text-blue-600 shadow-sm">
              <ArrowRightLeft size={20} />
            </motion.button>
          </div>
          <CityField icon={<MapPin size={20} />} label="To" value={to} error={errors.to}
            open={openMenu === "to"} onToggle={() => setOpenMenu(openMenu === "to" ? null : "to")}
            onSelect={(city) => updateCity("to", city)} />
          <DateField date={date} error={errors.date} open={openMenu === "date"}
            onToggle={() => setOpenMenu(openMenu === "date" ? null : "date")} calendarMonth={calendarMonth}
            calendarDays={calendarDays} today={today} onChangeMonth={changeMonth} onSelect={updateDate} />

          <div className="relative">
            <label className="mb-2 block text-xs font-semibold text-slate-500">Passengers</label>
            <button onClick={() => setOpenMenu(openMenu === "passengers" ? null : "passengers")}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:border-blue-400">
              <span className="flex items-center gap-2"><Users size={18} className="text-blue-600" />{passengers} Passenger{passengers > 1 ? "s" : ""}</span>
              <motion.span animate={{ rotate: openMenu === "passengers" ? 180 : 0 }}><ChevronDown size={16} /></motion.span>
            </button>

            <AnimatePresence>
              {openMenu === "passengers" && (
                <motion.div initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }}
                  className="absolute left-0 right-0 top-20 z-30 rounded-xl border bg-white p-4 shadow-xl">
                  <div className="mb-3 flex items-center justify-between">
                    <span>Adults</span>
                    <div className="flex items-center gap-3">
                      <button aria-label="Remove passenger" onClick={() => setPassengers(Math.max(1, passengers - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border"><Minus size={14} /></button>
                      <span>{passengers}</span>
                      <button aria-label="Add passenger" onClick={() => setPassengers(passengers + 1)} className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white"><Plus size={14} /></button>
                    </div>
                  </div>
                  <label className="mb-2 block text-xs font-semibold text-slate-500">Cabin class</label>
                  <select value={travelClass} onChange={(e) => setTravelClass(e.target.value)} className="w-full rounded-lg border p-2 outline-none">
                    <option>Economy</option><option>Premium Economy</option><option>Business</option><option>First Class</option>
                  </select>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={submitSearch}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
            <Search size={19} /> Search
          </motion.button>
        </div>
        <AnimatePresence mode="wait">
          {tripType === "multi" && <motion.div key="multi-city" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-5 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-blue-600">Second journey</p>
            <div className="grid gap-3 md:grid-cols-3">
              <label className="text-xs font-semibold text-slate-500">From<select value={secondLeg.from} onChange={(event) => setSecondLeg({ ...secondLeg, from: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-normal text-slate-900 outline-none"><option>Delhi</option><option>Mumbai</option><option>Bengaluru</option><option>Dubai</option><option>Singapore</option></select></label>
              <label className="text-xs font-semibold text-slate-500">To<select value={secondLeg.to} onChange={(event) => setSecondLeg({ ...secondLeg, to: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-normal text-slate-900 outline-none"><option>Mumbai</option><option>Chennai</option><option>London</option><option>Dubai</option><option>Singapore</option></select></label>
              <label className="text-xs font-semibold text-slate-500">Date<input type="date" value={secondLeg.date} onChange={(event) => setSecondLeg({ ...secondLeg, date: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm font-normal text-slate-900 outline-none" /></label>
            </div>
          </motion.div>}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function CityField({ icon, label, value, error, open, onToggle, onSelect }) {
  return (
    <div className="relative">
      <label className="mb-2 block text-xs font-semibold text-slate-500">{label}</label>
      <button type="button" onClick={onToggle} className={`flex w-full items-center gap-2 rounded-xl border bg-white px-4 py-3 text-left transition ${error ? "border-red-400 ring-2 ring-red-100" : "border-slate-200 hover:border-blue-400"}`}>
        <span className="text-blue-600">{icon}</span>
        <span className="min-w-0 flex-1 truncate">{value || `Select ${label.toLowerCase()} city`}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }}><ChevronDown size={16} /></motion.span>
      </button>
      <AnimatePresence>
        {open && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute left-0 right-0 top-20 z-30 overflow-hidden rounded-xl border bg-white p-1 shadow-xl">
          {cities.map((city) => <button type="button" key={city} onClick={() => onSelect(city)} className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-blue-50 ${city === value ? "font-bold text-blue-600" : "text-slate-700"}`}>{city}</button>)}
        </motion.div>}
      </AnimatePresence>
      <AnimatePresence>
        {error && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 text-xs font-medium text-red-500">{error}</motion.p>}
      </AnimatePresence>
    </div>
  );
}

function DateField({ date, error, open, onToggle, calendarMonth, calendarDays, today, onChangeMonth, onSelect }) {
  return <div className="relative">
    <label className="mb-2 block text-xs font-semibold text-slate-500">Departure</label>
    <button type="button" onClick={onToggle} className={`flex w-full items-center gap-2 rounded-xl border bg-white px-4 py-3 text-left transition ${error ? "border-red-400 ring-2 ring-red-100" : "border-slate-200 hover:border-blue-400"}`}>
      <CalendarDays size={20} className="text-blue-600" /><span className={`min-w-0 flex-1 truncate ${date ? "text-slate-900" : "text-slate-400"}`}>{date ? formatDate(date) : "Choose a date"}</span><motion.span animate={{ rotate: open ? 180 : 0 }}><ChevronDown size={16} /></motion.span>
    </button>
    <AnimatePresence>
      {open && <motion.div initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} className="absolute right-0 top-20 z-30 w-72 rounded-xl border bg-white p-4 shadow-xl">
        <div className="mb-4 flex items-center justify-between"><button type="button" aria-label="Previous month" onClick={() => onChangeMonth(-1)} className="rounded-full p-1 hover:bg-slate-100"><ChevronLeft size={18} /></button><AnimatePresence mode="wait"><motion.span key={`${calendarMonth.getFullYear()}-${calendarMonth.getMonth()}`} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="text-sm font-bold">{calendarMonth.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</motion.span></AnimatePresence><button type="button" aria-label="Next month" onClick={() => onChangeMonth(1)} className="rounded-full p-1 hover:bg-slate-100"><ChevronRight size={18} /></button></div>
        <div className="mb-2 grid grid-cols-7 text-center text-[10px] font-bold uppercase text-slate-400">{["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}</div>
        <div className="grid grid-cols-7 gap-1"><AnimatePresence mode="wait"><motion.div key={`${calendarMonth.getFullYear()}-${calendarMonth.getMonth()}`} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} className="col-span-7 grid grid-cols-7 gap-1">{calendarDays.map((day, index) => day ? <button type="button" key={getDateKey(day)} disabled={day < today} onClick={() => onSelect(getDateKey(day))} className={`rounded-lg py-2 text-xs transition ${day < today ? "cursor-not-allowed text-slate-300" : "hover:bg-blue-50"} ${date === getDateKey(day) ? "bg-blue-600 font-bold text-white hover:bg-blue-600" : ""}`}>{day.getDate()}</button> : <span key={`empty-${index}`} />)}</motion.div></AnimatePresence></div>
      </motion.div>}
    </AnimatePresence>
    <AnimatePresence>{error && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1 text-xs font-medium text-red-500">{error}</motion.p>}</AnimatePresence>
  </div>;
}