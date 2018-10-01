import React from "react";
import { database } from '../config/firebase';
import PropTypes from "prop-types";
import { getFunName } from "../helpers";
import withAuthorization from '../components/withAuthorization';

class StorePicker extends React.Component {
  nameRef = React.createRef();
  contactRef = React.createRef();
  tagLineRef = React.createRef();

  createStore = (event) => {
    event.preventDefault();

    const storeName = this.nameRef.current.value;
    const storeContact = this.contactRef.current.value;
    const storeTagLine = this.tagLineRef.current.value;

    database
      .doAddStoreData(storeName, storeContact, storeTagLine)
      .then((data) => {
        const storeKey = data.key;
        const userId = this.props.authUser.uid;

        database
          .doUpdateUserStores(userId, storeKey)
          .then(() => {
            this.props.history.push(`/store/view/${storeKey}`);
          });
      });
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.createStore}>
        <h2>Please Enter the Store Information</h2>
        <input
          type="text"
          name="name" 
          ref={this.nameRef}
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
        />
        <input
          type="text"
          name="contact"
          ref={this.contactRef}
          required
          placeholder="Contact Number" />
        <input
          type="text" 
          name="tagline"
          ref={this.tagLineRef}
          required
          placeholder="Store Tag Line" />
        <button type="submit">Create Store →</button>
      </form>
    );
  }
}

const authCondition = (authUser) => !!authUser && authUser.role !== 'buyer';

export default withAuthorization(authCondition)(StorePicker);

