import React from 'react';

MenuSelectionGroup.displayName = 'MDCMenuSelectionGroup';

export default function MenuSelectionGroup({
    element: Element = 'ul',
    ...props
}) {
    return (
        <Element className="mdc-menu__selection-group" {...props} />
    );
}