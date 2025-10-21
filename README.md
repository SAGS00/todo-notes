# 📝 Modern Todo + Notes Manager

A clean, scalable productivity app built with Next.js 15, TypeScript, Firebase, and Tailwind CSS. This project demonstrates professional React architecture, Firebase CRUD operations, and modern UI/UX principles.

![Tech Stack](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Firebase](https://img.shields.io/badge/Firebase-12-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan)

## ✨ Features

### 🔐 Authentication

-   **Email + Password Sign-in/Sign-up** using Firebase Auth
-   **Protected Routes** - Unauthenticated users are redirected to `/login`
-   Persistent authentication state across sessions

### ✅ Todo Management

-   **Full CRUD Operations** with Firestore
-   **Multiple Lists** support (Work, Personal, etc.)
-   **Priority Levels**: Low, Medium, High
-   **Task Properties**: Title, description, priority, completion status
-   Real-time updates using Firestore listeners
-   Toggle completion status
-   Edit and delete tasks

### 📓 Notes Section

-   **Rich Text Editor** powered by TipTap
-   Full CRUD operations
-   **Tag Support** for organization (#work, #ideas, etc.)
-   Real-time synchronization
-   Beautiful card-based layout

### 📊 Dashboard

-   **Bento-style Layout** - Modern card-based design
-   **Statistics Overview**:
    -   Pending tasks count
    -   Completed tasks count
    -   High priority tasks count
-   Combined view of todos and notes
-   Responsive design for all screen sizes

## 🏗️ Architecture

### Folder Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── dashboard/         # Dashboard page
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── layout.tsx         # Root layout with AuthProvider
│   ├── page.tsx           # Home/redirect page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── Button.tsx         # Customizable button with variants
│   ├── Card.tsx           # Card container component
│   ├── Input.tsx          # Form input with label & error
│   ├── Textarea.tsx       # Textarea with label & error
│   ├── Modal.tsx          # Modal dialog component
│   └── Loader.tsx         # Loading spinner
├── features/              # Feature-based modules
│   ├── auth/
│   │   ├── AuthContext.tsx      # Auth state management
│   │   └── ProtectedRoute.tsx   # Route protection HOC
│   ├── todos/
│   │   ├── todoService.ts       # Firestore CRUD operations
│   │   ├── TodoItem.tsx         # Individual todo component
│   │   └── TodoForm.tsx         # Todo create/edit form
│   └── notes/
│       ├── noteService.ts       # Firestore CRUD operations
│       ├── NoteItem.tsx         # Individual note component
│       ├── NoteForm.tsx         # Note create/edit form
│       └── RichTextEditor.tsx   # TipTap rich text editor
├── lib/
│   └── firebase.ts        # Firebase initialization & config
├── types/
│   └── index.ts          # TypeScript type definitions
└── hooks/                # Custom React hooks (future)
```

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+ and npm
-   Firebase project with Firestore and Authentication enabled

### Installation

1. **Clone the repository**

    ```bash
    git clone <your-repo-url>
    cd todo-notes
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    Copy `.env.local.example` to `.env.local`:

    ```bash
    cp .env.local.example .env.local
    ```

    Update `.env.local` with your Firebase credentials

4. **Configure Firebase**

    In your Firebase console:

    - Enable **Email/Password** authentication
    - Create a **Firestore** database
    - Set up Firestore security rules (see below)

5. **Run the development server**

    ```bash
    npm run dev
    ```

6. **Open your browser**
    ```
    http://localhost:3000
    ```

### Firebase Security Rules

Add these rules to your Firestore database:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Todos
    match /todos/{todoId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }

    // Todo Lists
    match /todoLists/{listId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }

    // Notes
    match /notes/{noteId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## 🎨 UI/UX Highlights

-   **Bento-style Layout**: Modern card-based design inspired by Apple Notes and Notion
-   **Custom Cursor**: Subtle cursor changes for better UX
-   **Hover Effects**: Smooth transitions on interactive elements
-   **Mobile Responsive**: Fully responsive across all device sizes
-   **Clean Typography**: Large readable fonts with proper spacing
-   **Consistent Theming**: Unified color scheme and design system
-   **Smooth Animations**: Fade-in effects and transitions
-   **Custom Scrollbar**: Styled scrollbars for better aesthetics

## 🛠️ Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript 5
-   **Styling**: Tailwind CSS 4
-   **Backend**: Firebase (Firestore + Auth)
-   **Rich Text**: TipTap (Headless editor)
-   **State Management**: React Context API
-   **Utilities**: clsx for conditional classes

## 📦 Key Dependencies

```json
{
    "firebase": "^12.4.0",
    "next": "15.5.6",
    "react": "19.1.0",
    "@tiptap/react": "^2.10.5",
    "@tiptap/starter-kit": "^2.10.5",
    "clsx": "^2.1.1",
    "tailwindcss": "^4"
}
```

## 📄 License

MIT License - feel free to use this project for learning or your portfolio!

---

Built with ❤️ using Next.js, TypeScript, and Firebase
