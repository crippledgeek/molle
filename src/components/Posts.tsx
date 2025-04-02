import {useSuspenseQuery} from '@tanstack/react-query';
import {getPosts} from "../queries/getPosts.tsx";



export function Posts() {
    const {data, error, isLoading} = useSuspenseQuery(getPosts);

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
