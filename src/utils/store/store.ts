import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";

import type { ControlGroup, DevPanelStore } from "../../types";

const DEFAULT_POSITION = { x: 20, y: 20 };

export const useDevPanelStore = create<DevPanelStore>()(
    persist(
        (set) => ({
            // State
            isVisible: false,
            isCollapsed: false,
            sections: {},
            position: DEFAULT_POSITION,

            // Actions
            setVisible: (visible: boolean) => {
                set({ isVisible: visible });
            },

            setCollapsed: (collapsed: boolean) => {
                set({ isCollapsed: collapsed });
            },

            setPosition: (position: { x: number; y: number }) => {
                set({ position });
            },

            registerSection: (name: string, controls: ControlGroup) => {
                set((state) => {
                    const existingSection = state.sections[name];

                    // Buscar estado de collapse persistido en localStorage
                    let persistedCollapseState = false;
                    try {
                        const stored = localStorage.getItem(
                            "berenjena-dev-panel-storage"
                        );
                        if (stored) {
                            const parsed = JSON.parse(stored);

                            persistedCollapseState =
                                parsed.state?.sectionCollapseState?.[name] ??
                                false;
                        }
                    } catch {
                        // Ignore localStorage errors
                    }

                    const isCollapsed =
                        existingSection?.isCollapsed ?? persistedCollapseState;

                    return {
                        sections: {
                            ...state.sections,
                            [name]: {
                                name,
                                controls,
                                isCollapsed,
                            },
                        },
                    };
                });
            },

            unregisterSection: (name: string) => {
                set((state) => {
                    const { [name]: removed, ...rest } = state.sections;

                    return { sections: rest };
                });
            },

            toggleSectionCollapse: (name: string) => {
                set((state) => {
                    const section = state.sections[name];
                    if (!section) return state;

                    return {
                        sections: {
                            ...state.sections,
                            [name]: {
                                ...section,
                                isCollapsed: !section.isCollapsed,
                            },
                        },
                    };
                });
            },

            reset: () => {
                set({
                    isVisible: false,
                    isCollapsed: false,
                    sections: {},
                    position: DEFAULT_POSITION,
                });
            },
        }),
        {
            name: "dev-panel-storage",
            partialize: (state) => ({
                isVisible: state.isVisible,
                isCollapsed: state.isCollapsed,
                position: state.position,
                // DO NOT persist sections - they are dynamic and are recreated on mount
                // Only save the collapse state of each section
                sectionCollapseState: Object.fromEntries(
                    Object.entries(state.sections).map(([key, section]) => [
                        key,
                        section.isCollapsed,
                    ])
                ),
            }),
        }
    )
);

// Selectors to optimize re-renders
export const useDevPanelVisible = () =>
    useDevPanelStore((state) => state.isVisible);
export const useDevPanelCollapsed = () =>
    useDevPanelStore((state) => state.isCollapsed);
export const useDevPanelPosition = () =>
    useDevPanelStore((state) => state.position);
export const useDevPanelSections = () =>
    useDevPanelStore((state) => state.sections);
export const useDevPanelActions = () =>
    useDevPanelStore(
        useShallow((state) => ({
            setVisible: state.setVisible,
            setCollapsed: state.setCollapsed,
            setPosition: state.setPosition,
            registerSection: state.registerSection,
            unregisterSection: state.unregisterSection,
            toggleSectionCollapse: state.toggleSectionCollapse,
            reset: state.reset,
        }))
    );
