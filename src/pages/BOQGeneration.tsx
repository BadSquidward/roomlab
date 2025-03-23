
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DesignLayout from "@/components/DesignLayout";
import BOQTable from "@/components/BOQTable";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ArrowRight, CreditCard, CheckCircle, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const BOQGeneration = () => {
  const { roomId, designId } = useParams<{ roomId: string; designId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isPurchasing, setIsPurchasing] = useState(false);

  const roomNames: Record<string, string> = {
    "living-room": "Living Room",
    "bedroom": "Bedroom",
    "kitchen": "Kitchen",
    "dining-room": "Dining Room",
    "home-office": "Home Office",
    "bathroom": "Bathroom",
  };

  const designNames: Record<string, string> = {
    "design1": "Modern Elegance",
    "design2": "Scandinavian Comfort",
    "design3": "Industrial Chic",
  };

  const handlePrintBOQ = () => {
    toast.success("Preparing document for printing...");
    // In a real app, this would trigger the print dialog
  };

  const handleDownloadBOQ = () => {
    toast.success("Downloading BOQ as PDF...");
    // In a real app, this would download a PDF
  };

  const handleProceedToPurchase = () => {
    setIsPurchasing(true);
    
    // Simulate purchase processing
    setTimeout(() => {
      setIsPurchasing(false);
      toast.success("Order successfully placed!");
      
      // Show success and redirect to home after a short delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }, 2000);
  };

  // Mock furniture items data
  const furnitureItems = [
    {
      id: "item1",
      name: "Modern Sofa",
      description: "3-seater sofa with premium fabric upholstery",
      quantity: 1,
      price: 1299,
      category: "Seating",
      leadTime: "3-4 weeks",
    },
    {
      id: "item2",
      name: "Coffee Table",
      description: "Marble top with metal base",
      quantity: 1,
      price: 549,
      category: "Tables",
      leadTime: "2-3 weeks",
    },
    {
      id: "item3",
      name: "Floor Lamp",
      description: "Adjustable arm with integrated LED",
      quantity: 2,
      price: 229,
      category: "Lighting",
      leadTime: "1-2 weeks",
    },
    {
      id: "item4",
      name: "Area Rug",
      description: "Hand-woven wool blend, 5' x 7'",
      quantity: 1,
      price: 599,
      category: "Textiles",
      leadTime: "2 weeks",
    },
    {
      id: "item5",
      name: "Side Table",
      description: "Solid wood with drawer",
      quantity: 2,
      price: 299,
      category: "Tables",
      leadTime: "2-3 weeks",
    },
    {
      id: "item6",
      name: "Wall Art",
      description: "Set of 3 framed prints",
      quantity: 1,
      price: 349,
      category: "Décor",
      leadTime: "1 week",
    },
  ];

  return (
    <DesignLayout
      title={`${roomNames[roomId || ""] || "Room"} Design Details`}
      description={`Review and purchase your selected design: ${designNames[designId || ""] || "Selected Design"}`}
      showBackButton={true}
    >
      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="overview">Design Overview</TabsTrigger>
          <TabsTrigger value="details">Furniture Details</TabsTrigger>
          <TabsTrigger value="boq">Bill of Quantities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <div className="rounded-lg overflow-hidden border border-border">
                  <img
                    src={
                      designId === "design1"
                        ? "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                        : designId === "design2"
                        ? "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                        : "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    }
                    alt={designNames[designId || ""] || "Selected Design"}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-lg border border-border">
                  <h3 className="font-serif text-xl font-medium mb-4">
                    {designNames[designId || ""] || "Selected Design"}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {designId === "design1"
                      ? "A clean, contemporary design with sleek furniture and a monochrome palette accented with subtle color pops."
                      : designId === "design2"
                      ? "A bright, airy space with light wood tones, functional furniture, and natural textiles for a cozy feel."
                      : "An urban aesthetic with exposed elements, mixed metals, and vintage-inspired pieces for character."}
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-medium">Style</span>
                      <span>
                        {designId === "design1"
                          ? "Modern, Minimalist"
                          : designId === "design2"
                          ? "Scandinavian, Cozy"
                          : "Industrial, Urban"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-medium">Furniture Pieces</span>
                      <span>{furnitureItems.length}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border">
                      <span className="font-medium">Estimated Cost</span>
                      <span className="font-mono">
                        $
                        {furnitureItems
                          .reduce((sum, item) => sum + item.price * item.quantity, 0)
                          .toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="font-medium">Average Lead Time</span>
                      <span>2-3 weeks</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={() => setActiveTab("boq")}
                    className="w-full"
                  >
                    View Bill of Quantities
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => navigate(`/design-comparison/${roomId}`)}
                    className="w-full"
                  >
                    Back to Design Options
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="details" className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {furnitureItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-lg border border-border overflow-hidden"
                >
                  <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                    <img 
                      src={`https://source.unsplash.com/random/300x200/?${item.name.toLowerCase().replace(" ", "-")}`}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                    
                    <div className="flex justify-between text-sm">
                      <span>Quantity: {item.quantity}</span>
                      <span className="font-mono">${item.price.toLocaleString()}</span>
                    </div>
                    
                    <div className="mt-2 flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Lead time: {item.leadTime}</span>
                      <span className="inline-block px-2 py-1 bg-secondary text-xs rounded">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={() => setActiveTab("boq")}
                className="flex items-center"
              >
                Continue to BOQ
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="boq" className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <BOQTable 
              items={furnitureItems}
              onPrint={handlePrintBOQ}
              onDownload={handleDownloadBOQ}
            />
            
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <h3 className="font-medium text-lg mb-4">Ready to Purchase?</h3>
              <p className="text-muted-foreground mb-6">
                Review your Bill of Quantities carefully. Once you're satisfied, click the button below to proceed with your purchase.
                All items will be ordered from our approved suppliers and delivered according to the estimated lead times.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Quality Assurance</h4>
                    <p className="text-sm text-muted-foreground">
                      All furniture pieces are inspected for quality before delivery
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Reliable Delivery</h4>
                    <p className="text-sm text-muted-foreground">
                      Items shipped directly from suppliers with tracking information
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Professional Assembly</h4>
                    <p className="text-sm text-muted-foreground">
                      Optional assembly service available at checkout
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  className="w-full"
                  disabled={isPurchasing}
                  onClick={handleProceedToPurchase}
                >
                  {isPurchasing ? (
                    <>
                      <CreditCard className="mr-2 h-4 w-4 animate-pulse" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Proceed to Purchase
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </DesignLayout>
  );
};

export default BOQGeneration;
