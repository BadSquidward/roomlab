
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define the user type
interface User {
  id: string;
  name: string;
  email: string;
  tokens: number;
}

// Define the auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  purchaseTokens: (amount: number) => Promise<void>;
  useDesignToken: () => Promise<boolean>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the auth provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem("roomlab_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("roomlab_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("roomlab_user");
    }
  }, [user]);

  // Login function
  const login = async (email: string, password: string) => {
    // In a real app, this would call your auth API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (email && password) {
          // Check localStorage for existing user
          const storedUsers = JSON.parse(localStorage.getItem("roomlab_users") || "[]");
          const existingUser = storedUsers.find((u: any) => u.email === email);
          
          if (existingUser && existingUser.password === password) {
            const { password, ...userWithoutPassword } = existingUser;
            setUser(userWithoutPassword);
            resolve();
          } else {
            reject(new Error("Invalid credentials"));
          }
        } else {
          reject(new Error("Email and password are required"));
        }
      }, 1000);
    });
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    // In a real app, this would call your auth API
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (name && email && password) {
          // Check for existing users
          const storedUsers = JSON.parse(localStorage.getItem("roomlab_users") || "[]");
          const existingUser = storedUsers.find((u: any) => u.email === email);
          
          if (existingUser) {
            reject(new Error("User already exists"));
            return;
          }
          
          // Create new user with 3 free tokens
          const newUser = {
            id: `user-${Date.now()}`,
            name,
            email,
            password,
            tokens: 3,
            created: new Date().toISOString(),
          };
          
          // Save to "database"
          storedUsers.push(newUser);
          localStorage.setItem("roomlab_users", JSON.stringify(storedUsers));
          
          // Log user in (without password)
          const { password: _, ...userWithoutPassword } = newUser;
          setUser(userWithoutPassword);
          resolve();
        } else {
          reject(new Error("All fields are required"));
        }
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Purchase tokens function
  const purchaseTokens = async (amount: number) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (user) {
          // Update user tokens
          const updatedUser = {
            ...user,
            tokens: user.tokens + amount,
          };
          setUser(updatedUser);
          
          // Update in "database"
          const storedUsers = JSON.parse(localStorage.getItem("roomlab_users") || "[]");
          const updatedUsers = storedUsers.map((u: any) => 
            u.id === user.id ? { ...u, tokens: u.tokens + amount } : u
          );
          localStorage.setItem("roomlab_users", JSON.stringify(updatedUsers));
          
          // Record purchase in history
          const purchaseHistory = JSON.parse(localStorage.getItem("roomlab_purchases") || "[]");
          purchaseHistory.push({
            id: `purchase-${Date.now()}`,
            userId: user.id,
            amount: amount,
            cost: amount === 5 ? 9.99 : amount === 15 ? 24.99 : 69.99,
            date: new Date().toISOString()
          });
          localStorage.setItem("roomlab_purchases", JSON.stringify(purchaseHistory));
          
          resolve();
        } else {
          reject(new Error("User not authenticated"));
        }
      }, 1000);
    });
  };

  // Use a design token function
  const useDesignToken = async () => {
    return new Promise<boolean>((resolve, reject) => {
      if (!user) {
        reject(new Error("User not authenticated"));
        return;
      }
      
      if (user.tokens <= 0) {
        resolve(false);
        return;
      }
      
      // Deduct token
      const updatedUser = {
        ...user,
        tokens: user.tokens - 1,
      };
      setUser(updatedUser);
      
      // Update in "database"
      const storedUsers = JSON.parse(localStorage.getItem("roomlab_users") || "[]");
      const updatedUsers = storedUsers.map((u: any) => 
        u.id === user.id ? { ...u, tokens: u.tokens - 1 } : u
      );
      localStorage.setItem("roomlab_users", JSON.stringify(updatedUsers));
      
      // Record token usage
      const tokenUsage = JSON.parse(localStorage.getItem("roomlab_token_usage") || "[]");
      tokenUsage.push({
        id: `usage-${Date.now()}`,
        userId: user.id,
        date: new Date().toISOString()
      });
      localStorage.setItem("roomlab_token_usage", JSON.stringify(tokenUsage));
      
      resolve(true);
    });
  };

  // Create the context value
  const value = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    purchaseTokens,
    useDesignToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// Create the custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
