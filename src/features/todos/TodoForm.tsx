"use client";

import { useState, useEffect } from "react";
import { CreateTodoInput, UpdateTodoInput, Todo } from "@/types";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import Button from "@/components/Button";

interface TodoFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateTodoInput | UpdateTodoInput) => Promise<void>;
    editTodo?: Todo | null;
    defaultListId: string;
}

export default function TodoForm({
    isOpen,
    onClose,
    onSubmit,
    editTodo,
    defaultListId,
}: TodoFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<"low" | "medium" | "high">(
        "medium"
    );
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editTodo) {
            setTitle(editTodo.title);
            setDescription(editTodo.description);
            setPriority(editTodo.priority);
        } else {
            setTitle("");
            setDescription("");
            setPriority("medium");
        }
    }, [editTodo, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = editTodo
                ? { title, description, priority }
                : { title, description, priority, listId: defaultListId };

            await onSubmit(data);
            onClose();
        } catch (error) {
            console.error("Error submitting todo:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editTodo ? "Edit Todo" : "Create New Todo"}
            size="md"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Title"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                />

                <Textarea
                    label="Description"
                    placeholder="Add more details..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    fullWidth
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority
                    </label>
                    <div className="flex gap-2">
                        {(["low", "medium", "high"] as const).map((p) => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => setPriority(p)}
                                className={`flex-1 px-4 py-2 rounded-xl border-2 transition-all ${
                                    priority === p
                                        ? "border-black bg-black text-white"
                                        : "border-gray-200 hover:border-gray-300"
                                }`}
                            >
                                {p.charAt(0).toUpperCase() + p.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={loading}>
                        {editTodo ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
