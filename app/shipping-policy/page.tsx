import { Layout } from "@/components/Layout";
import { getAppData } from "@/lib/api";

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function ShippingPolicy() {
  const data = await getAppData();

  return (
    <Layout data={data}>
      <div className="min-h-screen bg-white">
        <div className="hero-background py-16">
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 animate-fade-in">
              Shipping Policy
            </h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              Last updated: January 2026
            </p>
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Digital Product Delivery</h2>
              <p className="text-gray-700 mb-6">
                Draftlo provides exclusively digital products and services. As such, there is no physical shipping involved in our transactions. All legal documents and templates are delivered electronically via email or direct download from our website.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Delivery Method</h2>
              <p className="text-gray-700 mb-4">Upon successful payment, your purchased documents will be delivered through one or more of the following methods:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li><strong>Instant Download:</strong> Access your document immediately after payment through a secure download link on the confirmation page</li>
                <li><strong>Email Delivery:</strong> A download link will be sent to the email address provided during checkout</li>
                <li><strong>Account Dashboard:</strong> Access all your purchased documents anytime through your Draftlo account dashboard</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Delivery Timeframe</h2>
              <p className="text-gray-700 mb-6">
                <strong>Instant Delivery:</strong> Most documents are available for immediate download upon successful payment completion. In rare cases where manual processing is required, you will receive your document within 24 hours of purchase.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Email Delivery Issues</h2>
              <p className="text-gray-700 mb-4">If you do not receive your download link via email within 15 minutes of purchase:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li>Check your spam or junk folder</li>
                <li>Verify that you entered the correct email address during checkout</li>
                <li>Add support@draftlo.com to your email contacts to ensure delivery</li>
                <li>Contact our support team at support@draftlo.com with your order number</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Download Access Period</h2>
              <p className="text-gray-700 mb-6">
                Your download links remain active for 30 days from the date of purchase. We recommend downloading your documents immediately and storing them securely on your device. After this period, you can still access your purchased documents through your account dashboard.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. File Formats</h2>
              <p className="text-gray-700 mb-4">Documents are typically provided in the following formats:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li>Microsoft Word (.docx) - Fully editable format</li>
                <li>PDF (.pdf) - Print-ready format (for reference)</li>
                <li>Other formats as specified in the product description</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Re-download Policy</h2>
              <p className="text-gray-700 mb-6">
                If you lose access to your downloaded files, you can re-download them from your account dashboard at no additional cost. Alternatively, contact our support team with your order details, and we will resend the download link.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Physical Copies (Hard Copy Delivery)</h2>
              <p className="text-gray-700 mb-6">
                Currently, Draftlo does not offer physical printed copies of documents. If you require a printed version, you can easily print the document yourself using the provided PDF or Word file. For professional printing services, we recommend consulting a local print shop.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Technical Requirements</h2>
              <p className="text-gray-700 mb-4">To access and use your purchased documents, you will need:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
                <li>A valid email address</li>
                <li>Internet connection for downloading</li>
                <li>Software to open .docx files (e.g., Microsoft Word, Google Docs, LibreOffice)</li>
                <li>PDF reader software (e.g., Adobe Acrobat Reader, browser PDF viewer)</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Delivery Confirmation</h2>
              <p className="text-gray-700 mb-6">
                You will receive an email confirmation upon successful purchase and delivery of your document. This email serves as your receipt and proof of purchase. Please retain this email for your records.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. International Delivery</h2>
              <p className="text-gray-700 mb-6">
                Since our products are digital, they are available for instant delivery worldwide. There are no geographical restrictions, shipping delays, or additional charges for international customers.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Delivery Support</h2>
              <p className="text-gray-700 mb-6">
                If you experience any issues with accessing or downloading your purchased documents, please contact our support team:
                <br />
                Email: support@draftlo.com
                <br />
                Response Time: Within 24 hours
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Why Digital Delivery?</h3>
                <p className="text-gray-700">
                  Digital delivery allows us to provide you with instant access to your legal documents, eliminates shipping costs and delays, and ensures you receive the most up-to-date versions of our templates. It's also environmentally friendly and provides standardised, ready-to-use templates and allows for easy reprinting as needed.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
