import { useQuiz } from "../contexts/QuizContext";

const StartScreen = () => {
  const { questions, start } = useQuiz();

  const numQuestions = questions.length;

  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={start}>
        Let's start!
      </button>
    </div>
  );
};

export default StartScreen;
