import { Layout } from "@/components/Layout";
import { AgreementCard } from "@/components/AgreementCard";
import { getAppData } from "@/lib/api";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal Agreements India – Download Ready Drafts | Draftlo",
  description:
    "Download legally compliant legal agreements in India instantly. Rental agreements, NDAs, employment contracts, power of attorney and more. Drafted by legal experts. Starting at ₹250.",
  alternates: { canonical: "https://draftlo.com/legal-agreements-india" },
  openGraph: {
    title: "Legal Agreements India – Download Ready Drafts | Draftlo",
    description:
      "Download legally compliant legal agreements in India instantly. Starting at ₹250.",
    url: "https://draftlo.com/legal-agreements-india",
    type: "website",
    images: [
      {
        url: "https://draftlo.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Legal Agreements India – Draftlo",
      },
    ],
  },
};

const FAQ_ITEMS = [
  {
    q: "Are the legal agreements on Draftlo valid in India?",
    a: "Yes. All agreements on Draftlo are drafted in accordance with Indian law, including the Indian Contract Act, 1872, and relevant state-specific regulations.",
  },
  {
    q: "How quickly can I get my legal agreement?",
    a: "Once you complete the form and payment, your customised legal agreement is delivered within 5 minutes via email.",
  },
  {
    q: "Do I need a lawyer to use these agreements?",
    a: "Our agreements are professionally drafted templates. We recommend consulting a lawyer for complex transactions, but most standard agreements can be used directly after customisation.",
  },
  {
    q: "What types of legal agreements are available for India?",
    a: "Draftlo offers rental agreements (Bengaluru, Mumbai, Delhi, Chennai, Hyderabad, Pune, Gurugram, Noida), NDAs, employment agreements, freelance contracts, T&Cs, power of attorney, and more.",
  },
  {
    q: "What is the cost of legal agreements on Draftlo?",
    a: "Prices start at ₹250 for rental agreements and go up to ₹500 for specialised documents like Terms & Conditions or privacy policies.",
  },
];

export default async function LegalAgreementsIndiaPage() {
  const data = await getAppData();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <Layout data={data}>
      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-gray-50 to-gray-100">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `linear-gradient(to right, #9ca3af 1px, transparent 1px), linear-gradient(to bottom, #9ca3af 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Legal Agreements India
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Download professionally drafted, legally compliant agreements for
            India in minutes. Rental agreements, NDAs, employment contracts,
            T&Cs and more — starting at ₹250.
          </p>
          <Link
            href="#agreements"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg"
          >
            Browse All Agreements
          </Link>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-y border-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <span className="text-green-500 font-bold">✓</span> Indian law
              compliant
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-500 font-bold">✓</span> Delivered in
              5 minutes
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-500 font-bold">✓</span> Drafted by
              legal experts
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-500 font-bold">✓</span> Starting at
              ₹250
            </span>
          </div>
        </div>
      </section>

      {/* All Agreements Grid */}
      <section id="agreements" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold text-gray-900 text-center mb-4">
            All Legal Agreements Available in India
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Choose from {data.drafts.length}+ ready-to-use legal agreements
            covering property, employment, business, and more — all specific to
            Indian law.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {data.drafts.map((draft, index) => (
              <div
                key={draft.href}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.04}s` }}
              >
                <AgreementCard {...draft} icon={draft.image} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Draftlo */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-heading text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose Draftlo for Legal Agreements in India?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Expert-Drafted Templates",
                body: "Every agreement is crafted by legal professionals familiar with Indian law — Contract Act, IT Act, state stamp duty rules and more.",
              },
              {
                title: "City-Specific Agreements",
                body: "Rental agreements tailored for Bengaluru, Mumbai, Delhi, Chennai, Hyderabad, Pune, Gurugram and Noida with local compliance built in.",
              },
              {
                title: "Fast & Affordable",
                body: "No expensive lawyer fees. Get a customised legal draft delivered to your inbox in under 5 minutes, starting at just ₹250.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <h3 className="font-heading font-semibold text-lg text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-heading text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.q}
                className="border border-gray-200 rounded-xl p-6"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold mb-4">
            Get Your Legal Agreement Now
          </h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Join thousands of individuals and businesses across India who trust
            Draftlo for fast, affordable, and legally sound agreements.
          </p>
          <Link
            href="/#agreements"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition shadow-lg"
          >
            Browse Agreements – From ₹250
          </Link>
        </div>
      </section>
    </Layout>
  );
}
