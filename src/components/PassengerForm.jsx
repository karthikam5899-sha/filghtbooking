import { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Check, CheckCircle2, User, Mail, Phone } from "lucide-react";

export default function PassengerForm({ onNext }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const getError = (key, value) => {
    if (key === "firstName" && !value.trim()) return "First name required";
    if (key === "lastName" && !value.trim()) return "Last name required";
    if (key === "email" && !value.includes("@")) return "Enter a valid email";
    if (key === "phone" && value.length < 10) return "Enter a valid phone number";
    return "";
  };

  const update = (key, value) => {
    const nextForm = { ...form, [key]: value };
    setForm(nextForm);
    if (touched[key]) setErrors((current) => ({ ...current, [key]: getError(key, value) }));
  };

  const touch = (key) => {
    setTouched((current) => ({ ...current, [key]: true }));
    setErrors((current) => ({ ...current, [key]: getError(key, form[key]) }));
  };

  const next = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = getError(key, form[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    setTouched({ firstName: true, lastName: true, email: true, phone: true });
    if (Object.keys(newErrors).length === 0) setStep(2);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-10">
        <div className="mb-3 flex justify-between text-sm font-semibold"><span>Passenger information</span><motion.span key={step} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}>Step {step} of 2</motion.span></div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <motion.div animate={{ width: step === 1 ? "50%" : "100%" }} className="h-full rounded-full bg-blue-600" />
        </div>
      </div>

      {step === 1 ? (
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <div className="mb-7"><h2 className="text-2xl font-black">Passenger details</h2><p className="mt-1 text-sm text-slate-500">Enter details exactly as shown on your travel document.</p></div>
          <div className="grid gap-5 md:grid-cols-2">
            <Input label="First name" icon={<User size={18} />} value={form.firstName} error={errors.firstName} touched={touched.firstName} onBlur={() => touch("firstName")} onChange={(e) => update("firstName", e.target.value)} />
            <Input label="Last name" icon={<User size={18} />} value={form.lastName} error={errors.lastName} touched={touched.lastName} onBlur={() => touch("lastName")} onChange={(e) => update("lastName", e.target.value)} />
            <Input label="Email" type="email" icon={<Mail size={18} />} value={form.email} error={errors.email} touched={touched.email} onBlur={() => touch("email")} onChange={(e) => update("email", e.target.value)} />
            <Input label="Phone" icon={<Phone size={18} />} value={form.phone} error={errors.phone} touched={touched.phone} onBlur={() => touch("phone")} onChange={(e) => update("phone", e.target.value)} />
          </div>
          <button onClick={next} className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-700">Continue</button>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"><Check /></div>
          <h2 className="text-2xl font-black">Passenger details completed</h2>
          <p className="mt-2 text-slate-500">Continue to seat selection.</p>
          <button onClick={() => onNext(form)} className="mt-7 rounded-xl bg-blue-600 px-8 py-3 font-bold text-white">Select Seat</button>
        </motion.div>
      )}
    </div>
  );
}

function Input({ label, icon, type = "text", value, error, touched, onBlur, onChange }) {
  const valid = touched && !error;
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">{label}</label>
      <div className={`flex items-center gap-2 rounded-xl border px-4 py-3 transition ${error ? "border-red-400 bg-red-50/30 ring-2 ring-red-100" : valid ? "border-emerald-400 bg-emerald-50/30 ring-2 ring-emerald-100" : "border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"}`}>
        <span className={error ? "text-red-500" : valid ? "text-emerald-600" : "text-slate-400"}>{icon}</span><input type={type} value={value} onBlur={onBlur} onChange={onChange} className="w-full bg-transparent outline-none" />
        {touched && <motion.span initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className={error ? "text-red-500" : "text-emerald-600"}>{error ? <AlertCircle size={17} /> : <CheckCircle2 size={17} />}</motion.span>}
      </div>
      <motion.p initial={false} animate={{ height: error ? "auto" : 0, opacity: error ? 1 : 0 }} className="mt-1 overflow-hidden text-xs text-red-500">{error || " "}</motion.p>
    </div>
  );
}