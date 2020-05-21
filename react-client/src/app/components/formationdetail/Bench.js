import { default as React} from 'react';

const Bench = ({ players }) => {

	const createRow = () => {
		let row = [];	
		for (let i = 11; i < 16; i++) {
			if (players[i]) {
				row.push(<div className="playerContainer" key={i}><i className="fas fa-tshirt"></i><div className="playerName">{players[i].lastname}</div></div>);
			}
		}
		return row;
	}

	return (
		<div className="benchContainer">
			<div className="benchTitle">
				bench
			</div>
			<div className="bench" >
				{createRow()}
			</div>
		</div>
  );
};

export default Bench;