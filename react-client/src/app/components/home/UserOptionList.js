import { default as React } from 'react';

import './Home.scss';

import {default as UserOption } from './UserOption';
import img1 from '../../_static/images/players.jfif';
import img2 from '../../_static/images/coach.jpg';
import img3 from '../../_static/images/club.jfif';

const UserOptionList = ({children}) => {
	const images = [img1, img2, img3];
	const titles = ['Continue as Player', 'Continue as Coach', 'Continue as Club'];
	const types = ['Player', 'Coach', 'Club'];

	const options = [];
	for (let i = 0; i < images.length; i++) {
		options.push(<UserOption key={i} title={titles[i]} imgsrc={images[i]} typeName={types[i]}/>)
	}
	console.log(options);

	return (
		<div className='UserOptionList'>
			{options}
		</div>
	);
};

export default UserOptionList;