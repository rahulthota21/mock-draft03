// Mock interview questions for static params
const mockQuestions = [
  { id: "q1" },
  { id: "q2" },
  { id: "q3" },
  { id: "q4" },
  { id: "q5" },
  { id: "q6" },
  { id: "q7" },
  { id: "q8" }
];

export function generateStaticParams() {
  return mockQuestions.map((question) => ({
    sessionId: question.id,
  }));
}