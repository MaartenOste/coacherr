import { default as React, useState, useEffect } from 'react';
import { FormationRow } from './index';
import './formationStructure.scss';

const FormationStructure = ({edit,  update}) => {
	const [struct, setStruct] = useState()

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
		return som;
	}

	const createStructure = () => {
		let key =0;
		let temp = [];

		if (sessionStorage.getItem('struct')) {
			structToArray(sessionStorage.getItem('struct')).forEach(row => {
				key++;
				temp.push(<FormationRow rownr={key} edit={edit}  amount={row} update={update} key={key} start={startAt(structToArray(sessionStorage.getItem('struct')), key-1)}/>);
			});
			key++;
			temp.push(<FormationRow rownr={0} edit={edit} update={update} amount={1} key={key} start={0}/>);
		}
		setStruct(temp);
	}

	useEffect(() => {
		createStructure();
	}, [ update]);

	return (
		<div className="formationStructureContainer" >
			{struct?struct:""}
		</div>
  );
};

export default FormationStructure;