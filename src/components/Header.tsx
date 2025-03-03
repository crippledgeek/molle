import { Link } from "@tanstack/react-router";
import React from "react";

interface HeaderProps {
    bgColor?: string;       // Background color (e.g., "bg-blue-500")
    textColor?: string;     // Text color (e.g., "text-white")
    borderRadius?: string;  // Border radius (e.g., "rounded-lg", "rounded-full")
    showBorder?: boolean;   // Adds bottom border if true
    className?: string;     // Additional custom classes
    children?: React.ReactNode; // Allows extra content (e.g., buttons)
}

const Header: React.FC<HeaderProps> = ({
                                           bgColor = "bg-gray-100",
                                           textColor = "text-gray-900",
                                           borderRadius = "rounded-none",
                                           showBorder = false,
                                           className = "",
                                           children,
                                       }) => {
    return (
        <header className={`p-4 shadow-md ${bgColor} ${textColor} ${borderRadius} ${showBorder ? "border-b" : ""} ${className}`}>
            <div className="flex justify-between items-center">
                <nav className="flex gap-4">
                    <Link to="/" className="font-medium hover:underline" activeProps={{ className: "font-bold" }}>
                        Home
                    </Link>
                    <Link to="/about" className="font-medium hover:underline" activeProps={{ className: "font-bold" }}>
                        About
                    </Link>
                    <Link to="/posts" className="font-medium hover:underline" activeProps={{ className: "font-bold" }}>
                        Posts
                    </Link>
                    <Link to="/todos" className="font-medium hover:underline" activeProps={{ className: "font-bold" }}>
                        Todos
                    </Link>
                </nav>

                {children && <div>{children}</div>}
            </div>
        </header>
    );
};

export default Header;
