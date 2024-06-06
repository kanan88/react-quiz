import { createContext, useReducer, useEffect, useContext } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  status: "loading", // 'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

const SECS_PER_QUESTION = 30;

const reducer = (state, action) => {
  switch (action.type) {
    case "DATA_RECEIVED":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "DATA_FAIL":
      return {
        ...state,
        status: "error",
      };

    case "START":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "FINISH":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case "RESTART":
      return {
        ...state,
        status: "ready", // 'loading', 'error', 'ready', 'active', 'finished'
        index: 0,
        answer: null,
        points: 0,
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };

    case "NEW_ANSWER":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "NEXT_QUESTION":
      return { ...state, index: state.index + 1, answer: null };

    case "TICK":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      return state;
  }
};

const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    secondsRemaining,
  } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/questions/`);
        const data = await res.json();

        dispatch({ type: "DATA_RECEIVED", payload: data });
      } catch (e) {
        dispatch({ type: "DATA_FAIL" });
      }
    };

    fetchData();
  }, []);

  const setNewAnswer = (index) =>
    dispatch({ type: "NEW_ANSWER", payload: index });

  const start = () => dispatch({ type: "START" });

  const restart = () => dispatch({ type: "RESTART" });

  const setNextQuestion = () => dispatch({ type: "NEXT_QUESTION" });

  const finish = () => dispatch({ type: "FINISH" });

  const tick = () => dispatch({ type: "TICK" });

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        start,
        setNewAnswer,
        restart,
        setNextQuestion,
        finish,
        tick,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outisde of the QuizProvider");
  return context;
};

export { QuizProvider, useQuiz };
