import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle, XCircle, Loader2 } from "lucide-react";

export function ChatDiagnostic() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<{
    status: "success" | "error" | "loading" | null;
    message: string;
  } | null>(null);

  const testEdgeFunction = async () => {
    setTesting(true);
    setResult({ status: "loading", message: "Testing edge function..." });

    try {
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

      if (!SUPABASE_URL || !SUPABASE_KEY) {
        setResult({
          status: "error",
          message: "❌ Missing Supabase configuration. Please check environment variables in Vercel.",
        });
        setTesting(false);
        return;
      }

      // Test using Supabase client
      const { data, error } = await supabase.functions.invoke("coffee-chat", {
        body: {
          message: "Hello",
          conversationHistory: [],
        },
      });

      if (error) {
        if (error.message?.includes("Function not found") || error.message?.includes("404")) {
          setResult({
            status: "error",
            message: "❌ Edge function 'coffee-chat' is NOT deployed. Go to Supabase Dashboard → Edge Functions → Create 'coffee-chat' function. See FIX_CORS_ERROR.md for step-by-step instructions.",
          });
        } else {
          setResult({
            status: "error",
            message: `❌ Error: ${error.message}`,
          });
        }
      } else if (data?.response) {
        setResult({
          status: "success",
          message: `✅ Edge function is working! Response: "${data.response.substring(0, 50)}..."`,
        });
      } else {
        setResult({
          status: "error",
          message: `⚠️ No response from function. Data: ${JSON.stringify(data)}`,
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setResult({
        status: "error",
        message: `❌ Failed to connect: ${errorMessage}`,
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Chat Bot Diagnostic Tool</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Click the button below to test if the edge function is deployed and accessible.
        </p>
      </div>

      <Button onClick={testEdgeFunction} disabled={testing} variant="outline">
        {testing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Testing...
          </>
        ) : (
          "Test Edge Function"
        )}
      </Button>

      {result && (
        <div
          className={`p-4 rounded-md ${
            result.status === "success"
              ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800"
              : result.status === "error"
              ? "bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800"
              : "bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800"
          }`}
        >
          <div className="flex items-start gap-2">
            {result.status === "success" && (
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
            )}
            {result.status === "error" && (
              <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
            )}
            {result.status === "loading" && (
              <Loader2 className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 animate-spin" />
            )}
            {result.status === null && (
              <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            )}
            <p
              className={`text-sm ${
                result.status === "success"
                  ? "text-green-800 dark:text-green-200"
                  : result.status === "error"
                  ? "text-red-800 dark:text-red-200"
                  : "text-blue-800 dark:text-blue-200"
              }`}
            >
              {result.message}
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 pt-4 border-t space-y-2">
        <h4 className="text-sm font-semibold">Quick Fix Steps:</h4>
        <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
          <li>Go to Supabase Dashboard → Your Project</li>
          <li>Click "Edge Functions" in left sidebar</li>
          <li>Check if "coffee-chat" function exists</li>
          <li>If missing: Click "Create function" → Name it "coffee-chat"</li>
          <li>Copy code from <code className="bg-secondary px-1 py-0.5 rounded">supabase/functions/coffee-chat/index.ts</code></li>
          <li>Paste and click "Deploy"</li>
          <li>Verify "AI_API_KEY" secret exists in Edge Functions → Secrets</li>
        </ol>
      </div>
    </Card>
  );
}

