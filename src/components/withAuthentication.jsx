import React from 'react';
import { AuthUserContext } from './AppContext';
import { firebase, database } from '../config/firebase';

const withAuthentication = (Component) =>
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        if(authUser) {
          database.doReadUserData(authUser.uid).then((dbUser) => {
            dbUser['uid'] = authUser.uid;

            this.setState({ authUser: dbUser })
          });
        } else {
          this.setState({ authUser: null });
        }
      });
    }

    render() {
      const authUser = this.state.authUser;

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component />
        </AuthUserContext.Provider>
      );
    }
  }

export default withAuthentication;
