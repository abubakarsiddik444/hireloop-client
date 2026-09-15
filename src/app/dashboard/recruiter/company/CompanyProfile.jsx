"use client";

import { useRef, useState } from "react";
import { Button, Card, Input, toast } from "@heroui/react";
import { ArrowRight, Cloud, LocationArrow, Pencil } from "@gravity-ui/icons";
import { createCompany } from "@/lib/actions/companies";

const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Education",
    "E-commerce",
    "Manufacturing",
    "Marketing",
    "Other",
];

const employeeRanges = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
];

const emptyForm = {
    name: "",
    website: "",
    industry: "Technology",
    location: "",
    employees: "1-10 employees",
    logo: "",
    description: "",
};

export default function CompanyProfile({ recruiter, recruiterCompany }) {


    const fileRef = useRef(null);

    const [company, setCompany] = useState(recruiterCompany || null);
    const [editing, setEditing] = useState(false);

    const [form, setForm] = useState(emptyForm);

    const [preview, setPreview] = useState("");
    // const [preview, setPreview] = useState(recruiterCompany?.logo || "");
    const [uploading, setUploading] = useState(false);

    const change = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Select image + instant preview
    const selectImage = async (e) => {
        const file = e.target.files?.[0];

        console.log("Selected Image:", file);

        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert("Image must be less than 5MB");
            return;
        }

        // Instant preview
        const localPreview = URL.createObjectURL(file);
        setPreview(localPreview);

        // Upload to ImgBB
        try {
            setUploading(true);

            const body = new FormData();
            body.append("image", file);

            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
                {
                    method: "POST",
                    body,
                }
            );

            const data = await res.json();

            console.log("ImgBB Response:", data);


            if (!data.success) {
                throw new Error("Upload failed");
            }

            setForm((prev) => ({
                ...prev,
                logo: data.data.url,
            }));

            // Use ImgBB image after upload
            setPreview(data.data.url);
        } catch {
            alert("Image upload failed");
            setPreview(form.logo || "");
        } finally {
            setUploading(false);
        }
    };

   


    const openEdit = () => {
        setForm({
            name: company.name || "",
            website: company.website || "",
            industry: company.industry || "Technology",
            location: company.location || "",
            employees: company.employees || "1-10 employees",
            logo: company.logo || "",
            description: company.description || "",
        });

        setPreview(company.logo || "");
        setEditing(true);

        
    };

    const submitCompany = async (e) => {
        e.preventDefault();

        const newCompany = {
            ...form,
            recruiterId: recruiter.id,
            status: company?.status || "Pending",
        };

        console.log("Company Data:", newCompany);


        const payload = await createCompany(newCompany);
        if (payload.insertedId) {

            toast.success("Company profile created successfully!");
        }


        setCompany(newCompany);
        setEditing(false);
    };

    // =========================
    // NO COMPANY
    // =========================
    if (!company?._id && !editing) {
        return (
            <main className="min-h-screen bg-[#111112] px-4 py-10 text-white">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold">Company</h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage your company information
                        </p>
                    </div>

                    <Card className="border border-white/10 bg-[#171718]">
                        <div className="flex min-h-[360px] flex-col items-center justify-center px-6 text-center">
                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-[#222223]">
                                <Cloud className="h-7 w-7 text-gray-400" />
                            </div>

                            <h2 className="text-xl font-semibold">
                                No company registered
                            </h2>

                            <p className="mt-2 max-w-md text-sm text-gray-500">
                                Register your company to start posting jobs and managing
                                your recruitment activities.
                            </p>

                            <Button
                                className="mt-6 bg-white text-black"
                                onPress={() => {
                                    setForm(emptyForm);
                                    setPreview("");
                                    setEditing(true);
                                }}
                            >
                                Register Company
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                </div>
            </main>
        );
    }

    // =========================
    // COMPANY FORM
    // =========================
    if (editing) {
        return (
            <main className="min-h-screen bg-[#111112] px-4 py-10 text-white">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold">
                            {company ? "Edit Company" : "Register Company"}
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Add information about your company
                        </p>
                    </div>

                    <Card className="border border-white/10 bg-[#171718]">
                        <form onSubmit={submitCompany} className="p-6">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">

                                {/* Company Name */}
                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">
                                        Company Name
                                    </label>

                                    <Input
                                        name="name"
                                        value={form.name}
                                        onChange={change}
                                        placeholder="e.g. Acme Corp"
                                        className="w-full"
                                    />
                                </div>

                                {/* Industry */}
                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">
                                        Industry / Category
                                    </label>

                                    <select
                                        name="industry"
                                        value={form.industry}
                                        onChange={change}
                                        className="h-10 w-full cursor-pointer rounded-lg border border-white/10 bg-[#202021] px-4 text-sm text-white outline-none focus:border-white/30"
                                    >
                                        {industries.map((item) => (
                                            <option
                                                key={item}
                                                value={item}
                                                className="bg-[#202021]"
                                            >
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Website */}
                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">
                                        Website URL
                                    </label>

                                    <div className="flex overflow-hidden rounded-lg border border-white/10 bg-[#202021]">
                                        <span className="flex h-10 items-center bg-[#29292a] px-4 text-sm text-gray-400">
                                            https://
                                        </span>

                                        <input
                                            name="website"
                                            value={form.website}
                                            onChange={change}
                                            placeholder="www.company.com"
                                            className="h-10 min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-gray-600"
                                        />
                                    </div>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">
                                        Location
                                    </label>

                                    <div className="relative">
                                        <LocationArrow className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                        <input
                                            name="location"
                                            value={form.location}
                                            onChange={change}
                                            placeholder="City, Country"
                                            className="h-10 w-full rounded-lg border border-white/10 bg-[#202021] pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-white/30"
                                        />
                                    </div>
                                </div>

                                {/* Employee */}
                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">
                                        Employee Count Range
                                    </label>

                                    <select
                                        name="employees"
                                        value={form.employees}
                                        onChange={change}
                                        className="h-10 w-full cursor-pointer rounded-lg border border-white/10 bg-[#202021] px-4 text-sm text-white outline-none focus:border-white/30"
                                    >
                                        {employeeRanges.map((item) => (
                                            <option
                                                key={item}
                                                value={item}
                                                className="bg-[#202021]"
                                            >
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Company Logo */}
                                <div>
                                    <label className="mb-2 block text-sm text-gray-300">
                                        Company Logo
                                    </label>

                                    <div className="flex items-center gap-4">
                                        {/* Image preview */}
                                        <button
                                            type="button"
                                            onClick={() => fileRef.current?.click()}
                                            className="relative flex h-12 w-12 cursor-pointer shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-white/20 bg-[#252526] hover:bg-[#2c2c2d]"
                                        >
                                            {preview ? (
                                                <img
                                                    src={preview}
                                                    alt="Logo preview"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <Cloud className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>

                                        <input
                                            ref={fileRef}
                                            type="file"
                                            accept="image/png,image/jpeg,image/jpg,image/webp"
                                            onChange={selectImage}
                                            className="hidden"
                                        />

                                        <div>
                                            <p className="text-sm text-white">
                                                {uploading ? "Uploading..." : "Upload image"}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                PNG, JPG up to 5MB
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm text-gray-300">
                                        Brief Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={change}
                                        rows={4}
                                        placeholder="Tell us about your company's mission and culture..."
                                        className="w-full resize-none rounded-lg border border-white/10 bg-[#202021] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-white/30"
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="mt-8 flex justify-end gap-3">
                                {company && (
                                    <Button
                                        type="button"
                                        variant="flat"
                                        onPress={() => setEditing(false)}
                                    >
                                        Cancel
                                    </Button>
                                )}

                                <Button
                                    type="submit"
                                    className="bg-white text-black"
                                    isDisabled={uploading}
                                >
                                    {company ? "Update Company" : "Register Company"}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </main>
        );
    }

    // =========================
    // REGISTERED COMPANY
    // =========================
    return (
        <main className="min-h-screen bg-[#111112] px-4 py-10 text-white">
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Company</h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage your company information
                        </p>
                    </div>

                    {/* Edit Icon */}
                    <button
                        type="button"
                        onClick={openEdit}
                        className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-[#202021] px-4 text-sm font-medium text-gray-400 transition hover:bg-[#29292a] hover:text-white"
                        title="Edit company"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit Profile
                    </button>
                </div>

                {/* Company Card */}
                <Card className="border border-white/10 bg-[#171718]">
                    <div className="p-6">

                        {/* Profile */}
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                            {company.logo ? (
                                <img
                                    src={company.logo}
                                    alt={company.name}
                                    className="h-20 w-20 rounded-xl border border-white/10 object-cover"
                                />
                            ) : (
                                <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-[#252526]">
                                    <Cloud className="h-8 w-8 text-gray-500" />
                                </div>
                            )}

                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h2 className="text-2xl font-semibold">
                                        {company.name}
                                    </h2>

                                    {/* Status */}
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${company.status === "Approved"
                                            ? "bg-green-500/10 text-green-400"
                                            : company.status === "Rejected"
                                                ? "bg-red-500/10 text-red-400"
                                                : "bg-yellow-500/10 text-yellow-400"
                                            }`}
                                    >
                                        {company.status}
                                    </span>
                                </div>

                                <p className="mt-2 text-sm text-gray-500">
                                    {company.industry}
                                </p>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="mt-8 grid grid-cols-1 gap-5 border-t border-white/10 pt-6 sm:grid-cols-2">

                            <Info
                                title="Website"
                                value={company.website}
                            />

                            <Info
                                title="Location"
                                value={company.location}
                            />

                            <Info
                                title="Employee Count"
                                value={company.employees}
                            />

                            <Info
                                title="Industry"
                                value={company.industry}
                            />
                        </div>

                        {/* Description */}
                        <div className="mt-6 border-t border-white/10 pt-6">
                            <h3 className="text-sm font-medium text-gray-300">
                                Description
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                {company.description || "No description added."}
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </main>
    );
}

function Info({ title, value }) {
    return (
        <div>
            <p className="text-xs text-gray-500">
                {title}
            </p>

            <p className="mt-1 text-sm text-gray-200">
                {value || "Not provided"}
            </p>
        </div>
    );
}

// i am developing a  nextjs ( using JS, not using TS), better auth, hero ui (3.1.0) tailwind, gravity ui icons,

// give me company from:

// If no company is registered: Show a prompt and a "Register Company" button.
// If registered: Show company details — name, website url, logo, industry, location, employee count, description.
// Edit button to update company information.
// Company status badge: Pending / Approved / Rejected (set by Admin).

// for logo: we will upload the logo and store it in the imgbb and the url will be saved in the database

// for the style: use the attached design:
// for the hero ui components use the components code example of the latest version as below:



//  https://ibb.co.com/V0pmYshB
//  https://ibb.co.com/kVFWHz9f
//  https://ibb.co.com/dJVwxvCf
//  https://ibb.co.com/B2FbjnSx
//  https://ibb.co.com/qLp7ZBJZ
//  https://ibb.co.com/0RpXzXtT
// https://ibb.co.com/jvnMscGR
// https://ibb.co.com/MDj55ZfB
// https://ibb.co.com/3yGXbtwc
// https://ibb.co.com/60PGwZBY
// https://ibb.co.com/VcbDNPfB
// https://ibb.co.com/v4cDf4DD

// give me 12 company  data in json fromat using the logo url i provided earlier and the recruiter information earlier
// and the format of a company data will be like. do not provde the company_id

// {
//   name: 'amazon',
//   website: 'amzon.com',
//   industry: 'E-commerce',
//   location: 'United States',
//   employees: '1000+ employees',
//   logo: 'https://i.ibb.co/zHBTDg9m/amazon.png',
//   description: 'amazon ',
//   recruiterId: '6aa823d88db8f70840c6bc46',
//   status: 'Pending',
//   createdAt: ISODate('2026-09-14T16:43:10.783Z')
// }