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

## 🧪 Running Tests

Currently, this project uses manual testing. To add automated tests:

### Setting Up Jest & React Testing Library

1. **Install testing dependencies**

    ```bash
    npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
    ```

2. **Create `jest.config.js`**

    ```javascript
    const nextJest = require("next/jest");

    const createJestConfig = nextJest({
        dirName: __dirname,
    });

    const customJestConfig = {
        setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
        testEnvironment: "jest-environment-jsdom",
        moduleNameMapper: {
            "^@/(.*)$": "<rootDir>/src/$1",
        },
    };

    module.exports = createJestConfig(customJestConfig);
    ```

3. **Run tests**

    ```bash
    npm test
    ```

### Manual Testing Checklist

-   ✅ **Authentication**: Sign up → Login → Logout flow
-   ✅ **Todos**: Create → Edit → Complete → Delete
-   ✅ **Lists**: Create new list → Switch between lists
-   ✅ **Notes**: Create → Edit with rich text → Add tags → Delete
-   ✅ **Real-time Updates**: Open in two browsers, verify sync
-   ✅ **Protected Routes**: Try accessing `/dashboard` while logged out

## 🚢 Deployment

### Deploy to Vercel (Recommended)

Vercel is the easiest platform for Next.js deployments:

1. **Push your code to GitHub**

    ```bash
    git add .
    git commit -m "Ready for deployment"
    git push origin main
    ```

2. **Deploy on Vercel**

    - Go to [vercel.com](https://vercel.com)
    - Click "Import Project"
    - Select your GitHub repository
    - Add environment variables:
        - `NEXT_PUBLIC_FIREBASE_API_KEY`
        - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
        - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
        - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
        - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
        - `NEXT_PUBLIC_FIREBASE_APP_ID`
    - Click "Deploy"

3. **Update Firebase settings**
    - Add your Vercel domain to Firebase Auth authorized domains
    - Update Firestore security rules if needed

### Deploy to Netlify

1. **Install Netlify CLI**

    ```bash
    npm install -g netlify-cli
    ```

2. **Build the project**

    ```bash
    npm run build
    ```

3. **Deploy**

    ```bash
    netlify deploy --prod
    ```

4. **Set environment variables** in Netlify dashboard

### Self-Hosted Deployment

1. **Build for production**

    ```bash
    npm run build
    ```

2. **Start production server**

    ```bash
    npm start
    ```

3. **Use a process manager** (PM2, systemd, or Docker)

    ```bash
    # Using PM2
    npm install -g pm2
    pm2 start npm --name "todo-notes" -- start
    ```

### Firebase Configuration for Production

1. **Create separate Firebase projects** for development and production
2. **Update security rules** to restrict access appropriately
3. **Enable required Firebase services**: Authentication, Firestore
4. **Set up Firestore indexes** (Firebase will prompt you in browser console)

## 🤝 How to Contribute

Contributions are welcome! Here's how to get started:

### Getting Started

1. **Fork the repository**

    Click the "Fork" button at the top right of this page.

2. **Clone your fork**

    ```bash
    git clone https://github.com/YOUR_USERNAME/todo-notes.git
    cd todo-notes
    ```

3. **Add upstream remote**

    ```bash
    git remote add upstream https://github.com/SAGS00/todo-notes.git
    ```

4. **Create a feature branch**

    ```bash
    git checkout -b feature/your-feature-name
    ```

### Development Workflow

1. **Install dependencies**

    ```bash
    npm install
    ```

2. **Set up environment variables**

    ```bash
    cp .env.local.example .env.local
    # Add your Firebase credentials
    ```

3. **Make your changes**

    - Follow the existing code style (TypeScript + ESLint)
    - Write clear, self-documenting code
    - Add comments for complex logic
    - Test your changes thoroughly

4. **Commit your changes**

    ```bash
    git add .
    git commit -m "feat: add amazing feature"
    ```

    **Commit message format**:

    - `feat:` New feature
    - `fix:` Bug fix
    - `docs:` Documentation changes
    - `style:` Code style changes (formatting, etc.)
    - `refactor:` Code refactoring
    - `test:` Adding or updating tests
    - `chore:` Maintenance tasks

5. **Push to your fork**

    ```bash
    git push origin feature/your-feature-name
    ```

6. **Create a Pull Request**
    - Go to your fork on GitHub
    - Click "Compare & pull request"
    - Describe your changes clearly
    - Wait for review

### Contribution Guidelines

-   **Code Quality**: Follow TypeScript best practices, use proper types
-   **Component Structure**: Keep components small and focused
-   **File Organization**: Follow the existing folder structure
-   **Naming Conventions**: Use descriptive names (camelCase for variables, PascalCase for components)
-   **Documentation**: Update README if adding new features
-   **No Breaking Changes**: Ensure backward compatibility
-   **Test Before PR**: Manually test all affected features

### Ideas for Contributions

-   🎨 **UI Improvements**: Better animations, themes, mobile UX
-   🧪 **Testing**: Add unit tests, integration tests, E2E tests
-   📱 **Features**: Calendar view, reminders, recurring tasks, search
-   ♿ **Accessibility**: ARIA labels, keyboard navigation, screen reader support
-   🌍 **Internationalization**: Multi-language support
-   🔔 **Notifications**: Browser notifications for due tasks
-   📊 **Analytics**: Task completion statistics, productivity insights
-   🎯 **Filters**: Filter todos by priority, date, list
-   🔍 **Search**: Full-text search across todos and notes
-   🎨 **Themes**: Dark mode, custom color schemes

### Code Review Process

1. All PRs require at least one review
2. Address reviewer feedback promptly
3. Keep PRs focused and reasonably sized
4. Be respectful and constructive in discussions

### Questions or Issues?

-   Open an issue for bugs or feature requests
-   Use discussions for questions and ideas
-   Tag issues appropriately (`bug`, `enhancement`, `question`)

## 📄 License

MIT License - feel free to use this project for learning or your portfolio!

---

Built with ❤️ using Next.js, TypeScript, and Firebase
