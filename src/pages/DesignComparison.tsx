
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DesignLayout from "@/components/DesignLayout";
import DesignOption from "@/components/DesignOption";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowRight, RefreshCw, Check } from "lucide-react";
import { motion } from "framer-motion";

const DesignComparison = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const roomNames: Record<string, string> = {
    "living-room": "Living Room",
    "bedroom": "Bedroom",
    "kitchen": "Kitchen",
    "dining-room": "Dining Room",
    "home-office": "Home Office",
    "bathroom": "Bathroom",
  };

  const handleRegenerateOptions = () => {
    setIsRegenerating(true);
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)), 
      {
        loading: "Generating new design options...",
        success: "New design options generated!",
        error: "Failed to generate new options",
      }
    );
    
    setTimeout(() => {
      setIsRegenerating(false);
    }, 2000);
  };

  const handleContinue = () => {
    if (!selectedDesign) {
      toast.error("Please select a design to continue");
      return;
    }
    
    navigate(`/boq-generation/${roomId}/${selectedDesign}`);
  };

  // Mock design options data
  const designOptions = [
    {
      id: "design1",
      title: "Modern Elegance",
      description: "A clean, contemporary design with sleek furniture and a monochrome palette accented with subtle color pops.",
      imageSrc: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80",
      tags: ["Modern", "Minimalist"],
      price: 8500,
    },
    {
      id: "design2",
      title: "Scandinavian Comfort",
      description: "A bright, airy space with light wood tones, functional furniture, and natural textiles for a cozy feel.",
      imageSrc: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Scandinavian", "Cozy"],
      price: 7200,
    },
    {
      id: "design3",
      title: "Industrial Chic",
      description: "An urban aesthetic with exposed elements, mixed metals, and vintage-inspired pieces for character.",
      imageSrc: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      tags: ["Industrial", "Urban"],
      price: 9100,
    },
  ];

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
      title={`Your ${roomNames[roomId || ""] || "Room"} Design Options`}
      description="Compare different design concepts and select your favorite to proceed with detailed planning."
      showBackButton={true}
    >
      <div className="flex justify-between mb-8">
        <div className="flex items-center">
          <Button
            variant="outline"
            onClick={handleRegenerateOptions}
            disabled={isRegenerating}
            className="flex items-center"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRegenerating ? "animate-spin" : ""}`} />
            Regenerate Options
          </Button>
        </div>
        <div>
          <Button 
            onClick={handleContinue}
            disabled={!selectedDesign}
            className="flex items-center"
          >
            Continue to BOQ
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {designOptions.map((design) => (
          <motion.div key={design.id} variants={item}>
            <DesignOption
              id={design.id}
              title={design.title}
              description={design.description}
              imageSrc={design.imageSrc}
              tags={design.tags}
              price={design.price}
              isSelected={selectedDesign === design.id}
              onSelect={() => setSelectedDesign(design.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {selectedDesign && (
        <motion.div 
          className="mt-10 p-6 bg-secondary rounded-lg border border-border/50 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center">
            <div className="bg-primary rounded-full p-2 mr-4">
              <Check className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium">Design Selected</h3>
              <p className="text-sm text-muted-foreground">
                Continue to generate your Bill of Quantities
              </p>
            </div>
          </div>
          <Button 
            onClick={handleContinue}
            className="flex items-center"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      )}
    </DesignLayout>
  );
};

export default DesignComparison;
