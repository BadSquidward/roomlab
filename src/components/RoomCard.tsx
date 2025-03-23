
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface RoomCardProps {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
}

const RoomCard = ({ id, name, description, imageSrc }: RoomCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group rounded-lg overflow-hidden border border-border/50 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-serif text-xl font-medium mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-1">{description}</p>
        <Button
          onClick={() => navigate(`/design-generation/${id}`)}
          className="w-full"
        >
          Select Room
        </Button>
      </div>
    </motion.div>
  );
};

export default RoomCard;
