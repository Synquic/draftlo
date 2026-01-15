'use client'

/**
 * Generate or return existing session id
 * (Resets when tab/browser closes)
 */
export const getCustomSessionId = (): string => {

    let sessionId = crypto.randomUUID()
    localStorage.setItem('draftlo_custom_session_id', sessionId)
  return sessionId
}

/**
 * Track event once per session
 */
export const trackCustomSessionEvent = (
  eventName: string,
  properties: Record<string, any> = {}
) => {
  if (typeof window === 'undefined') return

  const sessionId = getCustomSessionId()
  const eventKey = `draftlo_${eventName}_tracked`

  // Prevent duplicate tracking in same session
  if (sessionStorage.getItem(eventKey)) return

  sessionStorage.setItem(eventKey, 'true')

  // Optional: dataLayer (safe even if GTM not present)

  console.log('[Custom Session Event]', eventName, {
    sessionId,
    properties,
  })
}
