// Fetch Todos from API
import {jsonPlaceholderClient} from "../infrastructure/apiClients.ts";
import {Todo} from "../models/Todo.ts";
import {queryOptions} from "@tanstack/react-query";

const fetchTodos = async (): Promise<Todo[]> => {
    const response = await jsonPlaceholderClient.get<Todo[]>('/todos');
    return response.data;
};

export const getTodos= queryOptions(
    {
        queryKey: ['todos'],
        queryFn: fetchTodos,
    }
);