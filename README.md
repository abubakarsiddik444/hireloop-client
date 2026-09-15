This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


<!-- card -->

i want to create job card using hero ui ( version 3.1.0) in nextjs (JS, not TS), gravity UI icons

hero is the data i want to show the imporant information in the card ( including company name, logo and other information: you can pick from the data below ) and a link to apply:
{
  _id: ObjectId('6aa83e668f65c1f27cbcaf5d'),
  title: 'Backend Engineer',
  category: 'engineering',
  type: 'full-time',
  min: NumberInt('100'),
  max: NumberInt('155'),
  currency: 'USD',
  location: 'Seattle, WA',
  remote: true,
  deadline: '2026-10-22',
  responsibilities: 'Build APIs, maintain backend services, optimize databases, and improve application performance.',
  requirements: '3+ years of backend development experience with Node.js, Java, or Python.',
  benefits: 'Health insurance, stock options, paid time off, remote work, and training budget.',
  companyId: '6aa8284e20cc466f9f9cd26a',
  companyName: 'Amazon',
  companyLogo: 'https://i.ibb.co/zHBTDg9m/amazon.png',
  status: 'active',
  createdAt: ISODate('2026-09-14T17:17:25.494Z')
}

 for visualization, use the attached image as inspriation.

 and for the card component elements use the hero ui latest version card strcuture like below:

 import { Card } from "@heroui/react";

export default () => (
  <Card>
    <Card.Header>
      <Card.Title />
      <Card.Description />
    </Card.Header>
    <Card.Content />
    <Card.Footer />
  </Card>
);

give me the component code 


<!-- search and filter -->

now i want to implement job search and filter option. give me a component where i can search and also filter by same important field of the job. job data is below:

{
  _id: ObjectId('6aa83e668f65c1f27cbcaf5d'),
  title: 'Backend Engineer',
  category: 'engineering',
  type: 'full-time',
  min: NumberInt('100'),
  max: NumberInt('155'),
  currency: 'USD',
  location: 'Seattle, WA',
  remote: true,
  deadline: '2026-10-22',
  responsibilities: 'Build APIs, maintain backend services, optimize databases, and improve application performance.',
  requirements: '3+ years of backend development experience with Node.js, Java, or Python.',
  benefits: 'Health insurance, stock options, paid time off, remote work, and training budget.',
  companyId: '6aa8284e20cc466f9f9cd26a',
  companyName: 'Amazon',
  companyLogo: 'https://i.ibb.co/zHBTDg9m/amazon.png',
  status: 'active',
  createdAt: ISODate('2026-09-14T17:17:25.494Z')
}

for select: use the component strcuture of hero ui below:

import {Select, Label, Description, Header, ListBox, Separator} from "@heroui/react";

export default () => (
  <Select>
    <Label />
    <Select.Trigger>
      <Select.Value />
      <Select.ClearButton />
      <Select.Indicator />
    </Select.Trigger>
    <Description />
    <Select.Popover>
      <ListBox>
        <ListBox.Item>
          <Label />
          <Description />
          <ListBox.ItemIndicator />
        </ListBox.Item>
        <ListBox.Section>
          <Header />
          <ListBox.Item>
            <Label />
          </ListBox.Item>
        </ListBox.Section>
      </ListBox>
    </Select.Popover>
  </Select>
);

for  input group use the code structure below:

import {InputGroup, TextField, Label} from '@heroui/react';

export default () => (
  <TextField>
    <Label />
    <InputGroup>
      <InputGroup.Prefix />
      <InputGroup.Input /> {/* Or use InputGroup.TextArea for multiline input */}
      <InputGroup.Suffix />
    </InputGroup>
  </TextField>
)


<!-- jobs data show -->

i have this job data: i want to display job details in a page where i have the data loaded and this page will have a apply now button:

{
  _id: ObjectId('6aa83e668f65c1f27cbcaf5d'),
  title: 'Backend Engineer',
  category: 'engineering',
  type: 'full-time',
  min: NumberInt('100'),
  max: NumberInt('155'),
  currency: 'USD',
  location: 'Seattle, WA',
  remote: true,
  deadline: '2026-10-22',
  responsibilities: 'Build APIs, maintain backend services, optimize databases, and improve application performance.',
  requirements: '3+ years of backend development experience with Node.js, Java, or Python.',
  benefits: 'Health insurance, stock options, paid time off, remote work, and training budget.',
  companyId: '6aa8284e20cc466f9f9cd26a',
  companyName: 'Amazon',
  companyLogo: 'https://i.ibb.co/zHBTDg9m/amazon.png',
  status: 'active',
  createdAt: ISODate('2026-09-14T17:17:25.494Z')
}

current state of the component that loads the data is below:

