export interface UseHotkeysOptions {
	enabled?: boolean;
	target?: HTMLElement | Window | Document;
	preventDefault?: boolean;
	stopPropagation?: boolean;
}

export interface HotkeyConfig {
	key: string;
	description?: string;
	ctrlKey?: boolean;
	shiftKey?: boolean;
	altKey?: boolean;
	metaKey?: boolean;
	preventDefault?: boolean;
	stopPropagation?: boolean;
	enabled?: boolean;
	target?: HTMLElement | Window | Document;
	action: (event: KeyboardEvent) => void;
}
