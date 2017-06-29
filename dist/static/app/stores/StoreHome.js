import Reflux, { Store } from 'reflux';
import axios from 'axios';
import Api from './Api';


const CLIENT_ID = '0f772b56f1c253cd98077e0be6340016a7e96916f9826aef4fb3b59a56442d50';
const CLIENT_SECRET = '0fa98ec578b41e9731faf4f080c4ddc36ae9664d4c08f10f6de209d216853255';
const ACCESS_TOKEN = '04e0cabe39b68eba31d3d107faf3dc259d45448242bd4af0716fa042a4e2d072';

const API_URL = 'https://api.dribbble.com/v1/';
const API_AUTH =  'https://api.dribbble.com/v1/user?access_token='+ACCESS_TOKEN;
const API_USER =  'https://dribbble.com/oauth/token';


class StoreHome extends Store {

	constructor(){
		super();
		this.api = new Api();

		this.state = {
			urlApi : null
		}

		axios.get(API_AUTH)
		  .then(function (response) {
		    console.log(response);
		   	localStorage.setItem('url', response.data.buckets_url)
		  })
		  .catch(function (error) {
		    console.log(error);
		  });


		// axios.post(API_URL)
		//   .then(function (response) {
		//     console.log(response);
		//   })
		//   .catch(function (error) {
		//     console.log(error);
		//   });

		// Pega os dados de slides da home
		// this.api.getConfig().then((response) => {
		// 	console.log('config: ', response);
		// 	// this.setState({
		// 	// 	listSlides: response.data.pages[0].collections,
		// 	// 	featured: response.data.featured
		// 	// });
		// })
		// .catch((error) => {
		// 	console.log(error);
		// });
	}

	componentWillMount() {
		console.log(this.state.urlApi);
	}

}

export default StoreHome;