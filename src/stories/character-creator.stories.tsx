import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logger } from "@/components/Logger";
import { useDevPanel } from "@/hooks/useDevPanel";
import { controlPersistenceService } from "@/store/ControlPersistenceService";

interface CharacterStats {
	strength: number;
	agility: number;
	intelligence: number;
	vitality: number;
}

interface Character {
	name: string;
	class: string;
	level: number;
	hairColor: string;
	skinColor: string;
	eyeColor: string;
	stats: CharacterStats;
	equipment: string[];
	skills: string[];
	hasHelmet: boolean;
	hasCape: boolean;
	hasArmor: boolean;
	hasWeapon: boolean;
}

const CHARACTER_CLASSES = ["Warrior", "Mage", "Rogue", "Paladin", "Archer", "Necromancer"];

const EQUIPMENT_OPTIONS = ["Iron Sword", "Magic Staff", "Bow of Flames", "Shield of Light", "Mystic Orb", "Dragon Scale Armor"];

const SKILL_OPTIONS = ["Fireball", "Healing", "Stealth", "Shield Bash", "Lightning Bolt", "Backstab", "Holy Light", "Poison Arrow"];

// Helper function to get initial value with persistence support
function getInitialValue<T>(sectionName: string, controlKey: string, defaultValue: T): T {
	const persistedValue = controlPersistenceService.getPersistedValue(sectionName, controlKey);

	return persistedValue !== undefined ? (persistedValue as T) : defaultValue;
}

function CharacterCreatorDemo(): React.ReactNode {
	const sectionName = "Character Creator";

	const [character, setCharacter] = useState<Character>({
		name: getInitialValue(sectionName, "characterName", "Unnamed Hero"),
		class: getInitialValue(sectionName, "characterClass", "Warrior"),
		level: getInitialValue(sectionName, "level", 1),
		hairColor: getInitialValue(sectionName, "hairColor", "#8B4513"),
		skinColor: getInitialValue(sectionName, "skinColor", "#FDBCB4"),
		eyeColor: getInitialValue(sectionName, "eyeColor", "#2563eb"),
		stats: {
			strength: getInitialValue(sectionName, "strength", 10),
			agility: getInitialValue(sectionName, "agility", 10),
			intelligence: getInitialValue(sectionName, "intelligence", 10),
			vitality: getInitialValue(sectionName, "vitality", 10),
		},
		equipment: getInitialValue(sectionName, "equipment", []),
		skills: getInitialValue(sectionName, "skills", []),
		hasHelmet: getInitialValue(sectionName, "hasHelmet", false),
		hasCape: getInitialValue(sectionName, "hasCape", false),
		hasArmor: getInitialValue(sectionName, "hasArmor", true),
		hasWeapon: getInitialValue(sectionName, "hasWeapon", true),
	});

	// Calculate total stat points for balancing
	const totalStats = Object.values(character.stats).reduce((sum, stat) => sum + stat, 0);

	const maxTotalStats = 60; // Limit for game balance

	useDevPanel(
		sectionName,
		{
			// Basic Info Section
			characterName: {
				type: "text",
				value: character.name,
				label: "Character Name",
				description: "What shall we call this hero?",
				persist: true,
				onChange: (value: string) => setCharacter((prev) => ({ ...prev, name: value || "Unnamed Hero" })),
			},
			characterClass: {
				type: "select",
				value: character.class,
				label: "Character Class",
				description: "Choose your destiny",
				options: CHARACTER_CLASSES,
				persist: true,
				onChange: (value: string) => setCharacter((prev) => ({ ...prev, class: value })),
			},
			level: {
				type: "range",
				value: character.level,
				label: "Level",
				description: "Character experience level",
				min: 1,
				max: 50,
				step: 1,
				persist: true,
				onChange: (value: number) => setCharacter((prev) => ({ ...prev, level: value })),
			},

			// Appearance Section
			separator1: {
				type: "separator",
				label: "Appearance",
			},
			hairColor: {
				type: "color",
				value: character.hairColor,
				label: "Hair Color",
				description: "Choose your hair color",
				persist: true,
				onChange: (value: string) => setCharacter((prev) => ({ ...prev, hairColor: value })),
			},
			skinColor: {
				type: "color",
				value: character.skinColor,
				label: "Skin Color",
				description: "Choose your skin tone",
				persist: true,
				onChange: (value: string) => setCharacter((prev) => ({ ...prev, skinColor: value })),
			},
			eyeColor: {
				type: "color",
				value: character.eyeColor,
				label: "Eye Color",
				description: "Choose your eye color",
				persist: true,
				onChange: (value: string) => setCharacter((prev) => ({ ...prev, eyeColor: value })),
			},

			// Stats Section
			separator2: {
				type: "separator",
				label: `Stats (${totalStats}/${maxTotalStats})`,
			},
			strength: {
				type: "range",
				value: character.stats.strength,
				label: "Strength",
				description: "Physical power and melee damage",
				min: 1,
				max: 20,
				step: 1,
				persist: true,
				disabled: totalStats >= maxTotalStats && character.stats.strength <= totalStats - maxTotalStats + character.stats.strength,
				onChange: (value: number) =>
					setCharacter((prev) => ({
						...prev,
						stats: { ...prev.stats, strength: value },
					})),
			},
			agility: {
				type: "range",
				value: character.stats.agility,
				label: "Agility",
				description: "Speed and critical hit chance",
				min: 1,
				max: 20,
				step: 1,
				persist: true,
				disabled: totalStats >= maxTotalStats && character.stats.agility <= totalStats - maxTotalStats + character.stats.agility,
				onChange: (value: number) =>
					setCharacter((prev) => ({
						...prev,
						stats: { ...prev.stats, agility: value },
					})),
			},
			intelligence: {
				type: "range",
				value: character.stats.intelligence,
				label: "Intelligence",
				description: "Mana and spell power",
				min: 1,
				max: 20,
				step: 1,
				persist: true,
				disabled: totalStats >= maxTotalStats && character.stats.intelligence <= totalStats - maxTotalStats + character.stats.intelligence,
				onChange: (value: number) =>
					setCharacter((prev) => ({
						...prev,
						stats: { ...prev.stats, intelligence: value },
					})),
			},
			vitality: {
				type: "range",
				value: character.stats.vitality,
				label: "Vitality",
				description: "Health and defense",
				min: 1,
				max: 20,
				step: 1,
				persist: true,
				disabled: totalStats >= maxTotalStats && character.stats.vitality <= totalStats - maxTotalStats + character.stats.vitality,
				onChange: (value: number) =>
					setCharacter((prev) => ({
						...prev,
						stats: { ...prev.stats, vitality: value },
					})),
			},
			resetStats: {
				type: "button",
				label: "Reset Stats",
				description: "Reset all stats to 10",
				onClick: () =>
					setCharacter((prev) => ({
						...prev,
						stats: { strength: 10, agility: 10, intelligence: 10, vitality: 10 },
					})),
			},

			// Equipment Section
			separator3: {
				type: "separator",
				label: "Equipment & Gear",
			},
			hasHelmet: {
				type: "boolean",
				value: character.hasHelmet,
				label: "Helmet",
				description: "Protective headgear (+2 Defense)",
				persist: true,
				onChange: (value: boolean) => setCharacter((prev) => ({ ...prev, hasHelmet: value })),
			},
			hasArmor: {
				type: "boolean",
				value: character.hasArmor,
				label: "Armor",
				description: "Body protection (+5 Defense)",
				persist: true,
				onChange: (value: boolean) => setCharacter((prev) => ({ ...prev, hasArmor: value })),
			},
			hasCape: {
				type: "boolean",
				value: character.hasCape,
				label: "Cape",
				description: "Mystical cape (+1 Intelligence)",
				persist: true,
				onChange: (value: boolean) => setCharacter((prev) => ({ ...prev, hasCape: value })),
			},
			hasWeapon: {
				type: "boolean",
				value: character.hasWeapon,
				label: "Primary Weapon",
				description: "Main weapon (+3 Attack)",
				persist: true,
				onChange: (value: boolean) => setCharacter((prev) => ({ ...prev, hasWeapon: value })),
			},

			// Advanced Equipment
			equipment: {
				type: "multiselect",
				value: character.equipment,
				label: "Special Equipment",
				description: "Additional gear and artifacts",
				options: EQUIPMENT_OPTIONS,
				persist: true,
				onChange: (value: string[]) => setCharacter((prev) => ({ ...prev, equipment: value })),
			},

			// Skills Section
			separator4: {
				type: "separator",
				label: "Skills & Abilities",
			},
			skills: {
				type: "multiselect",
				value: character.skills,
				label: "Character Skills",
				description: "Special abilities and spells",
				options: SKILL_OPTIONS,
				persist: true,
				onChange: (value: string[]) => setCharacter((prev) => ({ ...prev, skills: value })),
			},

			// Actions
			separator5: {
				type: "separator",
				label: "Actions",
			},
			randomize: {
				type: "button",
				label: "Randomize Character",
				description: "Generate a random character build",
				onClick: () => {
					const randomClass = CHARACTER_CLASSES[Math.floor(Math.random() * CHARACTER_CLASSES.length)];

					const randomSkills = SKILL_OPTIONS.slice()
						.sort(() => 0.5 - Math.random())
						.slice(0, Math.floor(Math.random() * 4) + 1);

					const randomEquipment = EQUIPMENT_OPTIONS.slice()
						.sort(() => 0.5 - Math.random())
						.slice(0, Math.floor(Math.random() * 3) + 1);

					setCharacter((prev) => ({
						...prev,
						class: randomClass,
						level: Math.floor(Math.random() * 20) + 1,
						hairColor: `hsl(${Math.floor(Math.random() * 360)}, 50%, 50%)`,
						skinColor: `hsl(${Math.floor(Math.random() * 60) + 20}, 30%, 70%)`,
						eyeColor: `hsl(${Math.floor(Math.random() * 360)}, 60%, 60%)`,
						stats: {
							strength: Math.floor(Math.random() * 15) + 5,
							agility: Math.floor(Math.random() * 15) + 5,
							intelligence: Math.floor(Math.random() * 15) + 5,
							vitality: Math.floor(Math.random() * 15) + 5,
						},
						equipment: randomEquipment,
						skills: randomSkills,
						hasHelmet: Math.random() > 0.5,
						hasCape: Math.random() > 0.5,
						hasArmor: Math.random() > 0.3,
						hasWeapon: Math.random() > 0.2,
					}));
				},
			},
		},
		{
			panelTitle: "⚔️ RPG Character Creator",
			theme: "dark",
		},
	);

	// Calculate derived stats
	const totalDefense = (character.hasHelmet ? 2 : 0) + (character.hasArmor ? 5 : 0) + character.stats.vitality;

	const totalAttack = (character.hasWeapon ? 3 : 0) + character.stats.strength;

	const totalMana = character.stats.intelligence * 5 + (character.hasCape ? 5 : 0);

	function renderCharacterAvatar(): React.ReactElement {
		return (
			<div
				style={{
					width: "300px",

					border: "var(--dev-panel-input-border-width) solid var(--dev-panel-border-color-accent)",
					borderRadius: "var(--dev-panel-border-radius-xl)",
					background: "var(--dev-panel-surface-color)",
					padding: "var(--dev-panel-spacing-2xl)",
					color: "var(--dev-panel-text-color)",
					fontFamily: "var(--dev-panel-font-family)",
					position: "relative",

					boxShadow: "var(--dev-panel-shadow-lg)",
				}}
			>
				<h2
					style={{
						margin: "0 0 var(--dev-panel-spacing-md)",
						textAlign: "center",
						fontSize: "var(--dev-panel-font-size-xl)",
						fontWeight: "var(--dev-panel-font-weight-semibold)",
						color: "var(--dev-panel-text-color)",
					}}
				>
					{character.name}
				</h2>

				<p
					style={{
						margin: "0 0 var(--dev-panel-spacing-2xl)",
						textAlign: "center",
						fontSize: "var(--dev-panel-font-size-md)",
						color: "var(--dev-panel-text-color-secondary)",
					}}
				>
					{`Level ${character.level} ${character.class}`}
				</p>

				{/* Simple Character Representation */}
				<div style={{ textAlign: "center", marginBottom: "var(--dev-panel-spacing-2xl)" }}>
					{/* Head */}
					<div
						style={{
							width: "60px",
							height: "60px",
							borderRadius: "50%",
							backgroundColor: character.skinColor,
							margin: "0 auto var(--dev-panel-spacing-md)",
							border: character.hasHelmet ? "3px solid var(--dev-panel-border-color-light)" : "none",
							position: "relative",
							boxShadow: "var(--dev-panel-shadow-sm)",
						}}
					>
						{/* Hair */}
						<div
							style={{
								width: "50px",
								height: "25px",
								backgroundColor: character.hairColor,
								borderRadius: "25px 25px 0 0",
								position: "absolute",
								top: "5px",
								left: "5px",
								opacity: character.hasHelmet ? 0.3 : 1,
							}}
						/>

						{/* Eyes */}
						<div
							style={{
								position: "absolute",
								top: "25px",
								left: "18px",
								width: "4px",
								height: "4px",
								backgroundColor: character.eyeColor,
								borderRadius: "50%",
							}}
						/>

						<div
							style={{
								position: "absolute",
								top: "25px",
								left: "38px",
								width: "4px",
								height: "4px",
								backgroundColor: character.eyeColor,
								borderRadius: "50%",
							}}
						/>
					</div>

					{/* Body */}
					<div
						style={{
							width: "80px",
							height: "100px",
							background: character.hasArmor
								? "linear-gradient(to bottom, var(--dev-panel-border-color-light) 0%, var(--dev-panel-border-color-light) 60%, var(--dev-panel-background-color-tertiary) 60%, var(--dev-panel-background-color-tertiary) 100%)"
								: "var(--dev-panel-background-color-tertiary)",
							margin: "0 auto",
							borderRadius: "var(--dev-panel-border-radius-md)",
							position: "relative",
							boxShadow: "var(--dev-panel-shadow-sm)",
						}}
					>
						{/* Cape */}
						{character.hasCape && (
							<div
								style={{
									position: "absolute",
									top: "0",
									left: "-15px",
									width: "110px",
									height: "80px",
									backgroundColor: "var(--dev-panel-error-color)",
									borderRadius: "0 0 var(--dev-panel-border-radius-2xl) var(--dev-panel-border-radius-2xl)",
									zIndex: -1,
									opacity: "var(--dev-panel-opacity-80)",
								}}
							/>
						)}

						{/* Weapon */}
						{character.hasWeapon && (
							<div
								style={{
									position: "absolute",
									top: "10px",
									right: "-20px",
									width: "4px",
									height: "60px",
									backgroundColor: "var(--dev-panel-warning-color)",
									borderRadius: "var(--dev-panel-border-radius-sm)",
									boxShadow: "var(--dev-panel-shadow-xs)",
								}}
							/>
						)}
					</div>
				</div>

				{/* Stats Display */}
				<div
					style={{
						marginTop: "var(--dev-panel-spacing-md)",
						border: "1px solid var(--dev-panel-border-color)",
						borderRadius: "var(--dev-panel-border-radius-md)",
						overflow: "hidden",
					}}
				>
					{/* Header */}
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							padding: "var(--dev-panel-spacing-sm) var(--dev-panel-spacing-md)",
							backgroundColor: "var(--dev-panel-background-color-secondary)",
							borderBottom: "1px solid var(--dev-panel-border-color)",
							fontSize: "var(--dev-panel-font-size-xs)",
							fontWeight: "var(--dev-panel-font-weight-semibold)",
							color: "var(--dev-panel-text-color)",
							textTransform: "uppercase",
							letterSpacing: "0.5px",
						}}
					>
						<span>Stat</span>

						<span>Value</span>
					</div>

					{/* Stats Rows */}
					{[
						{ label: "Attack", value: totalAttack },
						{ label: "Defense", value: totalDefense },
						{ label: "Mana", value: totalMana },
						{ label: "Speed", value: character.stats.agility },
					].map((stat, index) => (
						<div
							key={stat.label}
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								padding: "var(--dev-panel-spacing-sm) var(--dev-panel-spacing-md)",
								backgroundColor: index % 2 === 0 ? "transparent" : "var(--dev-panel-background-color-secondary)",
								borderBottom: index < 3 ? "1px solid var(--dev-panel-border-color)" : "none",
							}}
						>
							<span
								style={{
									fontSize: "var(--dev-panel-font-size-sm)",
									color: "var(--dev-panel-text-color-secondary)",
									fontWeight: "var(--dev-panel-font-weight-medium)",
								}}
							>
								{stat.label}
							</span>

							<span
								style={{
									fontSize: "var(--dev-panel-font-size-sm)",
									color: "var(--dev-panel-text-color)",
									fontWeight: "var(--dev-panel-font-weight-semibold)",
								}}
							>
								{stat.value}
							</span>
						</div>
					))}
				</div>

				{/* Persistence Instructions */}
				<div
					style={{
						marginTop: "var(--dev-panel-spacing-lg)",
						padding: "var(--dev-panel-spacing-md)",
						backgroundColor: "var(--dev-panel-background-color-secondary)",
						border: "1px solid var(--dev-panel-border-color)",
						borderRadius: "var(--dev-panel-border-radius-md)",
						borderLeft: "4px solid var(--dev-panel-color-primary)",
					}}
				>
					<h4
						style={{
							margin: "0 0 var(--dev-panel-spacing-sm) 0",
							fontSize: "var(--dev-panel-font-size-sm)",
							fontWeight: "var(--dev-panel-font-weight-semibold)",
							color: "var(--dev-panel-text-color)",
						}}
					>
						🎮 Test Data Persistence
					</h4>

					<p
						style={{
							margin: 0,
							fontSize: "var(--dev-panel-font-size-sm)",
							color: "var(--dev-panel-text-color-secondary)",
							lineHeight: 1.5,
						}}
					>
						Try changing the controls above, then refresh the page or switch to a different story and come back. Your character
						configuration will be automatically saved and restored!
					</p>
				</div>
			</div>
		);
	}

	return (
		<div
			style={{
				display: "flex",
				gap: "var(--dev-panel-spacing-4xl)",
				alignItems: "flex-start",
				fontFamily: "var(--dev-panel-font-family)",
			}}
		>
			{/* Character Avatar/Visualization */}
			{renderCharacterAvatar()}

			{/* Character Stats and Info */}
			<div style={{ flex: 1 }}>
				<Logger
					defaultCollapsed={false}
					items={{
						character: {
							name: character.name,
							class: character.class,
							level: character.level,
						},
						appearance: {
							hairColor: character.hairColor,
							skinColor: character.skinColor,
							eyeColor: character.eyeColor,
						},
						stats: character.stats,
						equipment: {
							helmet: character.hasHelmet,
							armor: character.hasArmor,
							cape: character.hasCape,
							weapon: character.hasWeapon,
							special: character.equipment,
						},
						skills: character.skills,
						derived: {
							totalAttack,
							totalDefense,
							totalMana,
							totalStatPoints: totalStats,
						},
					}}
				/>
			</div>
		</div>
	);
}

// =============================================================================
// Storybook Configuration
// =============================================================================

const meta: Meta<typeof CharacterCreatorDemo> = {
	title: "Integration Tests",
	component: CharacterCreatorDemo,
	parameters: {
		layout: "fullscreen",
	},
	decorators: [
		(Story): React.JSX.Element => {
			return (
				<div
					style={{
						width: "100%",
						height: "100vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "var(--dev-panel-background-color)",
						padding: "var(--dev-panel-spacing-2xl)",
						fontFamily: "var(--dev-panel-font-family)",
					}}
				>
					<Story />
				</div>
			);
		},
	],
};

export default meta;

type Story = StoryObj<typeof CharacterCreatorDemo>;

export const CharacterCreator: Story = {};
