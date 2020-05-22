import { default as React, Fragment, useCallback, useEffect,useState} from 'react';

const Bench = ({amount, arrayOfPlayers, update}) => {
	const [row, setRow] = useState([]);
	const [players, setPlayers] = useState(arrayOfPlayers);

	const changePlayer = (i) => {
		let pl = JSON.parse(sessionStorage.getItem('players'));
		sessionStorage.setItem('PlayerToSwap', i.id);
		document.getElementById('selectPlayer').style.display = 'block';
		document.getElementById('detailPage').style.display = 'none';
	}

	useEffect(() => {
		createRow();
	  }, [update]);

	const createRow = () => {
		const rowpl = JSON.parse(sessionStorage.getItem('players'));
		let temp = [];
		for (let i = 11; i < 16; i++) {
			temp.push(<div className="playerContainer" id={i} key={i} onClick={ev=> changePlayer(ev.target)}>{rowpl[i] && rowpl[i].lastname !== 'Add'?<i className="fas fa-tshirt noclick"></i>:<i className="fas fa-plus-circle"></i>}<div className="playerName noclick">{rowpl[i]?rowpl[i].lastname.length>6?(rowpl[i].lastname.substring(0, 5) + "..."):rowpl[i].lastname:'add'}</div></div>)
		}
		setRow(temp);
	}

	return (
		<div className="benchContainer">
			<div className="benchTitle">
				bench
			</div>
			<div className="bench" >
			{row?row:''}
			</div>
		</div>
  );
}

export default Bench;