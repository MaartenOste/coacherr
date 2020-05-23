import { default as React } from 'react';

const FormationInfo = ({club,change, edit, structure, score}) => {

	const structures = [
		'4-3-3',
		'4-5-1',
		'4-4-2',
		'3-4-3',
		'3-5-2',
		'5-3-2',
		'5-2-3',
	  ];
	return (
		<div className="formationInfo">
			<div className="formationInfoTitle">
				Formation
			</div>
			<div className="formationInfoDetails">
				{edit? <select className="dropdownlist" id="chooseStructure" defaultValue={structure?structure:''} onChange={ev => change(ev.target.value)}>
					{structures.map(struct => {
						return <option value={struct} key={struct} selected={struct===structure?true:false}>{struct}</option>
					})}
				</select> : structure}
				
			</div>
			<div className="formationInfoTitle">
				Statistics
			</div>
			<div className="formationInfoDetails">
				<div>{club.name}</div> {edit? <div className='scoreInputContainer'><input type="text" className="scoreInput" onClick={ev => {document.getElementById(ev.target.id).select()}} id="scorehome" maxLength='2' defaultValue={score?score.split('-')[0]:''}></input> - <input type="text" className="scoreInput" onClick={ev => {document.getElementById(ev.target.id).select()}} id="scoreaway" maxLength='2' defaultValue={score?score.split('-')[1]:''}></input> </div>: score} <div>opponents</div>
			</div>
		</div>
  );
};

export default FormationInfo;