// reading/data/p001.js
// =====================================================
// IELTS READING TEST – P001
// TITLE: Museum Blockbuster
// =====================================================

const readingData = {
  id: "p001",
  title: "Museum Blockbuster",
  timeLimitMinutes: 20,

  passage: `
A. Since the 1980s, the term “blockbuster” has become the fashionable word for special spectacular museum, art gallery or science center exhibitions. These exhibitions have the ability to attract large crowds and often large corporate sponsors. Here is one of some existing definitions of blockbuster: Put by Elsen (1984), a blockbuster is a “... large scale loan exhibition that people who normally don’t go to museums will stand in line for hours to see...” James Rosenfield, writing in Direct Marketing in 1993, has described a successful blockbuster exhibition as a “... triumph of both curatorial and marketing skills...” My own definition for blockbuster is “a popular, high profile exhibition on display for a limited period, that attracts the general public, who are prepared to both stand in line and pay a fee in order to partake in the exhibition.” What both Elsen and Rosenfield omit in their descriptions of blockbusters, is that people are prepared to pay a fee to see a blockbuster, and that the term blockbuster can just as easily apply to a movie or a museum exhibition.

B. Merely naming an exhibition or movie a blockbuster however, does not make it a blockbuster. The term can only apply when the item in question has had an overwhelmingly successful response from the public. However, in literature from both the UK and USA the other words that also start to appear in descriptions of blockbusters are “less scholarly”, “non-elitist” and “popularist”. Detractors argue that blockbusters are designed to appeal to the lowest common denominator, while others extol the virtues of encouraging scholars to cooperate on projects, and to provide exhibitions that cater for a broad selection of the community rather than an elite sector.

C. Maintaining and increasing visitor levels is paramount in the new museology. This requires continued product development. Not only the creation or hiring of blockbuster exhibitions, but regular exhibition changes and innovations. In addition, the visiting publics have become customers rather than visitors, and the skills that are valued in museums, science centers and galleries to keep the new customers coming through the door have changed.

D. The new museology has resulted in the convergence of museums, the heritage industry, and tourism, profit-making and pleasure-giving. This has given rise to much debate about the appropriateness of adapting the activities of institutions so that they more closely reflect the priorities of the market place and whether it is appropriate to see museums primarily as tourist attractions.

E. But do blockbusters held in public institutions really create a surplus to fund other activities? If the bottom line is profit, then according to the accounting records of many major museums and galleries, blockbusters do make money. For some museums overseas, it may be the money that they need to update parts of their collections or to repair buildings that are in need of attention.

F. Blockbusters require large capital expenditure, and draw on resources across all branches of an organization. Creating or hiring blockbusters is exhausting for staff, and involves extra tasks across departments. Increasing competition also reduces the likelihood of continued surplus.

G. Perhaps the best pathway to take is one that balances both blockbusters and regular exhibitions.
  `,

  questions: [
    // Matching information to paragraphs
    {
      id: 1,
      type: "paragraph",
      text: "A reason for changing the exhibition programs.",
      answer: "C"
    },
    {
      id: 2,
      type: "paragraph",
      text: "The time people have to wait in a queue in order to enjoy exhibitions.",
      answer: "A"
    },
    {
      id: 3,
      type: "paragraph",
      text: "Terms people used when referring to blockbuster.",
      answer: "B"
    },
    {
      id: 4,
      type: "paragraph",
      text: "There was some controversy over confining target groups of blockbuster.",
      answer: "D"
    },

    // Sentence completion
    {
      id: 5,
      type: "input",
      text: "Instead of being visitors, people turned out to be ____.",
      answer: "customers"
    },
    {
      id: 6,
      type: "input",
      text: "Business nous and ____ were essential requirements.",
      answer: "public relation skills"
    },
    {
      id: 7,
      type: "input",
      text: "____ has contributed to the linking of museums and tourism.",
      answer: "new museology"
    },
    {
      id: 8,
      type: "input",
      text: "Museums are seen mainly as ____.",
      answer: "tourist attractions"
    },

    // Multiple choice – choose TWO
    {
      id: 9,
      type: "multi",
      text: "Which TWO advantages are mentioned by the writer?",
      options: {
        A: "To offer sufficient money to repair buildings",
        B: "To maintain visitor levels",
        C: "Mix culture and commerce",
        D: "Benefit local business",
        E: "Benefit directors"
      },
      answer: ["A", "B"]
    },

    // Multiple choice – choose THREE
    {
      id: 11,
      type: "multi",
      text: "Which THREE disadvantages are mentioned?",
      options: {
        A: "Visitors hesitate",
        B: "Staff exhausted",
        C: "Too entertaining",
        D: "Extra tasks",
        E: "Large capital costs",
        F: "Market pressure"
      },
      answer: ["B", "E", "F"]
    }
  ]
};

// reading.js va index.js o‘qishi uchun
window.readingData = readingData;