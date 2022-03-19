import IndexPage from "./Component/Pages/Index-page/IndexPage";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./Component/Header/Header";
import Login from "./Component/Pages/Login/Login";
import WellcomePage from "./Component/Pages/Wellcome-page/WellcomePage";
import Register from "./Component/Pages/Register/Register";
import Recovery from "./Component/Pages/Recovery-password/RecoveryPassword";
import { useState } from "react";
function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<WellcomePage></WellcomePage>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/recovery" element={<Recovery></Recovery>}></Route>
        <Route path="/sign-in" element={<Login></Login>}></Route>
        <Route path="/index" element={<IndexPage></IndexPage>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
