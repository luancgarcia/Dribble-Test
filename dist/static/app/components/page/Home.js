import React from 'react';
import Reflux, { Component } from 'reflux';

import StoreHome from '../../stores/StoreHome';


class Home extends Component {

    constructor (props){
        super(props);

        // this.state = {
        //     user : null
        // }

        // Chama os dados dos slides
        this.stores = [StoreHome];

        
        
    }
    render(){
        // console.log('state: ', this.state.user);
        return(
            <section className="home">
                teste
            </section>
        );

    }

};

export default Home;