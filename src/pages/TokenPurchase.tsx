
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DesignLayout from "@/components/DesignLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Coins } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { motion } from "framer-motion";

const TokenPurchase = () => {
  const navigate = useNavigate();
  const { user, purchaseTokens, isAuthenticated } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }
  
  const tokenPackages = [
    { id: "basic", name: "Basic", tokens: 5, price: 9.99, popular: false },
    { id: "standard", name: "Standard", tokens: 15, price: 24.99, popular: true },
    { id: "premium", name: "Premium", tokens: 50, price: 69.99, popular: false },
  ];
  
  const handlePurchase = async (packageId: string, tokens: number) => {
    setIsProcessing(true);
    
    try {
      // In a real app, this would connect to a payment processor
      setTimeout(async () => {
        await purchaseTokens(tokens);
        toast.success(`Successfully purchased ${tokens} design tokens!`);
        navigate("/portfolio");
      }, 1500);
    } catch (error) {
      toast.error("Purchase failed. Please try again.");
      setIsProcessing(false);
    }
  };
  
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
  
  return (
    <DesignLayout
      title="Purchase Design Tokens"
      description="Get tokens to generate new AI designs for your spaces"
      showBackButton={true}
    >
      <div className="mb-8">
        <div className="flex items-center justify-center mb-6">
          <Badge variant="outline" className="px-4 py-2 text-base flex items-center gap-2">
            <Coins className="h-4 w-4" />
            <span>Current Balance: {user?.tokens || 0} Tokens</span>
          </Badge>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Choose a Token Package</h2>
            <p className="text-muted-foreground mt-2">
              Each design generation requires 1 token
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {tokenPackages.map((pkg) => (
              <motion.div key={pkg.id} variants={item} className="flex">
                <Card className={`flex flex-col flex-1 ${pkg.popular ? 'border-primary shadow-md' : ''}`}>
                  {pkg.popular && (
                    <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{pkg.name} Package</CardTitle>
                    <CardDescription>
                      {pkg.tokens} design tokens
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="text-center">
                      <span className="text-3xl font-bold">${pkg.price}</span>
                      <p className="text-muted-foreground text-sm mt-1">
                        ${(pkg.price / pkg.tokens).toFixed(2)} per token
                      </p>
                    </div>
                    
                    <ul className="mt-6 space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>{pkg.tokens} AI design generations</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>Access to all room types</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>Design comparison</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                        <span>Material specifications</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full" 
                      onClick={() => handlePurchase(pkg.id, pkg.tokens)}
                      disabled={isProcessing}
                      variant={pkg.popular ? "default" : "outline"}
                    >
                      {isProcessing ? "Processing..." : `Purchase for $${pkg.price}`}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center mt-8 text-sm text-muted-foreground">
            Tokens never expire. A secure payment processing system is used for all transactions.
          </div>
        </div>
      </div>
    </DesignLayout>
  );
};

export default TokenPurchase;
