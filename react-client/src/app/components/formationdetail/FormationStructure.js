import { default as React, useState, useEffect } from 'react';
import { FormationRow } from './index';
import './formationStructure.scss';

const FormationStructure = ({players, strucure}) => {
	const [structArr, setStructArr] = useState([]);
	let key =0;

	const structToArray = (string) => {
		const arr = string.split("-");
		arr.reverse();
		return arr;
	}

	const startAt= (array, index) => {
		let som= 1
		for (let i = 0; i < index; i++) {
			som+=parseInt(array[i]);
		}
		return som
	}

	useEffect(() => {
		setStructArr(structToArray(strucure));
	}, [strucure]);

	return (
		<div className="formationStructureContainer" >
			{structArr && structArr.map(row => {
				key++;
				return <FormationRow players={players} amount={row} key={key} start={startAt(structArr, key-1)}/>
			})}
			<FormationRow players={players} amount={1} start={0}/>
		</div>
  );
};

export default FormationStructure;