import { default as React} from 'react';

const FormationInfo = ({club, structure, score}) => {
	return (
		<div className="formationInfo">
			<div className="formationInfoTitle">
				Formation
			</div>
			<div className="formationInfoDetails">
				{structure}
			</div>
			<div className="formationInfoTitle">
				Statistics
			</div>
			<div className="formationInfoDetails">
				{club.name} {score} opponents
			</div>
		</div>
  );
};

export default FormationInfo;