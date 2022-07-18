import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import Forside from './Pages/Forside';
import Bedrifter_miljo from './Pages/Bedrifter_miljo';
import Bedrifter_sosial from './Pages/Bedrifter_sosial';
import Bedrifter_okonomi from './Pages/Bedrifter_okonomi';
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
          <Route path="Bedrifter_sosial" element={<Bedrifter_sosial/>}/>
          <Route path="Bedrifter_okonomi" element={<Bedrifter_okonomi/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);

