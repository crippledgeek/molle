import { useQuery } from '@tanstack/react-query';
import { jsonPlaceholderClient } from '../infrastructure/apiClients.ts';
import { Post } from '../models/Post';

const fetchPosts = async (): Promise<Post[]> => {
    const response = await jsonPlaceholderClient.get<Post[]>('/posts');
    return response.data;
};

export function Posts() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error fetching posts.</p>;

    return (
        <div>
            <h2>Posts</h2>
            <ul>
                {data?.map((post) => (
                    <li key={post.id} className="border p-2 my-2">
                        <strong>{post.title}</strong>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
