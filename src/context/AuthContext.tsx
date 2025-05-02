import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User, AuthContextType, RegisterData } from "../types";

// Create context with default values
export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => {},
    register: async () => {},
    logout: () => {},
    isAuthenticated: false,
    loading: true,
});

interface Props {
    children: ReactNode;
}

// Admin code for club owner registration
const ADMIN_CODE = "CLUB123";

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user data exists in localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Find user in localStorage
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const user = users.find((u: any) => u.email === email);

            if (!user || user.password !== password) {
                throw new Error("Invalid credentials");
            }

            // Remove password before storing in state and localStorage
            const { password: _, ...userWithoutPassword } = user;

            setUser(userWithoutPassword);
            localStorage.setItem("user", JSON.stringify(userWithoutPassword));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const register = async (userData: RegisterData) => {
        try {
            setLoading(true);

            // Verify admin code for club owners
            if (userData.isClubOwner) {
                if (!userData.adminCode || userData.adminCode !== ADMIN_CODE) {
                    throw new Error("Invalid admin code for club registration");
                }
            }

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Check if user already exists
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const existingUser = users.find(
                (u: any) => u.email === userData.email
            );

            if (existingUser) {
                throw new Error("User already exists");
            }

            // Create new user
            const newUser = {
                ...userData,
                id: `user-${Date.now()}`,
                createdAt: new Date().toISOString(),
            };

            // Add to users array
            users.push(newUser);
            localStorage.setItem("users", JSON.stringify(users));

            // Remove password and admin code before storing in state and localStorage
            const {
                password: _,
                adminCode: __,
                ...userWithoutPassword
            } = newUser;

            setUser(userWithoutPassword);
            localStorage.setItem("user", JSON.stringify(userWithoutPassword));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                isAuthenticated: !!user,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
