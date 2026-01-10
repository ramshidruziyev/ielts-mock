export const readingData = {
  id: "p001",
  title: "Museum Blockbuster",
  timeLimitMinutes: 20,

  passage: `
A. Since the 1980s, the term “blockbuster” has become the fashionable word for special spectacular museum, art gallery or science center exhibitions. These exhibitions have the ability to attract large crowds and often large corporate sponsors. Here is one of some existing definitions of blockbuster: Put by Elsen (1984), a blockbuster is a “... large scale loan exhibition that people who normally don’t go to museums will stand in line for hours to see...” James Rosenfield, writing in Direct Marketing in 1993, has described a successful blockbuster exhibition as a “... triumph of both curatorial and marketing skills...” My own definition for blockbuster is “a popular, high profile exhibition on display for a limited period, that attracts the general public, who are prepared to both stand in line and pay a fee in order to partake in the exhibition.” What both Elsen and Rosenfield omit in their descriptions of blockbusters, is that people are prepared to pay a fee to see a blockbuster, and that the term blockbuster can just as easily apply to a movie or a museum exhibition.

B. Merely naming an exhibition or movie a blockbuster however, does not make it a blockbuster. The term can only apply when the item in question has had an overwhelmingly successful response from the public. However, in literature from both the UK and USA the other words that also start to appear in descriptions of blockbusters are “less scholarly”, “non-elitist” and “popularist”. Detractors argue that blockbusters are designed to appeal to the lowest common denominator, while others extol the virtues of encouraging scholars to cooperate on projects, and to provide exhibitions that cater for a broad selection of the community rather than an elite sector.

C. Maintaining and increasing visitor levels is paramount in the new museology. This requires continued product development. Not only the creation or hiring of blockbuster exhibitions, but regular exhibition changes and innovations. In addition, the visiting publics have become customers rather than visitors, and the skills that are valued in museums, science centers and galleries to keep the new customers coming through the door have changed. High on the list of requirements are commercial, business, marketing and entrepreneurial skills. Curators are now administrators. Being a director of an art gallery no longer requires an Art Degree. As succinctly summarized in the Economist in 1994 “business nous and public relation skills” were essential requirements for a director, and the ability to compete with other museums to stage travelling exhibitions which draw huge crowds.

D. The new museology has resulted in the convergence of museums, the heritage industry, and tourism, profit-making and pleasure-giving. This has given rise to much debate about the appropriateness of adapting the activities of institutions so that they more closely reflect the priorities of the market place and whether it is appropriate to see museums primarily as tourist attractions.

E. But do blockbusters held in public institutions really create a surplus to fund other activities? If the bottom line is profit, then according to the accounting records of many major museums and galleries, blockbusters do make money.

F. Blockbusters require large capital expenditure, and draw on resources across all branches of an organization. Everyone from a general laborer to administration staff are required to perform additional tasks.

G. Unfortunately, creating or hiring a blockbuster is exhausting for staff. Blockbusters expose staff to the pressures of the market place and may lead to creative excellence.

H. Perhaps the best pathway is to balance both blockbusters and regular exhibitions.
`,

  questions: [
    // Questions 1–4
    { id: 1, type: "paragraph", text: "A reason for changing the exhibition programs.", answer: "C" },
    { id: 2, type: "paragraph", text: "The time people have to wait in a queue in order to enjoy exhibitions.", answer: "A" },
    { id: 3, type: "paragraph", text: "Terms people used when referring to blockbuster.", answer: "B" },
    { id: 4, type: "paragraph", text: "There was some controversy over confining target groups of blockbuster.", answer: "B" },

    // Questions 5–8 (Summary)
    { id: 5, type: "summary", text: "Instead of being visitors, people turned out to be ____.", answer: "customers" },
    { id: 6, type: "summary", text: "Business nous and ____ were essential requirements.", answer: "public relation skills" },
    { id: 7, type: "summary", text: "____ has contributed to linking museums and tourism.", answer: "museology" },
    { id: 8, type: "summary", text: "Museums are seen mainly as ____.", answer: "tourist attractions" },

    // Questions 9–10
    {
      id: 9,
      type: "multi",
      text: "Which TWO advantages are mentioned?",
      options: {
        A: "To offer sufficient money to repair architectures.",
        B: "To maintain and increase visitor levels.",
        C: "Presenting mixture of culture and commerce.",
        D: "Being beneficial for local business.",
        E: "Being beneficial for directors."
      },
      answer: ["A", "D"]
    },

    // Questions 11–13
    {
      id: 11,
      type: "multi",
      text: "Which THREE disadvantages are mentioned?",
      options: {
        A: "People hesitate to choose exhibitions.",
        B: "Workers become tired of workloads.",
        C: "Content becomes more entertaining than cultural.",
        D: "General laborers perform additional tasks.",
        E: "Huge capital invested in specialists.",
        F: "Staff exposed to market pressure."
      },
      answer: ["B", "C", "E"]
    }
  ]
};

/* =========================
   NATIJANI HISOBLASH LOGIKASI
   ========================= */

export function calculateResult(userAnswers) {
  let correct = 0;

  readingData.questions.forEach(q => {
    const user = userAnswers[q.id];
    if (!user) return;

    if (Array.isArray(q.answer)) {
      if (
        Array.isArray(user) &&
        user.length === q.answer.length &&
        user.every(a => q.answer.includes(a))
      ) {
        correct++;
      }
    } else {
      if (
        String(user).trim().toLowerCase() ===
        String(q.answer).trim().toLowerCase()
      ) {
        correct++;
      }
    }
  });

  const total = readingData.questions.length;
  const band = calculateBand(correct);

  return { correct, total, band };
}

function calculateBand(score) {
  if (score >= 13) return 9;
  if (score >= 11) return 8;
  if (score >= 9) return 7;
  if (score >= 7) return 6;
  if (score >= 5) return 5;
  if (score >= 3) return 4;
  return 3;
}