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
	Check: (props: React.SVGProps<SVGSVGElement>) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			clipRule="evenodd"
			fillRule="evenodd"
			strokeLinejoin="round"
			strokeMiterlimit="2"
			{...props}
		>
			<path
				d="m21 4.009c0-.478-.379-1-1-1h-16c-.62 0-1 .519-1 1v16c0 .621.52 1 1 1h16c.478 0 1-.379 1-1zm-14.051 8.382c-.165-.148-.249-.352-.249-.557 0-.411.333-.746.748-.746.178 0 .355.063.499.19l3.298 2.938 5.453-5.962c.149-.161.35-.243.554-.243.417 0 .748.337.748.747 0 .179-.065.359-.196.502l-5.953 6.509c-.147.161-.35.242-.552.242-.178 0-.357-.062-.499-.19z"
				fillRule="nonzero"
			/>
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
