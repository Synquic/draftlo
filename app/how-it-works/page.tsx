import { Layout } from "@/components/Layout";
import { getAppData } from "@/lib/api";

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function HowItWorksPage() {
  const data = await getAppData();

  return (
    <Layout data={data}>
      <div className="min-h-screen bg-white">
        <div className="hero-background py-16">
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 animate-fade-in">
              How It Works
            </h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Get your professional legal documents in 3 simple steps
            </p>
          </div>
        </div>

        {/* Steps Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="relative">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-4xl font-bold text-white">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Document</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Browse through our extensive collection of legal document templates. Use our search or category filters to find exactly what you need.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Pro Tip:</strong> Read the document description and key features to ensure it matches your requirements.
                    </p>
                  </div>
                </div>
                {/* Connector Arrow (hidden on mobile) */}
                <div className="hidden md:block absolute top-12 -right-6 transform translate-x-1/2">
                  <svg className="w-12 h-12 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-4xl font-bold text-white">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Payment</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Click on "Get Draft" and you'll be redirected to our secure payment form. Fill in your details and complete the payment process.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Secure:</strong> All payments are processed through encrypted, secure payment gateways.
                    </p>
                  </div>
                </div>
                {/* Connector Arrow (hidden on mobile) */}
                <div className="hidden md:block absolute top-12 -right-6 transform translate-x-1/2">
                  <svg className="w-12 h-12 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-4xl font-bold text-white">3</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Your Document</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Receive your standardised document instantly via email. Download it, and you're ready to use it!
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <strong>Instant Access:</strong> Download in Word and PDF formats for easy editing and printing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Our Process Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Lightning Fast</h3>
                <p className="text-gray-600 text-sm">
                  Get your documents within 5 minutes instead of waiting days for traditional legal services.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Legally Sound</h3>
                <p className="text-gray-600 text-sm">
                  All templates are created by legal professionals and comply with current Indian laws.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Standardised Drafts</h3>
                <p className="text-gray-600 text-sm">
                  Professionally drafted, standardised documents ready to use in Word format.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Cost-Effective</h3>
                <p className="text-gray-600 text-sm">
                  Save thousands compared to hiring a lawyer for simple document drafting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What You Get Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What You Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Editable Word Document</h4>
                  <p className="text-gray-600 text-sm">Standardised templates drafted by legal professionals</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Print-Ready PDF</h4>
                  <p className="text-gray-600 text-sm">Professional format ready for printing and signing</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Instant Email Delivery</h4>
                  <p className="text-gray-600 text-sm">Receive your documents immediately after payment</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Lifetime Access</h4>
                  <p className="text-gray-600 text-sm">Download your documents anytime from your account</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Legal Compliance</h4>
                  <p className="text-gray-600 text-sm">Documents comply with current Indian legal requirements</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Customer Support</h4>
                  <p className="text-gray-600 text-sm">Get help from our team if you have any questions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Do I need legal knowledge to use these documents?
                </h3>
                <p className="text-gray-600">
                  No! Our documents are designed to be user-friendly with clear instructions. However, we always recommend having a lawyer review any legal document before signing, especially for complex situations.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Are the documents standardised and ready to use?
                </h3>
                <p className="text-gray-600">
                  Yes! All documents are standardised, lawyer-drafted templates provided in editable Word format. They are ready to use as-is, and you can also modify clauses or adjust sections if needed.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Are these documents legally valid?
                </h3>
                <p className="text-gray-600">
                  Yes, all our documents are created by legal professionals and comply with Indian laws. However, we recommend consulting with a lawyer for complex situations or if you have specific legal concerns.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  What if I need help with the document?
                </h3>
                <p className="text-gray-600">
                  Our customer support team is here to help! Contact us via email, phone, or WhatsApp and we'll guide you through the process. For legal advice, we recommend consulting with a qualified attorney.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  How long does delivery take?
                </h3>
                <p className="text-gray-600">
                  Delivery is instant! Once your payment is confirmed, you'll receive an email with download links within minutes. You can also access your documents from your account dashboard immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 text-lg mb-8">
              Join thousands of satisfied customers who trust Draftlo for their legal documentation needs
            </p>
            <a
              href="/category"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
            >
              Browse All Documents
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}
