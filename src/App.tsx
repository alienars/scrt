// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Features from './Features/Features';
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Hero from "./Hero/Hero";

interface urlsIn {
    github:string,
    home:string
}
const urls: urlsIn = {
  github: "https://github.com/alienars/scrt",
  home: "https://scrt.ra8.ir",
};

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Footer github_url={urls.github} home_url={urls.home} />
    </>
  );
}

export default App
