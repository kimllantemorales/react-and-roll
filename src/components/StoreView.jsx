import React from 'react';
import { database } from '../config/firebase';
import Fish from './Fish';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import PropTypes from "prop-types";
import withStoreData from "./withStoreData";

class StoreView extends React.Component {
  state = {
    fishes: {},
    order: {}
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    database.doReadFishData().then((data) => {
      if(data) {
        this.setState({ fishes: data });
      }
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    //base.removeBinding(this.ref);
  }

  setFishData = (fishKey, fishData) => { //all in one CRUD, if fishData is null it means delete
    const fishes = { ...this.state.fishes };

    if(fishData) {
      //if fish still doesn't exist, add it to db
      if(fishes.hasOwnProperty(fishKey)) {
        database.doUpdateFishData(fishKey, fishData);
      } else {
        database.doAddFishData(fishData).then((data) => {
          fishKey = data.key; //set new fish key
        });
      }

      fishes[fishKey] = fishData;
    } else {
      database.doRemoveFishData(fishKey).then((data) => {
        delete fishes[fishKey];
      });
    }

    this.setState({ fishes });
  };

  setOrderData = (orderKey, qty, remove = false) => {
    const order = { ...this.state.order };

    if(remove) {
      delete order[orderKey];
    } else {
      order[orderKey] = (qty) ? qty : ( order[orderKey] + 1 || 1 );
    }

    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="ey bAuss!" />
          <Fish setOrderData={this.setOrderData} fishes={this.state.fishes} />
        </div>
        <Order 
          fishes={this.state.fishes} 
          orderData={this.state.order} 
          setOrderData={this.setOrderData} />
        <Inventory 
          fishes={this.state.fishes}
          setFishData={this.setFishData} />
      </div>
    );
  }
}

export default withStoreData(StoreView);
