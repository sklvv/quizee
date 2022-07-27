import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const g = import.meta.env.VITE_TEST_VAR;
  console.log(g);
  return <div className="App">Sheesh</div>;
}

export default App;
