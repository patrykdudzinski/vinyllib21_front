import React from 'react';

export default class ErrorMessage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        message : props.message
      }
    }
  
    render() {
    return (
        <div class="error_message">
            <h4>{this.state.message}</h4>
        </div>
      );
    }
  }