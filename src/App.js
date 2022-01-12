import './App.css';
import Footer from './Components/footer';
import Headernav from './Components/headernav';
import Headernav1 from './Components/headernav1';
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
