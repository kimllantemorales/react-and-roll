import React from 'react';
import FishForm from './FishForm';
import withAuthorization from '../components/withAuthorization';

class Inventory extends React.Component {
  render() {
    return(
      <div className="inventory">
        <h2>Inventory</h2>
        {
          Object.keys(this.props.fishes).map((key) => 
            <FishForm 
              key={key}
              index={key}
              fish={this.props.fishes[key]}
              setFishData={this.props.setFishData} />
          )
        }

        <FishForm key={0} setFishData={this.props.setFishData} /> {/* Add Fish Form */}
      </div>
    )
  }
}

const authCondition = (authUser) => !!authUser && authUser.role !== 'buyer';

export default withAuthorization(authCondition)(Inventory);
