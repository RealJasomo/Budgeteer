import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Homepage } from './components'
function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/about">
            about
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
