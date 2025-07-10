import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./AppRouter";
import Header from "./components/Header";

function App() {
  return (
  <Router>
    <Header />
    <main>
      <AppRouter />
    </main>
  </Router> 
);
}

export default App;
