import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import Forside from './Pages/Forside';
import Bedrifter_miljo from './Pages/Bedrifter_miljo';
import Bedrifter from './Pages/Bedrifter';
import Navbar from './Components/Navbar/Navbar';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route>
          <Route index element={<Forside/>} />
          <Route path="Bedrifter" element={<Bedrifter/>}/>
          <Route path="Bedrifter_miljo" element={<Bedrifter_miljo/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);

