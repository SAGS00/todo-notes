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
import {
    Todo,
    CreateTodoInput,
    UpdateTodoInput,
    TodoList,
    CreateTodoListInput,
} from "@/types";

// Todo Lists
export const createTodoList = async (
    userId: string,
    input: CreateTodoListInput
) => {
    const listRef = collection(db, "todoLists");
    const docRef = await addDoc(listRef, {
        ...input,
        userId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    });
    return docRef.id;
};

export const subscribeTodoLists = (
    userId: string,
    callback: (lists: TodoList[]) => void
) => {
    const q = query(
        collection(db, "todoLists"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
        const lists: TodoList[] = [];
        snapshot.forEach((doc) => {
            lists.push({ id: doc.id, ...doc.data() } as TodoList);
        });
        callback(lists);
    });
};

export const deleteTodoList = async (listId: string) => {
    await deleteDoc(doc(db, "todoLists", listId));
};

// Todos
export const createTodo = async (userId: string, input: CreateTodoInput) => {
    const todoRef = collection(db, "todos");
    const docRef = await addDoc(todoRef, {
        ...input,
        userId,
        completed: false,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
    });
    return docRef.id;
};

export const updateTodo = async (todoId: string, input: UpdateTodoInput) => {
    const todoRef = doc(db, "todos", todoId);
    await updateDoc(todoRef, {
        ...input,
        updatedAt: Timestamp.now(),
    });
};

export const deleteTodo = async (todoId: string) => {
    await deleteDoc(doc(db, "todos", todoId));
};

export const subscribeTodos = (
    userId: string,
    callback: (todos: Todo[]) => void
) => {
    const q = query(
        collection(db, "todos"),
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
        const todos: Todo[] = [];
        snapshot.forEach((doc) => {
            todos.push({ id: doc.id, ...doc.data() } as Todo);
        });
        callback(todos);
    });
};

export const getTodosByList = async (
    userId: string,
    listId: string
): Promise<Todo[]> => {
    const q = query(
        collection(db, "todos"),
        where("userId", "==", userId),
        where("listId", "==", listId),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    const todos: Todo[] = [];
    snapshot.forEach((doc) => {
        todos.push({ id: doc.id, ...doc.data() } as Todo);
    });
    return todos;
};
