import React from 'react';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';
import { ajaxAction, setAttr } from '../Mixins';

export default class AddRecordForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            error: false,
            success: false,
            error_txt: 'Wystąpił błąd. Spróbuj ponownie.',
            labels_list: props.labels_list,
        }
    }

    setError(msg){
        this.setState({
            error: true,
            error_txt: msg
        })

    }

    setLabel(){
        let self = this,
            found_labels = self.state.labels_list.filter(element => element.name == self.state.name);

        if(self.state.name.length == 0){
            self.setError('Pusta nazwa wydawnictwa.')
            return
        }
        if(found_labels.length > 0){
            self.setError('Wydawnictwo już istnieje.')
            return
        }

        else{

            try {
                ajaxAction('http://vinyl.dudzinski.com.pl/api/addRecordLabel', 
                    {
                        name: self.state.name
                    }, 
                    'POST'
                ).then(data => {
                    console.log(data)
                    document.querySelector('#find_btn').click();
                    self.setState({
                        error: false,
                        success: true
                    })
                })
                .catch(err => {
                    self.setState({
                        error: true
                    })
                })
            }
            catch (error) {
                self.setState({
                    error: true
                })
            }
        }
    }

    render() {

        const { name } = this.state;

        const is_error = this.state.error,
              error_txt = this.state.error_txt,
              is_success = this.state.success;

        let response_msg;

        if (is_error) {      
            response_msg = <ErrorMessage message = "Wystąpił błąd. Spróbuj ponownie." />;    
        }
        else if(is_success){
            response_msg = <SuccessMessage message = "Gratulacje! Zapisano poprawnie wydawnictwo." />;    
        }
        else {      
            response_msg = "";    
        }
      
        return(
            <section id="add_label_section" 
            class="modal_body__section">
                <h3 class="modal_body__header">Dodaj wydawnictwo</h3>
                <div class = "flex_box to_start input_group">
                    <input type="text" 
                        value = {name}
                        onChange={event => setAttr('name', event, this)}
                        placeholder="Nazwa wydawnictwa" />
                        <button class="flex_box__btn btn primary"
                                onClick={this.setLabel.bind(this)}> Zapisz </button>
                </div>
                {response_msg}
            </section>
        )
    }

}