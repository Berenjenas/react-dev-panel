import { useCallback, useState } from "react";

import { createHotkey } from "../../utils/createHotkey/createHotkey";

import { useHotkeys } from "./useHotkeys";

/**
 * Ejemplo de uso del hook useHotkeys
 * Este componente demuestra diferentes formas de usar el hook
 */
export function HotkeysExample() {
    const [text, setText] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [history, setHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    // Acciones que pueden ser ejecutadas por hotkeys
    const handleSave = useCallback(() => {
        if (text.trim()) {
            const newHistory = [...history, text];

            setHistory(newHistory);
            setHistoryIndex(newHistory.length - 1);
            alert(`Guardado: "${text}"`);
        }
    }, [text, history]);

    const handleClear = useCallback(() => {
        setText("");
        setIsEditing(false);
    }, []);

    const handleUndo = useCallback(() => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;

            setText(history[newIndex]);
            setHistoryIndex(newIndex);
        }
    }, [history, historyIndex]);

    const handleRedo = useCallback(() => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;

            setText(history[newIndex]);
            setHistoryIndex(newIndex);
        }
    }, [history, historyIndex]);

    const handleEscape = useCallback(() => {
        if (isEditing) {
            setIsEditing(false);
        }
    }, [isEditing]);

    const handleToggleEdit = useCallback(() => {
        setIsEditing(!isEditing);
    }, [isEditing]);

    const handleFocus = useCallback(() => {
        const input = document.getElementById("example-input");
        if (input) {
            input.focus();
        }
    }, []);

    // Configuración de hotkeys usando el hook principal
    useHotkeys(
        [
            {
                key: "s",
                ctrlKey: true,
                action: handleSave,
                description: "Guardar",
                preventDefault: true,
            },
            {
                key: "z",
                ctrlKey: true,
                action: handleUndo,
                description: "Deshacer",
                preventDefault: true,
            },
            {
                key: "z",
                ctrlKey: true,
                shiftKey: true,
                action: handleRedo,
                description: "Rehacer",
                preventDefault: true,
            },
            {
                key: "Escape",
                action: handleEscape,
                description: "Cancelar edición",
            },
            {
                key: "e",
                ctrlKey: true,
                action: handleToggleEdit,
                description: "Alternar edición",
                preventDefault: true,
            },
            {
                key: "l",
                ctrlKey: true,
                action: handleClear,
                description: "Limpiar",
                preventDefault: true,
            },
            {
                key: "f",
                ctrlKey: true,
                action: handleFocus,
                description: "Enfocar input",
                preventDefault: true,
            },
        ],
        {
            enabled: true,
            target: window,
        }
    );

    // Ejemplo usando createHotkey para crear configuraciones de hotkeys
    const searchHotkey = createHotkey(
        "k",
        () => {
            alert("Función de búsqueda activada!");
        },
        { meta: true },
        { description: "Buscar" }
    );

    const deleteHotkey = createHotkey(
        "Delete",
        () => {
            // En un caso real, usarías un modal o componente de confirmación
            // Para el ejemplo, simplemente ejecutamos la acción
            handleClear();
        },
        {},
        { description: "Eliminar todo", enabled: isEditing }
    );

    useHotkeys([searchHotkey, deleteHotkey]);

    // Tipo para mostrar hotkeys sin la función action
    type HotkeyDisplay = {
        key: string;
        description: string;
        ctrlKey?: boolean;
        shiftKey?: boolean;
        altKey?: boolean;
        metaKey?: boolean;
    };

    // Lista de hotkeys disponibles para mostrar al usuario
    const availableHotkeys: HotkeyDisplay[] = [
        { key: "s", ctrlKey: true, description: "Guardar" },
        { key: "z", ctrlKey: true, description: "Deshacer" },
        { key: "z", ctrlKey: true, shiftKey: true, description: "Rehacer" },
        { key: "e", ctrlKey: true, description: "Alternar edición" },
        { key: "l", ctrlKey: true, description: "Limpiar" },
        { key: "f", ctrlKey: true, description: "Enfocar input" },
        { key: "k", metaKey: true, description: "Buscar" },
        { key: "Delete", description: "Eliminar todo (solo en modo edición)" },
        { key: "Escape", description: "Cancelar edición" },
    ];

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <h2>Ejemplo de useHotkeys Hook</h2>

            <div style={{ marginBottom: "20px" }}>
                <label htmlFor="example-input">Texto:</label>
                <input
                    id="example-input"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onFocus={() => setIsEditing(true)}
                    onBlur={() => setIsEditing(false)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        margin: "5px 0",
                        border: isEditing ? "2px solid blue" : "1px solid gray",
                        borderRadius: "4px",
                    }}
                    placeholder="Escribe algo aquí..."
                />
            </div>

            <div style={{ marginBottom: "20px" }}>
                <p>
                    <strong>Estado:</strong>{" "}
                    {isEditing ? "Editando" : "No editando"}
                </p>
                <p>
                    <strong>Historial:</strong> {history.length} elementos
                </p>
                <p>
                    <strong>Posición en historial:</strong> {historyIndex + 1}{" "}
                    de {history.length}
                </p>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <h3>Hotkeys disponibles:</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {availableHotkeys.map((hotkey, index) => (
                        <li
                            key={index}
                            style={{
                                padding: "5px 0",
                                borderBottom: "1px solid #eee",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <span>{hotkey.description}</span>
                            <code
                                style={{
                                    backgroundColor: "#f5f5f5",
                                    padding: "2px 6px",
                                    borderRadius: "3px",
                                    fontSize: "12px",
                                }}
                            >
                                {[
                                    hotkey.ctrlKey && "Ctrl",
                                    hotkey.altKey && "Alt",
                                    hotkey.shiftKey && "Shift",
                                    hotkey.metaKey && "⌘",
                                    hotkey.key.toUpperCase(),
                                ]
                                    .filter(Boolean)
                                    .join("+")}
                            </code>
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ marginBottom: "20px" }}>
                <h3>Historial:</h3>
                <ul>
                    {history.map((item, index) => (
                        <li
                            key={index}
                            style={{
                                padding: "5px 0",
                                opacity: index === historyIndex ? 1 : 0.6,
                                fontWeight:
                                    index === historyIndex ? "bold" : "normal",
                            }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            <div
                style={{
                    backgroundColor: "#f9f9f9",
                    padding: "15px",
                    borderRadius: "5px",
                    fontSize: "14px",
                }}
            >
                <p>
                    <strong>Instrucciones:</strong>
                </p>
                <ul>
                    <li>Escribe algo en el input</li>
                    <li>
                        Usa <code>Ctrl+S</code> para guardar
                    </li>
                    <li>
                        Usa <code>Ctrl+Z</code> para deshacer
                    </li>
                    <li>
                        Usa <code>Ctrl+Shift+Z</code> para rehacer
                    </li>
                    <li>
                        Usa <code>Ctrl+E</code> para alternar modo edición
                    </li>
                    <li>
                        Usa <code>Ctrl+L</code> para limpiar
                    </li>
                    <li>
                        Usa <code>Escape</code> para cancelar edición
                    </li>
                    <li>
                        Usa <code>Delete</code> para eliminar todo (solo en modo
                        edición)
                    </li>
                </ul>
            </div>
        </div>
    );
}
