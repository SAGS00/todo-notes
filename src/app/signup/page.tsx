"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/features/auth/AuthContext";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signUp(email, password, displayName);
            router.push("/dashboard");
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to create account"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-4">
            <Card className="w-full max-w-md" padding="lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                    <p className="text-gray-600">
                        Start organizing your life today
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                            {error}
                        </div>
                    )}

                    <Input
                        type="text"
                        label="Display Name"
                        placeholder="John Doe"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        fullWidth
                        required
                    />

                    <Input
                        type="email"
                        label="Email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        required
                    />

                    <Input
                        type="password"
                        label="Password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        required
                    />

                    <Button
                        type="submit"
                        className="w-full"
                        isLoading={loading}
                    >
                        Sign Up
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-600">
                        Already have an account?{" "}
                    </span>
                    <Link
                        href="/login"
                        className="font-medium text-black hover:underline"
                    >
                        Sign In
                    </Link>
                </div>
            </Card>
        </div>
    );
}
