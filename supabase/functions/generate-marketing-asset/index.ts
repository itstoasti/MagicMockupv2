// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { corsHeaders } from '../_shared/cors.ts' // Assuming shared CORS headers

console.log("Hello from Functions!")

// Main function
serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Retrieve OpenAI API key from secrets
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      throw new Error('Missing environment variable OPENAI_API_KEY')
    }

    // Parse request body
    const { mockupImage, deviceType, outputType } = await req.json()
    console.log(`Generating ${outputType} asset for ${deviceType}...`);

    // --- Prompt Engineering (Similar to Node.js version) ---
    let prompt = `Create a professional marketing background suitable for an '${outputType}' post. The main subject is a screenshot displayed on an '${deviceType}' device. The background should be clean, modern, and visually appealing, perhaps with subtle gradients or abstract shapes. Do not include the device itself in the generated image, only the background scene.`;

    if (outputType === 'instagram') {
      prompt += ` The style should be vibrant and eye-catching for social media. Aspect ratio 1:1.`;
    } else if (outputType === 'appstore') {
      prompt += ` The style should be professional and clear, suitable for App Store presentation. Aspect ratio roughly 9:16.`;
    }

    // --- Determine image size based on output type ---
    let size = "1024x1024"; // Default DALL-E 3 size
    if (outputType === 'instagram') {
      size = "1024x1024";
    } else if (outputType === 'appstore') {
      size = "1024x1792"; // DALL-E 3 supported size close to 9:16
    }

    // --- Call OpenAI API using fetch ---
    const openaiUrl = 'https://api.openai.com/v1/images/generations';
    const openaiPayload = {
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: size,
      response_format: 'url',
    };

    const openaiResponse = await fetch(openaiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAIApiKey}`,
      },
      body: JSON.stringify(openaiPayload),
    });

    if (!openaiResponse.ok) {
      const errorBody = await openaiResponse.json();
      console.error("OpenAI API Error:", errorBody);
      throw new Error(errorBody?.error?.message || `OpenAI API request failed with status ${openaiResponse.status}`);
    }

    const responseData = await openaiResponse.json();
    const generatedImageUrl = responseData.data[0].url;

    if (!generatedImageUrl) {
      throw new Error('OpenAI response did not contain an image URL.');
    }

    // Return the generated image URL
    return new Response(
      JSON.stringify({ success: true, imageUrl: generatedImageUrl }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error("Error in Edge Function:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message || 'Internal Server Error' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/generate-marketing-asset' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
