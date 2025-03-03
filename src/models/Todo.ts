export type Todo = {
    userId: number;    // ID of the user who owns the todo
    id: number;        // Unique ID of the todo
    title: string;     // Title of the todo task
    completed: boolean; // Whether the todo is completed (true/false)
}
