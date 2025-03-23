
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Heart, Maximize } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface DesignOptionProps {
  id: string;
  title: string;
  description?: string;
  imageSrc: string;
  tags?: string[];
  price?: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

const DesignOption = ({
  id,
  title,
  description,
  imageSrc,
  tags = [],
  price,
  isSelected = false,
  onSelect,
}: DesignOptionProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div
      className={`rounded-lg overflow-hidden border transition-all duration-300 h-full flex flex-col ${
        isSelected
          ? "border-primary shadow-lg ring-1 ring-primary/50"
          : "border-border/50 hover:border-border hover:shadow-md"
      }`}
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            className="p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
              }`}
            />
          </button>
          <Dialog>
            <DialogTrigger asChild>
              <button className="p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
                <Maximize className="h-4 w-4 text-gray-700" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 overflow-hidden">
              <img
                src={imageSrc}
                alt={title}
                className="w-full h-auto object-contain"
              />
            </DialogContent>
          </Dialog>
        </div>
        {tags.length > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-black/60 text-white border-none text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-lg font-medium">{title}</h3>
          {price && (
            <span className="text-sm font-mono">
              ${price.toLocaleString()}
            </span>
          )}
        </div>
        {description && (
          <p className="text-muted-foreground text-sm mb-4 flex-1">
            {description}
          </p>
        )}
        <Button
          className={`w-full mt-2 ${
            isSelected
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
          onClick={onSelect}
        >
          {isSelected ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Selected
            </>
          ) : (
            "Select Design"
          )}
        </Button>
      </div>
    </div>
  );
};

export default DesignOption;
