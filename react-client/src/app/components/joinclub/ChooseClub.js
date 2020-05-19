import { default as React, useCallback, useEffect, useState} from 'react';
import { useApi } from '../../services';

const ChooseClub = ({children}) => {
	const [clubs, setClubs] = useState();
	const { findClubs } = useApi();

	const initFetch = useCallback(
		() => {
		  const fetchClubs = async () => {
			const data = await findClubs();
			setClubs(data);
		  }
		  fetchClubs();
		},
		[findClubs],
	)

	useEffect(() => {
		initFetch();
	return () => {
		// no cleanup
	}
	}, [initFetch]);
	
	return (
		<div className="dropdowncontainter">
			<div>Club name</div>
				<select className="dropdownlist" id="chooseClub">
				{clubs && clubs.map(club => {
					return <option value={club._id} key={club._id}>{club.name}</option>
				})}
			</select>
		</div>
  );
};

export default ChooseClub;