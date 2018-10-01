import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as routes from '../config/routes';
import NotFound from './NotFound';
import SignIn from './SignIn';
import SignOut from './SignOut';
import StorePicker from './StorePicker';
import StoreView from './StoreView';
import StoreLanding from './StoreLanding';
import withAuthentication from './withAuthentication';

const App = () => 
  <Router>
    <React.Fragment>
      <Switch>
        <Route exact path={routes.LANDING} component={StoreLanding} />
        <Route exact path={routes.SIGN_IN} component={SignIn} />
        <Route exact path={routes.STORE_ADD} component={StorePicker} />
        <Route path={routes.STORE_VIEW} component={StoreView} />
        <Route component={NotFound} />

      </Switch>
  
      <SignOut />
    </React.Fragment>
  </Router>

export default withAuthentication(App);
