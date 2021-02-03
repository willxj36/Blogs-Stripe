import * as React from 'react';
import Navbar from './components/Navbar';
import AuthorPage from './components/AuthorPage';
import Previews from './components/Previews';
import FullBlog from './components/FullBlog';
import EditBlog from './components/EditBlog';
import Login from './components/Login';
import AdminPage from './components/AdminPage';
import Register from './components/Register';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => {

	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path='/' component={Previews} />
				<Route path='/authorpage' component={AuthorPage} />
				<Route exact path='/blogs/:id' component={FullBlog} />
				<Route path='/blogs/:id/edit' component={EditBlog} />
				<Route path='/login' component={Login} />
				<Route path='/adminpage' component={AdminPage} />
				<Route path='/register' component={Register} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
