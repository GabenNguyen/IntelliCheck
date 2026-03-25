# 🧠 IntelliCheck - AI Quiz Generation Platform

An AI quiz generation web application powered by **Google Gemini AI** that creates customised quizzes on any topic. It also allows users to choose the **number of questions** and a **specific difficulty**. All quiz data is **protected** and **persisted** in the database for future visit, and is displayed in the **Dashboard** page. Built with modern web technologies for a seamless user experience.

**[GitHub repository](https://github.com/GabenNguyen/IntelliCheck.git)**

## ✨ Key Features
- 🤖 **AI Generated Quizzes** <br>
Leveraged ___Google Gemini AI___ for instant quiz generation on any user-provided topic.

- 🔐 **Secure Authentication and User Account** <br>
Secure sign-in and user management powered by ___Clerk___.

- 📂 **Quiz History and Persistence** <br>
All quizzes are saved and retrievable using ___Prisma ORM___ and ___Neon (PostgreSQL)___.

- 🌟 **Modern UI and Animation** <br>
Clean, responsive design built with ___Tailwind CSS___ and ___Framer Motion___ for optimal user interface and experience.

- ⚡ **Fast and Scalable** <br>
Built on ___Next.js App Router___ with ___TypeScript___ for maintainability and performance.

- 💀 **Asian difficulty** <br>
For those who wants to challenge themselves, Asian difficulty provides ___extremely hard question(s)___, all of which may look similar to the others, requiring exceptional logical thinking skills and well-rounded knowledge of the chosen topic. In addition, the given time for this mode is short (around 45 seconds), imitating "real Asian" learning style.

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
- **Google Gemini AI****
- **Prisma ORM**
- **Neon (PostgreSQL)**

### Authentication
- **Clerk**

## 🎯 Purpose of this project
As a university student, I identified a common gap in exam preparation: course materials alone are often insufficient for effective revision, while general AI tools can produce overly broad or unfocused content.

To address this, I built an AI-powered quiz generation system that creates targeted, high-quality practice questions tailored to specific topics. The goal is to streamline revision by delivering relevant, concise, and exam-focused content—helping students study more efficiently and with greater confidence.


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
GEMINI_API_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
DATABASE_URL=
```
## 🚀 Getting Started
```bash
# Clone the GitHub repository
git clone https://github.com/GabenNguyen/IntelliCheck.git

# Install the dependencies
npm install
or
yarn install

# Generate Prisma client
npx prisma generate

# Run database migration
npx prisma migrate dev

# Start the development server
npm run dev
```

## 📚 What I have learnt after this project
After this project, here are the things that I have learnt:
- **Real-world full-stack development process**: This project is a great way for me to learn the complete process of a full-stack web development.
- **Secure authentication**: I learnt how to secure user sign-in and sign-up process using ___Clerk___
- **Database design with Prisma**: This project taught me how to design the database and how to use Prisma ORM effectively.
- **Practical AI Integration**: Initially, I intended to make several question sets with specific topics like History, Art, Computer Science, etc. However, I found that it was static and boring so I decided to integrate Google Gemini AI into this project. This allows the website question setup process more dynamic as users can choose any topics they want, making it more engaging.
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

