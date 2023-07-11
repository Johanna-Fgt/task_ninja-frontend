import styles from '../styles/Header.module.css';
import { useState } from 'react';
import { login } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

const Login = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.value);
	const SIGN_STATE = {
		up: 'signup',
		in: 'signin',
	};
	const [signState, setSignState] = useState(null);
	const [signUpUsername, setSignUpUsername] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
	const [signInUsername, setSignInUsername] = useState('');
	const [signInPassword, setSignInPassword] = useState('');

	//GOOGLE
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const resetInputs = () => {
		setSignUpUsername('');
		setSignUpPassword('');
		setSignInUsername('');
		setSignInPassword('');
	};

	const handleSubmit = () => {
		const username =
			signState === SIGN_STATE.up ? signUpUsername : signInUsername;
		const password =
			signState === SIGN_STATE.up ? signUpPassword : signInPassword;
		const URL = `http://localhost:3000/users/${signState}`;
		const config = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username,
				password,
			}),
		};

		fetch(URL, config)
			.then((response) => response.json())
			.then((data) => {
				if (data.result) {
					dispatch(login({ token: data.token, username }));
					resetInputs();
				}
			});
	};

	return (
		<main className={styles.container}>
			<div className={styles.logoContainer}>
				<h1 className={styles.title}>Task Ninja</h1>
			</div>
			<div>
				<button type="button" onClick={() => setSignState(SIGN_STATE.up)}>
					Créer un compte
				</button>
				<button type="button" onClick={() => setSignState(SIGN_STATE.in)}>
					Se connecter
				</button>
			</div>

			{!user.token && (
				<div className={styles.registerContainer}>
					<div className={styles.registerSection}>
						<p>
							{signState === SIGN_STATE.up ? `Créer un compte` : `Se connecter`}
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
					<GoogleLogin
						onSuccess={(credentialResponse) => {
							const token = credentialResponse.credential;
							let decoded = jwt_decode(token);
							// console.log(credentialResponse);
							// console.log(decoded);
							// setName(`${decoded.given_name} ${decoded.family_name}`);
							// setEmail(decoded.email);
							if (signState === SIGN_STATE.up) {
								setSignUpUsername(
									`${decoded.given_name} ${decoded.family_name}`
								);
								setSignUpPassword(decoded.email);
							} else {
								setSignInUsername(
									`${decoded.given_name} ${decoded.family_name}`
								);
								setSignInPassword(decoded.email);
							}
							handleSubmit();
						}}
						onError={() => {
							console.log('Login Failed');
						}}
					/>
				</div>
			)}
		</main>
	);
};

export default Login;
