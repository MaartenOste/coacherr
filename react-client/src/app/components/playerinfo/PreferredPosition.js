import { default as React } from 'react';

const PreferredPosition = ({value}) => {
	return (
		<div className="preferredPosition">
			<div>Preferred position</div>
			<select id="prefpos">
				<option value="goalkeeper" selected={value && value === 'goalkeeper' ? true : false}>goalkeeper</option>
				<option value="defender" selected={value && value === 'defender' ? true : false}>defender</option>
				<option value="midfielder" selected={value && value === 'midfielder' ? true : false}>midfielder</option>
				<option value="attacker" selected={value && value === 'attacker' ? true : false}>attacker</option>
			</select>
		</div>
  );
};

export default PreferredPosition;
