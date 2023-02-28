import React from 'react';
import OptionModal from './OptionModal';

export default class Header extends React.Component {
    
  constructor(props) {

    super(props);
    this.name = props.name;
	this.state = {
		modal_shown: false,
	}
	this.closeModal = this.closeModal.bind(this)
    
  }

  showModal(){

	  this.setState({
		  modal_shown: true
	  })

  }

  closeModal() {
    this.setState({
		modal_shown: false
    })
  }

  render() {

	const { modal_shown } = this.state;
	var header = this,
		modal = '';

	if(modal_shown){
		modal = <OptionModal closeModal = {this.closeModal} /> 
	}
	else{
		modal = ''
	}

    return (
        <div>      
            <header className="App-header">
                <h1>{this.name}</h1>
            </header>
            <section class="flex_box header_toolbar">
                <div class="flex_box__element">
                    <input type="text" placeholder="Szukaj po atrybucie..." class="flex_box__input" />
                    <button class="flex_box__btn btn primary"> Szukaj </button>
                    <button class="flex_box__btn btn success"> PDF </button>
                </div>
                <div class="flex_box__element" onClick={header.showModal.bind(this)} > 
					<h3>Opcje</h3> 
				</div>
            </section>
			{ modal }
        </div>

    );

  }

}