import Test from './Test';
import Login from './Login';
import Head from 'next/head';

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
			<Test />
		</div>
	);
};

export default Home;
