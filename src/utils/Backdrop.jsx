export const Backdrop = ({ children, toggle, className }) => {
	return (
		<div className={`backdrop ${className} `} onClick={() => toggle(false)}>
			{children}
		</div>
	);
};
