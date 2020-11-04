import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Landing from "./pages/landing"
import Profil from "./pages/profil"
import Program from "./pages/program"
import ProgramDetail from "./pages/program-detail"
import Kepeduliankita from "./pages/kepeduliankita"
import KepeduliankitaDetail from "./pages/kepeduliankita-detail"
import NotFound from "./pages/notfound"

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Landing}></Route>
      <Route path="/profil" exact component={Profil}></Route>
      <Route path="/program" exact component={Program}></Route>
      <Route path="/program-detail" exact component={ProgramDetail}></Route>
      <Route path="/kepeduliankita" exact component={Kepeduliankita}></Route>
      <Route path="/kepeduliankita-detail" exact component={KepeduliankitaDetail}></Route>
      <Route component={NotFound}></Route>
    </Switch>
    </BrowserRouter>
  );
}

export default App;

{/* <div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
        </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
        </a>
  </header>
</div> */}