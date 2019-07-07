import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

export default class Radio extends React.Component {
    static displayName = 'MDCRadio';

    static propTypes = {
        checked: PropTypes.bool.isRequired,
        disabled: PropTypes.bool,
        onChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        checked: false,
        disabled: false,
        onChange: Function.prototype
    }

    componentDidUpdate() {
        this.inputElement.blur();
    }

    handleChange = event => this.props.onChange(this.props.value, this.inputElement, event);

    render() {
        const {
            checked,
            disabled,
            onChange,
            
            className,
            ...props
        } = this.props;
        
        const classNames = classnames('mdc-radio', {
            'mdc-radio--disabled': disabled
        }, className);

        return (
            <div className={classNames}>
                <input
                    className="mdc-radio__native-control"
                    ref={element => this.inputElement = element}
                    type="radio"
                    checked={checked}
                    disabled={disabled}
                    onChange={this.handleChange}
                    {...props}
                />

                <div className="mdc-radio__background">
                    <div className="mdc-radio__outer-circle" />
                    <div className="mdc-radio__inner-circle" />
                </div>
            </div>
        );
    }
}