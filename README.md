# StudyAI: AI-Powered Learning Platform

StudyAI is a modern learning platform that uses artificial intelligence to revolutionize how students study and learn.

## Features

- **AI Study Assistant**: Personal AI tutor that adapts to your learning style and needs
- **Smart Flashcards**: Dynamic cards that adapt to your learning curve using proven memory techniques
- **Visual Concept Maps**: Interactive knowledge graphs that connect related concepts for deeper understanding
- **Performance Analytics**: Comprehensive learning metrics with predictive insights to optimize your study time
- **Smart Study Planner**: AI-powered scheduling that optimizes your study time around your life
- **Practice Exams**: Custom tests that simulate real exam conditions with personalized questions

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Animation**: Framer Motion
- **Backend**: Supabase

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aidanmarr1/StudyAI.git
   cd StudyAI
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
studyai/
├── app/                # Next.js app router pages
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # User dashboard
│   ├── profile/        # User profile
│   ├── page.tsx        # Landing page
│   └── layout.tsx      # Root layout
├── components/         # Reusable components
│   ├── auth/           # Authentication components
│   ├── FeatureDemos/   # Feature demonstration components
│   └── ...             # Other components
├── public/             # Static assets
├── utils/              # Utility functions
└── ...                 # Config files
```

## License

This project is licensed under the MIT License. 