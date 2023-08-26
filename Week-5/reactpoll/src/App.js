//import ReactDOM from "react-dom/client";
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Routes, Route ,useParams } from 'react-router-dom';

import Home from './Home';
import CreatePoll from './CreatePoll';
import PollDetail from './PollDetail';
import Vote from './Vote';
import Sample from './Sample';

export default function App() {
  //let { qid } = useParams();
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route exact path="/createpoll/" element={<CreatePoll />} />
        <Route exact path="/polldetails/:qid" element={<PollDetail />} />
        <Route exact path="/vote/:qid" element={<Vote />} />
        <Route exact path="/Sample/:qid" element={<Sample/>}/>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
