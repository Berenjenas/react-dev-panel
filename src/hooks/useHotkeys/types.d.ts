export interface UseHotkeysOptions {
	enabled?: boolean;
	target?: HTMLElement | Window | Document;
	preventDefault?: boolean;
	stopPropagation?: boolean;
}
