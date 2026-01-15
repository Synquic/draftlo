import { Layout } from "@/components/Layout";
import { getAppData } from "@/lib/api";

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function RefundPolicy() {
  const data = await getAppData();

  return (
    <Layout data={data}>
      <div className="min-h-screen bg-white">
        <div className="hero-background py-16">
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 animate-fade-in">
              Refund Policy
            </h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Last updated: January 2026
            </p>
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Overview</h2>
              <p className="text-gray-700 mb-6">
                At Draftlo, we strive to provide high-quality legal document templates and services. This refund policy outlines the circumstances under which refunds may be issued.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Digital Products</h2>
              <p className="text-gray-700 mb-6">
                Due to the nature of digital products and the immediate access provided upon purchase, all sales are generally final. Once a document has been downloaded or accessed, it cannot be returned.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Refund Eligibility</h2>
              <p className="text-gray-700 mb-4">Refunds may be considered in the following circumstances:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li><strong>Technical Issues:</strong> If you experience technical difficulties that prevent you from accessing your purchased document and we are unable to resolve the issue within 48 hours</li>
                <li><strong>Duplicate Purchase:</strong> If you accidentally purchase the same document multiple times</li>
                <li><strong>Incorrect Document:</strong> If you receive a document that is significantly different from what was described on our website</li>
                <li><strong>Payment Errors:</strong> If you were charged incorrectly or multiple times for a single purchase</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Non-Refundable Situations</h2>
              <p className="text-gray-700 mb-4">Refunds will NOT be provided in the following cases:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li>Change of mind after downloading or accessing the document</li>
                <li>Failure to read the document description before purchase</li>
                <li>Dissatisfaction with the content after the document has been accessed</li>
                <li>Inability to customize the document to your specific needs</li>
                <li>Legal advice not being provided (as we clearly state we do not provide legal advice)</li>
                <li>Any issues arising from the use of the document without legal review</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Refund Request Process</h2>
              <p className="text-gray-700 mb-4">To request a refund, please follow these steps:</p>
              <ol className="list-decimal pl-6 text-gray-700 mb-6 space-y-2">
                <li>Contact our support team at refunds@draftlo.com within 7 days of your purchase</li>
                <li>Include your order number, purchase date, and the reason for your refund request</li>
                <li>Provide any relevant screenshots or documentation supporting your claim</li>
                <li>Our team will review your request and respond within 3-5 business days</li>
              </ol>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Refund Processing Time</h2>
              <p className="text-gray-700 mb-6">
                If your refund request is approved, the refund will be processed within 7-10 business days. The refund will be issued to the original payment method used for the purchase. Please note that it may take an additional 5-7 business days for the refund to reflect in your account, depending on your bank or payment provider.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Partial Refunds</h2>
              <p className="text-gray-700 mb-6">
                In some cases, we may offer partial refunds or account credits instead of full refunds. This will be determined on a case-by-case basis and communicated to you during the refund review process.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Chargebacks</h2>
              <p className="text-gray-700 mb-6">
                If you initiate a chargeback without first contacting us to resolve the issue, we reserve the right to dispute the chargeback and provide evidence of the transaction and service delivery to your financial institution. Please contact us directly before pursuing a chargeback.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Subscription Services</h2>
              <p className="text-gray-700 mb-6">
                If you have purchased a subscription service, you may cancel at any time. However, refunds will not be provided for the current billing period. The cancellation will take effect at the end of your current subscription period.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about our refund policy, please contact us at:
                <br />
                Email: refunds@draftlo.com
                <br />
                Phone: +91 [Your Phone Number]
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Note</h3>
                <p className="text-gray-700">
                  We encourage all customers to carefully review the document descriptions, sample previews (where available), and ensure the document meets your needs before making a purchase. If you have any questions about a specific document, please contact our support team before purchasing.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
