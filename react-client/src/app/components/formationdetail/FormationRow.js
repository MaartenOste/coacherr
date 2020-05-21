import { default as React} from 'react';

const FormationRow = ({amount, players, start}) => {

	const createRow = () => {
		let playerIndex = start;
		let row = [];
	
		for (let i = 0; i < parseInt(amount); i++) {
			row.push(<div className="playerContainer" key={playerIndex}><i className="fas fa-tshirt"></i><div className="playerName">{players[playerIndex]?players[playerIndex].lastname:''}</div></div>)
			playerIndex+=1;
		}
		return row;
	}
	
	return (
		<div className="formationRow" >
			{createRow()}
		</div>
  );
};

export default FormationRow;