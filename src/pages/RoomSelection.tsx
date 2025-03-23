
import { useNavigate } from "react-router-dom";
import DesignLayout from "@/components/DesignLayout";
import RoomCard from "@/components/RoomCard";
import { motion } from "framer-motion";

const RoomSelection = () => {
  const navigate = useNavigate();

  const rooms = [
    {
      id: "living-room",
      name: "Living Room",
      description: "Create a welcoming space for relaxation and entertainment.",
      imageSrc: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "bedroom",
      name: "Bedroom",
      description: "Design a serene retreat for rest and rejuvenation.",
      imageSrc: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "kitchen",
      name: "Kitchen",
      description: "Craft a functional and stylish space for cooking and gathering.",
      imageSrc: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "dining-room",
      name: "Dining Room",
      description: "Create an elegant space for memorable meals and gatherings.",
      imageSrc: "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "home-office",
      name: "Home Office",
      description: "Design a productive and inspiring workspace at home.",
      imageSrc: "https://images.unsplash.com/photo-1593476550610-87baa860004a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "bathroom",
      name: "Bathroom",
      description: "Transform your bathroom into a spa-like sanctuary.",
      imageSrc: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  return (
    <DesignLayout 
      title="Select Your Room"
      description="Choose the space you want to design and provide basic information. We'll generate multiple design options tailored to your preferences."
      showBackButton={true}
    >
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            id={room.id}
            name={room.name}
            description={room.description}
            imageSrc={room.imageSrc}
          />
        ))}
      </motion.div>
    </DesignLayout>
  );
};

export default RoomSelection;
