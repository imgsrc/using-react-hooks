import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

export default class Switch extends React.Component {
    static displayName = 'MDCSwitch';

    static propTypes = {
        checked: PropTypes.bool.isRequired,
        disabled: PropTypes.bool,
        onChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        checked: false,
        disabled: false,
        onChange: Function.prototype
    };

    handleChange = event => this.props.onChange(!this.props.checked, this.inputElement, event);

    render() {
        const { checked, disabled, onChange, className, ...props } = this.props;

        const classNames = classnames('mdc-switch', {
            'mdc-switch--checked': checked,
            'mdc-switch--disabled': disabled
        }, className);

        return (
            <div className={classNames}>
                <div className="mdc-switch__track" />

                <div className="mdc-switch__thumb-underlay">
                    <div className="mdc-switch__thumb">
                        <input
                            ref={element => this.inputElement = element}
                            className="mdc-switch__native-control"
                            type="checkbox"
                            role="switch"
                            checked={checked}
                            disabled={disabled}
                            onChange={this.handleChange}
                            {...props}
                        />
                    </div>
                </div>
            </div>
        );
    }
}