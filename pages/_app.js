import '../styles/globals.css';
import Head from 'next/head';
import Header from '../components/Header';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user';

const store = configureStore({
	reducer: { user },
});

function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<GoogleOAuthProvider clientId="502710047910-ntdpmuk5l1ek2d2fo1qk2prh9mj9s1bg.apps.googleusercontent.com">
				<Head>
					<title>Task Ninja</title>
					<link rel="icon" href="/favicon.ico" />
					<meta
						name="viewport"
						content="initial-scale=1.0, width=device-width"
					/>
					<meta
						name="description"
						content="Task Ninja est la meilleure app pour gérer tes todos babys."
					/>
				</Head>
				<Header />
				<Component {...pageProps} />
			</GoogleOAuthProvider>
		</Provider>
	);
}

export default App;
