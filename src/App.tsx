import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { LOCAL_STORAGE } from './constants';
import { BrowserRouter } from 'react-router-dom';
import { useActions } from './hooks/useActions';
import AppRouter from './components/AppRouter/AppRouter';

function App() {
	const { loginUser } = useActions();

	useEffect(() => {
		const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
		if (token) {
			loginUser(token);
		}
	}, [loginUser]);

	return (
		<div className='App'>
			<BrowserRouter>
				<Header />
				<AppRouter />
			</BrowserRouter>
		</div>
	);
}

export default App;
