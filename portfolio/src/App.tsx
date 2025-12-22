import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import GitHubStats from "./components/GitHubStats";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app">
      <Hero scrollY={scrollY} />
      <About />
      <Projects />
      <Skills />
      <GitHubStats />
      <Contact />
    </div>
  );
}

export default App;
