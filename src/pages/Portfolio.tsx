
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DesignLayout from "@/components/DesignLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Clock, Coins } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Portfolio = () => {
  const { user, isAuthenticated } = useAuth();
  const [designs, setDesigns] = useState<any[]>([]);
  
  useEffect(() => {
    // In a real app, this would fetch from your backend
    if (isAuthenticated) {
      const mockDesigns = [
        {
          id: "design1",
          title: "Modern Living Room",
          date: "2025-03-28",
          thumbnail: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
          room: "living-room",
          style: "Modern",
        },
        {
          id: "design2",
          title: "Minimalist Bedroom",
          date: "2025-03-15",
          thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
          room: "bedroom",
          style: "Minimalist",
        }
      ];
      
      setDesigns(mockDesigns);
    }
  }, [isAuthenticated]);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  if (!isAuthenticated) {
    return (
      <DesignLayout 
        title="Design Showcase"
        description="Sign in to view your saved designs and manage your tokens."
        showBackButton={true}
      >
        <div className="flex flex-col items-center justify-center py-12">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Sign in Required</CardTitle>
              <CardDescription>
                You need to be signed in to view your design portfolio
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link to="/login">Sign In</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </DesignLayout>
    );
  }
  
  return (
    <DesignLayout
      title="Design Showcase"
      description="Browse your saved designs and manage your tokens."
      showBackButton={true}
    >
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Welcome, {user?.name || 'Designer'}</h2>
          <p className="text-muted-foreground">Manage your design portfolio and tokens</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="px-4 py-2 text-base flex items-center gap-2">
            <Coins className="h-4 w-4" />
            <span>{user?.tokens || 0} Tokens Available</span>
          </Badge>
          <Button asChild>
            <Link to="/tokens">Purchase Tokens</Link>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="designs" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="designs">Your Designs</TabsTrigger>
          <TabsTrigger value="history">Purchase History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="designs">
          {designs.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {designs.map((design) => (
                <motion.div key={design.id} variants={item}>
                  <Card>
                    <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                      <img 
                        src={design.thumbnail} 
                        alt={design.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{design.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {design.date}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{design.room}</Badge>
                        <Badge variant="outline">{design.style}</Badge>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No designs yet</h3>
              <p className="text-muted-foreground mb-6">
                Start creating new room designs to build your portfolio
              </p>
              <Button asChild>
                <Link to="/room-selection">Create New Design</Link>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Token Purchase History</CardTitle>
              <CardDescription>
                Record of your token purchases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">No purchase history yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Your token purchase records will appear here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DesignLayout>
  );
};

export default Portfolio;
