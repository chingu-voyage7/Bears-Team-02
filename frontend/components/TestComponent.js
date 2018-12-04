import * as React from 'react';

class TestComponent extends React.Component {
    
    render() {
      return (
        <h1>{ this.props.testProp }</h1>
      );
    }
  }

  export default TestComponent;