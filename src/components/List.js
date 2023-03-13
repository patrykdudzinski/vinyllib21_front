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
		active_row: '',
    }
	
	this.toggleActive = this.toggleActive.bind(this);
  }

	componentDidMount(){
		this.keyCodeHandler();
		this.scrollHandler();
	}

	scrollHandler(){
		window.onscroll = function() {
			let distanceScrolled = document.documentElement.scrollTop;
			if(Number(distanceScrolled) > 510){
				document.querySelector('.header_toolbar').classList.add('fixed')
			}
			else if(document.querySelector('.header_toolbar').classList.contains('fixed')){
				document.querySelector('.header_toolbar').classList.remove('fixed')
			}
		}
	}

	toggleActive(key){

		if(document.querySelector('.table__list .active') !== null && this.state.active_row !== key){
			document.querySelector('.table__list tr.active').classList.remove('active')
		}
		
		document.querySelector(`tr[row_id="${key}"`).classList.toggle('active')

		this.setState({
			active_row: key
		})
		
	}

	render() {

		let { elements, is_loading, active_row } = this.state;

		if (!this.props.ready) {
			return null;
		}
		
		let toggle_active = this.toggleActive;

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
											on_click_fn = {toggle_active}
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