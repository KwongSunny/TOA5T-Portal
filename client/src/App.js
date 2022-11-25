import logo from './logo.svg';
import React, {useState, useEffect} from "react";
import './App.css';

function App() {
  const [data, setData] = useState(); 

  useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(data => setData(data.message))
  },[])

  return (
    <div className="App">
      {!data ? "Loading..." : data}
    </div>
  );
}

export default App;
