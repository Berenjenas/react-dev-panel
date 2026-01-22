import React from "react";

import { copyToClipboard } from "@/utils/copyToClipboard";
import { getStringPreview } from "@/utils/getStringPreview";
import { prettifyJson } from "@/utils/prettifyJson";

import type { LocalStorageControlProps, LocalStorageItem } from "./types";

import styles from "./LocalStorageControl.module.scss";

/**
 * UI state for each localStorage item
 */
type ItemUIState = {
	collapsed: boolean;
	valueExpanded: boolean;
	formattedValue: string;
};

/**
 * Component that renders a table displaying all localStorage items
 * Allows viewing, editing, and deleting localStorage entries
 *
 * @param props - The component props
 * @param props.control - The localStorage control configuration object
 * @param props.control.type - The control type, must be 'localStorage'
 * @param props.control.onRefresh - Optional callback triggered when data is refreshed
 * @param props.control.disabled - Optional flag to disable the control
 * @returns JSX element representing a localStorage management table
 *
 * @example
 * ```typescript
 * <LocalStorageControl control={{
 *   type: 'localStorage',
 *   onRefresh: () => console.log('LocalStorage refreshed'),
 *   disabled: false
 * }} />
 * ```
 */
export function LocalStorageControl({ control }: LocalStorageControlProps): React.ReactNode {
	const [items, setItems] = React.useState<LocalStorageItem[]>([]);
	const [editingKey, setEditingKey] = React.useState<string | null>(null);
	const [editValue, setEditValue] = React.useState<string>("");
	const [newKey, setNewKey] = React.useState<string>("");
	const [newValue, setNewValue] = React.useState<string>("");
	const [showAddForm, setShowAddForm] = React.useState<boolean>(false);
	const [itemStates, setItemStates] = React.useState<Map<string, ItemUIState>>(new Map());
	const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

	/**
	 * Loads all items from localStorage
	 */
	const loadItems = React.useCallback((): void => {
		const storageItems: LocalStorageItem[] = [];

		for (let i = 0; i < localStorage.length; i++) {
			const key = localStorage.key(i);

			if (key) {
				const value = localStorage.getItem(key);

				storageItems.push({ key, value: value || "" });
			}
		}

		const sortedItems = storageItems.sort((a, b) => a.key.localeCompare(b.key));

		setItems(sortedItems);

		// Initialize all items as collapsed by default and cache formatted values
		const newItemStates = new Map<string, ItemUIState>();

		sortedItems.forEach((item) => {
			newItemStates.set(item.key, {
				collapsed: true,
				valueExpanded: false,
				formattedValue: prettifyJson(item.value),
			});
		});
		setItemStates(newItemStates);

		control.onRefresh?.();
	}, [control]);

	/**
	 * Handles deletion of a localStorage item
	 */
	const handleDelete = React.useCallback(
		(key: string): void => {
			if (confirm(`Delete "${key}" from localStorage?`)) {
				localStorage.removeItem(key);
				loadItems();
			}
		},
		[loadItems],
	);

	/**
	 * Starts editing an item
	 */
	const handleEdit = React.useCallback((key: string, value: string): void => {
		setEditingKey(key);
		setEditValue(value);
	}, []);

	/**
	 * Saves edited value
	 */
	const handleSave = React.useCallback(
		(key: string): void => {
			localStorage.setItem(key, editValue);
			setEditingKey(null);
			setEditValue("");
			loadItems();
		},
		[editValue, loadItems],
	);

	/**
	 * Cancels editing
	 */
	const handleCancel = React.useCallback((): void => {
		setEditingKey(null);
		setEditValue("");
	}, []);

	/**
	 * Adds a new localStorage item
	 */
	const handleAdd = React.useCallback((): void => {
		if (newKey.trim() === "") {
			alert("The key cannot be empty");

			return;
		}

		if (localStorage.getItem(newKey) !== null) {
			if (!confirm(`The key "${newKey}" already exists. Do you want to overwrite it?`)) {
				return;
			}
		}

		localStorage.setItem(newKey, newValue);
		setNewKey("");
		setNewValue("");
		setShowAddForm(false);
		loadItems();
	}, [newKey, newValue, loadItems]);

	/**
	 * Copies the content of a localStorage item to clipboard
	 */
	const handleCopyContent = React.useCallback(async (key: string, value: string): Promise<void> => {
		try {
			await copyToClipboard(value);
			setCopiedKey(key);

			// Reset the feedback after 2 seconds
			setTimeout(() => {
				setCopiedKey(null);
			}, 2000);
		} catch {
			alert("Failed to copy to clipboard");
		}
	}, []);

	/**
	 * Toggles the UI state of an item (collapsed or value expanded)
	 */
	const toggleItemState = React.useCallback((key: string, field: "collapsed" | "valueExpanded"): void => {
		setItemStates((prev) => {
			const newStates = new Map(prev);
			const currentState = newStates.get(key);

			if (!currentState) return prev;

			newStates.set(key, {
				...currentState,
				[field]: !currentState[field],
			});

			return newStates;
		});
	}, []);

	/**
	 * Handles keyboard navigation for collapsible card headers (Enter or Space key)
	 */
	const handleCardKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>, key: string): void => {
			if (e.key === "Enter" || e.key === " ") {
				toggleItemState(key, "collapsed");
			}
		},
		[toggleItemState],
	);

	/**
	 * Gets a truncated preview of a formatted value
	 */
	const getPreview = React.useCallback((formattedValue: string, maxLength: number = 100): string => {
		return getStringPreview(formattedValue, maxLength);
	}, []);

	React.useEffect(() => {
		loadItems();

		// Listen for storage events from other tabs/windows
		function handleStorageChange(): void {
			loadItems();
		}

		window.addEventListener("storage", handleStorageChange);

		return (): void => {
			window.removeEventListener("storage", handleStorageChange);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<span className={styles.count}>
					{items.length}

					{items.length === 1 ? " item" : " items"}
				</span>

				<div className={styles.actions}>
					<button className={styles.btnRefresh} onClick={loadItems} disabled={control.disabled} title="Refresh">
						🔄
					</button>

					<button className={styles.btnAdd} onClick={() => setShowAddForm(!showAddForm)} disabled={control.disabled} title="Add new">
						{showAddForm ? "✕" : "+"}
					</button>
				</div>
			</div>

			{showAddForm && (
				<div className={styles.card}>
					<div className={styles.cardHeader}>
						<span className={styles.cardTitle}>New entry</span>
					</div>

					<div className={styles.cardBody}>
						<div className={styles.field}>
							<label className={styles.fieldLabel}>Key</label>

							<input
								type="text"
								className={styles.input}
								placeholder="key_name"
								value={newKey}
								onChange={(e) => setNewKey(e.target.value)}
								disabled={control.disabled}
							/>
						</div>

						<div className={styles.field}>
							<label className={styles.fieldLabel}>Value</label>

							<textarea
								className={styles.textarea}
								placeholder='{"example": "value"}'
								value={newValue}
								onChange={(e) => setNewValue(e.target.value)}
								disabled={control.disabled}
								rows={3}
							/>
						</div>
					</div>

					<div className={styles.cardActions}>
						<button className={styles.btnSave} onClick={handleAdd} disabled={control.disabled}>
							Save
						</button>

						<button className={styles.btnCancel} onClick={() => setShowAddForm(false)} disabled={control.disabled}>
							Cancel
						</button>
					</div>
				</div>
			)}

			<div className={styles.itemsList}>
				{items.length === 0 ? (
					<div className={styles.empty}>No data in localStorage</div>
				) : (
					items.map((item) => (
						<div key={item.key} className={styles.card}>
							<div
								className={`${styles.cardHeader} ${styles.clickable}`}
								onClick={() => toggleItemState(item.key, "collapsed")}
								role="button"
								tabIndex={0}
								onKeyDown={(e) => handleCardKeyDown(e, item.key)}
							>
								<span className={styles.collapseIcon}>{itemStates.get(item.key)?.collapsed ? "▶" : "▼"}</span>

								<code className={styles.keyCode}>{item.key}</code>
							</div>

							{!itemStates.get(item.key)?.collapsed && (
								<>
									<div className={styles.cardBody}>
										{editingKey === item.key ? (
											<textarea
												className={styles.textarea}
												value={editValue}
												onChange={(e) => setEditValue(e.target.value)}
												disabled={control.disabled}
												rows={6}
												autoFocus
											/>
										) : (
											<>
												<pre className={styles.valueText}>
													{itemStates.get(item.key)?.valueExpanded
														? itemStates.get(item.key)?.formattedValue
														: getPreview(itemStates.get(item.key)?.formattedValue || item.value)}
												</pre>

												<div className={styles.valueActions}>
													{item.value.length > 100 && (
														<button
															className={styles.btnToggle}
															onClick={() => toggleItemState(item.key, "valueExpanded")}
															disabled={control.disabled}
														>
															{itemStates.get(item.key)?.valueExpanded ? "▲ Show less" : "▼ Show more"}
														</button>
													)}

													<button
														className={styles.btnToggle}
														onClick={() => handleCopyContent(item.key, item.value)}
														disabled={control.disabled}
														title="Copy content"
													>
														{copiedKey === item.key ? "✓ Copied" : "📎 Copy"}
													</button>
												</div>
											</>
										)}
									</div>

									<div className={styles.cardActions}>
										{editingKey === item.key ? (
											<>
												<button
													className={styles.btnSave}
													onClick={() => handleSave(item.key)}
													disabled={control.disabled}
													title="Save"
												>
													💾 Save
												</button>

												<button
													className={styles.btnCancel}
													onClick={handleCancel}
													disabled={control.disabled}
													title="Cancel"
												>
													✕ Cancel
												</button>
											</>
										) : (
											<>
												<button
													className={styles.btnEdit}
													onClick={() => handleEdit(item.key, item.value)}
													disabled={control.disabled}
													title="Edit"
												>
													✏️ Edit
												</button>

												<button
													className={styles.btnDelete}
													onClick={() => handleDelete(item.key)}
													disabled={control.disabled}
													title="Delete"
												>
													🗑️ Delete
												</button>
											</>
										)}
									</div>
								</>
							)}
						</div>
					))
				)}
			</div>
		</div>
	);
}
