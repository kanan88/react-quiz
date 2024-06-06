import { useQuiz } from "../contexts/QuizContext";

const FinishScreen = () => {
  const { questions, points, highScore, restart } = useQuiz();

  const maxPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  const percentage = (points / maxPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "😄";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(High score: {highScore} points)</p>
      <button className="btn btn-ui" onClick={restart}>
        Restart
      </button>
    </>
  );
};

export default FinishScreen;
