import React from 'react';

function InfoSection({
	header,
	firstParagraph,
	secondParagraph,
	thirdParagraph,
	fourthPapagraph,
	fifthParagraph,
}) {
	return (
		<div>
			{header && <h5>{header}</h5>}
			{firstParagraph && <p>{firstParagraph}</p>}
			{secondParagraph && <p>{secondParagraph}</p>}
			{thirdParagraph && <p>{thirdParagraph}</p>}
			{fourthPapagraph && <p>{fourthPapagraph}</p>}
			{fifthParagraph && <p>{fifthParagraph}</p>}
		</div>
	);
}

export default InfoSection;
