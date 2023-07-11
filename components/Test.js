import { useSelector } from 'react-redux';

const Test = () => {
	const user = useSelector((state) => state.user.value);
	return <div>{user.token && <h1>TEST</h1>}</div>;
};

export default Test;
