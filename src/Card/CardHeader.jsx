import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

CardHeader.displayName = 'MDCCardHeader';

CardHeader.propTypes = {
    graphic: PropTypes.element,
    title: PropTypes.node,
    subtitle: PropTypes.node,
    action: PropTypes.element,
    large: PropTypes.bool
};

export default function CardHeader({
    graphic,
    title,
    subtitle,
    action,
    large,

    element = 'div',
    component: Element = element,
    className,
    children,
    ...props
}) {
    const classNames = classnames('mdc-card__header', className);

    return (
        <Element className={classNames} {...props}>
            {graphic && React.cloneElement(graphic, { className: 'mdc-card__header__graphic' })}

            <div className="mdc-card__header__text">
                {React.isValidElement(title) ?
                    React.cloneElement(title, { className: 'mdc-card__header__title' })
                    :
                    <h2 className="mdc-card__header__title">{title}</h2>
                }
                
                {subtitle && (React.isValidElement(subtitle) ?
                    React.cloneElement(subtitle, { className: 'mdc-card__header__subtitle' })
                    :
                    <h3 className="mdc-card__header__subtitle">{subtitle}</h3>
                )}
            </div>

            {action && React.cloneElement(action, { className: 'mdc-card__header__action' })}
        </Element>
    );
}