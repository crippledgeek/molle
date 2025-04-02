import { createFileRoute } from '@tanstack/react-router'
import { Posts } from "../components/Posts.tsx";
import { getPosts } from "../queries/getPosts.tsx";

export const Route = createFileRoute('/posts')({
    component: Posts,
    loader: async ({context: {queryClient}}) => {
        return await queryClient.ensureQueryData(getPosts);
    }
})