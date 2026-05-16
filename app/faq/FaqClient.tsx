'use client';

import { useState } from "react";

const faqs = [
  {
    category: "about",
    label: "About Draftlo",
    items: [
      {
        q: "What is Draftlo?",
        a: "Draftlo is a website to find agreements for your startup, small business and personal needs. Draftlo has standardised agreements for your needs, with each agreement vetted by lawyers. It's simple: buy a legal agreement from Draftlo and get it delivered in your inbox within minutes!",
      },
      {
        q: "How is Draftlo different from hiring a lawyer?",
        a: "Hiring a lawyer for a standard agreement can cost Rs. 3,000 to Rs. 20,000 or more and take several days. Draftlo gives you standardised agreements vetted by lawyers instantly and at a fraction of the cost. For complex or unusual legal situations we recommend consulting a lawyer directly. For standard documents like rental agreements, NDAs, employment contracts, and power of attorney, Draftlo is the faster, more affordable choice.",
      },
      {
        q: "Is Draftlo suitable for individuals or only businesses?",
        a: "Both! Individuals use Draftlo for rental agreements, power of attorney, and freelance contracts. Businesses use it for NDAs, employment contracts, master service agreements, privacy policies, and terms and conditions.",
      },
      {
        q: "Which cities and states does Draftlo cover?",
        a: "Draftlo's documents are drafted in accordance with Indian law and are applicable across all Indian states. We currently cover all major cities including Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, Pune, Kolkata, and more.",
      },
      {
        q: "How do I contact Draftlo for support?",
        a: "You can reach us at Email: support@draftlo.com or Phone: +91 80880 47284. Our support team typically responds within a few hours on business days.",
      },
    ],
  },
  {
    category: "documents",
    label: "Documents & Services",
    items: [
      {
        q: "What types of documents can I create on Draftlo?",
        a: "Draftlo covers three main categories: Property Agreements (Residential and Commercial Rental Agreements, Lease Agreements, Leave and Licence Agreements), Work and Employment (Employment Contracts, Offer Letters, Freelance Agreements, Consultancy Agreements, NDAs), and Startup and Business (Master Services Agreements, Privacy Policies, Terms and Conditions, Power of Attorney).",
      },
      {
        q: "Can I customise the document to suit my specific requirements?",
        a: "Yes. When you fill in your details, you can add specific clauses, terms, and custom conditions relevant to your agreement. Our templates are designed to be flexible while ensuring legal accuracy. If you have very unique requirements, email us at support@draftlo.com and we'll assist you.",
      },
      {
        q: "What if the document type I need is not listed?",
        a: "We are constantly expanding our library. If you can't find what you're looking for, please contact us at support@draftlo.com — we may be able to prepare it for you as a custom draft, or point you to the closest available template.",
      },
    ],
  },
  {
    category: "rental",
    label: "Rental Agreements",
    items: [
      {
        q: "What is a rental agreement and why do I need one?",
        a: "A rental agreement is a legally binding contract between a landlord and a tenant that sets out the terms of the tenancy including rent amount, duration, security deposit, maintenance responsibilities, and termination conditions. Having a written rental agreement protects both parties and is increasingly required by law in many Indian states.",
      },
      {
        q: "Do I need to register my rental agreement?",
        a: "Under the Registration Act 1908, any lease agreement for a period of 12 months or more must be registered with the Sub-Registrar's office. Agreements for less than 11 months are commonly not registered but may be notarised instead, though this varies by state.",
      },
      {
        q: "What is stamp duty and how much do I need to pay?",
        a: "Stamp duty is a government tax on legal documents including rental agreements. The amount varies by state. In Maharashtra it is 0.25% of total rent plus deposit for agreements up to 60 months. In Karnataka it is a fixed Rs. 500 for agreements up to 11 months. In Delhi it is 2% of annual average rent for agreements above 1 year. Draftlo advises the applicable stamp duty within your draft.",
      },
      {
        q: "Does a rental agreement need to be notarised?",
        a: "Notarisation is not legally mandatory for rental agreements in India, but it is a common practice for 11-month agreements that are not registered. It provides an additional layer of authenticity and can be useful if a dispute arises.",
      },
      {
        q: "Why do most rental agreements in India run for 11 months?",
        a: "An 11-month rental agreement falls below the 12-month threshold that legally requires registration under the Registration Act 1908. This saves both parties the time and cost of registration. The agreement can be renewed after 11 months with mutual consent.",
      },
    ],
  },
  {
    category: "business",
    label: "Business & Employment",
    items: [
      {
        q: "What should a Non-Disclosure Agreement (NDA) include?",
        a: "A strong NDA should cover: the definition of confidential information, the obligations of both parties, the duration of confidentiality, permitted disclosures, exclusions (e.g. information already in the public domain), remedies for breach, and governing law. Draftlo's NDA templates include all standard clauses needed for Indian businesses.",
      },
      {
        q: "What is a Master Services Agreement (MSA)?",
        a: "An MSA is a framework contract that sets the overarching terms between a service provider and a client for an ongoing business relationship. Instead of drafting new terms for every project, an MSA establishes the standard terms once and individual projects are governed by shorter Statements of Work referencing the MSA. It's ideal for agencies, IT firms, and consultants.",
      },
      {
        q: "What is the difference between an employment contract and a freelance agreement?",
        a: "An employment contract establishes an employer-employee relationship with obligations like PF and ESI. A freelance or consultancy agreement sets up an independent contractor relationship where the individual is self-employed and not entitled to employee benefits. The distinction has tax and legal implications.",
      },
      {
        q: "Does my website's Privacy Policy need to comply with Indian law?",
        a: "Yes. Under the Information Technology Rules 2011, any Indian website or app collecting personal data is required to have a privacy policy. The Digital Personal Data Protection Act (DPDPA) 2023 adds further obligations. Draftlo's privacy policy template is compliant with current Indian IT Rules.",
      },
    ],
  },
  {
    category: "validity",
    label: "Legal Validity",
    items: [
      {
        q: "Are documents created on Draftlo legally valid in India?",
        a: "Yes. Our documents are drafted by qualified Indian lawyers and are legally valid when properly executed (signed by both parties and, where required, printed on appropriate stamp paper). The legal validity depends on correct execution, not on who prepared the draft. Using Draftlo gives you a professionally structured document that meets the requirements of the Indian Contract Act 1872, Information Technology Act 2000, and the rules made thereunder.",
      },
      {
        q: "Can I use a Draftlo document in court?",
        a: "Yes, a Draftlo document that has been properly signed, dated, and executed on adequate stamp paper can be produced as evidence in an Indian court. For documents that require registration (e.g. leases over 12 months), ensure registration is completed.",
      },
      {
        q: "Does a contract need witnesses to be valid?",
        a: "Most contracts in India do not legally require witnesses to be valid. However, certain documents like Wills and Power of Attorney must be signed in the presence of witnesses (typically two). For rental agreements, having witnesses sign is strongly recommended as it provides additional protection if the agreement is ever disputed.",
      },
      {
        q: "Is my personal data safe with Draftlo?",
        a: "Absolutely. Draftlo takes data privacy seriously. We only use the information you provide to generate your document. We do not sell your data to third parties. All data is transmitted over SSL-encrypted connections.",
      },
    ],
  },
  {
    category: "process",
    label: "Process & Delivery",
    items: [
      {
        q: "How does Draftlo work?",
        a: "It's a simple two-step process. First, search and browse to find the agreement you need using our search or document categories. Then, complete your payment and receive a professionally formatted, ready-to-sign agreement directly to your email within minutes.",
      },
      {
        q: "How long does it take to receive my document?",
        a: "Most documents are delivered to your email within 5 minutes of completing payment. In rare cases it may take up to a few hours. If you haven't received your document within 30 minutes, check your spam folder or contact us at support@draftlo.com.",
      },
      {
        q: "In what format will I receive the document?",
        a: "Your document will be delivered in PDF and/or Word (.docx) format, so you can print it directly or make minor edits if needed before printing on stamp paper.",
      },
      {
        q: "Can I request changes after receiving the document?",
        a: "Yes. If you notice an error or need a correction in the information you provided (e.g. a name was misspelled), email us at support@draftlo.com within 7 days of receiving your document and we'll make the correction at no extra charge.",
      },
    ],
  },
  {
    category: "pricing",
    label: "Pricing & Payment",
    items: [
      {
        q: "How much do Draftlo agreements cost?",
        a: "Agreements start at Rs. 250 and are priced up to Rs. 400 only. This covers all types of agreements, from rental agreements and NDAs to employment contracts and startup agreements. No hidden charges.",
      },
      {
        q: "What payment methods are accepted?",
        a: "Draftlo accepts all major Indian payment methods including UPI (Google Pay, PhonePe, Paytm), debit and credit cards (Visa, Mastercard, RuPay), and net banking. All transactions are secured via industry-standard encryption.",
      },
      {
        q: "What is your refund policy?",
        a: "Since documents are digital goods delivered instantly, refunds are generally not applicable once the draft has been delivered. However, if you did not receive your document due to a technical issue, or there is an error on our part, we will either re-send the document or provide a full refund. Contact support@draftlo.com for assistance.",
      },
      {
        q: "Does the price include stamp paper or registration charges?",
        a: "No. Draftlo's fee is for the drafting of the document only. Stamp duty, stamp paper charges, notary fees, and government registration charges are separate costs payable by you directly to the relevant authorities.",
      },
    ],
  },
];

export default function FaqClient() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const toggle = (key: string) => setOpenIndex(openIndex === key ? null : key);

  const filtered = faqs
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        const matchesTab = activeTab === "all" || section.category === activeTab;
        const matchesSearch =
          !search ||
          item.q.toLowerCase().includes(search.toLowerCase()) ||
          item.a.toLowerCase().includes(search.toLowerCase());
        return matchesTab && matchesSearch;
      }),
    }))
    .filter((s) => s.items.length > 0);

  const tabs = [
    { id: "all", label: "All" },
    ...faqs.map((s) => ({ id: s.category, label: s.label })),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="hero-background py-16">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Everything you need to know about getting your legal agreements ready in minutes.
          </p>
          {/* Search */}
          <div className="max-w-lg mx-auto">
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setActiveTab("all"); }}
              placeholder="Search questions… e.g. rental agreement, stamp duty, NDA"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSearch(""); }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeTab === tab.id
                  ? "bg-indigo-50 border-indigo-400 text-indigo-700"
                  : "bg-white border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ sections */}
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No results found. Try a different search term.</p>
        ) : (
          filtered.map((section) => (
            <div key={section.category} className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-3 flex items-center gap-3">
                {section.label}
                <span className="flex-1 h-px bg-gray-200" />
              </h2>
              <div className="space-y-2">
                {section.items.map((item, i) => {
                  const key = `${section.category}-${i}`;
                  const isOpen = openIndex === key;
                  return (
                    <div
                      key={key}
                      className={`bg-white rounded-xl border transition-all ${
                        isOpen ? "border-indigo-200 shadow-sm" : "border-gray-200"
                      }`}
                    >
                      <button
                        onClick={() => toggle(key)}
                        className="w-full text-left px-5 py-4 flex justify-between items-center gap-4"
                      >
                        <span className={`text-sm font-semibold leading-snug ${isOpen ? "text-indigo-700" : "text-gray-800"}`}>
                          {item.q}
                        </span>
                        <span
                          className={`flex-shrink-0 w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-base transition-transform ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

        {/* Contact strip */}
        <div className="mt-12 bg-white border border-gray-200 rounded-2xl p-8 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-500 text-sm mb-6">Our team is happy to help you pick the right document or clarify any doubts.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:support@draftlo.com"
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
            >
              Email Us
            </a>
            <a
              href="tel:+918088047284"
              className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:border-indigo-400 hover:text-indigo-600 transition-colors"
            >
              +91 80880 47284
            </a>
            <a
              href="/category"
              className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:border-indigo-400 hover:text-indigo-600 transition-colors"
            >
              Browse Agreements
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
