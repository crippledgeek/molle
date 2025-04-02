import { createFileRoute } from '@tanstack/react-router';
import { Todos } from '../components/Todos';
import {getTodos} from "../queries/getTodos.tsx";

export const Route = createFileRoute('/todos')({
    component: Todos,
    loader: async ({ context: { queryClient } }) => {
        return await queryClient.ensureQueryData(getTodos);
    }
});
