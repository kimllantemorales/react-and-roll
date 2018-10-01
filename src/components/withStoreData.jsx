import React from 'react';
import { StoreContext } from './AppContext';
import { firebase, database } from '../config/firebase';
import { withRouter } from 'react-router-dom';

const withStoreData = (Component) => {
  class WithStore extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        store: {
          info: {},
          orders: {},
          products: {}
        },
      };
    }

    componentDidMount() {
      console.log(this.props);
    }

    render() {
      const authUser = this.state.authUser;

      return (
        null
      );
    }
  }
  
  return withRouter(WithStore);
}

export default withStoreData;
