import React from "react";
import { auth } from '../config/firebase';
import { withRouter } from 'react-router-dom';
import { AuthUserContext } from './AppContext';

class SignOut extends React.Component {
  signOut = (event) => {
    auth.doSignOut()
      .then(function() {

      }).catch(function(error) {
        console.error(error.message);
      });
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        { (authUser) => (authUser) ? <button onClick={this.signOut}>Sign Out</button> : null }
      </AuthUserContext.Consumer>
    )
  }
}

export default withRouter(SignOut);
