import { default as React} from 'react';

const ChooseAge = ({children}) => {
	const agecategories = [
		'U7',
		'U9',
		'U11',
		'U13',
		'U15',
		'U17',
		'U19',
		'U21',
		'Second-Team',
		'First-Team',
	  ];

	return (
		<div className="dropdowncontainter">
			<div>Age Category</div>
				<select className="dropdownlist" id="age">
				{agecategories && agecategories.map(agecategorie => {
					return <option value={agecategorie} key={agecategorie}>{agecategorie}</option>
				})}
			</select>
		</div>
  );
};

export default ChooseAge;