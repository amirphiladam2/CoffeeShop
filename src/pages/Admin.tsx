import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Coffee, Plus, Trash2, Edit, ArrowLeft, Users, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Coffee {
  id: string;
  name: string;
  description: string;
  type: string;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
}

interface Stats {
  totalUsers: number;
  totalChats: number;
  totalCoffees: number;
}

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, totalChats: 0, totalCoffees: 0 });
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCoffee, setEditingCoffee] = useState<Coffee | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "Hot",
    category_id: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await Promise.all([loadCoffees(), loadCategories(), loadStats()]);
    } finally {
      setLoading(false);
    }
  };

  const loadCoffees = async () => {
    const { data, error } = await supabase
      .from("coffees")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    setCoffees(data || []);
  };

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) throw error;
    setCategories(data || []);
  };

  const loadStats = async () => {
    const [usersResult, chatsResult, coffeesResult] = await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("chat_history").select("*", { count: "exact", head: true }),
      supabase.from("coffees").select("*", { count: "exact", head: true }),
    ]);

    setStats({
      totalUsers: usersResult.count || 0,
      totalChats: chatsResult.count || 0,
      totalCoffees: coffeesResult.count || 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.category_id) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      if (editingCoffee) {
        const { error } = await supabase
          .from("coffees")
          .update(formData)
          .eq("id", editingCoffee.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Coffee updated successfully",
        });
      } else {
        const { error } = await supabase.from("coffees").insert(formData);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Coffee added successfully",
        });
      }

      setDialogOpen(false);
      resetForm();
      loadCoffees();
      loadStats();
    } catch (error: any) {
      console.error("Error saving coffee:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save coffee",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coffee?")) return;

    try {
      const { error } = await supabase.from("coffees").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Coffee deleted successfully",
      });

      loadCoffees();
      loadStats();
    } catch (error: any) {
      console.error("Error deleting coffee:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete coffee",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (coffee: Coffee) => {
    setEditingCoffee(coffee);
    setFormData({
      name: coffee.name,
      description: coffee.description || "",
      type: coffee.type,
      category_id: coffee.category_id || "",
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingCoffee(null);
    setFormData({
      name: "",
      description: "",
      type: "Hot",
      category_id: "",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm px-4 py-4">
        <div className="container mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Coffee className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Chats</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalChats}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Coffees</CardTitle>
              <Coffee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCoffees}</div>
            </CardContent>
          </Card>
        </div>

        {/* Coffee Management */}
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Coffee Management</CardTitle>
                <CardDescription>Add, edit, or remove coffee items</CardDescription>
              </div>
              <Dialog open={dialogOpen} onOpenChange={(open) => {
                setDialogOpen(open);
                if (!open) resetForm();
              }}>
                <DialogTrigger asChild>
                  <Button variant="hero">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Coffee
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingCoffee ? "Edit Coffee" : "Add New Coffee"}</DialogTitle>
                    <DialogDescription>
                      Fill in the details for the coffee item
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Caramel Latte"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe the coffee..."
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Hot">Hot</SelectItem>
                          <SelectItem value="Cold">Cold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category_id}
                        onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="flex-1" variant="hero">
                        {editingCoffee ? "Update" : "Add"} Coffee
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setDialogOpen(false);
                          resetForm();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coffees.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  No coffees yet. Add your first one!
                </p>
              ) : (
                coffees.map((coffee) => (
                  <div
                    key={coffee.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{coffee.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {coffee.description}
                      </p>
                      <span className="text-xs text-muted-foreground">{coffee.type}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(coffee)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(coffee.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
