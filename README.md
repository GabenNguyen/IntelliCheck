# 🧠 IntelliCheck - AI Quiz Generation Platform

An AI quiz generation web application powered by **Google Gemini AI** that creates customised quizzes on any topic. It also allows users to choose the **number of questions** and a **specific difficulty**. All quiz data is **protected** and **persisted** in the database for future visit, and is displayed in the **Dashboard** page. Built with modern web technologies for a seamless user experience.

**[GitHub repository](https://github.com/GabenNguyen/IntelliCheck.git)**

## Project Structure
```
└── 📁IntelliCheck
    └── 📁.clerk
        └── 📁.tmp
            ├── keyless.json
            ├── README.md
    └── 📁app
        └── 📁about
            ├── page.tsx
        └── 📁api
            └── 📁generate-explanation
                ├── route.ts
            └── 📁generate-questions
                ├── route.ts
            └── 📁save-quiz
                ├── route.ts
        └── 📁components
            └── 📁dialogs
                ├── AsianAlertDialog.tsx
                ├── ResultPageDialog.tsx
                ├── TimeUpDialog.tsx
            └── 📁quiz_related
                ├── QuizHistory.tsx
                ├── QuizQuestions.tsx
                ├── QuizSetup.tsx
            ├── AnimatedTransition.tsx
            ├── AppSideBar.tsx
            ├── CountDown.tsx
            ├── DashBoard.tsx
            ├── ModeToggle.tsx
            ├── NavBar.tsx
            ├── SideBar.tsx
            ├── ThemeProvider.tsx
        └── 📁dashboard
            ├── error.tsx
            ├── loading.tsx
            ├── page.tsx
        └── 📁quiz
            ├── page.tsx
        └── 📁quiz-history
            ├── page.tsx
        └── 📁results
            ├── page.tsx
        └── 📁sign-in
            └── 📁[[...sign-in]]
                ├── page.tsx
        └── 📁sign-up
            └── 📁[[...sign-up]]
                ├── page.tsx
        └── 📁user-profile
            └── 📁[[...user-profile]]
                ├── page.tsx
        ├── favicon.ico
        ├── globals.css
        ├── layout.tsx
        ├── page.tsx
    └── 📁components
        └── 📁ui
            ├── alert-dialog.tsx
            ├── button.tsx
            ├── card.tsx
            ├── collapsible.tsx
            ├── dropdown-menu.tsx
            ├── input.tsx
            ├── label.tsx
            ├── navigation-menu.tsx
            ├── progress.tsx
            ├── select.tsx
            ├── separator.tsx
            ├── sheet.tsx
            ├── sidebar.tsx
            ├── skeleton.tsx
            ├── sonner.tsx
            ├── spinner.tsx
            ├── tooltip.tsx
    └── 📁hooks
        ├── use-mobile.ts
    └── 📁lib
        └── 📁db
            ├── dashboard_data.ts
            ├── quiz_history.ts
        └── 📁generated
            └── 📁prisma
                └── 📁internal
                    ├── class.ts
                    ├── prismaNamespace.ts
                    ├── prismaNamespaceBrowser.ts
                └── 📁models
                    ├── Question.ts
                    ├── Quiz.ts
                    ├── User.ts
                ├── browser.ts
                ├── client.ts
                ├── commonInputTypes.ts
                ├── enums.ts
                ├── models.ts
        ├── db.ts
        ├── quiz-action.ts
        ├── utils.ts
    └── 📁prisma
        └── 📁migrations
            └── 📁20260325092431_intelli_check_database
                ├── migration.sql
            ├── migration_lock.toml
        ├── schema.prisma
    └── 📁public
        ├── file.svg
        ├── globe.svg
        ├── next.svg
        ├── vercel.svg
        ├── window.svg
    └── 📁type
        ├── answer.tsx
        ├── count_down.tsx
        ├── question.tsx
    └── 📁utils
        ├── difficulty_rules.tsx
        ├── format_time.tsx
        ├── it-facts.tsx
        ├── sample_questions.tsx
        ├── validate_input.tsx
    ├── .env
    ├── .gitignore
    ├── components.json
    ├── eslint.config.mjs
    ├── LICENSE
    ├── next-env.d.ts
    ├── next.config.ts
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.mjs
    ├── prisma.config.ts
    ├── proxy.ts
    ├── README.md
    ├── tsconfig.json
    └── tsconfig.tsbuildinfo
```

## ✨ Key Features
- 🤖 **AI Generated Quizzes** <br>
Leveraged __OpenAI GPT Models (20B and 120B)__ for quiz generation on any user-provided topic and concise explanation for wrong answers.

- 🔐 **Secure Authentication and User Account** <br>
Secure sign-in and user management powered by ___Clerk___.

- 📂 **Quiz History and Persistence** <br>
All quizzes are saved and retrievable using ___Prisma ORM___ and ___Neon (PostgreSQL)___.

- 🌟 **Modern UI and Animation** <br>
Clean, responsive design built with ___Tailwind CSS___ and ___Framer Motion___ for optimal user interface and experience.

- ⚡ **Fast and Scalable** <br>
Built on ___Next.js App Router___ with ___TypeScript___ for maintainability and performance.

- 💀 **Asian difficulty** <br>
For those who wants to challenge themselves, Asian difficulty provides ___extremely hard question(s)___, all of which may look similar to the others, requiring exceptional logical thinking skills and well-rounded knowledge of the chosen topic. In addition, the given time for this mode is short (around 45 seconds), imitating **"real Asian"** learning style.

**(Note: Please be advised that the Asian difficulty mode was initially made for fun, and for those who want to have some challenges. No offense to anyone if NO correct answers were made!!!)**

## 💻 Tech Stack
### Front-end
- **Next.js (App Router)**
- **Tailwind CSS**
- **TypeScript**
- **Framer Motion**
- **Shadcn**

### Back-end
- **Next.js API Routes**
- **OpenRouter AI Model (GPT 20B and 120B)****
- **Prisma ORM**
- **Neon (PostgreSQL)**

### Authentication
- **Clerk**

## 🎯 Purpose of this project
Exam success often hinges on high-quality practice, yet students are frequently stuck between dense course manuals and generic AI that lacks focus. I developed a specialized quiz generation system to bridge this gap. By engineering targeted prompts and leveraging the AI models from **OpenRouter** such as **OpenAI GPT 20B** and **OpenAI GPT 120B** for better question generation and explanations, I built a tool that transforms broad topics into exam-ready questions, allowing students to move past passive reading and into active, evidence-based revision.


## 🔎 Use case
1. User signs in securely.
2. System redirects authenticated user to the dashboard.
3. User clicks on the Create Quiz button on the dashboard.
4. System redirects user to the quiz setup page.
5. User enters the topic, selects the number of questions, and chooses the difficulty.
6. System generates the question(s) based on the user-provided information.
7. User goes through all the question(s).
8. System calculates score based on the correct answer(s) and redirects the user to the result page.
9. User sees the answers to the questions, with the wrong one(s) accompanied by an explanation.
10. System persists the quiz data into the database so that the user can revisits the quiz history anytime.

## ⚙️ Environment Variables

To run this platform on your local host, please create an `.env` file with the following ___APIs___:

``` env
OPENROUTER_API_KEY=<your OpenRouter API>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY= <your Clerk API>
CLERK_SECRET_KEY= <your Clerk API>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign_in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign_up
DATABASE_URL=<your Neon API>
```
## 🚀 Getting Started
```bash
# Clone the GitHub repository
git clone https://github.com/GabenNguyen/IntelliCheck.git

# Install the dependencies
npm install
or
yarn install

# Sync your local code with the Prisma schema
# (This ensures TypeScript knows your database structure)
npx prisma generate

# Apply the schema to your database
# (This creates the actual tables in Neon/Postgres)
npx prisma migrate dev

# Start the development server
npm run dev
```

## 📚 What I have learnt after this project
After this project, here are the things that I have learnt:
- **Real-world full-stack development process**: This project is a great way for me to learn the complete process of a full-stack web development. Although it might not the same as the way tech industries usually do in their development process
this project has given me a clear understanding of how a web is developed from scratch.
- **Secure authentication**: I learnt how to secure user sign-in and sign-up process using ___Clerk___
- **Database design with Prisma**: This project taught me how to design the database and how to use Prisma ORM effectively.
- **Practical AI Integration**: Initially, I intended to make several question sets with specific topics like History, Art, Computer Science, etc. However, I found that it was static and boring so I decided to integrate OpenRouter AI model into this project. This allows the website question setup process more dynamic as users can choose any topics they want, making it more engaging.
- **Modern UI/UX design**: The website pages at first were boring with simple design. Due to this issue, I started to learn some modern UI/UX design such as glassmorphism to make the pages more beautiful and attractive.

## 📈 Future Improvements
More features and functions for this project will be added in the future such as: 
- Analytics & leaderboard dashboard pages.
- Quizzes generated from PDF file.
- PDF export
- Streak counter

## ✍🏼 Author
Ba Hoa (Gaben) NGUYEN <br>
**Web developer | AI-Focused Projects | Hard-working | Fast-learner | Team Player** <br>

👨🏻‍💻 **Social Media:** <br>
**[LinkedIn](https://www.linkedin.com/in/bahoanguyen/) / [GitHub](https://github.com/GabenNguyen) / [Facebook](
https://www.facebook.com/hoa.nguyen.430397)** 

📞 **Contact via:** <br>
**Email:** nguyenbahoa04@gmail.com <br>
**Phone:** (+61) 481 991 586

## 📜 Licence 
### MIT
For more information, please visit **[this website](https://opensource.org/license/mit)**.

