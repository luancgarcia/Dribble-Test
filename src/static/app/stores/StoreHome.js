import Reflux, { Store } from 'reflux';
import axios from 'axios';
import Api from './Api';

class StoreHome extends Store {

	constructor(){
		super();
		this.api = new Api();

		this.state = {
			listSlides: [],
			featured: []
		}

		// Pega os dados de slides da home
		this.api.getConfig().then((response) => {
			console.log(response);
			// this.setState({
			// 	listSlides: response.data.pages[0].collections,
			// 	featured: response.data.featured
			// });
		})
		.catch((error) => {
			console.log(error);
		});

	}

}

export default StoreHome;