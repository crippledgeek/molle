import React, { Suspense } from "react";
import {Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "./Header.tsx";

// Create a Query Client
const queryClient = new QueryClient();

// Lazy-load TanStack Router Devtools (only in development)
const TanStackRouterDevtools =
    process.env.NODE_ENV === "production"
        ? () => null
        : React.lazy(() =>
            import("@tanstack/router-devtools").then((res) => ({
                default: res.TanStackRouterDevtools,
            }))
        );

const Layout = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen flex flex-col">
                <Header bgColor="bg-blue-500" textColor="text-white" borderRadius="rounded-lg" showBorder>
                    {/* Example: Adding a Login Button */}
                    <button className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200">
                        Login
                    </button>
                </Header>


                <main className="flex-grow p-6">
                    <Outlet />
                </main>

                <Suspense fallback={null}>
                    <TanStackRouterDevtools />
                </Suspense>
                {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
            </div>
        </QueryClientProvider>
    );
};

export default Layout;
