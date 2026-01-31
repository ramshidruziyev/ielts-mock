// =====================================================
// IELTS READING – P002
// TITLE: Australia’s Cane Toad Problem
// QUESTIONS: 1–13
// FULL TEXT + FULL QUESTIONS + ANSWERS + CHECKING
// =====================================================

window.readingData = {
  id: "p002",
  title: "Australia’s Cane Toad Problem",
  time: 20,

  // =====================================================
  // PASSAGE A–G (FULL – NOTHING REMOVED)
  // =====================================================

  passage: `
<p><b>A</b> In the north of Australia there are many sugar cane plantations, which early in 
the 20th century were being damaged by a particular pest. This was a species of beetle 
whose larvae, the infant form of the beetle, live underground in the soil in the sugar cane 
fields. The sugar cane plants were weakened or died because their roots were eaten by 
the larvae. This had serious economic consequences for sugar cane farmers. Modern 
pesticides were not developed until the 1940s, so farmers had to use what was 
available at the time. Chemicals like arsenic and copper were used, but these were not 
only expensive but also stayed in the environment and were poisonous to people, plants 
and animals. It was generally acknowledged by government, farmers and scientists that 
cheaper and safer methods of pest control had to be found.</p>

<p><b>B</b> A promising replacement for copper and arsenic was the use of biological 
control. Farmers already used some forms of biological pest control in the form of 
predatory and parasitic wasps and flies, insect-eating birds, and plants from different 
regions or countries to control pests. Common practice was to release these 
introduced agents into new environments, the expectation being that they would 
destroy resident pests. Some species of toad already had successful records as agents 
of biological control in gardens. For example, in 19th-century France toads were sold to 
gardeners at markets in Paris to eat insect pests in their gardens. In the early 20th 
century French sugar cane farmers first took giant toads from South America to control 
pests in their Caribbean sugar cane plantations. Although there is no evidence that 
these toads did help to control pests, sugar cane scientists then carried some of these 
toads from Jamaica and Barbados to Puerto Rico and from there to Hawaii.</p>

<p><b>C</b> The idea of biological control of pests was not new to Australia. For example, in 
1926 there had been a highly successful prevention of the increase of the exotic prickly-
pear cactus by the introduction of a moth from Argentina. This success added strength 
to the argument that biological control was the answer to the sugar cane industry’s pest 
problems. Accordingly, in the early 1930s a decision was taken to introduce the giant 
South American toads, which in Australia are now commonly called cane toads, into 
Australian sugar cane plantations.</p>

<p><b>D</b> In 1935, an Australian entomologist brought 101 cane toads from Hawaii and 
released them in sugar cane plantations in the north of Australia. However, over the 
following years it became clear that the cane toads were a failure. There was a fatal flaw 
in the plan to use them as a form of biological control. This was that earthbound cane 
toads were expected to eat the mostly flying adult beetles in order to eliminate the soil-
dwelling beetle larvae that ate the roots of the cane sugar plants. This, of course, cane 
toads could not do.</p>

<p><b>E</b> Prior to their introduction in Australia, there had been very few opponents and 
only one made his views public. He was a retired former Chief Entomologist from the 
state government of New South Wales named Walter Froggatt. He forecast that cane 
toads might become as great a pest in Australia as rabbits. However, Froggatt’s peers 
rebuked him and eminent scientists branded his views ‘decidedly pessimistic’. It is 
estimated that today as many as a hundred million cane toads form a toxic infestation 
which is slowly spreading throughout the land.</p>

<p><b>F</b> Cane toads are large, heavily built amphibians. Average-sized adults are 10–15 
cm long and weigh more than a kilo. They have large swellings on each shoulder from 
which they squirt poison when they are threatened. This venom contains 14 different 
chemicals, but they do not appear to be harmful to humans as no-one has died in 
Australia from cane toad poison. Until recently there was no understanding of the 
toxicity of cane toad poison, but it is now clear that freshwater crocodiles, goannas 
(large lizards) and dingoes (wild dogs) have died after eating cane toads. Cane toads 
compete with native Australian fauna for food, and eat the eggs and young of ground-
nesting birds. As their numbers increase, they are taking over more and more of the 
land where native Australian fauna live.</p>

<p><b>G</b> The lesson that can be learned from the introduction of cane toads is important. 
It is wrong to think that such an awful biological event could not be repeated. In this 
instance, the catalyst was the overwhelming consensus of support for introducing cane 
toads to Australia. The error was that there was little or no testing of these biological 
agents before they were introduced to see what unplanned effects they might have on 
the environment.</p>
`,

  // =====================================================
  // QUESTIONS 1–13 (FULL TEXT + ANSWERS)
  // =====================================================

  questions: [
    {
      number: 1,
      type: "table",
      text: "The larvae of a type of ______ were a serious pest in sugar cane fields.",
      answer: "beetle"
    },
    {
      number: 2,
      type: "table",
      text: "Its larvae ate the ______ of the plant.",
      answer: "roots"
    },
    {
      number: 3,
      type: "table",
      text: "Chemical pesticides were difficult to remove from the ______.",
      answer: "environment"
    },
    {
      number: 4,
      type: "table",
      text: "In the 19th century French ______ used toads.",
      answer: "gardeners"
    },
    {
      number: 5,
      type: "table",
      text: "In Australia a ______ stopped the spread of prickly-pear cactus.",
      answer: "moth"
    },
    {
      number: 6,
      type: "table",
      text: "Cane toads were brought to Australia from ______.",
      answer: "Hawaii"
    },
    {
      number: 7,
      type: "table",
      text: "Cane toads proved to be a ______ as pest control.",
      answer: "failure"
    },
    {
      number: 8,
      type: "tfng",
      text: "The outcome of the introduction of cane toads was immediately obvious.",
      answer: "FALSE"
    },
    {
      number: 9,
      type: "tfng",
      text: "Rabbits were introduced to Australia to control weeds.",
      answer: "NOT GIVEN"
    },
    {
      number: 10,
      type: "tfng",
      text: "Walter Froggatt was criticised for his attempts to prevent the introduction of the cane toad to Australia.",
      answer: "TRUE"
    },
    {
      number: 11,
      type: "tfng",
      text: "The average size of cane toads has increased since their introduction.",
      answer: "NOT GIVEN"
    },
    {
      number: 12,
      type: "tfng",
      text: "Australian animals are able to eat cane toads without danger.",
      answer: "FALSE"
    },
    {
      number: 13,
      type: "tfng",
      text: "In many areas, cane toads are taking control of habitats previously occupied by native Australian animals.",
      answer: "TRUE"
    }
  ]
};

// =====================================================
// ANSWER CHECKING FUNCTION
// =====================================================

window.checkAnswers = function (userAnswers) {
  let score = 0;
  const results = [];

  window.readingData.questions.forEach((q, index) => {
    const user = (userAnswers[index] || "").trim().toLowerCase();
    const correct = q.answer.toLowerCase();

    const isCorrect = user === correct;
    if (isCorrect) score++;

    results.push({
      question: q.number,
      userAnswer: userAnswers[index] || "",
      correctAnswer: q.answer,
      correct: isCorrect
    });
  });

  return {
    score: score,
    total: window.readingData.questions.length,
    results: results
  };
};