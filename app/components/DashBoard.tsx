"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

// sample data - TODO: replace with actual user data in the db
const data = [
  { name: "Mon", quizzes: 2 },
  { name: "Tue", quizzes: 1 },
  { name: "Wed", quizzes: 3 },
  { name: "Thu", quizzes: 1 },
  { name: "Fri", quizzes: 4 },
  { name: "Sat", quizzes: 0 },
  { name: "Sun", quizzes: 2 },
];

// boilerplate - will update later with actual data from the db
function Dashboard( {userName} : {userName: string} ) {
  return (
    <div className="w-full p-6 space-y-8">
      {/* HEADER */}
      <section>
        <h1 className="text-3xl font-bold mb-4">
            {`Welcome, ${userName}`}

        </h1>

        <div className="max-w-xs">
          <Link href="/quiz">
            <Button className="w-full h-20 text-lg gap-2 cursor-pointer">
              <Plus size={20} />
              Create Quiz
            </Button>
          </Link>
        </div>
      </section>

      {/* ANALYTICS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Quizzes</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">18</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Questions Generated</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">342</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Saved</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">57 mins</CardContent>
        </Card>
      </section>

      {/* ACTIVITY CHART */}
      <section>
        <Card className="h-72">
          <CardHeader>
            <CardTitle>This Week&apos;s Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Bar dataKey="quizzes" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* RECENT QUIZZES */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Recent Quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-lg">Biology - Cell Structure</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 dark:text-gray-400">
              12 questions • Created 2 days ago
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-lg">World History - WW2</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 dark:text-gray-400">
              10 questions • Created 4 days ago
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-lg">Math - Algebra</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 dark:text-gray-400">
              8 questions • Created 1 week ago
            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  );
}

export default Dashboard