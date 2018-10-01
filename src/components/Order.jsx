import React from 'react';
import { formatPrice } from "../helpers";
import withAuthorization from '../components/withAuthorization';

const OrderItem = (props) => {
  const qtyRef = React.createRef();

  return(
    <li>
      <span>
        <span>
          <input 
            className="qty-field" 
            type="number"
            min={1} 
            max={100} 
            name="qty" 
            placeholder="1" 
            value={props.qty} 
            ref={qtyRef} 
            onChange={() => { props.setOrderData(props.index, parseInt(qtyRef.current.value, 10)) }} />
        </span>
        lbs {props.fishDetails.name}
        <button onClick={() => props.setOrderData(props.index, null, true)}>&times;</button>
      </span>
      <span className="price">{formatPrice(props.fishDetails.price * props.qty)}</span>
    </li>
  ) 
}

class Order extends React.Component {
  computeTotal() {
    let total = 0;

    Object.keys(this.props.orderData).map((key) => {
      const fishPrice = this.props.fishes[key].price;
      const qty = this.props.orderData[key];

      total += (qty * fishPrice);

      return total;
    });

    return total;
  }

  submitOrder = (event) => {
    if(window.confirm("Are you sure you want to submit order?")) {
      console.log(this.props.orderData);
    }
  }

  render() {
    const total = this.computeTotal();

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {
            Object.keys(this.props.orderData).map((key) => 
              <OrderItem 
                key={key} 
                index={key}
                qty={this.props.orderData[key]}
                fishDetails={this.props.fishes[key]} 
                setOrderData={this.props.setOrderData} />
            )
          }
          <li className="total">
            Total:
            <strong>{formatPrice(total)}</strong>
          </li>
        </ul>
        { (total > 0) ? <button className="submit-order" onClick={this.submitOrder}>Submit Order</button> : null }
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser && authUser.role === 'buyer';

export default withAuthorization(authCondition)(Order);
