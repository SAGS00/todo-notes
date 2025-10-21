import { Timestamp } from "firebase/firestore";

export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    createdAt: Date;
}

export interface Todo {
    id: string;
    userId: string;
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    completed: boolean;
    listId: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface TodoList {
    id: string;
    userId: string;
    name: string;
    color?: string;
    icon?: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface Note {
    id: string;
    userId: string;
    title: string;
    content: string; // Rich text HTML
    tags: string[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

export interface CreateTodoInput {
    title: string;
    description: string;
    priority: "low" | "medium" | "high";
    listId: string;
}

export interface UpdateTodoInput {
    title?: string;
    description?: string;
    priority?: "low" | "medium" | "high";
    completed?: boolean;
    listId?: string;
}

export interface CreateNoteInput {
    title: string;
    content: string;
    tags?: string[];
}

export interface UpdateNoteInput {
    title?: string;
    content?: string;
    tags?: string[];
}

export interface CreateTodoListInput {
    name: string;
    color?: string;
    icon?: string;
}
