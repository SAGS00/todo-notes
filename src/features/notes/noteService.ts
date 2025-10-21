import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    onSnapshot,
    Timestamp,
    getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Note, CreateNoteInput, UpdateNoteInput } from "@/types";

export const createNote = async (userId: string, input: CreateNoteInput) => {
    const noteRef = collection(db, "notes");
    const docRef = await addDoc(noteRef, {
        ...input,
        userId,
        tags: input.tags || [],
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    });
    return docRef.id;
};

export const updateNote = async (noteId: string, input: UpdateNoteInput) => {
    const noteRef = doc(db, "notes", noteId);
    await updateDoc(noteRef, {
        ...input,
        updatedAt: Timestamp.now(),
    });
};

export const deleteNote = async (noteId: string) => {
    await deleteDoc(doc(db, "notes", noteId));
};

export const subscribeNotes = (
    userId: string,
    callback: (notes: Note[]) => void
) => {
    const q = query(
        collection(db, "notes"),
        where("userId", "==", userId),
        orderBy("updatedAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
        const notes: Note[] = [];
        snapshot.forEach((doc) => {
            notes.push({ id: doc.id, ...doc.data() } as Note);
        });
        callback(notes);
    });
};

export const getNotesByTag = async (
    userId: string,
    tag: string
): Promise<Note[]> => {
    const q = query(
        collection(db, "notes"),
        where("userId", "==", userId),
        where("tags", "array-contains", tag),
        orderBy("updatedAt", "desc")
    );

    const snapshot = await getDocs(q);
    const notes: Note[] = [];
    snapshot.forEach((doc) => {
        notes.push({ id: doc.id, ...doc.data() } as Note);
    });
    return notes;
};
