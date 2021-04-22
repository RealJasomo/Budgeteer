import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Homepage, Nav, SignUp, Login } from './components';


import styles from './css/index.module.css';

function App() {
  return (
    <div className={styles.app}>
    <Router>
      <Nav/>
      <Switch>
        <Route path={["/", "/about", "/signup", "/login"]} exact>
          <div className={styles.backgroundShape}></div>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/about">
            about
        </Route>
        <Route path="/signup">
            <SignUp/>
        </Route>
        <Route path="/login">
            <Login/>
        </Route>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}


export default App;
