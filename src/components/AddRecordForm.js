import React from 'react';
import { ajaxAction } from '../Mixins';

export default class AddRecordForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            genres_list: props.genres_list,
            labels_list: props.labels_list
        }
    }

    render() {
        
        const { genres_list, labels_list } = this.state;

        if (this.props.genres_list == undefined || this.props.labels_list == undefined) {
            return null;
        }

        return(
            <section id="add_genre_section" 
                                class="modal_body__section">
                            <h3 class="modal_body__header">Dodal wydawnictwo</h3>
                            <input type="text" 
                                  placeholder="Nazwa artysty" />
                            <input type="text" 
                                  placeholder="Nazwa wydawnictwa" />
                            <input type="number" 
                                  placeholder="Rok" />
                            <select>
                                <option selected 
                                        disabled 
                                        style={{display: 'none'}}> Wybierz gatunek </option>
                                { this.state.genres_list.map(function(object, i){
                                        return <option value={object.id}>{object.name}</option>
                                    })
                                }
                            </select>
                            <select>
                                <option selected 
                                        disabled 
                                        style={{display: 'none'}}> Wybierz wydawnictwo </option>
                                { this.state.labels_list.map(function(object, i){
                                        return <option value={object.id}>{object.name}</option>
                                    })
                                }
                            </select>
                        </section>
        );

    }

}