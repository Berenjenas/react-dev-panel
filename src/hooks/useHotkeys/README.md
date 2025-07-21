# useHotkeys Hook

Hook para manejar atajos de teclado (hotkeys) con soporte para teclas modificadoras y múltiples combinaciones de teclas.

## Características

- ✅ Soporte para múltiples hotkeys
- ✅ Teclas modificadoras (Ctrl, Shift, Alt, Meta/Cmd)
- ✅ Configuración individual por hotkey
- ✅ Habilitación/deshabilitación dinámica
- ✅ Soporte para targets específicos
- ✅ Utilidades para formatear y crear hotkeys
- ✅ TypeScript completamente tipado

## Uso Básico

```tsx
import { useHotkeys } from '@libs/client/hooks';

function MyComponent() {
  const handleSave = () => {
    console.log('Guardando...');
  };

  const handleCancel = () => {
    console.log('Cancelando...');
  };

  useHotkeys([
    { key: 'Enter', action: handleSave },
    { key: 'Escape', action: handleCancel },
  ]);

  return <div>Presiona Enter para guardar o Escape para cancelar</div>;
}
```

## Hotkeys con Modificadores

```tsx
import { useHotkeys } from '@libs/client/hooks';

function EditorComponent() {
  const handleSave = () => console.log('Guardando...');
  const handleUndo = () => console.log('Deshacer...');
  const handleRedo = () => console.log('Rehacer...');
  const handleSearch = () => console.log('Buscar...');

  useHotkeys([
    { key: 's', ctrlKey: true, action: handleSave, description: 'Guardar' },
    { key: 'z', ctrlKey: true, action: handleUndo, description: 'Deshacer' },
    { key: 'z', ctrlKey: true, shiftKey: true, action: handleRedo, description: 'Rehacer' },
    { key: 'k', metaKey: true, action: handleSearch, description: 'Buscar' },
  ]);

  return <div>Editor con atajos de teclado</div>;
}
```

## Hook para un Solo Hotkey

```tsx
import { useHotkey } from '@libs/client/hooks';

function SingleHotkeyComponent() {
  const handleSave = () => console.log('Guardando...');

  useHotkey({
    key: 's',
    ctrlKey: true,
    action: handleSave,
    description: 'Guardar documento',
  });

  return <div>Usa Ctrl+S para guardar</div>;
}
```

## Configuración Avanzada

```tsx
import { useHotkeys } from '@libs/client/hooks';

function AdvancedComponent() {
  const [canDelete, setCanDelete] = useState(true);
  const elementRef = useRef<HTMLDivElement>(null);

  const handleDelete = () => {
    if (canDelete) {
      console.log('Eliminando...');
    }
  };

  useHotkeys(
    [
      {
        key: 'Delete',
        action: handleDelete,
        preventDefault: true,
        stopPropagation: true,
        enabled: canDelete,
        description: 'Eliminar elemento',
      },
    ],
    {
      target: elementRef.current,
      enabled: true,
    },
  );

  return (
    <div ref={elementRef} tabIndex={0}>
      {canDelete ? 'Presiona Delete para eliminar' : 'Eliminación deshabilitada'}
    </div>
  );
}
```

## Utilidades

### createHotkey

```tsx
import { createHotkey, useHotkeys } from '@libs/client/hooks';

function ComponentWithUtilities() {
  const handleSave = () => console.log('Guardando...');
  const handleSearch = () => console.log('Buscando...');

  const saveHotkey = createHotkey('s', handleSave, { ctrl: true });
  const searchHotkey = createHotkey('k', handleSearch, { meta: true });

  useHotkeys([saveHotkey, searchHotkey]);

  return <div>Componente con utilidades</div>;
}
```

### formatHotkey

```tsx
import { formatHotkey } from '@libs/client/hooks';

function HotkeyDisplay() {
  const hotkeyConfig = { key: 's', ctrlKey: true };
  const displayText = formatHotkey(hotkeyConfig); // "Ctrl+S" o "⌘+S" en Mac

  return <div>Atajo: {displayText}</div>;
}
```

## API

### useHotkeys

```tsx
useHotkeys(hotkeys: HotkeyConfig[], options?: UseHotkeysOptions): void
```

### useHotkey

```tsx
useHotkey(config: HotkeyConfig, options?: UseHotkeysOptions): void
```

### HotkeyConfig

```tsx
interface HotkeyConfig {
  key: string;
  action: (event: KeyboardEvent) => void;
  description?: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  enabled?: boolean;
  target?: HTMLElement | Window | Document;
}
```

### UseHotkeysOptions

```tsx
interface UseHotkeysOptions {
  enabled?: boolean;
  target?: HTMLElement | Window | Document;
  preventDefault?: boolean;
  stopPropagation?: boolean;
}
```

## Ejemplos de Teclas Comunes

- `'Enter'` - Tecla Enter
- `'Escape'` - Tecla Escape
- `'Space'` - Barra espaciadora
- `'Delete'` - Tecla Delete
- `'Backspace'` - Tecla Backspace
- `'ArrowUp'`, `'ArrowDown'`, `'ArrowLeft'`, `'ArrowRight'` - Teclas de flecha
- `'Tab'` - Tecla Tab
- `'F1'`, `'F2'`, etc. - Teclas de función
- `'a'`, `'b'`, `'c'`, etc. - Teclas de letras
- `'1'`, `'2'`, `'3'`, etc. - Teclas de números
