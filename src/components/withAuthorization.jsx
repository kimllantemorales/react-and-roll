import React from 'react';
import { withRouter } from 'react-router-dom';
import { AuthUserContext } from './AppContext';
import { firebase, database } from '../config/firebase';
import * as routes from '../config/routes';

const withAuthorization = (authCondition) => (Component) => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isAuthorized: false
      };
    }

    componentDidMount() {
      const { history } = this.props;
 
      firebase.auth.onAuthStateChanged(authUser => {
        if(!authUser) {
          history.push(routes.SIGN_IN);
        }

        database.doReadUserData(authUser.uid).then((dbUser) => {
          this.setState({ isAuthorized: authCondition(dbUser) });
        });
      });
    }

    render() {
      return (
        (this.state.isAuthorized)
          ? <AuthUserContext.Consumer>
              {authUser => (authUser) ? <Component authUser={authUser} {...this.props} /> : null}
            </AuthUserContext.Consumer>
          : null
      );
    }
  }

  return withRouter(WithAuthorization);
}

export default withAuthorization;
