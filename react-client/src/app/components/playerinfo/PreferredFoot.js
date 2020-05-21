import { default as React } from 'react';

const PreferredFoot = ({children}) => {

	return (
		<div className="preferredFoot">
			<div>Preffered foot</div>
			<div id="preffoot">
				<div className="footchoise">
					<input type="radio" id="left" name="preffoot" value="left" defaultChecked/>
					<label htmlFor="left">left</label>
				</div>
				<div className="footchoise">
					<input type="radio" id="right" name="preffoot" value="right"/>
					<label htmlFor="right">right</label>
				</div>
			</div>
		</div>
  );
};

export default PreferredFoot;