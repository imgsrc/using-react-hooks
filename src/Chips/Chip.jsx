import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

Chip.displayName = 'MDCChip';

Chip.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    text: PropTypes.string.isRequired,
    leadingIcon: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
    tarilingIcon: PropTypes.element,
    selected: PropTypes.bool,
    onClick: PropTypes.func
};

Chip.defaultProps = {
    selected: false,
    onClick: Function.prototype,
    element: 'div'
};

const Chip = ({
                  value,
                  text,
                  leadingIcon,
                  tarilingIcon,
                  selected,
                  onClick,
                  element,
                  component: Element = element,
                  className,
                  children = text,
                  ...props}) => {
    const handleClick = () => onClick(value);
    const classNames = classnames('mdc-chip', {
        'mdc-chip--selected': selected
    }, className);

    return (
      <Element className={classNames} onClick={handleClick} {...props}>
          {(leadingIcon && React.isValidElement(leadingIcon)) &&
          React.cloneElement(leadingIcon, {
              className: classnames('mdc-chip__icon mdc-chip__icon--leading', {
                  'mdc-chip__icon--leading-hidden': selected
              })
          })
          }

          {(selected && leadingIcon) &&
          <div className="mdc-chip__checkmark">
              <svg className="mdc-chip__checkmark-svg" viewBox="-2 -3 30 30">
                  <path className="mdc-chip__checkmark-path" fill="none" stroke="black" d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
              </svg>
          </div>
          }

          <div className="mdc-chip__text">{children}</div>

          {tarilingIcon &&
          React.cloneElement(tarilingIcon, {
              className: classnames('mdc-chip__icon mdc-chip__icon--trailing'),
              tabIndex: '0',
              role: 'button'
          })
          }
      </Element>
    );
}

export default Chip;
