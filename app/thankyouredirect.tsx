'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { analytics } from '@/lib/analytics'
import { trackCustomSessionEvent } from '@/lib/customSession'

export default function SuccessPage() {
  const searchParams = useSearchParams()

  const documentName = searchParams?.get('document') || 'your legal document'
  const email = searchParams?.get('email') || ''

  useEffect(() => {
    // Existing analytics (unchanged)
    analytics.trackPageView('Purchase Success', {
      document_name: documentName,
      user_email: email,
      conversion: true,
    })

    // 🔥 Custom session tracking
    trackCustomSessionEvent('success_page_visit', {
      document_name: documentName,
    })
  }, [documentName, email])

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center text-center"
      style={{
        background: `
          linear-gradient(
            135deg,
            #0a1a33 0%,
            #070b16 45%,
            #120a2a 100%
          )
        `,
      }}
    >
      <div className="max-w-3xl px-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-white mb-6">
          Thank you for choosing Draftlo
        </h1>

        <p className="text-base md:text-lg text-gray-300 mb-2">
          You will receive your draft in your inbox within 10 minutes.
        </p>

        <p className="text-base md:text-lg text-gray-300 mb-10">
          Please check your Spam/Junk Folder also.
        </p>

        <p className="text-base md:text-lg text-gray-300">
          If you still have not received it, please contact
        </p>

        <p className="mt-2 text-base md:text-lg text-white font-medium">
          support@draftlo.com
        </p>
      </div>
    </div>
  )
}
