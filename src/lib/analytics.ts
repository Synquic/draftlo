import mixpanel from "mixpanel-browser";

/* -------------------------------------
   MIXPANEL INIT (unchanged)
------------------------------------- */
const MIXPANEL_TOKEN = "1aa4299359bfd7b57a31eff981984d91";

if (typeof window !== "undefined") {
  try {
    mixpanel.init(MIXPANEL_TOKEN, {
      debug: false,
      track_pageview: false,
      persistence: "localStorage",
      ignore_dnt: true,
      api_host: "https://api-js.mixpanel.com",
    });
  } catch (error) {
    console.warn("Mixpanel initialization failed:", error);
  }
}

/* -------------------------------------
   IP + SESSION HELPERS (unchanged)
------------------------------------- */
let cachedUserIP: string | null = null;
let ipFetchPromise: Promise<string | null> | null = null;

async function getUserIP(): Promise<string | null> {
  if (cachedUserIP) return cachedUserIP;
  if (ipFetchPromise) return ipFetchPromise;

  ipFetchPromise = (async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      cachedUserIP = data.ip;
      return cachedUserIP;
    } catch {
      return null;
    } finally {
      ipFetchPromise = null;
    }
  })();

  return ipFetchPromise;
}

function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem("analytics_session_id");
  if (!sessionId) {
    sessionId = `session_${crypto.randomUUID()}`;
    sessionStorage.setItem("analytics_session_id", sessionId);
  }
  return sessionId;
}

/* -------------------------------------
   ANALYTICS API
------------------------------------- */
export const analytics = {
  /* ---------- Document View ---------- */
  async trackDocumentView(data: {
    documentName: string;
    documentId: string;
    documentCategory?: string;
    price?: number;
  }) {
    if (typeof window === "undefined") return;

    const sessionId = getOrCreateSessionId();
    const eventId = crypto.randomUUID();

    mixpanel.track("Document Viewed", {
      ...data,
      session_id: sessionId,
    });

    // Meta Pixel (Browser)
    if ((window as any).fbq) {
      (window as any).fbq(
        "track",
        "ViewContent",
        {
          content_name: data.documentName,
          content_category: data.documentCategory,
          content_ids: [data.documentId],
          content_type: "product",
          value: data.price,
          currency: "INR",
        },
        { eventID: eventId }
      );
    }

    // Meta Conversion API (Server)
    fetch("/meta-conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "ViewContent",
        eventId,
        value: data.price,
        currency: "INR",
      }),
    });
  },

  /* ---------- Add To Cart ---------- */
  async trackFormRedirect(data: {
    documentName: string;
    documentId: string;
    documentCategory?: string;
    price: number;
    formUrl: string;
    eventId: string;
  }) {
    if (typeof window === "undefined") return;

    const sessionId = getOrCreateSessionId();

    mixpanel.track("Add to Cart", {
      ...data,
      session_id: sessionId,
    });

    // Meta Pixel (Browser)
    if ((window as any).fbq) {
      (window as any).fbq(
        "track",
        "AddToCart",
        {
          content_name: data.documentName,
          content_category: data.documentCategory,
          content_ids: [data.documentId],
          content_type: "product",
          value: data.price,
          currency: "INR",
        },
        { eventID: data.eventId }
      );
    }

    // Meta Conversion API (Server)
    fetch("/meta-conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "AddToCart",
        eventId: data.eventId,
        value: data.price,
        currency: "INR",
      }),
    });
  },
};
