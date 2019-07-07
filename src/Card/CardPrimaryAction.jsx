import React from 'react';
import classnames from 'classnames';

CardPrimaryAction.displayName = 'MDCCardPrimaryAction';

export default function CardPrimaryAction({
    element = 'div',
    component: Element = element,
    className,
    ...props
}) {
    const classNames = classnames('mdc-card__primary-action', className);

    return (
        <Element className={classNames} {...props} />
    );
}