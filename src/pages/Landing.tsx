import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Coffee, Sparkles, Users, TrendingUp } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const { user, signOut, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">CoffeeBot</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button variant="ghost" onClick={() => navigate("/chat")}>
                  Chat
                </Button>
                <Button variant="ghost" onClick={() => navigate("/profile")}>
                  Profile
                </Button>
                {isAdmin && (
                  <Button variant="ghost" onClick={() => navigate("/admin")}>
                    Admin
                  </Button>
                )}
                <Button variant="outline" onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Button variant="hero" onClick={() => navigate("/auth")}>
                Get Started
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <div className="bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
              ✨ AI-Powered Coffee Recommendations
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Find Your Perfect
            <span className="bg-gradient-to-r from-[hsl(25_50%_25%)] to-[hsl(35_60%_55%)] bg-clip-text text-transparent"> Coffee Match</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Chat with our AI barista and discover personalized coffee recommendations based on your taste preferences and mood.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="xl" 
              variant="hero"
              onClick={() => navigate(user ? "/chat" : "/auth")}
              className="w-full sm:w-auto"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Chatting
            </Button>
            <Button 
              size="xl" 
              variant="outline"
              onClick={() => navigate("/auth")}
              className="w-full sm:w-auto"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-card/30 rounded-3xl my-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Why Choose CoffeeBot?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
              <p className="text-muted-foreground">
                Get personalized recommendations using advanced AI technology tailored to your preferences.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Coffee className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Vast Selection</h3>
              <p className="text-muted-foreground">
                Explore hundreds of coffee varieties from espresso to cold brew, all in one place.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
              <div className="bg-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Learn & Discover</h3>
              <p className="text-muted-foreground">
                Discover new coffee types and expand your palate with expert recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[hsl(25_50%_25%)] to-[hsl(30_45%_35%)] rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Find Your Perfect Brew?
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of coffee lovers who've discovered their perfect match with CoffeeBot.
          </p>
          <Button 
            size="xl" 
            variant="secondary"
            onClick={() => navigate(user ? "/chat" : "/auth")}
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coffee className="h-6 w-6 text-primary" />
              <span className="font-semibold text-foreground">CoffeeBot</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CoffeeBot. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
