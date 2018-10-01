import React from 'react';

const withMaybe = (conditionFunction) => (Component) => (props) => 
  conditionFunction(props) ? null : <Component {...props} />

export default withMaybe;
