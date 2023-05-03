import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import { LOCAL_STORAGE } from './constants';
import { BrowserRouter } from 'react-router-dom';
import { useTypedSelector } from './hooks/useTypedSelector';
import { useActions } from './hooks/useActions';
import { IUser } from './types/types';
import AppRouter from './components/AppRouter/AppRouter';

function App() {
	const { loginUser } = useActions();
	const { isAuth } = useTypedSelector((state) => state.user);
	console.log(isAuth);

	useEffect(() => {
		const localUser = localStorage.getItem(LOCAL_STORAGE.USER);
		const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
		if (localUser && token) {
			const user: IUser = JSON.parse(localUser);
			loginUser({ user, token });
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
