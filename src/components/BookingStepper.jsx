import { motion } from "framer-motion";

const steps = ["Passenger", "Seat", "Payment", "Confirmation"];

export default function BookingStepper({ current }) {
  return (
    <div className="mx-auto mb-10 flex max-w-3xl items-center">
      {steps.map((step, index) => {
        const active = index <= current;
        return (
          <div key={step} className="flex flex-1 items-center">
            <div className="relative z-10">
              <motion.div animate={{ scale: active ? 1 : 0.9 }}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${active ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                {index + 1}
              </motion.div>
              <span className="absolute left-1/2 mt-2 hidden -translate-x-1/2 whitespace-nowrap text-xs font-semibold md:block">{step}</span>
            </div>
            {index < steps.length - 1 && (
              <div className="mx-2 h-1 flex-1 overflow-hidden rounded bg-slate-200">
                <motion.div initial={{ width: "0%" }} animate={{ width: index < current ? "100%" : "0%" }} className="h-full bg-blue-600" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}