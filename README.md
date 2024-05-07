This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

### Environment variables

```bash
NEXT_PUBLIC_OPENAI_API_KEY=
NEXT_PUBLIC_OPENAI_BASE_URL=
NEXT_PUBLIC_POLYGON_API_KEY=
```

`NEXT_PUBLIC_OPENAI_API_KEY` is required

`NEXT_PUBLIC_OPENAI_BASE_URL` is optional, default is
`https://api.openai.com/v1` for OpenAI. But You can use Open source LLM like the
Meta's Llama 2 or 3. You can run this locally with LL Studio or on any cloud
provider of your choice.

`NEXT_PUBLIC_POLYGON_API_KEY` is optional, only required if you want to around
with the Stock Prediction App 🥳 (the app outputs are not to be used as
financial advice 😅)
