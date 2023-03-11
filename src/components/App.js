
import React from 'react';
import Header from './Header';
import List from './List';
import { ajaxAction } from '../Mixins';


export default class AppBody extends React.Component {

  constructor(props) {

    super(props);
    this.name = 'VinylLib 22'
    this.state = {
        list: '',
		search: '',
		ready: false
    }
	this.updateList = this.updateList.bind(this)
	this.setSearch = this.setSearch.bind(this)
	
  }

	 getElements(){
		var app = this;

		this.setState({
			list: '',
			ready: false
		})
		
		ajaxAction('http://vinyl.dudzinski.com.pl/api/library', {} )
			.then(data => {
				if(app.state.search.length > 0){
					data = data.filter(element => element.name.includes(app.state.search) || element.artist.includes(app.state.search) )
				}
				app.setState({
					list: data,
					ready: true
				})
			});
	}

	updateList(){
	  	this.getElements();
	}


	setSearch(event){
		this.setState({
			search: event.target.value
		})
	}

	componentDidMount(){
		this.getElements()
	}


  render() {
    return(
        <div>
            <Header name="VinylLib22" setSearch = {this.setSearch} get_list_fn = {this.updateList}></Header>
            <List list = {this.state.list} ready = {this.state.ready} ></List>
        </div>
    )

  }

}