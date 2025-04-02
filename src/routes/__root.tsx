import {createRootRouteWithContext} from "@tanstack/react-router";
import Layout from "../components/Layout";
import {QueryClient} from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{queryClient: QueryClient}>()({
    component: Layout,
});