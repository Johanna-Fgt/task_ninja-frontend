import '../styles/globals.css';
import Head from 'next/head';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App({ Component, pageProps }) {
	return (
		<GoogleOAuthProvider clientId="502710047910-ntdpmuk5l1ek2d2fo1qk2prh9mj9s1bg.apps.googleusercontent.com">
			<Head>
				<title>Task Ninja</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta
					name="description"
					content="Task Ninja est la meilleure app pour gérer tes todos babys."
				/>
			</Head>
			<Component {...pageProps} />
		</GoogleOAuthProvider>
	);
}

export default App;
