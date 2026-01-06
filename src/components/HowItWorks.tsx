import React from "react";
import { Search, FileEdit, Mail } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: Search,
    title: "Search & Browse",
    description:
      "Use our search bar or browse categories to find the perfect legal agreement template for your needs",
  },
  {
    number: "2",
    icon: FileEdit,
    title: "Fill Details",
    description:
      "Just fill in the blanks to get a draft tailored with your details and requirements.",
  },
  {
    number: "3",
    icon: Mail,
    title: "Get Delivered",
    description:
      "Add the agreement to your cart, finish the payment and get the agreement delivered to your email within minutes!",
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <>
      {/* =====================================
          Don't be a Dinosaur – Hero Section
         ===================================== */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />

        {/* Blue outline */}
        <div className="absolute inset-6 border-2 border-blue-400 pointer-events-none z-10" />

        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-white">
            Don't be a Dinosaur.
          </h2>

          <div className="w-24 h-1 bg-blue-400 mx-auto mb-8" />

          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-100">
            Leverage the Power of AI. Generate Agreements with just the click of a button.
          </p>
        </div>
      </section>

      {/* =====================================
          How It Works – Steps Section
         ===================================== */}
      <section className="relative py-20 overflow-hidden bg-white">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Step Number */}
                  <div className="mb-6 w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl font-bold text-white">{step.number}</span>
                  </div>

                  {/* Icon Box */}
                  <div className="w-48 h-48 bg-gray-900 flex flex-col items-center justify-center mb-6 rounded-2xl shadow-xl transform group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-300">
                    <IconComponent className="w-16 h-16 text-white mb-3" strokeWidth={1.5} />
                    <h3 className="text-white font-semibold text-lg">{step.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-base leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
