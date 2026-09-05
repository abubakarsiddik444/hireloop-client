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
import { Description, Radio, RadioGroup } from "@heroui/react";

import { Eye, EyeSlash } from "@gravity-ui/icons";
import { signUp } from "@/lib/auth-client";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("seeker"); // Default role

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

    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!form.password) {
      setError("Password is required.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!form.confirmPassword) {
      setError("Please confirm your password.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await signUp.email({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: role, 
        callbackURL: "/",
      });

      console.log("Signup data:", data);
      console.log("Signup error:", error);

      if (error) {
        setError(error.message || "Signup failed.");
        return;
      }

      setSuccess("Account created successfully!");

      setTimeout(() => {
        window.location.href = "/";
      }, 700);
    } catch (err) {
      console.error("Signup error:", err);
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

        {/* Signup Card */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-xl">

          {/* Heading */}
          <div className="mb-7 text-center">
            <h1 className="text-3xl font-bold">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Join HireLoop and start your journey today.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              {success}
            </div>
          )}

          <Form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <TextField
              name="name"
              isRequired
              className="w-full"
            >
              <Label className="text-sm font-medium text-gray-200">
                Full Name
              </Label>

              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                className="mt-2 w-full"
              />

              <FieldError />
            </TextField>

            {/* Email */}
            <TextField
              name="email"
              type="email"
              isRequired
              className="w-full"
            >
              <Label className="text-sm font-medium text-gray-200">
                Email
              </Label>

              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                className="mt-2 w-full"
              />

              <FieldError />
            </TextField>

            {/* Password */}
            <TextField
              name="password"
              isRequired
              className="w-full"
            >
              <Label className="text-sm font-medium text-gray-200">
                Password
              </Label>

              <div className="relative mt-2">
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  className="w-full pr-12"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-gray-400 transition hover:text-white"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeSlash size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <FieldError />
            </TextField>

            {/* Confirm Password */}
            <TextField
              name="confirmPassword"
              isRequired
              className="w-full"
            >
              <Label className="text-sm font-medium text-gray-200">
                Confirm Password
              </Label>

              <div className="relative mt-2">
                <Input
                  name="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  className="w-full pr-12"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center text-gray-400 transition hover:text-white"
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeSlash size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              <FieldError />
            </TextField>

            {/* Role Selection */}

            <div className="flex flex-col gap-4">
              <Label>Subscription plan</Label>
              <RadioGroup defaultValue="seeker" name="role" onChange={value => setRole(value)}

              orientation="horizontal">
                <Radio value="seeker">
                  <Radio.Content>
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Label>Job Seeker</Label>
                  </Radio.Content>
                </Radio>
                <Radio value="recruiter">
                  <Radio.Content>
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Label>Recruiter</Label>
                  </Radio.Content>
                </Radio>
                
              </RadioGroup>
            </div>



            {/* Submit Button */}
            <Button
              type="submit"
              isDisabled={loading}
              className="mt-2 h-12 w-full rounded-lg bg-gradient-to-r from-[#7956f5] to-[#6854ee] font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:opacity-90"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </Form>

          {/* Sign In */}
          <div className="mt-7 border-t border-white/10 pt-5 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?
            </p>

            <Link
              href="/auth/signin"
              className="mt-2 inline-block font-medium text-purple-400 transition hover:text-purple-300"
            >
              Sign in
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