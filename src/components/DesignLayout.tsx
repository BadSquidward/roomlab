
import React from "react";
import Navbar from "./Navbar";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface DesignLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  showBackButton?: boolean;
  className?: string;
}

const DesignLayout: React.FC<DesignLayoutProps> = ({
  children,
  title,
  description,
  showBackButton = false,
  className = "",
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-28 pb-16">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="mb-10 space-y-3">
            {showBackButton && (
              <Button
                variant="ghost"
                className="inline-flex items-center text-muted-foreground hover:text-foreground -ml-2 mb-2"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back
              </Button>
            )}
            <h1 className="text-3xl md:text-4xl font-serif font-medium">{title}</h1>
            {description && (
              <p className="text-muted-foreground text-lg max-w-3xl">
                {description}
              </p>
            )}
          </div>
          <div className={className}>{children}</div>
        </div>
      </main>
      <footer className="border-t py-8 bg-secondary">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="font-serif text-lg">Interior Synergy</p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">
              © {new Date().getFullYear()} Interior Synergy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DesignLayout;
