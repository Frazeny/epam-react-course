import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { LOCAL_STORAGE } from './constants';
import { BrowserRouter } from 'react-router-dom';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
import AppRouter from './components/AppRouter/AppRouter';
import { selectUser } from './store/servisces';

function App() {
	const { loginUser } = useActions();
	const { isAuth, role, token } = useTypedSelector(selectUser);

	useEffect(() => {
		const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
		if (token) {
			loginUser(token);
		}
	}, [loginUser]);
	console.log(isAuth, role, token);
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
