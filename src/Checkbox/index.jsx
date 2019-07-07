import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

Checkbox.displayName = 'MDCCheckbox';

Checkbox.propTypes = {
    checked: PropTypes.bool,
    indeterminate: PropTypes.bool,
    disabled: PropTypes.bool,

    onChange: PropTypes.func
};

Checkbox.defaultProps = {
    checked: false,
    indeterminate: false,
    disabled: false,

    onChange: Function.prototype
};

export default function Checkbox({
    checked,
    indeterminate,
    disabled,

    onChange,

    className,
    ...props
}) {
    const inputElement = React.createRef();

    useEffect(() => {
        inputElement.current.blur();
    }, []);

    const classNames = classnames('mdc-checkbox', {
        'mdc-checkbox--checked': checked,
        'mdc-checkbox--indeterminate': indeterminate,
        'mdc-checkbox--disabled': disabled
    }, className);

    const handleChange = event => onChange(!checked, inputElement.current, event);

    return (
        <div className={classNames}>
            <input
                ref={inputElement}
                type="checkbox"
                className="mdc-checkbox__native-control"
                checked={checked}
                disabled={disabled}
                onChange={handleChange}
                {...props}
            />

            <div className="mdc-checkbox__background">
                <svg className="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                    <path className="mdc-checkbox__checkmark-path" fill="none" stroke="white" d="M1.73,12.91 8.1,19.28 22.79,4.59" />
                </svg>

                <div className="mdc-checkbox__mixedmark" />
            </div>
        </div>
    );
}