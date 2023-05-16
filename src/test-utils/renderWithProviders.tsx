import React, { PropsWithChildren } from 'react';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { RootState, rootReducer } from '../store/servisces';
import thunk from 'redux-thunk';

function setupStore(preloadedState?: PreloadedState<RootState>) {
	return createStore(rootReducer, preloadedState);
}
type AppStore = ReturnType<typeof setupStore>;

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
	preloadedState?: PreloadedState<RootState>;
	store?: AppStore;
}

export function renderWithProviders(
	ui: React.ReactElement,
	{
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = createStore(rootReducer, preloadedState, applyMiddleware(thunk)),
		...renderOptions
	}: ExtendedRenderOptions = {}
) {
	function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
		return <Provider store={store}>{children}</Provider>;
	}

	// Return an object with the store and all of RTL's query functions
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
