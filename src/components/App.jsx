import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';

const initialState = {
  questions: [],
  status: 'loading', // 'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
  answer: null,
  points: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'DATA_RECEIVED':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'DATA_FAIL':
      return {
        ...state,
        status: 'error',
      };
    case 'START':
      return {
        ...state,
        status: 'active',
      };
    case 'NEW_ANSWER':
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'NEXT_QUESTION':
      return { ...state, index: state.index + 1, answer: null };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer } = state;

  const numQuestions = questions.length;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/questions/`);
        const data = await res.json();

        dispatch({ type: 'DATA_RECEIVED', payload: data });
      } catch (e) {
        dispatch({ type: 'DATA_FAIL' });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
};

export default App;
