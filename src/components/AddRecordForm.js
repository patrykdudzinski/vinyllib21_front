import React from 'react';
import ErrorMessage from './ErrorMessage';
import { ajaxAction } from '../Mixins';

export default class AddRecordForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            genres_list: props.genres_list,
            labels_list: props.labels_list,
            name: '',
            artist: '',
            genre: '',
            label: '',
            year: '',
            error: false
        }
    }

    addRecord(){
        let self = this;
        self.setState({
            error: false
        })
        try {
            ajaxAction('http://vinyl.dudzinski.com.pl/api/addToLibrary', 
                {
                    name: self.state.name, 
                    artist: self.state.artist, 
                    record_label: self.state.label,
                    year: self.state.year,
                    genre: self.state.genre,
                }, 
                'POST'
            ).then(data => {
                console.log(data)
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

    setAttr(key, event){
        this.setState({
            [key] : event.target.value
        })
    }

    render() {
        
        const { genres_list, labels_list, name, artist, genre, label, year } = this.state;

        if (this.props.genres_list == undefined || this.props.labels_list == undefined) {
            return null;
        }

        const is_error = this.state.error;
        let error_msg;

        if (is_error) {      
            error_msg = <ErrorMessage message = "Wystąpił błąd. Spróbuj ponownie." />;    
        } 
        else {      
            error_msg = "";    
        }

        return(
            <section id="add_genre_section" 
                class="modal_body__section">
                    
                    <h3 class="modal_body__header">Dodaj winyla</h3>

                    <div class = "flex_box to_start input_group">
                        <input type="text" 
                            value = {artist}
                            onChange={event => this.setAttr('artist', event)}
                            placeholder="Nazwa artysty" />
                        <input type="text" 
                            value = {name}
                            onChange={event => this.setAttr('name', event)}
                            placeholder="Nazwa wydawnictwa" />
                        <input type="number" 
                            value = {year}
                            onChange={event => this.setAttr('year', event)}
                            class="flex_box__input-small" 
                            placeholder="Rok" />
                    </div>

                    <div class = "flex_box to_start input_group">

                        <select onChange={event => this.setAttr('genre', event)}>
                            <option selected 
                                    disabled 
                                    style={{display: 'none'}}> Wybierz gatunek </option>
                            { this.state.genres_list.map(function(object, i){
                                    return <option value={object.id}
                                                selected={genre == object.id}>
                                                {object.name}
                                            </option>
                                })
                            }
                        </select>

                        <select onChange={event => this.setAttr('label', event)}>
                            <option selected 
                                    disabled 
                                    style={{display: 'none'}}> Wybierz wydawnictwo </option>
                            { this.state.labels_list.map(function(object, i){
                                    return <option value={object.id}
                                                selected={label == object.id}>
                                                {object.name}
                                            </option>
                                })
                            }
                        </select>

                        <button class="flex_box__btn btn primary"
                                onClick={this.addRecord.bind(this)}> Zapisz </button>

                    </div>
                    {error_msg}
                </section>
        );

    }

}