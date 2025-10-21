"use client";

import { useState } from "react";
import { Todo } from "@/types";
import { updateTodo, deleteTodo } from "./todoService";
import Card from "@/components/Card";
import { clsx } from "clsx";

interface TodoItemProps {
    todo: Todo;
    onEdit: (todo: Todo) => void;
}

export default function TodoItem({ todo, onEdit }: TodoItemProps) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleToggleComplete = async () => {
        setIsUpdating(true);
        try {
            await updateTodo(todo.id, { completed: !todo.completed });
        } catch (error) {
            console.error("Error toggling todo:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this todo?")) return;

        setIsDeleting(true);
        try {
            await deleteTodo(todo.id);
        } catch (error) {
            console.error("Error deleting todo:", error);
            setIsDeleting(false);
        }
    };

    const priorityColors = {
        low: "bg-green-100 text-green-700",
        medium: "bg-yellow-100 text-yellow-700",
        high: "bg-red-100 text-red-700",
    };

    return (
        <Card
            hover
            className={clsx(
                "transition-all duration-200",
                isDeleting && "opacity-50",
                todo.completed && "opacity-60"
            )}
        >
            <div className="flex items-start gap-4">
                <button
                    onClick={handleToggleComplete}
                    disabled={isUpdating}
                    className={clsx(
                        "mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                        todo.completed
                            ? "bg-black border-black"
                            : "border-gray-300 hover:border-black",
                        isUpdating && "opacity-50"
                    )}
                >
                    {todo.completed && (
                        <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <h3
                            className={clsx(
                                "font-semibold text-lg",
                                todo.completed && "line-through text-gray-500"
                            )}
                        >
                            {todo.title}
                        </h3>
                        <span
                            className={clsx(
                                "px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap",
                                priorityColors[todo.priority]
                            )}
                        >
                            {todo.priority}
                        </span>
                    </div>
                    {todo.description && (
                        <p
                            className={clsx(
                                "mt-1 text-gray-600 text-sm",
                                todo.completed && "line-through"
                            )}
                        >
                            {todo.description}
                        </p>
                    )}
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(todo)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </Card>
    );
}
