import { supabase } from "@/integrations/supabase/client";

interface TikTokEventProperties {
  value?: number;
  currency?: string;
  content_id?: string;
  content_type?: string;
  content_name?: string;
  search_string?: string;
}

interface TrackEventOptions {
  event: string;
  properties?: TikTokEventProperties;
}

// Get TikTok click ID from URL or cookie
const getTtclid = (): string | undefined => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('ttclid') || undefined;
};

// Get TikTok ttp cookie value
const getTtp = (): string | undefined => {
  const match = document.cookie.match(/(?:^|;\s*)_ttp=([^;]*)/);
  return match ? match[1] : undefined;
};

/**
 * Track an event via TikTok Events API (server-side)
 * This provides more accurate tracking than browser-only pixel
 */
export const trackTikTokEvent = async (options: TrackEventOptions): Promise<void> => {
  const { event, properties } = options;

  try {
    // Also fire the browser pixel event for redundancy
    if (typeof window !== 'undefined' && (window as any).ttq) {
      if (properties) {
        (window as any).ttq.track(event, properties);
      } else {
        (window as any).ttq.track(event);
      }
    }

    // Send to server-side Events API for better tracking
    const { error } = await supabase.functions.invoke('tiktok-event', {
      body: {
        event,
        properties,
        url: window.location.href,
        user_agent: navigator.userAgent,
        ttclid: getTtclid(),
        ttp: getTtp(),
      },
    });

    if (error) {
      console.warn('TikTok server event failed:', error);
    }
  } catch (err) {
    console.warn('TikTok event tracking error:', err);
  }
};

// Convenience functions for common events
export const trackViewContent = (contentName?: string, value?: number, currency = 'BRL') => 
  trackTikTokEvent({ 
    event: 'ViewContent', 
    properties: { content_name: contentName, value, currency } 
  });

export const trackCompleteRegistration = (value?: number, currency = 'BRL') => 
  trackTikTokEvent({ 
    event: 'CompleteRegistration', 
    properties: { value, currency } 
  });

export const trackAddToCart = (contentName?: string, value?: number, currency = 'BRL') => 
  trackTikTokEvent({ 
    event: 'AddToCart', 
    properties: { content_name: contentName, value, currency } 
  });

export const trackInitiateCheckout = (value?: number, currency = 'BRL') => 
  trackTikTokEvent({ 
    event: 'InitiateCheckout', 
    properties: { value, currency } 
  });

export const trackPurchase = (value: number, currency = 'BRL', contentName?: string) => 
  trackTikTokEvent({ 
    event: 'Purchase', 
    properties: { value, currency, content_name: contentName } 
  });

export const trackSearch = (searchString: string) => 
  trackTikTokEvent({ 
    event: 'Search', 
    properties: { search_string: searchString } 
  });

export const trackAddPaymentInfo = () => 
  trackTikTokEvent({ event: 'AddPaymentInfo' });

export const trackPlaceAnOrder = (value: number, currency = 'BRL') => 
  trackTikTokEvent({ 
    event: 'PlaceAnOrder', 
    properties: { value, currency } 
  });
