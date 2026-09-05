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
    TextArea,
    TextField,
} from "@heroui/react";
import { ChevronsExpandVertical } from "@gravity-ui/icons";

export default function PostJobPage() {
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        title: "",
        category: "",
        type: "",
        min: "",
        max: "",
        currency: "USD",
        location: "",
        deadline: "",
        responsibilities: "",
        requirements: "",
    });

    const update = (key, value) =>
        setData((prev) => ({ ...prev, [key]: value }));

    const input =
        "h-10 rounded-md border border-white/10 bg-[#202021] px-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-white/25";

    const select =
        "h-10 rounded-md border border-white/10 bg-[#202021] px-3 text-sm text-gray-300";

    const options = (items) => (
        <ListBox>
            {items.map(([id, label]) => (
                <ListBox.Item key={id} id={id} textValue={label}>
                    {label}
                </ListBox.Item>
            ))}
        </ListBox>
    );

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const job = { ...data, status: "active" };
        console.log(job);

        setTimeout(() => setLoading(false), 700);
    };

    return (
        <div className="min-h-screen bg-[#111112] px-4 py-5 text-white sm:px-6">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-lg border border-white/10 bg-[#151516]">

                <div className="border-b border-white/10 px-5 py-5">
                    <h1 className="text-xl font-medium">Post a New Job</h1>
                    <p className="mt-1 text-xs text-gray-400">
                        Create a job posting and find the right candidate.
                    </p>
                </div>

                <Form onSubmit={submit}>

                    {/* Job Info */}
                    <Fieldset className="border-0 p-0">
                        <Fieldset.Legend className="border-b border-white/10 px-5 py-3 text-sm font-medium">
                            Job Info
                        </Fieldset.Legend>

                        <Fieldset.Group className="grid grid-cols-1 gap-4 px-5 py-5 md:grid-cols-2">

                            <TextField
                                isRequired
                                value={data.title}
                                onChange={(v) => update("title", v)}
                            >
                                <Label className="mb-1.5 text-xs">Job Title</Label>
                                <Input
                                    placeholder="e.g. Frontend Developer"
                                    className={input}
                                />
                                <FieldError />
                            </TextField>

                            <Select
                                isRequired
                                value={data.category}
                                onChange={(v) => update("category", v)}
                            >
                                <Label className="mb-1.5 text-xs">Job Category</Label>
                                <Select.Trigger className={select}>
                                    <Select.Value placeholder="Select category" />
                                    <Select.Indicator>
                                        <ChevronsExpandVertical size={14} />
                                    </Select.Indicator>
                                </Select.Trigger>

                                <Select.Popover>
                                    {options([
                                        ["development", "Software Development"],
                                        ["design", "Design"],
                                        ["marketing", "Marketing"],
                                        ["sales", "Sales"],
                                        ["finance", "Finance"],
                                        ["other", "Other"],
                                    ])}
                                </Select.Popover>
                                <FieldError />
                            </Select>

                            <Select
                                isRequired
                                value={data.type}
                                onChange={(v) => update("type", v)}
                            >
                                <Label className="mb-1.5 text-xs">Job Type</Label>
                                <Select.Trigger className={select}>
                                    <Select.Value placeholder="Select job type" />
                                    <Select.Indicator>
                                        <ChevronsExpandVertical size={14} />
                                    </Select.Indicator>
                                </Select.Trigger>

                                <Select.Popover>
                                    {options([
                                        ["full-time", "Full-time"],
                                        ["part-time", "Part-time"],
                                        ["contract", "Contract"],
                                        ["internship", "Internship"],
                                    ])}
                                </Select.Popover>
                                <FieldError />
                            </Select>

                            <div>
                                <label className="mb-1.5 block text-xs">Salary Range</label>
                                <div className="grid grid-cols-[1fr_1fr_80px] gap-2">
                                    <Input
                                        type="number"
                                        placeholder="Min"
                                        value={data.min}
                                        onChange={(e) => update("min", e.target.value)}
                                        className={input}
                                    />
                                    <Input
                                        type="number"
                                        placeholder="Max"
                                        value={data.max}
                                        onChange={(e) => update("max", e.target.value)}
                                        className={input}
                                    />

                                    <Select
                                        value={data.currency}
                                        onChange={(v) => update("currency", v)}
                                    >
                                        <Select.Trigger className={select}>
                                            <Select.Value />
                                            <Select.Indicator>
                                                <ChevronsExpandVertical size={13} />
                                            </Select.Indicator>
                                        </Select.Trigger>

                                        <Select.Popover>
                                            {options([
                                                ["USD", "USD"],
                                                ["BDT", "BDT"],
                                                ["EUR", "EUR"],
                                                ["GBP", "GBP"],
                                            ])}
                                        </Select.Popover>
                                    </Select>
                                </div>
                            </div>

                            <TextField
                                isRequired
                                value={data.location}
                                onChange={(v) => update("location", v)}
                            >
                                <Label className="mb-1.5 text-xs">Location</Label>
                                <Input
                                    placeholder="e.g. Dhaka, Bangladesh"
                                    className={input}
                                />
                                <FieldError />
                            </TextField>

                            <TextField
                                isRequired
                                value={data.deadline}
                                onChange={(v) => update("deadline", v)}
                            >
                                <Label className="mb-1.5 text-xs">
                                    Application Deadline
                                </Label>
                                <Input type="date" className={input} />
                                <FieldError />
                            </TextField>

                        </Fieldset.Group>
                    </Fieldset>

                    {/* Job Description */}
                    <Fieldset className="border-0 border-t border-white/10 p-0">
                        <Fieldset.Legend className="border-b border-white/10 px-5 py-3 text-sm font-medium">
                            Job Description
                        </Fieldset.Legend>

                        <Fieldset.Group className="grid gap-4 px-5 py-5">

                            <TextField
                                isRequired
                                value={data.responsibilities}
                                onChange={(v) => update("responsibilities", v)}
                            >
                                <Label className="mb-1.5 text-xs">
                                    Responsibilities
                                </Label>
                                <TextArea
                                    rows={3}
                                    placeholder="Describe the main responsibilities..."
                                    className="min-h-[75px] resize-none rounded-md border border-white/10 bg-[#202021] px-3 py-2 text-sm text-white placeholder:text-gray-500"
                                />
                                <FieldError />
                            </TextField>

                            <TextField
                                isRequired
                                value={data.requirements}
                                onChange={(v) => update("requirements", v)}
                            >
                                <Label className="mb-1.5 text-xs">
                                    Requirements
                                </Label>
                                <TextArea
                                    rows={3}
                                    placeholder="Skills, experience and qualifications..."
                                    className="min-h-[75px] resize-none rounded-md border border-white/10 bg-[#202021] px-3 py-2 text-sm text-white placeholder:text-gray-500"
                                />
                                <FieldError />
                            </TextField>

                            <TextField
                                value={data.benefits}
                                onChange={(v) => update("benefits", v)}
                            >
                                <Label className="mb-1.5 text-xs">
                                    Benefits <span className="text-gray-500">(Optional)</span>
                                </Label>

                                <TextArea
                                    rows={2}
                                    placeholder="Insurance, bonuses, flexible hours..."
                                    className="min-h-[60px] resize-none rounded-md border border-white/10 bg-[#202021] px-3 py-2 text-sm text-white placeholder:text-gray-500"
                                />
                            </TextField>

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
                                    <p className="mt-0.5 text-sm font-medium">
                                        Acme Corporation
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-[10px] text-gray-500">
                                        Growth Plan
                                    </p>
                                    <p className="text-xs text-gray-300">
                                        7 / 10 jobs
                                    </p>
                                </div>
                            </div>
                        </Fieldset.Group>
                    </Fieldset>

                    {/* Actions */}
                    <Fieldset.Actions className="flex justify-end gap-2 border-t border-white/10 bg-[#1b1b1c] px-5 py-4">
                        <Button
                            type="button"
                            variant="secondary"
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