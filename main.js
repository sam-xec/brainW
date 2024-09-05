const score = {
    correct: { index: [], points: 0 },
    wrong: { index: [], points: 0 },
  };
  
  const quizData = [
    {
      question: "You just fixed a bug that took you all day to figure out, and now your code finally works. What’s the next move?",
      options: [
        "Commit and push before it breaks again.",
        "Take a victory lap around the office.",
        "Act like you knew the solution all along.",
        "Time to break something else.",
      ],
      answer: "Commit and push before it breaks again.",
    },
    {
      question: "Your project manager says, 'It’s just a small change, it won’t take long.' What’s your internal monologue?",
      options: [
        "Famous last words.",
        "Just like last time, right?",
        "Define ‘small’.",
        "Sure, if you like living dangerously.",
      ],
      answer: "Famous last words.",
    },
    {
      question: "You’ve been debugging for hours, and the issue was a missing semicolon. What’s your first reaction?",
      options: [
        "Of course, it’s always the semicolon.",
        "Semicolons are my nemesis.",
        "Who needs punctuation anyway?",
        "Time to take up a new hobby.",
      ],
      answer: "Semicolons are my nemesis.",
    },
    {
      question: "You deploy your code, and everything crashes. What’s your go-to move?",
      options: [
        "Blame the server.",
        "Quickly rollback and act like nothing happened.",
        "Pretend you’re as surprised as everyone else.",
        "Step 1: Panic. Step 2: Fix it.",
      ],
      answer: "Quickly rollback and act like nothing happened.",
    },
    {
      question: "Your friend asks you to explain your code, but you know it’s a mess. How do you respond?",
      options: [
        "Let’s just say it works… somehow.",
        "It’s more of an art than a science.",
        "Don’t worry about it, it’s a ‘me’ thing.",
        "If it works, it’s good code.",
      ],
      answer: "If it works, it’s good code.",
    },
  ];
  
  let index = 0;
  
  const renderQuestion = ({ question, options }) => {
    const displayDiv = document.querySelector("#display-mcq");
    displayDiv.innerHTML = `
      <form>
        <legend>${question}</legend>
        ${options
          .map(
            (option, i) =>
              `<label><input type="radio" name="question" value="${option}"> ${option}</label><br>`
          )
          .join("")}
      </form>
    `;
    const savedAnswer = sessionStorage.getItem(`answer${index}`);
    if (savedAnswer) document.querySelector(`input[value="${savedAnswer}"]`).checked = true;
  };
  
  const saveAnswer = () => {
    const selectedOption = document.querySelector('input[name="question"]:checked');
    if (selectedOption) sessionStorage.setItem(`answer${index}`, selectedOption.value);
  };
  
  const handleNext = () => {
    if (index < quizData.length - 1) {
      saveAnswer();
      index++;
      renderQuestion(quizData[index]);
      toggleNavigationButtons();
    }
  };
  
  const handlePrevious = () => {
    if (index > 0) {
      saveAnswer();
      index--;
      renderQuestion(quizData[index]);
      toggleNavigationButtons();
    }
  };
  
  const toggleNavigationButtons = () => {
    document.querySelector("#nextBtn").style.display =
      index === quizData.length - 1 ? "none" : "inline-block";
    document.querySelector("#prevBtn").style.display = index === 0 ? "none" : "inline-block";
  };
  
  const handleSubmit = () => {
    saveAnswer();
    quizData.forEach((q, i) => {
      const storedAnswer = sessionStorage.getItem(`answer${i}`);
      if (storedAnswer === q.answer) {
        score.correct.points++;
        score.correct.index.push(i);
      } else {
        score.wrong.points++;
        score.wrong.index.push(i);
      }
    });
    const wrongAnswers = score.wrong.index
      .map(
        (i) =>
          `Question ${i + 1}: ${quizData[i].question}\nYour Answer: ${sessionStorage.getItem(
            `answer${i}`
          )}\nCorrect Answer: ${quizData[i].answer}\n`
      )
      .join("\n");
    alert(`You scored ${score.correct.points}/${quizData.length}\n\nIncorrect Answers:\n${wrongAnswers}`);
    sessionStorage.clear();
  };
  
  document.querySelector("#nextBtn").addEventListener("click", handleNext);
  document.querySelector("#prevBtn").addEventListener("click", handlePrevious);
  document.querySelector("#submit-btn").addEventListener("click", handleSubmit);
  
  renderQuestion(quizData[0]);
  toggleNavigationButtons();
  