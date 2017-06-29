import React from 'react';
import Reflux, { Component } from 'reflux';

// pagina responsavel pelas configuracoes iniciais do projeto
class Main extends Component {

	constructor(props) {
		super(props);

	}

	componentDidMount(){
	
	}

	render(){

		return (

			<div>
				teste
				{ this.props.children }
			</div>
		)

	}
};



export default Main;

// no return acima do componente Copywriter, colocar <Footer menu={menu} /> quando for pra voltar com o menu do footer.
