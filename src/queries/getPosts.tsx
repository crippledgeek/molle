import {queryOptions} from "@tanstack/react-query";
import {Post} from "../models/Post.ts";
import {jsonPlaceholderClient} from "../infrastructure/apiClients.ts";

const fetchPosts = async (): Promise<Post[]> => {
    const response = await jsonPlaceholderClient.get<Post[]>('/posts');
    return response.data;
};

export const getPosts = queryOptions(
    {
        queryKey: ['posts'],
        queryFn: fetchPosts,
    }
);