// reading/data/p001.js
// =====================================================
// IELTS READING – P001
// TITLE: Museum Blockbuster
// QUESTIONS: 1–13 (ORIGINAL)
// =====================================================

window.readingData = {
  id: "p001",
  title: "Museum Blockbuster",
  time: 20,

  // =====================
  // PASSAGE (A–H) FULL
  // =====================
  passage: `
<p><b>A.</b> Since the 1980s, the term “blockbuster” has become the fashionable word for special spectacular museum, art gallery or science center exhibitions. These exhibitions have the ability to attract large crowds and often large corporate sponsors. Here is one of some existing definitions of blockbuster: Put by Elsen (1984), a blockbuster is a “... large scale loan exhibition that people who normally don’t go to museums will stand in line for hours to see...” James Rosenfield, writing in Direct Marketing in 1993, has described a successful blockbuster exhibition as a “... triumph of both curatorial and marketing skills...” My own definition for blockbuster is “a popular, high profile exhibition on display for a limited period, that attracts the general public, who are prepared to both stand in line and pay a fee in order to partake in the exhibition.” What both Elsen and Rosenfield omit in their descriptions of blockbusters, is that people are prepared to pay a fee to see a blockbuster, and that the term blockbuster can just as easily apply to a movie or a museum exhibition.</p>

<p><b>B.</b> Merely naming an exhibition or movie a blockbuster however, does not make it a blockbuster. The term can only apply when the item in question has had an overwhelmingly successful response from the public. However, in literature from both the UK and USA the other words that also start to appear in descriptions of blockbusters are “less scholarly”, “non-elitist” and “popularist”. Detractors argue that blockbusters are designed to appeal to the lowest common denominator, while others extol the virtues of encouraging scholars to cooperate on projects, and to provide exhibitions that cater for a broad selection of the community rather than an elite sector.</p>

<p><b>C.</b> Maintaining and increasing visitor levels is paramount in the new museology. This requires continued product development. Not only the creation or hiring of blockbuster exhibitions, but regular exhibition changes and innovations. In addition, the visiting publics have become customers rather than visitors, and the skills that are valued in museums, science centers and galleries to keep the new customers coming through the door have changed. High on the list of requirements are commercial, business, marketing and entrepreneurial skills. Curators are now administrators. Being a director of an art gallery no longer requires an Art Degree. As succinctly summarized in the Economist in 1994 “business nous and public relation skills” were essential requirements for a director, and the ability to compete with other museums to stage travelling exhibitions which draw huge crowds.</p>

<p><b>D.</b> The new museology has resulted in the convergence of museums, the heritage industry, and tourism, profit-making and pleasure-giving. This has given rise to much debate about the appropriateness of adapting the activities of institutions so that they more closely reflect the priorities of the market place and whether it is appropriate to see museums primarily as tourist attractions. At many institutions you can now hold office functions in the display areas, or have dinner with the dinosaurs. Whatever commentators may think, managers of museums, art galleries and science centers worldwide are looking for artful ways to blend culture and commerce, and blockbuster exhibitions are at the top of the list. But while blockbusters are all part of the new museology, there is proof that you don’t need a museum, science center or art gallery to benefit from the drawing power of a blockbuster or to stage a blockbuster.</p>

<p><b>E.</b> But do blockbusters held in public institutions really create a surplus to fund other activities? If the bottom line is profit, then according to the accounting records of many major museums and galleries, blockbusters do make money. For some museums overseas, it may be the money that they need to update parts of their collections or to repair buildings that are in need of attention. For others in Australia, it may be the opportunity to illustrate that they are attempting to pay their way, by recovering part of their operating costs, or funding other operating activities with off-budget revenue. This makes the economic rationalists cheerful. However, not all exhibitions that are hailed to be blockbusters will be blockbusters, and some will not make money. It is also unlikely that the accounting systems of most institutions will recognize the real cost of either creating or hiring a blockbuster.</p>

<p><b>F.</b> Blockbusters require large capital expenditure, and draw on resources across all branches of an organization; however, the costs don’t end there. There is a Human Resource Management cost in addition to a measurable “real” dollar cost. Receiving a touring exhibition involves large expenditure as well, and draws resources from across functional management structures in project management style. Everyone from a general laborer to a building servicing unit, the front of house, technical, promotion education and administration staff, are required to perform additional tasks. Furthermore, as an increasing number of institutions in Australia try their hand at increasing visitor numbers, memberships (and therefore revenue), by staging blockbuster exhibitions, it may be less likely that blockbusters will continue to provide a surplus to subsidize other activities due to the competitive nature of the market. There are only so many consumer dollars to go around, and visitors will need to choose between blockbuster products.</p>

<p><b>G.</b> Unfortunately, when the bottom-line is the most important objective to the mounting of blockbuster exhibitions, this same objective can be hard to maintain. Creating, mounting or hiring blockbusters is exhausting for staff, with the real costs throughout an institution difficult to calculate. Although the direct aims may be financial, creating or hiring a blockbuster has many positive spin-offs; by raising their profile through a popular blockbuster exhibition, a museum will be seen in a more favorable light at budget time. Blockbusters mean crowds, and crowds are good for the local economy, providing increased employment for shops, hotels, restaurants, the transport industry and retailers. Blockbusters expose staff to the vagaries and pressures of the market place, and may lead to creative excellence. Either the success or failure of a blockbuster may highlight the need for managers and policy makers to rethink their strategies. However, the new museology and the apparent trend towards blockbusters make it likely that museums, art galleries and particularly science centers will be seen as part of the entertainment and tourism industry, rather than as cultural icons deserving of government and philanthropic support.</p>

<p><b>H.</b> Perhaps the best pathway to take is one that balances both blockbusters and regular exhibitions. However, this easy middle ground may only work if you have enough space, and have alternate sources of funding to continue to support the regular less exciting fare. Perhaps the advice should be to make sure that your regular activities and exhibitions are more enticing, and find out what your local community wants from you. The question now at most museums and science centers is “What blockbusters can we tour to overseas venues and will it be cost effective?”</p>
`,

  // =====================
  // QUESTIONS 1–13
  // =====================
  questions: [
    { id: 1, type: "paragraph", text: "A reason for changing the exhibition programs.", answer: "C" },
    { id: 2, type: "paragraph", text: "The time people have to wait in a queue.", answer: "A" },
    { id: 3, type: "paragraph", text: "Terms people used when referring to blockbuster.", answer: "B" },
    { id: 4, type: "paragraph", text: "Controversy over target groups.", answer: "B" },

    { id: 5, type: "input", text: "Instead of being visitors, people turned out to be ____.", answer: "customers" },
    { id: 6, type: "input", text: "Business nous and ____ were essential.", answer: "public relation skills" },
    { id: 7, type: "input", text: "____ has linked museums and tourism.", answer: "museology" },
    { id: 8, type: "input", text: "Museums seen mainly as ____.", answer: "tourist attractions" },

    {
      id: 9,
      type: "multi",
      limit: 2,
      text: "Which TWO advantages are mentioned?",
      options: {
        A: "Repair buildings",
        B: "Increase visitor levels",
        C: "Mix culture and commerce",
        D: "Benefit local business",
        E: "Benefit directors"
      },
      answer: ["A", "D"]
    },

    {
      id: 11,
      type: "multi",
      limit: 3,
      text: "Which THREE disadvantages are mentioned?",
      options: {
        A: "People hesitate",
        B: "Staff exhausted",
        C: "Too entertaining",
        D: "Extra tasks",
        E: "Huge capital",
        F: "Market pressure"
      },
      answer: ["B", "C", "E"]
    }
  ]
};