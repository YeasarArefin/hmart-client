import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import AuthProvider from './context/AuthProvider';
import Dashboard from './pages/dashboard/Dashboard';
import Singin from './pages/forms/Singin';
import Singup from './pages/forms/Singup';
import Explore from './pages/Home/Explore';
import Home from './pages/Home/Home';
import Navbar from './pages/Home/Navbar';
import Purchase from './pages/Home/Purchase';
import PrivateRoute from './pages/restricted-routes/PrivateRoute';
const App = () => {
	return (
		<>

			<AuthProvider>

				<Router>

					<Switch>

						<Route exact path='/'>
							<Navbar />
							<Home />
						</Route>

						<Route exact path='/home'>
							<Navbar />
							<Home />
						</Route>

						<Route exact path='/singup'>
							<Navbar />
							<Singup />
						</Route>

						<Route exact path='/singin'>
							<Navbar />
							<Singin />
						</Route>

						<PrivateRoute exact path='/explore'>
							<Navbar />
							<Explore />
						</PrivateRoute>

						<PrivateRoute exact path='/purchase/:_id'>
							<Navbar />
							<Purchase />
						</PrivateRoute>

						<PrivateRoute path='/dashboard'>
							<Dashboard />
						</PrivateRoute>

					</Switch>

				</Router>

			</AuthProvider>

		</>
	);
};

export default App;
