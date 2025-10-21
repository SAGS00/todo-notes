"use client";

import { Note } from "@/types";
import { deleteNote } from "./noteService";
import Card from "@/components/Card";
import { useState } from "react";
import { clsx } from "clsx";
import { Timestamp } from "firebase/firestore";

interface NoteItemProps {
    note: Note;
    onEdit: (note: Note) => void;
}

export default function NoteItem({ note, onEdit }: NoteItemProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this note?")) return;

        setIsDeleting(true);
        try {
            await deleteNote(note.id);
        } catch (error) {
            console.error("Error deleting note:", error);
            setIsDeleting(false);
        }
    };

    const formatDate = (timestamp: Timestamp | Date) => {
        if (!timestamp) return "";
        const date = timestamp instanceof Date ? timestamp : timestamp.toDate();
        return new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        }).format(date);
    };

    return (
        <Card
            hover
            className={clsx(
                "transition-all duration-200 h-full flex flex-col",
                isDeleting && "opacity-50"
            )}
            onClick={() => onEdit(note)}
        >
            <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-semibold text-lg line-clamp-1">
                    {note.title}
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
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

            <div
                className="prose prose-sm max-w-none text-gray-600 line-clamp-3 flex-1 mb-3"
                dangerouslySetInnerHTML={{ __html: note.content }}
            />

            <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100">
                <div className="flex gap-1 flex-wrap">
                    {note.tags?.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">
                    {formatDate(note.updatedAt)}
                </span>
            </div>
        </Card>
    );
}
