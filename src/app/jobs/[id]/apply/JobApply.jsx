"use client";

import React from "react";
import {
  Form,
  Button,
  TextField,
  Label,
  Input,
  TextArea,
  Description,
  FieldError,
} from "@heroui/react";

import {
  Link as LinkIcon,
  Globe,
  Briefcase,
  ArrowUpRight,
} from "@gravity-ui/icons";

import { submitApplication } from "@/lib/actions/applications";

const JobApply = ({ job, applican }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const submissionData = {
      jobId: job?._id,
      applicantId: applican?.id,

      applicantName:
        applican?.name || applican?.displayName || "",

        // applicantId: applicant?.id,

      applicantEmail:
        applican?.email || "",

      jobTitle:
        job?.title || "",

      companyName:
        job?.companyName || "",

        status: 'applied',


      resumeLink:
        formData.get("resume") || "",

      linkedinLink:
        formData.get("linkedin") || "",

      portfolioLink:
        formData.get("portfolio") || "",

      additionalNotes:
        formData.get("coverNote") || "",
    };

    console.log("Submitting:", submissionData);

    try {
      const res = await submitApplication(submissionData);

      console.log("Response:", res);

      if (res?.insertedId) {
        alert("Application submitted successfully!");
        form.reset();
      } else {
        alert("Application submission failed!");
      }
    } catch (error) {
      console.error("Application error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <main className="min-h-screen bg-[#090909] px-5 py-10 text-white">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-7">
          <p className="text-sm text-white/40">
            Job Application
          </p>

          <h1 className="mt-1 text-3xl font-semibold">
            Apply for this position
          </h1>

          <p className="mt-2 text-sm text-white/40">
            {job?.companyName}
          </p>
        </div>

        {/* Applicant Info */}
        <div className="mb-6 rounded-2xl border border-white/10 bg-[#111] p-5">
          <div className="flex items-center gap-4">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06]">
              <Briefcase size={20} />
            </div>

            <div>
              <p className="text-sm font-medium">
                {applican?.name || applican?.displayName}
              </p>

              <p className="text-xs text-white/40">
                {applican?.email}
              </p>
            </div>

          </div>
        </div>

        {/* Application Form */}
        <Form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-[#111] p-6 md:p-8"
        >

          <div className="mb-5">
            <h2 className="text-xl font-semibold">
              Application Details
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Add your resume and optional professional information.
            </p>
          </div>

          {/* Resume */}
          <TextField
            name="resume"
            type="url"
            isRequired
            className="w-full"
          >
            <Label>Resume Link</Label>

            <div className="relative">
              <LinkIcon
                size={18}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-white/35"
              />

              <Input
                placeholder="https://drive.google.com/..."
                className="pl-10"
              />
            </div>

            <Description>
              Add a public Google Drive, Dropbox or OneDrive resume link.
            </Description>

            <FieldError />
          </TextField>

          {/* LinkedIn */}
          <TextField
            name="linkedin"
            type="url"
            className="mt-5 w-full"
          >
            <Label>
              LinkedIn Profile
              <span className="ml-1 text-white/30">
                (Optional)
              </span>
            </Label>

            <div className="relative">
              <LinkIcon
                size={18}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-white/35"
              />

              <Input
                placeholder="https://linkedin.com/in/yourname"
                className="pl-10"
              />
            </div>

            <FieldError />
          </TextField>

          {/* Portfolio */}
          <TextField
            name="portfolio"
            type="url"
            className="mt-5 w-full"
          >
            <Label>
              Portfolio Website
              <span className="ml-1 text-white/30">
                (Optional)
              </span>
            </Label>

            <div className="relative">
              <Globe
                size={18}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-white/35"
              />

              <Input
                placeholder="https://yourportfolio.com"
                className="pl-10"
              />
            </div>

            <FieldError />
          </TextField>

          {/* Cover Note */}
          <TextField
            name="coverNote"
            className="mt-5 w-full"
          >
            <Label>
              Cover Note
              <span className="ml-1 text-white/30">
                (Optional)
              </span>
            </Label>

            <TextArea
              placeholder="Tell the recruiter briefly why you're interested in this position..."
              rows={5}
            />

            <Description>
              Keep your message short and relevant.
            </Description>

            <FieldError />
          </TextField>

          {/* Buttons */}
          <div className="mt-7 flex w-full gap-3">

            <Button
              type="reset"
              variant="secondary"
              className="flex-1"
            >
              Reset
            </Button>

            <Button
              type="submit"
              className="flex-1"
            >
              <ArrowUpRight size={17} />
              Submit Application
            </Button>

          </div>

        </Form>
      </div>
    </main>
  );
};

export default JobApply;


//  give me a job application form the component below using hero ui v3.1.0 nextjs ( JS not TS). tailwindcss, gravity ui i want only to got resume link and some optional information i already have job and applicant info in the component:


// To use tha form use:

// import {Form, Button} from '@heroui/react';

// export default () => (
//   <Form>
//     {/* Form fields go here */}
//     <Button type="submit"/>
//     <Button type="reset"/>
//   </Form>
// )

// import {TextField, Label, Input, Description, FieldError} from '@heroui/react';


// and textfield anatoy

// export default () => (
//   <TextField>
//     <Label />
//     <Input />
//     <Description />
//     <FieldError />
//   </TextField>
// )