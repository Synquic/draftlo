import { Metadata } from "next";
import { Layout } from "@/components/Layout";
import { getAppData } from "@/lib/api";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "FAQ – Draftlo | Legal Agreements for Startups, Small Businesses & Personal Needs",
  description:
    "Got questions about Draftlo? Find answers on how to buy legal agreements, delivery time, legal validity under the Indian Contract Act, stamp duty, pricing (from Rs. 250) and more.",
  keywords:
    "Draftlo FAQ, legal agreements India, rental agreement online, NDA India, employment contract India, startup agreements, buy legal documents India",
  alternates: {
    canonical: "https://draftlo.com/faq",
  },
  openGraph: {
    title: "FAQ – Draftlo | Legal Agreements for Startups & Small Businesses",
    description:
      "Everything you need to know about buying standardised legal agreements on Draftlo. Delivered to your inbox in minutes. Vetted by lawyers. Starting at Rs. 250.",
    url: "https://draftlo.com/faq",
    siteName: "Draftlo",
    type: "website",
  },
};

// FAQ schema for Google rich results + AI engines (ChatGPT, Perplexity, Gemini)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  name: "Draftlo FAQ – Legal Agreements for Startups, Small Businesses and Personal Needs",
  url: "https://draftlo.com/faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Draftlo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Draftlo is a website to find agreements for your startup, small business and personal needs. Draftlo has standardised agreements for your needs, with each agreement vetted by lawyers. Buy a legal agreement from Draftlo and get it delivered in your inbox within minutes.",
      },
    },
    {
      "@type": "Question",
      name: "Are documents created on Draftlo legally valid in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our documents are drafted by qualified Indian lawyers and are legally valid when properly executed (signed by both parties and, where required, printed on appropriate stamp paper). Using Draftlo gives you a professionally structured document that meets the requirements of the Indian Contract Act 1872, Information Technology Act 2000, and the rules made thereunder.",
      },
    },
    {
      "@type": "Question",
      name: "How does Draftlo work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It is a simple two-step process. First, search and browse to find the agreement you need. Then, complete your payment and receive a professionally formatted, ready-to-sign agreement directly to your email within minutes.",
      },
    },
    {
      "@type": "Question",
      name: "How much do Draftlo agreements cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agreements start at Rs. 250 and are priced up to Rs. 400 only. This covers all types of agreements, from rental agreements and NDAs to employment contracts and startup agreements.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to receive my document?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most documents are delivered to your email within 5 minutes of completing payment.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to register my rental agreement in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Under the Registration Act 1908, any lease agreement for a period of 12 months or more must be registered with the Sub-Registrar's office. Agreements for less than 11 months are commonly not registered but may be notarised instead, though this varies by state.",
      },
    },
    {
      "@type": "Question",
      name: "What types of legal agreements does Draftlo offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Draftlo offers agreements across three categories: Property Agreements (rental agreements, lease agreements), Work and Employment (employment contracts, freelance agreements, NDAs), and Startup and Business (master services agreements, privacy policies, terms and conditions, power of attorney).",
      },
    },
  ],
};

export default async function FAQPage() {
  const data = await getAppData();

  return (
    <Layout data={data}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient />
    </Layout>
  );
}
