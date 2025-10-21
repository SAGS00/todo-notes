"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/features/auth/ProtectedRoute";
import {
    Todo,
    Note,
    TodoList,
    CreateTodoInput,
    UpdateTodoInput,
    CreateNoteInput,
    UpdateNoteInput,
} from "@/types";
import {
    subscribeTodos,
    createTodo,
    updateTodo,
    subscribeTodoLists,
    createTodoList,
} from "@/features/todos/todoService";
import {
    subscribeNotes,
    createNote,
    updateNote,
} from "@/features/notes/noteService";
import TodoItem from "@/features/todos/TodoItem";
import TodoForm from "@/features/todos/TodoForm";
import NoteItem from "@/features/notes/NoteItem";
import NoteForm from "@/features/notes/NoteForm";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Loader from "@/components/Loader";

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);
    const [todoLists, setTodoLists] = useState<TodoList[]>([]);
    const [loading, setLoading] = useState(true);
    const [isTodoFormOpen, setIsTodoFormOpen] = useState(false);
    const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [editingNote, setEditingNote] = useState<Note | null>(null);

    useEffect(() => {
        if (!user) return;

        const unsubTodos = subscribeTodos(user.uid, setTodos);
        const unsubNotes = subscribeNotes(user.uid, setNotes);
        const unsubLists = subscribeTodoLists(user.uid, (lists) => {
            setTodoLists(lists);
            // Create default list if none exist
            if (lists.length === 0) {
                createTodoList(user.uid, {
                    name: "Personal",
                    color: "#3b82f6",
                });
            }
            setLoading(false);
        });

        return () => {
            unsubTodos();
            unsubNotes();
            unsubLists();
        };
    }, [user]);

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    const handleCreateTodo = async (
        data: CreateTodoInput | UpdateTodoInput
    ) => {
        if (!user) return;
        await createTodo(user.uid, data as CreateTodoInput);
    };

    const handleUpdateTodo = async (
        data: CreateTodoInput | UpdateTodoInput
    ) => {
        if (!editingTodo) return;
        await updateTodo(editingTodo.id, data as UpdateTodoInput);
        setEditingTodo(null);
    };

    const handleCreateNote = async (
        data: CreateNoteInput | UpdateNoteInput
    ) => {
        if (!user) return;
        await createNote(user.uid, data as CreateNoteInput);
    };

    const handleUpdateNote = async (
        data: CreateNoteInput | UpdateNoteInput
    ) => {
        if (!editingNote) return;
        await updateNote(editingNote.id, data as UpdateNoteInput);
        setEditingNote(null);
    };

    const completedTodos = todos.filter((t) => t.completed).length;
    const pendingTodos = todos.filter((t) => !t.completed).length;
    const highPriorityTodos = todos.filter(
        (t) => t.priority === "high" && !t.completed
    ).length;

    if (loading) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center">
                    <Loader size="lg" />
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl font-bold">
                                    Dashboard
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    Welcome back,{" "}
                                    {user?.displayName || user?.email}
                                </p>
                            </div>
                            <Button variant="ghost" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Stats - Bento Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <Card
                            hover
                            className="bg-linear-to-br from-blue-50 to-blue-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">
                                        Pending Tasks
                                    </p>
                                    <p className="text-4xl font-bold">
                                        {pendingTodos}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                            </div>
                        </Card>

                        <Card
                            hover
                            className="bg-linear-to-br from-green-50 to-green-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">
                                        Completed
                                    </p>
                                    <p className="text-4xl font-bold">
                                        {completedTodos}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </Card>

                        <Card
                            hover
                            className="bg-linear-to-br from-red-50 to-red-100"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">
                                        High Priority
                                    </p>
                                    <p className="text-4xl font-bold">
                                        {highPriorityTodos}
                                    </p>
                                </div>
                                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Main Content - Bento Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Todos Section */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold">Tasks</h2>
                                <Button
                                    onClick={() => setIsTodoFormOpen(true)}
                                    size="sm"
                                >
                                    + New Task
                                </Button>
                            </div>

                            {todos.length === 0 ? (
                                <Card>
                                    <p className="text-gray-500 text-center py-8">
                                        No tasks yet. Create one to get started!
                                    </p>
                                </Card>
                            ) : (
                                <div className="space-y-3">
                                    {todos.slice(0, 10).map((todo) => (
                                        <TodoItem
                                            key={todo.id}
                                            todo={todo}
                                            onEdit={(todo) => {
                                                setEditingTodo(todo);
                                                setIsTodoFormOpen(true);
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Notes Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold">Notes</h2>
                                <Button
                                    onClick={() => setIsNoteFormOpen(true)}
                                    size="sm"
                                >
                                    + New Note
                                </Button>
                            </div>

                            {notes.length === 0 ? (
                                <Card>
                                    <p className="text-gray-500 text-center py-8">
                                        No notes yet. Create one!
                                    </p>
                                </Card>
                            ) : (
                                <div className="grid gap-4">
                                    {notes.slice(0, 6).map((note) => (
                                        <NoteItem
                                            key={note.id}
                                            note={note}
                                            onEdit={(note) => {
                                                setEditingNote(note);
                                                setIsNoteFormOpen(true);
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                {/* Forms */}
                <TodoForm
                    isOpen={isTodoFormOpen}
                    onClose={() => {
                        setIsTodoFormOpen(false);
                        setEditingTodo(null);
                    }}
                    onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
                    editTodo={editingTodo}
                    defaultListId={todoLists[0]?.id || ""}
                />

                <NoteForm
                    isOpen={isNoteFormOpen}
                    onClose={() => {
                        setIsNoteFormOpen(false);
                        setEditingNote(null);
                    }}
                    onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
                    editNote={editingNote}
                />
            </div>
        </ProtectedRoute>
    );
}
