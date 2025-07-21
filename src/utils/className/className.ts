/* eslint-disable @typescript-eslint/no-explicit-any */
interface ClassName {
    className: string;
}

/**
 * A helper function to handle class names conditions easily.
 * Receives an object containing strings or an object with the CSS class as key
 * and a condition to add or remove it as value.
 *
 * @param classNames The classnames object
 * @returns  The classes separated by spaces
 */
export function className(...classNames: any): ClassName {
    const classes = [];

    for (const className of classNames) {
        if (typeof className === "object") {
            for (const key in className) {
                if (
                    Object.prototype.hasOwnProperty.call(className, key) &&
                    className[key]
                ) {
                    classes.push(key);
                }
            }
        } else {
            classes.push(className);
        }
    }

    return { className: classes.join(" ") };
}
