
/**
 * FUNKCJA ZARZĄDZAJĄCA KLAWIATURĄ
 * @author: pdudzinski
 * Styczeń 2022
 */

import React from 'react';

export default class keyCodeHandler extends React.Component {
    
    constructor(props){
        
        super(props);
        
        // this.setState({
        //     active_row: '',
        //     active_element: ''
        // })

        this.goDown = this.goDown.bind(this);
        this.handleAction = this.handleAction.bind(this);
    }

    goUp(target, active_row){
        var app = this;
        // console.log(target.nodeName)
        
        switch(target.nodeName){
            case 'BODY':

                if(active_row.length == 1){
                    app.setState({
                        active_row : 0
                    })
                    if(document.querySelector('table tbody tr.active')){
                        document.querySelector('table tbody tr.active').classList.remove('active')
                    }
                }
                else{
                    if(document.querySelector('table tbody tr.active')){
                        document.querySelector('table tbody tr.active').classList.remove('active')
                    }
                    app.setState({
                        active_row : active_row - 1
                    })
                    document.querySelector(`table tr:nth-of-type(${app.state.active_row})`).classList.add('active')
                }

                break;
            default:
                break;
        }

    }

    goDown(target, active_row){
        var app = this;
        // console.log(target.nodeName)
        
        switch(target.nodeName){
            case 'BODY':

                if(active_row.length == 0){
                    app.setState({
                        active_row : 1
                    })
                    document.querySelector(`table tbody tr:first-of-type`).classList.add('active')
                }
                else{
                    if(document.querySelector('table tbody tr.active')){
                        document.querySelector('table tbody tr.active').classList.remove('active')
                    }
                    app.setState({
                        active_row : active_row + 1
                    })
                    document.querySelector(`table tr:nth-of-type(${app.state.active_row})`).classList.add('active')
                }

                break;
            default:
                break;
        }
    
    }

    /**
     * główna funkcja do zarządzania klawiaturą
     * @param object event - obiekt zdarzenia kliknięcia
     * @return true na zakończonej akcji
     */
    handleAction(event){
        var app = this;
        console.log(event)

        switch(event.keyCode){
            case 40:
                app.goDown( event.target, app.state.active_row );
                break;
            case 38:
                app.goUp( event.target, app.state.active_row )
            default:

                break;

        }

        return true;

    }

    /**
     * funkcja przejmująca zdarzenie kliknięcia na liście winyli
     */
	keyCodeHandler(){
		document.addEventListener('keydown', this.handleAction);
	}

}