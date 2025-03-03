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
                {/* Pass custom color to Header */}
                <Header bgColor="bg-blue-500" />

                {/* Page Content */}
                <main className="flex-grow p-6">
                    <Outlet />
                </main>

                {/* DevTools */}
                <Suspense fallback={null}>
                    <TanStackRouterDevtools />
                </Suspense>
                {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
            </div>
        </QueryClientProvider>
    );
};

export default Layout;
