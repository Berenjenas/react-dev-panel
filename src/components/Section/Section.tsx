import { ControlRenderer } from "@/components/controls/ControlRenderer";
import type { AvailableControls, DevPanelSection } from "@/types";
import { useDevPanelActions } from "@/utils/store";

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
				<span className={styles.toggle}>{section.isCollapsed ? "▶" : "▼"}</span>
			</div>

			{!section.isCollapsed && (
				<div className={styles.content}>
					{Object.entries(section.controls).map(([controlName, control]) => (
						<ControlRenderer key={controlName} name={controlName as AvailableControls} control={control} />
					))}
				</div>
			)}
		</div>
	);
}
