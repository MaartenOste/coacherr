import { default as React } from 'react';
import { useHistory, Route } from 'react-router';
import * as Routes from '../../routes';
import { useApi } from '../../services';

import './universal.scss';

const Card = ({member, edit, data, id, onClick}) => {
	const history = useHistory();
	const { destroyFormation } = useApi();

	let date;
	const timestampToDate = () => {
		if (data.date) {
			date = new Date(data.date*1000);
		}
	}

	const handleEdit = (id) => {
		history.push(`${Routes.FORMATIONS_DETAIL.replace(':id', id)}`);
	}

	const handleConfirm = (ev) => {
		document.getElementById(`confirm${id}`).style.display= 'block';
		document.getElementById(id).style.display= 'none';
	}

	const undoConfirm = () => {
		document.getElementById(`confirm${id}`).style.display= 'none';
		document.getElementById(id).style.display= 'flex';
	}

	const handleDelete = async () => {
		await destroyFormation(id);
		window.location.reload();
	}

	const handleFormationDetail = (id) => {
		history.push(`${Routes.FORMATIONS_DETAIL.replace(':id', id)}`);
	}

	timestampToDate();
	return (
		<div className="cardcontainer" >
			<div className="confirm" id={`confirm${id}`} style={{display: 'none'}}>Are you sure you want to delete this formation?<div className="choise"><div className="yes" onClick={ev => handleDelete()}>YES</div><div className="no" onClick={ev => undoConfirm()}>NO</div></div></div>
			{member&edit?<div className= "formation" id={id}><div className='leftcomponent' onClick={ev => handleFormationDetail(id)}><div></div><div>Formation from:</div><div>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</div></div><div className='rightcomponent'><div className="fas fa-pencil-alt" onClick={ev => handleEdit(id)}></div><div className="fas fa-trash" onClick={ev => handleConfirm(ev)}></div></div></div>: 
			<div className= "formationPlayer" onClick={ev => handleFormationDetail(id)}>Formation from: {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}</div>}
		</div>
  );
};

export default Card;