import React from 'react';

import Header from "./components/Header";
import Main from "./components/Main";
import Intro from "./components/Intro";
import Log from "./components/Log";
import Footer from "./components/Footer";
import Acknowledgement from './components/Ackowledgement';

import "./app.scss";
import Contributors from './components/Contributors/Contributors';

function App(){
  return <>
    <Header/>
    <Main/>
    <Intro/>
    <Log/>
    <Footer/>

    <Contributors/>
    <Acknowledgement/>
  </>
}

export default App;