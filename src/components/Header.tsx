import { Link } from "@tanstack/react-router";
import React from "react";

interface HeaderProps {
    bgColor?: string;
}

const Header: React.FC<HeaderProps> = ({ bgColor = "bg-gray-100" }) => {
    return (
        <header className={`p-4 shadow-md ${bgColor}`}>
            <nav className="flex gap-4 text-gray-900">
                <Link to="/" className="font-medium hover:underline" activeProps={{ className: "font-bold" }}>
                    Home
                </Link>
                <Link to="/about" className="font-medium hover:underline" activeProps={{ className: "font-bold" }}>
                    About
                </Link>
                <Link to="/posts" className="font-medium hover:underline" activeProps={{ className: "font-bold" }}>
                    Posts
                </Link>
            </nav>
        </header>
    );
};

export default Header;
