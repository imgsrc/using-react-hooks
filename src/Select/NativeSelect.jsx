import React from 'react';
import classnames from 'classnames';

NativeSelect.displayName = 'MDCNativeSelect';

export default function NativeSelect({
    outlined = false,
    required = false,
    disabled = false
}) {
    const classNames = classnames('mdc-select', {
        'mdc-select--outlined': outlined,
        'mdc-select--required': required,
        'mdc-select--disabled': disabled,
        'mdc-select--focused': focused,
        'mdc-select--invalid': !this.valid && touched,
        'mdc-select--with-leading-icon': leadingIcon
    }, className);

    return (
        <div className={classNames}>
            <i className="mdc-select__dropdown-icon"></i>

            <select
                className="mdc-select__native-control"
                value={value}
                required={required}
                disabled={disabled}
            >
                {children}
            </select>
        </div>
    );
};