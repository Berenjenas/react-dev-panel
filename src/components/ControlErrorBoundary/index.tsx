import { Component, type ErrorInfo, type ReactNode } from "react";

interface ControlErrorBoundaryProps {
	/** Control rendered inside the boundary. */
	children: ReactNode;
	/** UI shown when the child throws. */
	fallback: ReactNode;
	/** Identifier (control name) used in the logged error. */
	name?: string;
}

interface ControlErrorBoundaryState {
	hasError: boolean;
}

/**
 * Error boundary that isolates a single control's render failures so a broken
 * or misconfigured control (or a failed lazy import) cannot crash the whole
 * dev panel or the host application.
 */
export class ControlErrorBoundary extends Component<ControlErrorBoundaryProps, ControlErrorBoundaryState> {
	state: ControlErrorBoundaryState = { hasError: false };

	static getDerivedStateFromError(): ControlErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: ErrorInfo): void {
		console.error(`[DevPanel] Control "${this.props.name ?? "unknown"}" failed to render:`, error, info.componentStack);
	}

	render(): ReactNode {
		if (this.state.hasError) {
			return this.props.fallback;
		}

		return this.props.children;
	}
}
