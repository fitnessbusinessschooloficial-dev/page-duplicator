import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Allowed TikTok event names for validation
const ALLOWED_EVENTS = [
  'ViewContent',
  'CompleteRegistration',
  'AddToCart',
  'InitiateCheckout',
  'Purchase',
  'Search',
  'AddPaymentInfo',
  'PlaceAnOrder',
];

interface TikTokEventProperties {
  value?: number;
  currency?: string;
  content_id?: string;
  content_type?: string;
  content_name?: string;
  search_string?: string;
}

interface TikTokEventRequest {
  event: string;
  event_id?: string;
  properties?: TikTokEventProperties;
  url?: string;
  user_agent?: string;
  ttclid?: string;
  ttp?: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const accessToken = Deno.env.get('TIKTOK_ACCESS_TOKEN');
    if (!accessToken) {
      console.error('TIKTOK_ACCESS_TOKEN not configured');
      return new Response(
        JSON.stringify({ error: 'Service configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body: TikTokEventRequest = await req.json();
    const { event, event_id, properties, url, user_agent, ttclid, ttp } = body;

    // Validate event name
    if (!event || !ALLOWED_EVENTS.includes(event)) {
      return new Response(
        JSON.stringify({ error: 'Invalid event type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get client IP from request headers
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     req.headers.get('x-real-ip') || 
                     '';

    // Build the event payload
    const eventPayload: Record<string, unknown> = {
      pixel_code: 'D5KHMTRC77U894MDCCT0',
      event: event,
      event_id: event_id || crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    // Add user context
    const userContext: Record<string, unknown> = {};
    if (clientIp) userContext.ip = clientIp;
    if (user_agent) userContext.user_agent = user_agent;
    if (ttclid) userContext.ttclid = ttclid;
    if (ttp) userContext.ttp = ttp;
    
    if (Object.keys(userContext).length > 0) {
      eventPayload.context = { user: userContext };
    }

    // Add page info
    if (url) {
      eventPayload.context = {
        ...eventPayload.context as object,
        page: { url }
      };
    }

    // Add event properties
    if (properties) {
      eventPayload.properties = properties;
    }

    console.log('Sending TikTok event:', JSON.stringify(eventPayload));

    // Send to TikTok Events API
    const response = await fetch('https://business-api.tiktok.com/open_api/v1.3/event/track/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Token': accessToken,
      },
      body: JSON.stringify({
        data: [eventPayload],
      }),
    });

    const result = await response.json();
    console.log('TikTok API response:', JSON.stringify(result));

    if (!response.ok) {
      throw new Error(`TikTok API error: ${JSON.stringify(result)}`);
    }

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error sending TikTok event:', errorMessage);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to process event' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
