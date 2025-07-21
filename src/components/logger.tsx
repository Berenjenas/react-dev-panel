type LoggerProps = {
    items: object;
};

export function Logger({ items }: LoggerProps) {
    return (
        <pre>
            <code>{JSON.stringify(items, null, 2)}</code>
        </pre>
    );
}
