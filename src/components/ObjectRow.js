import React from 'react';

export default class ObjectRow extends React.Component {
    
  constructor(props) {

    super(props);

    this.state = {
        key: `${props.lp+1}`,
        artist: props.artist,
		    row_class: (( props.lp+1 == props.active_row ) ? 'active' : '' ),
        name: props.name,
        year: props.year,
        label: props.label,
        genre: props.genre
    }
    
  }

  render() {

    return (
        <tr row_id = {this.state.key} class = {this.state.row_class} >
            <td>{this.state.key}</td>
            <td>{this.state.artist}</td>
            <td>{this.state.name}</td>
            <td>{this.state.year}</td>
            <td>{this.state.label}</td>
            <td>{this.state.genre}</td>
        </tr>

    );

  }

}