import React from 'react';
import { AuthUserContext } from './AppContext';
import { formatPrice } from "../helpers";
import PropTypes from "prop-types";

const AddOrderButton = (props) => {
  return (
    <button 
      disabled={!props.isAvailable} 
      onClick={() => props.setOrderData(props.index)} >
      {
        (props.isAvailable) ? "Add To Order" : "Sold Out!"
      }
    </button>
  )
}

const FishItem = (props) => {
  const { image, name, price, desc } = props.details;

  return (
    <li className="menu-fish">
      <img src={image} alt={name} />
      <h3 className="fish-name">
        {name}
        <span className="price">{formatPrice(price)}</span>
      </h3>
      <p>{desc}</p> 
      { props.children }
    </li>
  )
}

const Fish = (props) =>
  <ul className="list-of-fishes">
    { 
      Object.keys(props.fishes).map((key) => {
        const isAvailable = props.fishes[key].status === 'available';

        return (
          <FishItem key={key} details={props.fishes[key]} >
            <AuthUserContext.Consumer>
              {
                (authUser) => (authUser && authUser.role === 'buyer') 
                  ? <AddOrderButton index={key} isAvailable={isAvailable} setOrderData={props.setOrderData} />
                  : null
              }
            </AuthUserContext.Consumer>
          </FishItem>
        )
      })
    }
  </ul>

AddOrderButton.propTypes = {
  setOrderData: PropTypes.func
};

FishItem.propTypes = {
  details: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number
  })
};

export default Fish;
