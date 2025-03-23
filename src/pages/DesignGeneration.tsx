
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DesignLayout from "@/components/DesignLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { 
  ArrowRight, 
  Loader2, 
  Home, 
  DollarSign, 
  Paintbrush 
} from "lucide-react";
import { motion } from "framer-motion";

const DesignGeneration = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    roomType: roomId || "",
    dimensions: { width: "", length: "" },
    ceilingHeight: "",
    budget: "medium",
    style: "",
    colorPreferences: "",
    existingFurniture: "",
    specialRequirements: "",
  });

  const roomNames: Record<string, string> = {
    "living-room": "Living Room",
    "bedroom": "Bedroom",
    "kitchen": "Kitchen",
    "dining-room": "Dining Room",
    "home-office": "Home Office",
    "bathroom": "Bathroom",
  };

  const styles = [
    { value: "modern", label: "Modern" },
    { value: "contemporary", label: "Contemporary" },
    { value: "minimalist", label: "Minimalist" },
    { value: "scandinavian", label: "Scandinavian" },
    { value: "industrial", label: "Industrial" },
    { value: "mid-century", label: "Mid-Century Modern" },
    { value: "traditional", label: "Traditional" },
    { value: "transitional", label: "Transitional" },
    { value: "bohemian", label: "Bohemian" },
    { value: "rustic", label: "Rustic" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDimensionChange = (dimension: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      dimensions: {
        ...prev.dimensions,
        [dimension]: value,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.dimensions.width || !formData.dimensions.length) {
      toast.error("Please enter room dimensions");
      return;
    }
    
    if (!formData.style) {
      toast.error("Please select a design style");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/design-comparison/${roomId}`);
    }, 2000);
  };

  return (
    <DesignLayout
      title={`Design Your ${roomNames[formData.roomType] || "Room"}`}
      description="Provide details about your room to generate personalized design options."
      showBackButton={true}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg border border-border p-8 shadow-sm"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center p-4 bg-secondary rounded-lg">
                <Home className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium">Room Information</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="width">Width (feet)</Label>
                  <Input
                    id="width"
                    type="number"
                    placeholder="e.g., 12"
                    value={formData.dimensions.width}
                    onChange={(e) => handleDimensionChange("width", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="length">Length (feet)</Label>
                  <Input
                    id="length"
                    type="number"
                    placeholder="e.g., 15"
                    value={formData.dimensions.length}
                    onChange={(e) => handleDimensionChange("length", e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ceiling-height">Ceiling Height (feet)</Label>
                <Input
                  id="ceiling-height"
                  type="number"
                  placeholder="e.g., 8"
                  value={formData.ceilingHeight}
                  onChange={(e) => handleInputChange("ceilingHeight", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center p-4 bg-secondary rounded-lg">
                <DollarSign className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium">Budget and Style</span>
              </div>
              
              <div className="space-y-2">
                <Label>Budget Range</Label>
                <div className="pt-2">
                  <Slider
                    defaultValue={[2]}
                    max={4}
                    step={1}
                    onValueChange={(value) => {
                      const budgetMap = ["low", "medium-low", "medium", "medium-high", "high"];
                      handleInputChange("budget", budgetMap[value[0]]);
                    }}
                  />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>Economy</span>
                    <span>Moderate</span>
                    <span>Premium</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="style">Design Style</Label>
                <Select 
                  value={formData.style} 
                  onValueChange={(value) => handleInputChange("style", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        {style.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center p-4 bg-secondary rounded-lg">
                <Paintbrush className="h-5 w-5 mr-3 text-primary" />
                <span className="font-medium">Design Preferences</span>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="color-preferences">Color Preferences</Label>
                <Textarea
                  id="color-preferences"
                  placeholder="E.g., I prefer earth tones, blues, or bright colors"
                  value={formData.colorPreferences}
                  onChange={(e) => handleInputChange("colorPreferences", e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="existing-furniture">Existing Furniture to Include</Label>
                <Textarea
                  id="existing-furniture"
                  placeholder="List any existing furniture pieces you want to keep"
                  value={formData.existingFurniture}
                  onChange={(e) => handleInputChange("existingFurniture", e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="special-requirements">Special Requirements</Label>
                <Textarea
                  id="special-requirements"
                  placeholder="Any specific needs or preferences, e.g., pet-friendly, child-safe, etc."
                  value={formData.specialRequirements}
                  onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Designs...
                </>
              ) : (
                <>
                  Generate Design Options
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </DesignLayout>
  );
};

export default DesignGeneration;
