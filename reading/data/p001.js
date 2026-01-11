// reading/data/p001.js
// =====================================================
// IELTS READING TEST – P001
// TITLE: Museum Blockbuster
// QUESTIONS: 1–13
// =====================================================

const readingData = {
  id: "p001",
  title: "Museum Blockbuster",
  timeLimitMinutes: 20,

  passage: `
A. Since the 1980s, the term “blockbuster” has become the fashionable word for special spectacular museum, art gallery or science center exhibitions. These exhibitions have the ability to attract large crowds and often large corporate sponsors. Here is one of some existing definitions of blockbuster: Put by Elsen (1984), a blockbuster is a “large scale loan exhibition that people who normally don’t go to museums will stand in line for hours to see”. James Rosenfield, writing in Direct Marketing in 1993, described a successful blockbuster exhibition as a “triumph of both curatorial and marketing skills”. My own definition for blockbuster is a popular, high-profile exhibition on display for a limited period, attracting the general public, who are prepared to stand in line and pay a fee.

B. Merely naming an exhibition or movie a blockbuster does not make it one. The term applies only when the item has had an overwhelmingly successful response from the public. In literature from both the UK and USA, other words used include “less scholarly”, “non-elitist” and “popularist”. Detractors argue that blockbusters appeal to the lowest common denominator, while supporters argue they encourage cooperation and broader community access.

C. Maintaining and increasing visitor levels is paramount in the new museology. This requires continual product development, including blockbuster exhibitions and regular innovation. Visiting publics have become customers rather than visitors, and the skills valued in museums have shifted toward business, marketing and entrepreneurial abilities.

D. The new museology has resulted in the convergence of museums, the heritage industry and tourism, combining profit-making and pleasure-giving. This has raised debate over whether museums should reflect market priorities and be viewed primarily as tourist attractions.

E. Do blockbusters held in public institutions create a surplus to fund other activities? According to financial records of major museums, many blockbusters do generate profit. This income may be used to repair buildings or update collections.

F. Blockbusters require large capital expenditure and draw resources from all branches of an organization. Creating or hiring them is exhausting for staff and involves extra tasks across departments. Increasing competition also reduces the likelihood of continued surplus.

G. When profit becomes the primary objective, sustaining blockbuster exhibitions becomes difficult. Although the aim may be financial, the hidden costs in staff workload are significant.

H. Perhaps the most appropriate approach is to strike a balance between blockbuster exhibitions and regular exhibitions.
  `,

  questions: [
    // 1–4 Matching paragraphs
    {
      id: 1,
      type: "paragraph",
      text: "A reason for changing exhibition programs.",
      answer: "C"
    },
    {
      id: 2,
      type: "paragraph",
      text: "The length of time people are prepared to queue.",
      answer: "A"
    },
    {
      id: 3,
      type: "paragraph",
      text: "Alternative terms used to describe blockbusters.",
      answer: "B"
    },
    {
      id: 4,
      type: "paragraph",
      text: "Debate about the role of museums in society.",
      answer: "D"
    },

    // 5–8 Sentence completion
    {
      id: 5,
      type: "input",
      text: "Instead of being visitors, people have become ____.",
      answer: "customers"
    },
    {
      id: 6,
      type: "input",
      text: "Directors now need business nous and ____.",
      answer: "public relation skills"
    },
    {
      id: 7,
      type: "input",
      text: "The ____ has linked museums with tourism.",
      answer: "new museology"
    },
    {
      id: 8,
      type: "input",
      text: "Museums are increasingly viewed as ____.",
      answer: "tourist attractions"
    },

    // 9–10 Multiple choice (Choose TWO)
    {
      id: 9,
      type: "multi",
      limit: 2,
      text: "Which TWO advantages of blockbusters are mentioned?",
      options: {
        A: "Funds for repairing buildings",
        B: "Maintaining visitor numbers",
        C: "Improving academic research",
        D: "Helping local businesses",
        E: "Increasing staff salaries"
      },
      answer: ["A", "B"]
    },

    // 11–13 Multiple choice (Choose THREE)
    {
      id: 10,
      type: "multi",
      limit: 3,
      text: "Which THREE disadvantages of blockbusters are mentioned?",
      options: {
        A: "Visitors lose interest",
        B: "Staff become exhausted",
        C: "Exhibitions are too entertaining",
        D: "Extra workload for staff",
        E: "High capital costs",
        F: "Competitive pressure"
      },
      answer: ["B", "E", "F"]
    },

    // Paragraph H usage (balance conclusion)
    {
      id: 11,
      type: "paragraph",
      text: "A suggested solution for managing exhibitions.",
      answer: "H"
    },

    {
      id: 12,
      type: "paragraph",
      text: "Concerns about the long-term sustainability of blockbusters.",
      answer: "G"
    },

    {
      id: 13,
      type: "paragraph",
      text: "Financial benefits used for maintenance or improvement.",
      answer: "E"
    }
  ]
};

// reading.js va index.js o‘qishi uchun
window.readingData = readingData;