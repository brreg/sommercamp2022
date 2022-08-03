import React from 'react';
import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import Forside from './Pages/Forside/Forside';
import Bedrifter from './Pages/Bedrifter/Bedrifter';
import Navbar from './Components/Navbar/Navbar';
import Miljo from './Pages/Bedrifter_miljo/Miljo';
import Sosial from './Pages/Bedrifter_sosial/Sosial';
import Okonomi from './Pages/Bedrifter_okonomi/Okonomi';
import Test_Page from './Pages/Test/Test_page'


export default function App() {

  const {id} = useParams();

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route>
          <Route index element={<Forside/>} />
          <Route path="/:id/miljo" id={id} element={<Miljo/>}/>
          <Route path="/:id/sosial" id={id} element={<Sosial/>}/>
          <Route path="/:id/okonomi" id={id} element={<Okonomi/>}/>
          <Route path="/:id" id={id} element={<Bedrifter/>}/>
          <Route path="/test" element={<Test_Page/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);

