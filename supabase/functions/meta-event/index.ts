import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Allowed event names for validation
const ALLOWED_EVENTS = [
  'PageView', 'ViewContent', 'CompleteRegistration', 'AddToCart',
  'InitiateCheckout', 'Purchase', 'Search', 'AddPaymentInfo',
  'Lead', 'Contact', 'Subscribe', 'StartTrial'
];

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

interface MetaEventRequest {
  event: string;
  event_id?: string;
  properties?: MetaEventProperties;
  url?: string;
  user_agent?: string;
  fbp?: string;
  fbc?: string;
}

// Hash function for user data (Meta requires SHA256 hashing)
async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const accessToken = Deno.env.get('META_ACCESS_TOKEN');
    const pixelId = Deno.env.get('META_PIXEL_ID');
    
    if (!accessToken || !pixelId) {
      console.error('Missing META_ACCESS_TOKEN or META_PIXEL_ID');
      return new Response(
        JSON.stringify({ success: false, error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body: MetaEventRequest = await req.json();
    const { event, event_id, properties, url, user_agent, fbp, fbc } = body;

    // Validate event name
    if (!event || !ALLOWED_EVENTS.includes(event)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid event type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get client IP from request headers
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('cf-connecting-ip') || 
                     req.headers.get('x-real-ip') || 
                     '';

    // Build the event payload according to Meta's Conversions API spec
    const eventData: Record<string, unknown> = {
      event_name: event,
      event_time: Math.floor(Date.now() / 1000),
      event_id: event_id || crypto.randomUUID(),
      action_source: 'website',
    };

    // Add user data
    const userData: Record<string, unknown> = {};
    if (clientIp) userData.client_ip_address = clientIp;
    if (user_agent) userData.client_user_agent = user_agent;
    if (fbp) userData.fbp = fbp;
    if (fbc) userData.fbc = fbc;
    
    if (Object.keys(userData).length > 0) {
      eventData.user_data = userData;
    }

    // Add event source URL
    if (url) {
      eventData.event_source_url = url;
    }

    // Add custom data (properties)
    if (properties) {
      const customData: Record<string, unknown> = {};
      if (properties.value !== undefined) customData.value = properties.value;
      if (properties.currency) customData.currency = properties.currency;
      if (properties.content_ids) customData.content_ids = properties.content_ids;
      if (properties.content_type) customData.content_type = properties.content_type;
      if (properties.content_name) customData.content_name = properties.content_name;
      if (properties.content_category) customData.content_category = properties.content_category;
      if (properties.search_string) customData.search_string = properties.search_string;
      if (properties.num_items !== undefined) customData.num_items = properties.num_items;
      
      if (Object.keys(customData).length > 0) {
        eventData.custom_data = customData;
      }
    }

    console.log('Sending Meta event:', JSON.stringify(eventData));

    // Send to Meta Conversions API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [eventData],
        }),
      }
    );

    const result = await response.json();
    console.log('Meta API response:', JSON.stringify(result));

    if (!response.ok) {
      console.error('Meta API error:', JSON.stringify(result));
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to process event' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error sending Meta event:', errorMessage);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to process event' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
