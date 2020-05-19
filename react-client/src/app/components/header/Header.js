import { default as React, useCallback, useEffect, useState } from 'react';
import { useApi } from '../../services';

import './Header.scss';

const Header = ({children}) => {
  const {findClub, findMember } = useApi();
  const [club, setClub] = useState();

	const initFetch = useCallback(
		() => {
		  const fetchdata = async () => {
			const member = await findMember(JSON.parse(localStorage.getItem('mern:authUser')).id);
			const tempclub = await findClub(member._clubId);
			setClub(tempclub);
		  }
		  fetchdata();
		},
	[findClub],
	);

	useEffect(() => {
		initFetch();
		return () => {
			// no cleanup
		}
	}, [initFetch]);

  return (
    <header className="page-header">
      <div className="clubname">
        {club? club.name: 'clubname'}
      </div>
    </header>
  );
};

export default Header;