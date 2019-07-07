import React from 'react';

TopAppBarRow.displayName = 'MDCTopAppBarRow';

export default function TopAppBarRow({ element: Element = 'div', ...props }) {
    return (
        <Element className="mdc-top-app-bar__row" {...props} />
    );
}