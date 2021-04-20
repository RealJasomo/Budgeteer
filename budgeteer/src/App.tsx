import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Homepage, Nav } from './components'

import styles from './css/index.module.css';

function App() {
  return (
    <div className={styles.app}>
    <div className={styles.backgroundShape}></div>
    <Router>
      <Nav/>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/about">
            about
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
