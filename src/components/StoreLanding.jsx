import React from 'react';
import { compose } from 'recompose';
import { database } from '../config/firebase';
import { Link } from 'react-router-dom';
import * as routes from '../config/routes';
import withAuthorization from '../components/withAuthorization';
import withMaybe from '../components/withMaybe';
import withEither from '../components/withEither';

const EmptyStore = () =>
  <React.Fragment>
    <p>You have no stores.</p>
    <p>Would you like to <Link to={ routes.STORE_ADD }>create one</Link>? </p>
  </React.Fragment>

const LoadingStore = () =>
  <React.Fragment>
    <p>Loading stores...</p>
  </React.Fragment>

const isLoadingConditionFn = (props) => !props.isLoadingItems;
const isEmptyConditionFn = (props) => (props.userStores && Object.keys(props.userStores).length > 0);

const withConditionalRenderings = compose(
  withEither(isLoadingConditionFn, LoadingStore),
  withEither(isEmptyConditionFn, EmptyStore)
);

const StoreCards = (props) => {
  const { stores, userStores } = props;

  return (
    <React.Fragment> 
      {
        Object.keys(userStores).map((storeId) => {
          const { name, tag_line, contact } = stores[storeId];

          return (
            <div key={storeId} className="store-card">
              <h3>{name}</h3>
              <p>{tag_line}</p>
              <p>{contact}</p>
              <Link to={`store/view/${storeId}`}>View this store</Link>
            </div>
          )
        })
      }
    </React.Fragment>
  )
}

const StoreList = withConditionalRenderings(StoreCards);

class StoreLanding extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: null
    }
  }

  componentWillMount() {
    database.doReadStoreData().then((stores) => {
      if(stores) {
        this.setState({ stores: stores });
      }
    });
  }

  render() {
    const { authUser } = this.props;
    const stores = this.state.stores;
    const userStores = authUser.stores;
    const isLoadingItems = (!stores) ? true : false;

    return (
      <div className="store-wrapper">
        <h2>Your Stores</h2>
        <div className="store-list">
          <StoreList stores={stores} userStores={userStores} isLoadingItems={isLoadingItems}/>
        </div>
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(StoreLanding);
