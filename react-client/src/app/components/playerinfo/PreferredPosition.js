import { default as React } from 'react';

const PreferredPosition = ({route, title}) => {

	return (
		<div className="preferredPosition">
			<div>Preferred position</div>
			<select id="prefpos">
				<option value="goalkeeper">goalkeeper</option>
				<option value="defender">defender</option>
				<option value="midfielder">midfielder</option>
				<option value="attacker">attacker</option>
			</select>
		</div>
  );
};

export default PreferredPosition;
