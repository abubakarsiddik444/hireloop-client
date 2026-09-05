"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { signIn } from "@/lib/auth-client";

export default function SigninPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validation
    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!form.password) {
      setError("Password is required.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await signIn.email({
        email: form.email.trim(),
        password: form.password,
      });

      console.log("Signin data:", data);
      console.log("Signin error:", error);

      if (error) {
        setError(error.message || "Sign in failed.");
        return;
      }

      setSuccess("Signed in successfully!");

      window.location.href = "/";
    } catch (err) {
      console.error("Signin error:", err);
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090b] px-5 py-12 text-white">
      <div className="mx-auto w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-3xl font-bold tracking-[-1.5px]"
          >
            <span className="text-[#1683e8]">hire</span>
            <span className="text-[#ff6b00]">loop</span>
          </Link>
        </div>

        {/* Sign In Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">

          {/* Heading */}
          <h1 className="mb-2 text-center text-3xl font-bold">
            Welcome back
          </h1>

          <p className="mb-6 text-center text-sm text-gray-400">
            Sign in to continue to HireLoop.
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-4 rounded-lg border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-400">
              {success}
            </div>
          )}

          {/* Form */}
          <Form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <TextField
              name="email"
              type="email"
              isRequired
              className="w-full"
            >
              <Label className="text-sm font-medium text-white">
                Email
              </Label>

              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                className="mt-2 h-12 w-full"
              />

              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
              name="password"
              isRequired
              className="w-full"
            >
              <div className="mb-2 flex items-center justify-between">
                <Label className="text-sm font-medium text-white">
                  Password
                </Label>

                <Link
                  href="/forgot-password"
                  className="text-xs text-purple-400 transition hover:text-purple-300"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className="h-12 w-full pr-16"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-purple-400 transition hover:text-purple-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <FieldError />
            </TextField>

            {/* Submit Button */}
            <Button
              type="submit"
              isDisabled={loading}
              className="h-12 w-full rounded-lg bg-gradient-to-r from-[#7956f5] to-[#6854ee] font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:opacity-90"
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>

          </Form>

          {/* Signup */}
          <div className="mt-6 border-t border-white/10 pt-5 text-center">

            <p className="text-sm text-gray-400">
              New to HireLoop?
            </p>

            <Link
              href="/auth/signup"
              className="mt-2 inline-block font-medium text-purple-400 transition hover:text-purple-300"
            >
              Create an account
            </Link>

          </div>
        </div>

        {/* Back Home */}
        <div className="mt-5 text-center">
          <Link
            href="/"
            className="text-sm text-gray-500 transition hover:text-gray-300"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}