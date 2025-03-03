import React, { Suspense } from "react";
import { Link, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
            <div className="p-4">
                {/* Navigation */}
                <nav className="mb-4 flex gap-4">
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
                <hr />

                {/* Render child routes */}
                <Outlet />

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
