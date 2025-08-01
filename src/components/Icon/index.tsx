const availableIcons = {
	ArrowDown: (props: React.SVGProps<SVGSVGElement>) => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
			<path d="M16.843 10.211A.75.75 0 0 0 16.251 9H7.75a.75.75 0 0 0-.591 1.212l4.258 5.498a.746.746 0 0 0 1.183-.001l4.243-5.498z" />
		</svg>
	),
	Close: (props: React.SVGProps<SVGSVGElement>) => (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
			<path d="m12 10.93 5.719-5.72a.749.749 0 1 1 1.062 1.062l-5.72 5.719 5.719 5.719a.75.75 0 1 1-1.061 1.062L12 13.053l-5.719 5.719A.75.75 0 0 1 5.22 17.71l5.719-5.719-5.72-5.719A.752.752 0 0 1 6.281 5.21z" />
		</svg>
	),
};

interface IconProps extends React.SVGProps<SVGSVGElement> {
	/** The name of the icon to render */
	name: keyof typeof availableIcons;
}

/**
 * Icon component for rendering SVG icons.
 * @param props - The properties for the icon component.
 * @returns The SVG element for the specified icon, or null if the icon is not found.
 */
export function Icon({ name, ...props }: IconProps): React.ReactNode {
	const IconComponent = availableIcons[name];

	return IconComponent ? <IconComponent {...props} /> : null;
}
