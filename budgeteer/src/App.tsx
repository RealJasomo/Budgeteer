import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Homepage, Nav } from './components'

import styles from './css/index.module.css';

function App() {
  return (
    <div className={styles.app}>
    <Router>
      <Nav/>
      <Switch>
        <Route path={["/", "/about"]}>
          <div className={styles.backgroundShape}></div>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/about">
            about
        </Route>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
