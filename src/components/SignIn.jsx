import React from "react";
import { database } from '../config/firebase';
import GoogleButton from 'react-google-button';
import { auth } from '../config/firebase';
import { Link } from 'react-router-dom';
import * as routes from '../config/routes';

class SignIn extends React.Component {
  handleGoogleSigning = (event) => {
    const { history } = this.props;

    auth.doSignInWithGoogle()
      .then(function(result) {
        // The signed-in user info.
        var user = result.user;

        //check if already existing user
        database.doReadUserData(user.uid).then((userData) => {
          if(!userData) { //if user does not exist yet, add it as buyer role
            database.doUpdateUserData(user.uid, user.displayName, user.email, 'buyer');
          }
        });

        history.push(routes.LANDING);
      }).catch(function(error) {
        console.error(error.message);
      });
  }

  render() {
    return (
      <div className="sign-in">
        <GoogleButton type="light" onClick={this.handleGoogleSigning} />
        <Link to={`/apply-as-owner`} className="apply-link">Apply for Store Owner</Link>
      </div>
    )
  }
}

export default SignIn;
