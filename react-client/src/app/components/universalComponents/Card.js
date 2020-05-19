import { default as React } from 'react';
import './universal.scss';

const Card = ({member, edit, data, onClick}) => {
	let date;
	const timestampToDate = () => {
		if (data.date) {
			date = new Date(data.date*1000);
		}
	}
	timestampToDate();
	return (
		<div className="cardcontainer" onClick={onClick}>
			{member&edit?<div className= "formation"><div className='leftcomponent'><div></div><div>Formation from:</div><div>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</div></div><div className='rightcomponent'><div className="fas fa-pencil-alt"></div><div className="fas fa-trash"></div></div></div>: 
			<div className= "formationPlayer">Formation from: {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</div>}
		</div>
  );
};

export default Card;