import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
