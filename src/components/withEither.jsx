import React from 'react';

const withEither = (conditionFunction, EitherComponent) => (Component) => (props) => 
  conditionFunction(props) ? <Component {...props} /> : <EitherComponent />

export default withEither;
