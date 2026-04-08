import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useRetailData } from "@/hooks/useRetailData";
import StatsCards from "@/components/dashboard/StatsCards";
import CategoryChart from "@/components/dashboard/CategoryChart";
import CityProfitChart from "@/components/dashboard/CityProfitChart";
import TopProductsTable from "@/components/dashboard/TopProductsTable";
import CognosEmbed from "@/components/dashboard/CognosEmbed";
import { Button } from "@/components/ui/button";
import { ShoppingCart, LogOut } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { data, loading } = useRetailData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-bold text-foreground">FreshMart Analytics</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Welcome, <span className="text-foreground font-medium">{user?.name}</span>
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">FreshMart Retail Performance Overview</p>
        </div>

        <StatsCards data={data} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryChart data={data} />
          <CityProfitChart data={data} />
        </div>

        <CognosEmbed />

        <TopProductsTable data={data} />
      </main>
    </div>
  );
};

export default Dashboard;
