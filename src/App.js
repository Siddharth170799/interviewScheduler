import logo from './logo.svg';
import './App.css';
import newContext from './Context';

import InterviewForm from './Dashboard';
import { useState } from 'react';
import Practice from './Practice';

function App() {
  const [data,setData] = useState([])
  return (
    <newContext.Provider value={{data,setData}}>
 <InterviewForm/>
    </newContext.Provider>


  );
}

export default App;
