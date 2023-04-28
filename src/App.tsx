import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { LOCAL_STORAGE } from './constants';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './router/routes';
import { AuthContext } from './AuthContext/AuthCountext';

function App() {
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		if (localStorage.getItem(LOCAL_STORAGE.TOKEN)) {
			setIsAuth(true);
		}
	}, []);
	return (
		<div className='App'>
			<AuthContext.Provider
				value={{
					isAuth,
					setIsAuth,
				}}
			>
				<BrowserRouter>
					<Header />
					<Routes>
						{isAuth
							? privateRoutes.map((route) => {
									return (
										<Route
											path={route.path}
											element={route.component}
											key={route.path}
										/>
									);
							  })
							: publicRoutes.map((route) => {
									return (
										<Route
											path={route.path}
											element={route.component}
											key={route.path}
										/>
									);
							  })}
						{}
					</Routes>
				</BrowserRouter>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
