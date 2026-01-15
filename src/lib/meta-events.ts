import { supabase } from "@/integrations/supabase/client";

interface MetaEventProperties {
  value?: number;
  currency?: string;
  content_ids?: string[];
  content_type?: string;
  content_name?: string;
  content_category?: string;
  search_string?: string;
  num_items?: number;
}

// Get Facebook browser ID from cookie
function getFbp(): string | null {
  const match = document.cookie.match(/_fbp=([^;]+)/);
  return match ? match[1] : null;
}

// Get Facebook click ID from cookie or URL
function getFbc(): string | null {
  // First check URL for fbclid
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get('fbclid');
  if (fbclid) {
    // Format: fb.1.timestamp.fbclid
    return `fb.1.${Date.now()}.${fbclid}`;
  }
  
  // Then check cookie
  const match = document.cookie.match(/_fbc=([^;]+)/);
  return match ? match[1] : null;
}

/**
 * Track a Meta (Facebook/Instagram) event via server-side Conversions API
 * Also fires the browser pixel for redundancy
 */
export async function trackMetaEvent(
  eventName: string,
  properties?: MetaEventProperties
): Promise<void> {
  // Generate a unique event ID for deduplication
  const eventId = crypto.randomUUID();
  
  // Fire browser pixel event first (for immediate tracking)
  if (typeof window !== 'undefined' && (window as any).fbq) {
    try {
      (window as any).fbq('track', eventName, properties, { eventID: eventId });
    } catch (e) {
      console.warn('Meta browser pixel error:', e);
    }
  }

  // Send server-side event
  try {
    const { error } = await supabase.functions.invoke('meta-event', {
      body: {
        event: eventName,
        event_id: eventId,
        properties,
        url: window.location.href,
        user_agent: navigator.userAgent,
        fbp: getFbp(),
        fbc: getFbc(),
      },
    });

    if (error) {
      console.warn('Meta server event error:', error);
    }
  } catch (e) {
    console.warn('Failed to send Meta server event:', e);
  }
}

// Convenience functions for common events

export function trackPageView(): void {
  trackMetaEvent('PageView');
}

export function trackViewContent(
  contentName?: string,
  contentId?: string,
  value?: number,
  currency: string = 'BRL'
): void {
  trackMetaEvent('ViewContent', {
    content_name: contentName,
    content_ids: contentId ? [contentId] : undefined,
    value,
    currency,
  });
}

export function trackCompleteRegistration(
  value?: number,
  currency: string = 'BRL',
  contentName?: string
): void {
  trackMetaEvent('CompleteRegistration', {
    value,
    currency,
    content_name: contentName,
  });
}

export function trackAddToCart(
  contentId: string,
  contentName: string,
  value: number,
  currency: string = 'BRL'
): void {
  trackMetaEvent('AddToCart', {
    content_ids: [contentId],
    content_name: contentName,
    value,
    currency,
    content_type: 'product',
  });
}

export function trackInitiateCheckout(
  value?: number,
  currency: string = 'BRL',
  numItems?: number
): void {
  trackMetaEvent('InitiateCheckout', {
    value,
    currency,
    num_items: numItems,
  });
}

export function trackPurchase(
  value: number,
  currency: string = 'BRL',
  contentName?: string,
  contentIds?: string[]
): void {
  trackMetaEvent('Purchase', {
    value,
    currency,
    content_name: contentName,
    content_ids: contentIds,
  });
}

export function trackLead(
  value?: number,
  currency: string = 'BRL',
  contentName?: string
): void {
  trackMetaEvent('Lead', {
    value,
    currency,
    content_name: contentName,
  });
}

export function trackSearch(searchString: string): void {
  trackMetaEvent('Search', {
    search_string: searchString,
  });
}

export function trackAddPaymentInfo(
  value?: number,
  currency: string = 'BRL'
): void {
  trackMetaEvent('AddPaymentInfo', {
    value,
    currency,
  });
}

export function trackSubscribe(
  value?: number,
  currency: string = 'BRL',
  contentName?: string
): void {
  trackMetaEvent('Subscribe', {
    value,
    currency,
    content_name: contentName,
  });
}

export function trackStartTrial(
  value?: number,
  currency: string = 'BRL',
  contentName?: string
): void {
  trackMetaEvent('StartTrial', {
    value,
    currency,
    content_name: contentName,
  });
}
