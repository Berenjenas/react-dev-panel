import { ControlRenderer } from "@/components/ControlRenderer";
import { useDevPanelSectionActions } from "@/store";

import type { DevPanelSection } from "../DevPanel/types";
import { Icon } from "../Icon";

import styles from "./Section.module.scss";

type SectionProps = {
	sectionName: string;
	section: DevPanelSection;
};

export function Section({ sectionName, section }: SectionProps) {
	const { toggleSectionCollapse } = useDevPanelSectionActions();

	return (
		<div className={styles.section}>
			<div className={styles.header} onClick={() => toggleSectionCollapse(sectionName)}>
				<span className={styles.title}>{section.name}</span>

				<span className={styles.toggle}>
					<Icon name="ArrowDown" className={section.isCollapsed ? styles.collapsed : undefined} />
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
