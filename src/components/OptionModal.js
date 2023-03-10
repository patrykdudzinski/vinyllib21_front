
import React from 'react';
import AddRecordForm from './AddRecordForm';
import AddLabelForm from './AddLabelForm';

import { ajaxAction } from '../Mixins';

export default class OptionModal extends React.Component {

    constructor(props) {
        super();
        this.state = {
            genres_list: '',
            labels_list: '',
            option: 'record',
            ready: false
        }
    }

    getGenresList(){
        var app = this;
        ajaxAction('http://vinyl.dudzinski.com.pl/api/getGenres', {} )
        .then(data => {
            app.setState({
                genres_list: data,
            })
        });
    }

    getLabelsList(){
        var app = this;
        ajaxAction('http://vinyl.dudzinski.com.pl/api/getLabels', {} )
        .then(data => {
            app.setState({
                labels_list: data,
                ready: true
            })
        });
    }

    componentDidMount(){
		this.getGenresList()
		this.getLabelsList()
	}


    changeForm(caller){
        this.setState({
            option: caller.target.id
        })
    }

    selectForm(name){
        
        if(name == 'record'){
            return <AddRecordForm genres_list = {this.state.genres_list} 
                                    labels_list = {this.state.labels_list} />
        }
        else if(name == 'record_label'){
            return <AddLabelForm labels_list = {this.state.labels_list} />
        }
        else{
            return '';
        }
    }

    render() {
        const { elements, labels_list, option, ready } = this.state;
	
        if (!this.state.ready) {
          return null;
        }
        

        let componentToRender = this.selectForm(this.state.option);

        return(
            
            <div>
                <div class="app_modal">

                    <h2 class="app_modal__header"> </h2>
                    
                    <div class="flex_box">
                        
                        <div id = 'genre' 
                            class="flex_box__element modal_btn" 
                            onClick={(param) => this.changeForm(param)} > 
                            Dodaj gatunek 
                        </div>
                        
                        <div id = 'record_label' 
                            class = "flex_box__element modal_btn"
                            onClick = {(param) => this.changeForm(param)} > 
                            Dodaj wydawnictwo 
                        </div>
                        
                        <div id = 'record'
                            class = "flex_box__element modal_btn" 
                            onClick = {(param) => this.changeForm(param)} > 
                            Dodaj płytę 
                        </div>
                    </div>

                    <div class="app_modal__body">
                        {componentToRender}
                    </div>
                </div>
               
                <div class="modal_shadow" onClick={this.props.closeModal}></div>
            </div>

        )
    }
}