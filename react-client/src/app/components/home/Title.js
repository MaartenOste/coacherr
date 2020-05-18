import { default as React } from 'react';

import './Home.scss';

const Title = ({}) => {
	return (
		<div className='title'>
			<div className="welcome">Welcome to</div> 
			<div className="logo">coacherr</div>
			<div className="catchphrase">
				THE app to guide <br/>your team to victory!
			</div>
		</div>
	);
};

export default Title;