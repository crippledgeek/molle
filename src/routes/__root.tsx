import { createRootRoute } from '@tanstack/react-router';
import { Link, Outlet } from '@tanstack/react-router';
import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

// Create a Query Client
const queryClient = new QueryClient();

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null
        : React.lazy(() =>
            import('@tanstack/router-devtools').then((res) => ({
                default: res.TanStackRouterDevtools,
            })),
        );

export const Route = createRootRoute({
    component: () => (
        <QueryClientProvider client={queryClient}>
            <>
                <div className="p-2 flex gap-2">
                    <Link to="/" className="font-medium hover:underline" activeProps={{ className: 'font-bold' }}>
                        Home
                    </Link>
                    <Link to="/about" className="font-medium hover:underline" activeProps={{ className: 'font-bold' }}>
                        About
                    </Link>
                    <Link to="/posts" className="font-medium hover:underline" activeProps={{ className: 'font-bold' }}>
                        Posts
                    </Link>
                </div>
                <hr />
                <Outlet />

                <Suspense fallback={null}>
                    <TanStackRouterDevtools />
                </Suspense>

                {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools />}
            </>
        </QueryClientProvider>
    ),
});
