import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter, { Router, Route, IndexRoute, browserHistory } from 'react-router';


import Main from './components/Main';
import Home from './components/page/Home';
// import Profile from './components/page/Profile';

import ReactGA from 'react-ga';

const url = '/';
// <Route authorize={['regular']} component={ Profile } path={ url + "perfil/" } ></Route>
exports.start = function() {

	ReactDOM.render((
		<Router history={ browserHistory }>

			<Route path={ url } component={ Main }>
				<IndexRoute component={ Home }></IndexRoute>
				
			</Route>



		</Router>
   ), document.getElementById('app'));
};
