import { useQuiz } from "../contexts/QuizContext";

const Options = () => {
  const { questions, answer, setNewAnswer, index } = useQuiz();
  const { options, correctOption } = questions[index];
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {options.map((opt, index) => (
        <button
          key={opt}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
          }`}
          onClick={() => setNewAnswer(index)}
          disabled={hasAnswered}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default Options;
