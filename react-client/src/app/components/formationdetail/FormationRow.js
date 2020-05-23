import { default as React, useEffect,useState} from 'react';

const FormationRow = ({amount, rownr, start, update}) => {
	const [row, setRow] = useState([]);

	const changePlayer = (i) => {
		sessionStorage.setItem('PlayerToSwap', i.id);
		document.getElementById('selectPlayer').style.display = 'block';
		document.getElementById('detailPage').style.display = 'none';
	}

	const createRow = () => {
		const rowpl = JSON.parse(sessionStorage.getItem('players'));
		let playerIndex = start;
		let temp = [];

		for (let i = 0; i < parseInt(amount); i++) {
			temp.push(<div className="playerContainer" id={playerIndex} key={playerIndex} onClick={ev=> changePlayer(ev.target)}>{rowpl[playerIndex] && rowpl[playerIndex].lastname && rowpl[playerIndex].lastname !== 'Add'?<i className="fas fa-tshirt noclick"></i>:<i className="fas fa-plus-circle noclick"></i>}<div className="playerName noclick">{rowpl[playerIndex] && rowpl[playerIndex].lastname?rowpl[playerIndex].lastname.length>6?(rowpl[playerIndex].lastname.substring(0, 5) + "..."):rowpl[playerIndex].lastname:'add'}</div></div>)
			playerIndex+=1;
		}
		setRow(temp);
	}

	useEffect(() => {
		createRow();
	}, [update]);

	return (
		<div className="formationRow" id={rownr}>
			{row?row:''}
		</div>
  );
};

export default FormationRow;