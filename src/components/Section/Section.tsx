import { ControlRenderer } from "@/components/ControlRenderer";
import { useDevPanelActions } from "@/utils/store";

import type { DevPanelSection } from "../DevPanel/types";

import styles from "./Section.module.scss";

type SectionProps = {
	sectionName: string;
	section: DevPanelSection;
};

export function Section({ sectionName, section }: SectionProps) {
	const actions = useDevPanelActions();

	return (
		<div className={styles.section}>
			<div className={styles.header} onClick={() => actions.toggleSectionCollapse(sectionName)}>
				<span className={styles.title}>{section.name}</span>

				<span className={styles.toggle}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={section.isCollapsed ? styles.collapsed : undefined}>
						<path d="M10.211 7.155A.75.75 0 0 0 9 7.747v8.501a.75.75 0 0 0 1.212.591l5.498-4.258a.746.746 0 0 0-.001-1.183l-5.498-4.243z" />
					</svg>
				</span>
			</div>

			{!section.isCollapsed && (
				<div className={styles.content}>
					{Object.entries(section.controls).map(([controlName, control]) => (
						<ControlRenderer key={controlName} name={controlName} control={control} />
					))}
				</div>
			)}
		</div>
	);
}
