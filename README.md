# IntelliCheck

IntelliCheck is a full-stack quiz application that generates multiple-choice questions on any topic, records the results, and shows progress over time. Users choose a topic, difficulty, and question count; the app generates the quiz, scores it, explains incorrect answers, and saves the session to a PostgreSQL database.

Repository: https://github.com/GabenNguyen/IntelliCheck.git

## Features

- **On-demand quiz generation** through OpenRouter's Flint model, with configurable topic, difficulty, and question count.
- **Answer review** with generated explanations for incorrect answers.
- **Persistent quiz history**, topic breakdown, weekly activity, and streak tracking.
- **Account management** with Clerk sign-in, sign-up, and user profile pages.
- **Difficulty levels**: Easy, Medium, Hard, and a shorter-timer challenge mode named Asian, originally added as a playful variant.
- **Responsive interface** with light and dark themes.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Framework | Next.js 16 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS 4, shadcn/ui, Framer Motion |
| Data | Prisma 7, PostgreSQL (Neon), `@prisma/adapter-pg` |
| Authentication | Clerk |
| AI | OpenRouter (`recursive/flint-v1.0:free` for question generation and explanations) |
| Validation | Zod |

## Architecture

| Path | Responsibility |
| --- | --- |
| `app/` | App Router pages, route handlers, loading and error boundaries |
| `app/api/` | Question generation, explanation generation, and quiz persistence endpoints |
| `app/components/` | Feature components for the dashboard, quiz flow, and dialogs |
| `components/ui/` | Shared shadcn/ui primitives |
| `lib/db/` | Prisma client, dashboard queries, and quiz history access |
| `lib/generated/prisma/` | Generated Prisma client (do not edit) |
| `zod-schemas/`, `app/quiz/schema.ts` | Request and response contracts |
| `prisma/` | Schema and migrations |
| `proxy.ts` | Clerk route protection for quiz, results, and dashboard pages |

User input is validated at API boundaries, database access goes through Prisma's parameterized queries, and the AI endpoints require an authenticated session. Security headers are set in `next.config.ts`.

## Prerequisites

- Node.js 20.19+, 22.12+, or 24+
- pnpm (the `pnpm-lock.yaml` file is the authoritative lockfile)
- A PostgreSQL database, such as Neon
- Clerk and OpenRouter accounts

## Environment variables

Create a `.env` file in the project root with the following values:

```env
DATABASE_URL=<PostgreSQL connection string>
OPENROUTER_API_KEY=<OpenRouter API key>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<Clerk publishable key>
CLERK_SECRET_KEY=<Clerk secret key>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

The `.env` file is gitignored. Do not commit real credentials.

## Getting started

```bash
git clone https://github.com/GabenNguyen/IntelliCheck.git
cd IntelliCheck
pnpm install

pnpm exec prisma generate
pnpm exec prisma migrate dev

pnpm dev
```

The development server runs at `http://localhost:3000`.

## Usage

1. Sign in with Clerk.
2. Create a quiz from the dashboard or the quiz page.
3. Set a topic, difficulty, and question count, then generate the quiz.
4. Answer the questions within the time limit.
5. Review the score and explanations on the results page.
6. Check saved quizzes, activity, and topic distribution on the dashboard.

## Quality checks

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

The repository does not currently include an automated test suite.

## Roadmap

- Rate limiting for authenticated AI endpoints.
- Server-side score verification before streak and achievement updates.
- A Content Security Policy compatible with Clerk and Next.js.
- PDF-based quiz generation and result export.

## Author

Ba Hoa (Gaben) Nguyen

LinkedIn: https://www.linkedin.com/in/bahoanguyen/ · GitHub: https://github.com/GabenNguyen

Email: nguyenbahoa04@gmail.com

## License

MIT. See [LICENSE](./LICENSE).
