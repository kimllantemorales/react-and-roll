import React from 'react';

const AddForm  = (props) => {
  let nameRef   = React.createRef();
  let priceRef  = React.createRef();
  let statusRef = React.createRef();
  let descRef   = React.createRef();
  let imageRef  = React.createRef();
  
  const addFishData = (event) => {
    event.preventDefault();

    const fishData = {
      name: nameRef.current.value,
      price: parseFloat(priceRef.current.value),
      desc: descRef.current.value,
      image: imageRef.current.value,
      status: statusRef.current.value
    };

    const fishKey = window.btoa(nameRef.current.value);

    props.setFishData(fishKey, fishData);

    event.currentTarget.reset();
  };

  return (
    <form onSubmit={addFishData}>
      <input 
        type="text" 
        name="name" 
        placeholder="Fish Name" 
        ref={nameRef} />
      <input 
        type="text" 
        name="price" 
        placeholder="Fish Price" 
        ref={priceRef} />
      <select 
        type="text" 
        name="status" 
        ref={statusRef} >
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea 
        type="text" 
        name="desc" 
        placeholder="Fish Desc" 
        ref={descRef} />
      <input 
        type="text" 
        name="image" 
        placeholder="Fish Image" 
        ref={imageRef}/>
      <button type="submit">+ Add Fish</button>
    </form>
  )
}

const UpdateForm = (props) => {
  const { name, price, status, desc, image } = props.fish;

  const handleChange = (event) => {
    const updatedFish = props.fish;

    if(updatedFish) {
      updatedFish[event.currentTarget.name] = event.currentTarget.value;

      props.setFishData(props.index, updatedFish);
    }
  };

  return (
    <React.Fragment>
      <input 
        type="text" 
        name="name" 
        placeholder="Fish Name" 
        value={name} 
        onChange={handleChange} />
      <input 
        type="text" 
        name="price" 
        placeholder="Fish Price" 
        value={price} 
        onChange={handleChange} />
      <select 
        type="text" 
        name="status"
        value={status} 
        onChange={handleChange} >
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea 
        type="text" 
        name="desc" 
        placeholder="Fish Desc"
        value={desc} 
        onChange={handleChange} />
      <input 
        type="text" 
        name="image" 
        placeholder="Fish Image" 
        value={image} 
        onChange={handleChange} />
      <button onClick={() => props.setFishData(props.index, null)}>&minus; Remove Fish</button> 
    </React.Fragment>
  ) 
}

class FishForm extends React.Component {
  nameRef   = React.createRef();
  priceRef  = React.createRef();
  statusRef = React.createRef();
  descRef   = React.createRef();
  imageRef  = React.createRef();
  fishData  = {
    name   : '',
    price  : 0,
    status : 'unavailable',
    desc   : '',
    image  : '',
  };

  render() {
    const isAddForm = (typeof this.props.fish === "undefined") ? true : false;

    return(
      <div className="fish-edit">
        {
          (isAddForm)
            ? <AddForm setFishData={this.props.setFishData} />
            : <UpdateForm 
                fish={this.props.fish} 
                index={this.props.index} 
                setFishData={this.props.setFishData} />
        }
      </div>
    );
  }
}

export default FishForm;
