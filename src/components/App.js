
import React from 'react';
import Header from './Header';
import List from './List';



export default class AppBody extends React.Component {

  constructor(props) {

    super(props);
    this.name = 'VinylLib 22'
    // this.state = {
    //     list: ''
    // }
    // this.list = this.getElements();
  }


  render() {
    return(
        <div>
            <Header name="VinylLib22"></Header>
            <List></List>
        </div>
    )

  }

}