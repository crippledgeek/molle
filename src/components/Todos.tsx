import { useQuery } from '@tanstack/react-query';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    ColumnDef,
    SortingState,
    flexRender,
} from '@tanstack/react-table';
import { jsonPlaceholderClient } from '../infrastructure/apiClients';
import { Todo } from '../models/Todo';
import { useState } from 'react';

// Fetch Todos from API
const fetchTodos = async (): Promise<Todo[]> => {
    const response = await jsonPlaceholderClient.get<Todo[]>('/todos');
    return response.data;
};

export function Todos() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['todos'],
        queryFn: fetchTodos,
    });

    // State for sorting
    const [sorting, setSorting] = useState<SortingState>([]);

    // Define table columns with better sizing
    const columns: ColumnDef<Todo>[] = [
        {
            accessorKey: 'id',
            header: ({ column }) => (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="flex items-center gap-1"
                >
                    ID {column.getIsSorted() ? (column.getIsSorted() === 'asc' ? '🔼' : '🔽') : '↕'}
                </button>
            ),
            cell: (info) => info.getValue(),
            size: 80, // Small fixed width for ID
        },
        {
            accessorKey: 'title',
            header: ({ column }) => (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="flex items-center gap-1 w-full text-left"
                >
                    Title {column.getIsSorted() ? (column.getIsSorted() === 'asc' ? '🔼' : '🔽') : '↕'}
                </button>
            ),
            cell: (info) => <span className="text-gray-900">{info.getValue<string>()}</span>,
            minSize: 300, // Takes majority of space
        },
        {
            accessorKey: 'completed',
            header: ({ column }) => (
                <button
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="flex items-center gap-1"
                >
                    Status {column.getIsSorted() ? (column.getIsSorted() === 'asc' ? '🔼' : '🔽') : '↕'}
                </button>
            ),
            cell: (info) => {
                const completed = info.getValue<boolean>();
                return (
                    <span className={`px-3 py-1 text-sm rounded ${completed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                        {completed ? 'Completed' : 'Pending'}
                    </span>
                );
            },
            size: 150, // Status column medium width
        },
    ];

    // Initialize the table with data and sorting
    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
        onSortingChange: setSorting,
    });

    if (isLoading) return <p className="text-center text-blue-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error fetching todos.</p>;

    return (
        <div className="w-full max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Todos</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 table-auto">
                    <thead className="bg-gray-200 w-full">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="border border-gray-300 p-2 text-left">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="odd:bg-gray-100">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="border border-gray-300 p-2">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
