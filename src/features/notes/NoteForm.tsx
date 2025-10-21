"use client";

import { useState, useEffect } from "react";
import { CreateNoteInput, UpdateNoteInput, Note } from "@/types";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Button from "@/components/Button";
import RichTextEditor from "./RichTextEditor";

interface NoteFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateNoteInput | UpdateNoteInput) => Promise<void>;
    editNote?: Note | null;
}

export default function NoteForm({
    isOpen,
    onClose,
    onSubmit,
    editNote,
}: NoteFormProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tagsInput, setTagsInput] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editNote) {
            setTitle(editNote.title);
            setContent(editNote.content);
            setTagsInput(editNote.tags?.join(", ") || "");
        } else {
            setTitle("");
            setContent("");
            setTagsInput("");
        }
    }, [editNote, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const tags = tagsInput
                .split(",")
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0);

            await onSubmit({ title, content, tags });
            onClose();
        } catch (error) {
            console.error("Error submitting note:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editNote ? "Edit Note" : "Create New Note"}
            size="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Title"
                    placeholder="Note title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                    </label>
                    <RichTextEditor content={content} onChange={setContent} />
                </div>

                <Input
                    label="Tags"
                    placeholder="work, ideas, important (comma separated)"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    fullWidth
                />

                <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" isLoading={loading}>
                        {editNote ? "Update" : "Create"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
