import * as React from 'react';
import TestComponent from '../components/TestComponent'

class LandingPage extends React.Component {
    /* we need to set up a store */
    constructor(props){
        super(props);
        this.state={
            hello: 'hi'
        }
    }
    render() {
      return (
        <div>
          <TestComponent testProp={this.state.hello} />
        </div>
      );
    }
  }

export default LandingPage;