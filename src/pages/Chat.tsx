import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Send, Coffee, Loader2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner, FullPageLoading } from "@/components/LoadingSpinner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      loadChatHistory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadChatHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("chat_history")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: true })
        .limit(50);

      if (error) throw error;

      const formattedMessages: Message[] = [];
      data?.forEach((item) => {
        formattedMessages.push({
          id: item.id + "-user",
          role: "user",
          content: item.message,
          created_at: item.created_at,
        });
        if (item.bot_response) {
          formattedMessages.push({
            id: item.id + "-bot",
            role: "assistant",
            content: item.bot_response,
            created_at: item.created_at,
          });
        }
      });

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error loading chat history:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to load chat history";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setLoading(true);

    // Add user message immediately
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      // Call edge function for AI response
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      
      if (!SUPABASE_URL || !SUPABASE_KEY) {
        throw new Error("Supabase configuration missing. Please check environment variables.");
      }
      
      const CHAT_URL = `${SUPABASE_URL}/functions/v1/coffee-chat`;
      console.log("Calling edge function:", CHAT_URL);
      
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({ 
          message: userMessage,
          conversationHistory: messages.map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
      }).catch((fetchError) => {
        console.error("Network error:", fetchError);
        throw new Error(`Network error: ${fetchError.message}. This usually means the edge function is not deployed or not accessible. Please check Supabase Edge Functions deployment.`);
      });

      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }

      if (response.status === 402) {
        throw new Error("AI credits exhausted. Please contact support.");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || `Failed to get response from AI (Status: ${response.status})`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      const botResponse = data.response;

      // Add bot message
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: botResponse,
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);

      // Save to database
      await supabase.from("chat_history").insert({
        user_id: user?.id,
        message: userMessage,
        bot_response: botResponse,
      });

    } catch (error) {
      console.error("Chat error:", error);
      let errorMessage = "Failed to get response. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        // Provide specific help based on error type
        if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError") || error.message.includes("Network error")) {
          errorMessage = "Unable to connect to the chat service. The edge function may not be deployed. Please check Supabase Edge Functions and ensure 'coffee-chat' is deployed. See CHATBOT_DEPLOYMENT.md for help.";
        } else if (error.message.includes("AI service not configured")) {
          errorMessage = "AI service not configured. Please set AI_API_KEY in Supabase secrets. See FREE_AI_SETUP.md for instructions.";
        } else if (error.message.includes("Supabase configuration")) {
          errorMessage = "Missing Supabase configuration. Please check VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY are set.";
        }
      }
      
      toast({
        title: "Chat Error",
        description: errorMessage,
        variant: "destructive",
        duration: 10000, // Show longer so user can read it
      });
      
      // Remove the user message if the request failed
      setMessages((prev) => prev.filter(msg => msg.id !== userMsg.id));
    } finally {
      setLoading(false);
    }
  };

  if (loadingHistory) {
    return <FullPageLoading />;
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm px-4 py-4">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Coffee className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold text-foreground">Venessa</h1>
            <p className="text-sm text-muted-foreground">Your AI Barista</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="container mx-auto max-w-4xl space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <Coffee className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Start Your Coffee Journey</h2>
              <p className="text-muted-foreground">
                Ask me anything about coffee! I can recommend drinks based on your taste.
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <Card
                className={`max-w-[80%] p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border-2"
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </Card>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <Card className="max-w-[80%] p-4 bg-card border-2">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-muted-foreground">Brewing response...</span>
                </div>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-card/50 backdrop-blur-sm px-4 py-4">
        <form onSubmit={handleSubmit} className="container mx-auto max-w-4xl">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about coffee recommendations..."
              disabled={loading}
              className="flex-1"
            />
            <Button type="submit" disabled={loading} variant="hero">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
