import { createFileRoute } from '@tanstack/react-router'
import {Posts} from "../components/Posts.tsx";

export const Route = createFileRoute('/posts')({
    component: Posts,
})

