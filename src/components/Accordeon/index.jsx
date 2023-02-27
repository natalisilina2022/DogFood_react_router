import React, { useState, useRef } from "react";

import s from "./styles.modules.css";
import cn from "classnames";

function Accordion({ children, title }) {
	const [selected, setSelected] = useState(false);

	function toggleAccordion() {
		setSelected(!selected);
	}

	return (
		<div className={cn(s.accordion, { [s.active]: selected })}>
			<button className={s.accordionButton} onClick={toggleAccordion}>
				<p className={s.title}>{title}</p>
			</button>
			<div className={s.content}>
				<div className={s.text}>{children}</div>
			</div>
		</div>
	);
}

export default Accordion;
