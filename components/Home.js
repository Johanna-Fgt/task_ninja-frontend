import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Login from './Login';

const Home = () => {
	return (
		<div>
			<Head>
				<title>Task Ninja</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<meta
					name="description"
					content="Task Ninja est la meilleure app pour gérer tes todos babys."
				/>
			</Head>
			<Login />
		</div>
	);
};

export default Home;
