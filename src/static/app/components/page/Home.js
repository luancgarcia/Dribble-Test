import React from 'react';
import Reflux, { Component } from 'reflux';

import StoreHome from '../../stores/StoreHome';

class Home extends Component {

    constructor (props){
        super(props);

        // this.state = {
        //     programas : []
        // }

        // Chama os dados dos slides
        this.stores = [StoreHome];
    }

    componentDidUpdate(prevProps, prevState){
        
    }

    render(){
        return(
            <section className="home">
                teste
            </section>
        );

    }

};

export default Home;