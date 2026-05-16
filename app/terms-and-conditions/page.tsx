import { Layout } from "@/components/Layout";
import { getAppData } from "@/lib/api";

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function TermsAndConditions() {
  const data = await getAppData();

  return (
    <Layout data={data}>
      <div className="min-h-screen bg-white">
        <div className="hero-background py-16">
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 animate-fade-in">
              Terms and Conditions
            </h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Last updated: January 2026
            </p>
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 mb-6">
                By accessing and using Draftlo's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Provided</h2>
              <p className="text-gray-700 mb-6">
                Draftlo provides legal document drafting services, including but not limited to rental agreements, employment contracts, NDAs, power of attorney documents, and other legal templates. All documents are provided as templates and should be reviewed by a qualified legal professional before use.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Use License</h2>
              <p className="text-gray-700 mb-4">Permission is granted to download and use the documents purchased from Draftlo for personal or business use subject to the following conditions:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li>Documents may not be resold, redistributed, or used to create derivative works for commercial purposes</li>
                <li>You may use the standardised documents for your specific needs</li>
                <li>You may not remove any copyright or proprietary notices from the documents</li>
                <li>This license shall automatically terminate if you violate any of these restrictions</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Disclaimer</h2>
              <p className="text-gray-700 mb-6">
                <strong>IMPORTANT:</strong> The documents and information provided by Draftlo are for general informational purposes only and do not constitute legal advice. We strongly recommend consulting with a qualified attorney before using any legal document. Draftlo is not a law firm and does not provide legal advice or legal representation.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitations of Liability</h2>
              <p className="text-gray-700 mb-6">
                In no event shall Draftlo or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Draftlo's website, even if Draftlo or a Draftlo authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Accuracy of Materials</h2>
              <p className="text-gray-700 mb-6">
                The materials appearing on Draftlo's website could include technical, typographical, or photographic errors. Draftlo does not warrant that any of the materials on its website are accurate, complete, or current. Draftlo may make changes to the materials contained on its website at any time without notice.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Payment Terms</h2>
              <p className="text-gray-700 mb-4">All payments must be made in full before accessing the purchased documents. We accept the following payment methods:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li>Credit/Debit Cards</li>
                <li>UPI (Unified Payments Interface)</li>
                <li>Net Banking</li>
                <li>Digital Wallets</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Intellectual Property</h2>
              <p className="text-gray-700 mb-6">
                All content on this website, including text, graphics, logos, and software, is the property of Draftlo and is protected by Indian and international copyright laws. Unauthorized use of any materials may violate copyright, trademark, and other laws.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. User Conduct</h2>
              <p className="text-gray-700 mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li>Use the service for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any portion of the website</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Upload or transmit viruses or any other malicious code</li>
                <li>Share your account credentials with others</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-700 mb-6">
                These terms and conditions are governed by and construed in accordance with the laws of India. You irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications to Terms</h2>
              <p className="text-gray-700 mb-6">
                Draftlo may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these terms and conditions.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about these Terms and Conditions, please contact us at:
                <br />
                Email: support@draftlo.com
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
