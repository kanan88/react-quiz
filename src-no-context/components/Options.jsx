const Options = ({ options, dispatch, answer, correctOption }) => {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {options.map((opt, index) => (
        <button
          key={opt}
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswered ? (index === correctOption ? 'correct' : 'wrong') : ''
          }`}
          onClick={() => dispatch({ type: 'NEW_ANSWER', payload: index })}
          disabled={hasAnswered}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default Options;
