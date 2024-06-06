import { useQuiz } from "../contexts/QuizContext";

const NextButton = () => {
  const { answer, index, questions, setNextQuestion, finish } = useQuiz();
  const numQuestions = questions.length;
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={setNextQuestion}>
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={finish}>
        Finish
      </button>
    );
};

export default NextButton;
