import './App.css';
import Footer from './Components/footer';
import Headernav from './Components/headernav';
import { BrowserRouter as Router, Link, Switch, Route, NavLink} from "react-router-dom";

function App() {
  return (
    <>
	<Router>
  <Headernav/>
<Footer/>
</Router>
    </>
  );
}

export default App;
