// Setup type definitions for built-in Supabase Runtime APIs
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Max-Age": "86400"
};
serve(async (req)=>{
  // Handle CORS preflight requests - must return 200 OK
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders
    });
  }
  try {
    // Parse request body with error handling
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return new Response(JSON.stringify({
        error: "Invalid JSON in request body"
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }
    const { message, conversationHistory } = body;
    // Validate message
    if (!message || typeof message !== 'string' || !message.trim()) {
      console.error("Message validation failed:", message);
      return new Response(JSON.stringify({
        error: "Message is required and must be a non-empty string"
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }
    // Validate conversationHistory (optional but must be array if provided)
    if (conversationHistory && !Array.isArray(conversationHistory)) {
      console.error("conversationHistory validation failed:", conversationHistory);
      return new Response(JSON.stringify({
        error: "conversationHistory must be an array"
      }), {
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }
    // Get Google Gemini API key (FREE tier available!)
    const AI_API_KEY = Deno.env.get("AI_API_KEY") || Deno.env.get("GEMINI_API_KEY");
    if (!AI_API_KEY) {
      console.error("AI_API_KEY is not configured");
      return new Response(JSON.stringify({
        error: "AI service not configured. Please set AI_API_KEY (Google Gemini API key) in Supabase secrets."
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }
    // Build system prompt
    const systemPrompt = `You are Venessa, an expert AI barista and coffee consultant at BrewHaven. Your role is to help users discover their perfect coffee match based on their preferences, mood, and taste.

Key responsibilities:
- Recommend coffee drinks based on user preferences (taste, temperature, strength, sweetness)
- Explain different coffee types and brewing methods
- Suggest drinks for specific occasions or moods
- Be friendly, enthusiastic, and knowledgeable about coffee
- Keep responses concise but informative (2-4 sentences typically)
- When recommending, explain WHY you're suggesting that coffee

Coffee knowledge:
- Espresso: Strong, concentrated shot - base for many drinks
- Americano: Espresso diluted with hot water - smooth and bold
- Latte: Espresso with steamed milk - creamy and mild
- Cappuccino: Equal parts espresso, steamed milk, and foam - balanced
- Mocha: Chocolate espresso drink - sweet and indulgent
- Cold Brew: Smooth, less acidic - refreshing and bold
- Macchiato: Espresso "marked" with foam - strong with a touch of sweetness

Always be helpful and encouraging in guiding users to find their perfect coffee!`;
    // Convert to Gemini format
    const geminiMessages = [];
    // Add system prompt as first user message
    geminiMessages.push({
      role: "user",
      parts: [
        {
          text: systemPrompt
        }
      ]
    });
    // Add acknowledgment
    geminiMessages.push({
      role: "model",
      parts: [
        {
          text: "Understood! I'm Venessa, ready to help you find your perfect coffee match."
        }
      ]
    });
    // Add conversation history
    if (conversationHistory && conversationHistory.length > 0) {
      for (const msg of conversationHistory){
        if (msg && msg.content) {
          geminiMessages.push({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [
              {
                text: msg.content
              }
            ]
          });
        }
      }
    }
    // Add current user message
    geminiMessages.push({
      role: "user",
      parts: [
        {
          text: message
        }
      ]
    });
    // FIXED: Changed from v1beta to v1
    const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${AI_API_KEY}`;
    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: geminiMessages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500
        }
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      if (response.status === 429) {
        return new Response(JSON.stringify({
          error: "Rate limit exceeded. Please try again later."
        }), {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      }
      if (response.status === 400) {
        let errorMessage = "Invalid request to AI service.";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error?.message || errorMessage;
        } catch (e) {
          errorMessage = errorText || errorMessage;
        }
        return new Response(JSON.stringify({
          error: errorMessage
        }), {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      }
      if (response.status === 404) {
        return new Response(JSON.stringify({
          error: "Model not found. Please verify your API key has access to Gemini 1.5 Flash."
        }), {
          status: 404,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json"
          }
        });
      }
      return new Response(JSON.stringify({
        error: "Failed to get AI response. Please check your API key and try again."
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }
    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!aiResponse) {
      console.error("No response text from AI:", JSON.stringify(data));
      return new Response(JSON.stringify({
        error: "No response from AI. Please try again."
      }), {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json"
        }
      });
    }
    return new Response(JSON.stringify({
      response: aiResponse
    }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("Error in coffee-chat function:", error);
    console.error("Error stack:", error.stack);
    return new Response(JSON.stringify({
      error: error.message || "Internal server error"
    }), {
      status: 500,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  }
});
