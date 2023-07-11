import styles from '../styles/Login.module.scss';
import Image from 'next/image';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { login } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const SIGN_STATE = {
		up: 'signup',
		in: 'signin',
		google: 'googlesign',
	};
	const [signState, setSignState] = useState(null);
	const [signUpUsername, setSignUpUsername] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
	const [signInUsername, setSignInUsername] = useState('');
	const [signInPassword, setSignInPassword] = useState('');
	const [googleName, setGoogleName] = useState('');

	const resetInputs = () => {
		setSignUpUsername('');
		setSignUpPassword('');
		setSignInUsername('');
		setSignInPassword('');
	};

	const getUserData = () => {
		let username;
		let password;
		switch (signState) {
			case SIGN_STATE.up:
				username = signUpUsername;
				password = signUpPassword;
				break;
			case SIGN_STATE.in:
				username = signInUsername;
				password = signInPassword;
				break;
			case SIGN_STATE.google:
				username = googleName;
				password = '';
				break;
			default:
				break;
		}
		return { username, password };
	};

	const handleSubmit = () => {
		console.log(signState);
		const userData = getUserData();
		const URL = `http://localhost:3000/users/${signState}`;

		const config = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData),
		};

		fetch(URL, config)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					dispatch(login({ token: data.token, username: userData.username }));
					resetInputs();
				}
			});
	};

	return (
		<main className={styles.container}>
			{!user.token && (
				<>
					<div className={styles['logo-container']}>
						<Image src="/ninja.png" alt="Logo" width={120} height={120} />
						<h1 className={styles.title}>
							Task<span> Ninja</span>
						</h1>
					</div>

					<div
						className={`${styles['btn-container']} ${styles[`${signState}`]}`}>
						<button
							type="button"
							className={styles.btn}
							onClick={() => setSignState(SIGN_STATE.up)}>
							Créer un compte
						</button>
						<button
							type="button"
							className={styles.btn}
							onClick={() => setSignState(SIGN_STATE.in)}>
							Se connecter
						</button>
						<div
							className={styles.btn}
							onClick={() => setSignState(SIGN_STATE.google)}>
							<GoogleLogin
								onSuccess={(credentialResponse) => {
									const token = credentialResponse.credential;
									let decoded = jwt_decode(token);

									setGoogleName(`${decoded.given_name} ${decoded.family_name}`);
									handleSubmit();
								}}
								onError={() => {
									console.log('Login Failed');
								}}
							/>
						</div>
					</div>

					{(signState === SIGN_STATE.up || signState === SIGN_STATE.in) && (
						<div className={styles.registerSection}>
							<p>
								{signState === SIGN_STATE.up
									? `Créer un compte`
									: `Se connecter`}
							</p>
							<input
								type="text"
								placeholder="Username"
								onChange={(e) =>
									signState === SIGN_STATE.up
										? setSignUpUsername(e.target.value)
										: setSignInUsername(e.target.value)
								}
								value={
									signState === SIGN_STATE.up ? signUpUsername : signInUsername
								}
							/>
							<input
								type="password"
								placeholder="Password"
								onChange={(e) =>
									signState === SIGN_STATE.up
										? setSignUpPassword(e.target.value)
										: setSignInPassword(e.target.value)
								}
								value={
									signState === SIGN_STATE.up ? signUpPassword : signInPassword
								}
							/>
							<button type="submit" onClick={handleSubmit}>
								Go
							</button>
						</div>
					)}
				</>
			)}
		</main>
	);
};

export default Login;
