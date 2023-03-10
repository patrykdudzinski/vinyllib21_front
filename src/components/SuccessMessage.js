import React from 'react';

export default class SuccessMessage extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        message : props.message
      }
    }
  
    render() {
      return (
          <div class="success_message">
              <h4>{this.state.message}</h4>
          </div>
        );
      }
  }