import React from 'react';
import ObjectRow from './ObjectRow';
import keyCodeHandler from './keyCodeHandler';
import { ajaxAction } from '../Mixins';

export default class List extends keyCodeHandler{

  constructor(props) {
    
    super(props);
    
    this.state = {
        list: props.list,
		ready: props.ready,
		active_row: 0,
    }
  }

	componentDidMount(){
		this.keyCodeHandler();
	}


	componentDidUpdate(){
		console.log(this.props.list)
	//   this.getElements();
	//   this.forceUpdate();
	}
	


  render() {

	const { elements, is_loading, active_row } = this.state;
	console.log(this.props.ready, this.props.list)
    if (!this.props.ready) {
      return null;
    }

    return (
		<div>      
			<h2 class="table__heading"> Lista winyli </h2>
			<table class="table__list">
				<thead>
					<tr>
						<th>L.p.</th>
						<th>Artysta</th>
						<th>Tytuł</th>
						<th>Rok</th>
						<th>Wydawnictwo</th>
						<th>Gatunek</th>
					</tr>
				</thead>
				<tbody>
					{this.props.list.map(function(object, i){
						return <ObjectRow lp={i}
										active_row = {active_row}
										name={object.name} 
										artist={object.artist}
										year={object.year}
										label={object.record_label}
										genre={object.genre}
								/>;
					}) }					
				</tbody>
			</table>
		</div>

    );

  }

}