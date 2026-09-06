"use client";

import { useState } from "react";
import {
    Button,
    FieldError,
    Fieldset,
    Form,
    Input,
    Label,
    ListBox,
    Select,
    Switch,
    TextArea,
    TextField,
} from "@heroui/react";
import { ChevronsExpandVertical } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const initialData = {
    title: "",
    category: "",
    type: "",
    min: "",
    max: "",
    currency: "",
    location: "",
    remote: false,
    deadline: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
};

const categories = [
    ["development", "Software Development"],
    ["design", "Design"],
    ["marketing", "Marketing"],
    ["sales", "Sales"],
    ["finance", "Finance"],
    ["other", "Other"],
];

const types = [
    ["full-time", "Full-time"],
    ["part-time", "Part-time"],
    ["contract", "Contract"],
    ["internship", "Internship"],
];

const SelectBox = ({ items, value, onChange, placeholder }) => (
    <Select value={value} onChange={onChange}>
        <Select.Trigger className="h-10 rounded-md border border-white/10 bg-[#202021] px-3 text-sm text-gray-300">
            <Select.Value placeholder={placeholder} />
            <Select.Indicator>
                <ChevronsExpandVertical size={14} />
            </Select.Indicator>
        </Select.Trigger>

        <Select.Popover>
            <ListBox>
                {items.map(([id, label]) => (
                    <ListBox.Item key={id} id={id} textValue={label}>
                        {label}
                    </ListBox.Item>
                ))}
            </ListBox>
        </Select.Popover>
    </Select>
);

export default function PostJobPage() {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);

    // Company ID
    const companyId = "company_123";

    const update = (key, value) => {
        setData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const input =
        "h-10 rounded-md border border-white/10 bg-[#202021] px-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/25";

    const textarea =
        "min-h-[80px] resize-none rounded-md border border-white/10 bg-[#202021] px-3 py-2 text-sm text-white outline-none placeholder:text-gray-500";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    companyId,

                    ...data,

                    min: Number(data.min) || 0,
                    max: Number(data.max) || 0,

                    status: "active",
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message);
            }

            toast.success("Job posted successfully!");

            setData(initialData);

            redirect("/dashboard/recruiter");
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to post job!");
        } finally {
            setLoading(false);
            redirect("/dashboard/recruiter/jobs");
        }
    };

    return (
        <div className="min-h-screen bg-[#111112] px-4 py-5 text-white sm:px-6">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-white/10 bg-[#151516]">

                <div className="border-b border-white/10 px-5 py-5">
                    <h1 className="text-xl font-medium">
                        Post a New Job
                    </h1>

                    <p className="mt-1 text-xs text-gray-400">
                        Create a job posting and find the right candidate.
                    </p>
                </div>

                <Form onSubmit={handleSubmit}>

                    {/* Job Info */}
                    <Fieldset className="border-0 p-0">
                        <Fieldset.Legend className="border-b border-white/10 px-5 py-3 text-sm font-medium">
                            Job Info
                        </Fieldset.Legend>

                        <Fieldset.Group className="grid grid-cols-1 gap-4 px-5 py-5 md:grid-cols-2">

                            {/* Title */}
                            <TextField
                                isRequired
                                value={data.title}
                                onChange={(v) => update("title", v)}
                            >
                                <Label className="mb-1.5 text-xs">
                                    Job Title
                                </Label>

                                <Input
                                    placeholder="e.g. Frontend Developer"
                                    className={input}
                                />

                                <FieldError />
                            </TextField>

                            {/* Category */}
                            <div>
                                <Label className="mb-1.5 block text-xs">
                                    Job Category
                                </Label>

                                <SelectBox
                                    items={categories}
                                    value={data.category}
                                    onChange={(v) =>
                                        update("category", v)
                                    }
                                    placeholder="Select category"
                                />
                            </div>

                            {/* Type */}
                            <div>
                                <Label className="mb-1.5 block text-xs">
                                    Job Type
                                </Label>

                                <SelectBox
                                    items={types}
                                    value={data.type}
                                    onChange={(v) =>
                                        update("type", v)
                                    }
                                    placeholder="Select job type"
                                />
                            </div>

                            {/* Salary */}
                            <div>
                                <label className="mb-1.5 block text-xs">
                                    Salary Range
                                </label>

                                <div className="grid grid-cols-3 gap-2">
                                    <Input
                                        type="number"
                                        placeholder="Min"
                                        value={data.min}
                                        onChange={(e) =>
                                            update(
                                                "min",
                                                e.target.value
                                            )
                                        }
                                        className={input}
                                    />

                                    <Input
                                        type="number"
                                        placeholder="Max"
                                        value={data.max}
                                        onChange={(e) =>
                                            update(
                                                "max",
                                                e.target.value
                                            )
                                        }
                                        className={input}
                                    />

                                    <SelectBox
                                        items={["USD", "BDT", "EUR", "GBP"].map(
                                            (x) => [x, x]
                                        )}
                                        value={data.currency}
                                        onChange={(v) =>
                                            update("currency", v)
                                        }
                                        placeholder="USD"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <TextField
                                isRequired={!data.remote}
                                value={data.location}
                                onChange={(v) =>
                                    update("location", v)
                                }
                            >
                                <div className="mb-1.5 flex items-center justify-between">
                                    <Label className="text-xs">
                                        Location
                                    </Label>

                                    <Switch
                                        isSelected={data.remote}
                                        onChange={(v) =>
                                            update("remote", v)
                                        }
                                        size="sm"
                                    >
                                        <Switch.Content>
                                            <Switch.Control>
                                                <Switch.Thumb />
                                            </Switch.Control>
                                            Remote
                                        </Switch.Content>
                                    </Switch>
                                </div>

                                <Input
                                    disabled={data.remote}
                                    placeholder={
                                        data.remote
                                            ? "Remote position"
                                            : "e.g. Dhaka, Bangladesh"
                                    }
                                    className={`${input} ${
                                        data.remote ? "opacity-50" : ""
                                    }`}
                                />

                                {!data.remote && <FieldError />}
                            </TextField>

                            {/* Deadline */}
                            <TextField
                                isRequired
                                value={data.deadline}
                                onChange={(v) =>
                                    update("deadline", v)
                                }
                            >
                                <Label className="mb-1.5 text-xs">
                                    Application Deadline
                                </Label>

                                <Input
                                    type="date"
                                    value={data.deadline}
                                    onChange={(e) =>
                                        update(
                                            "deadline",
                                            e.target.value
                                        )
                                    }
                                    className={input}
                                />

                                <FieldError />
                            </TextField>
                        </Fieldset.Group>
                    </Fieldset>

                    {/* Description */}
                    <Fieldset className="border-0 border-t border-white/10 p-0">
                        <Fieldset.Legend className="border-b border-white/10 px-5 py-3 text-sm font-medium">
                            Job Description
                        </Fieldset.Legend>

                        <Fieldset.Group className="grid gap-4 px-5 py-5">
                            {[
                                [
                                    "Responsibilities",
                                    "responsibilities",
                                    true,
                                    "Describe the main responsibilities...",
                                ],
                                [
                                    "Requirements",
                                    "requirements",
                                    true,
                                    "Skills, experience and qualifications...",
                                ],
                                [
                                    "Benefits (Optional)",
                                    "benefits",
                                    false,
                                    "e.g. Health insurance, flexible hours, paid leave...",
                                ],
                            ].map(
                                ([label, key, required, placeholder]) => (
                                    <TextField
                                        key={key}
                                        isRequired={required}
                                        value={data[key]}
                                        onChange={(v) =>
                                            update(key, v)
                                        }
                                    >
                                        <Label className="mb-1.5 text-xs">
                                            {label}
                                        </Label>

                                        <TextArea
                                            rows={3}
                                            placeholder={placeholder}
                                            className={textarea}
                                        />

                                        {required && <FieldError />}
                                    </TextField>
                                )
                            )}
                        </Fieldset.Group>
                    </Fieldset>

                    {/* Company */}
                    <Fieldset className="border-0 border-t border-white/10 p-0">
                        <Fieldset.Legend className="border-b border-white/10 px-5 py-3 text-sm font-medium">
                            Company
                        </Fieldset.Legend>

                        <Fieldset.Group className="px-5 py-4">
                            <div className="flex items-center justify-between rounded-md border border-white/10 bg-[#202021] px-4 py-3">

                                <div>
                                    <p className="text-[10px] text-gray-500">
                                        Registered Company
                                    </p>

                                    <p className="text-sm font-medium">
                                        Acme Corporation
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-[10px] text-gray-500">
                                        Company ID
                                    </p>

                                    <p className="text-xs text-gray-300">
                                        {companyId}
                                    </p>
                                </div>

                            </div>
                        </Fieldset.Group>
                    </Fieldset>

                    {/* Buttons */}
                    <Fieldset.Actions className="flex justify-end gap-2 border-t border-white/10 bg-[#1b1b1c] px-5 py-4">

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => setData(initialData)}
                            className="h-9 rounded-md border border-white/10 bg-transparent px-5 text-xs text-white"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            isDisabled={loading}
                            className="h-9 rounded-md bg-white px-6 text-xs font-semibold text-black"
                        >
                            {loading ? "Posting..." : "Post Job"}
                        </Button>

                    </Fieldset.Actions>

                </Form>
            </div>
        </div>
    );
}