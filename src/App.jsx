import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';

const initialState = {
  questions: [],
  status: 'loading', // 'loading', 'error', 'ready', 'active', 'finished'
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
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
};

export default App;
