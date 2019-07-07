import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import NotchedOutline from '../NotchedOutline';
import LineRipple from '../LineRipple';
import FloatingLabel from '../FloatingLabel';
import HelperText from './HelperText';

import './index.scss';

export default class TextField extends React.Component {
    static displayName = 'MDCTextField';

    static propTypes = {
        type: PropTypes.string,
        value: PropTypes.any,
        outline: PropTypes.bool,
        fullwidth: PropTypes.bool,
        textarea: PropTypes.bool,
        dense: PropTypes.bool,
        disabled: PropTypes.bool,
        validationMessage: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    };

    static defaultProps = {
        type: 'text',
        value: '',
        outlined: false,
        fullwidth: false,
        textarea: false,
        dense: false,
        disabled: false,
        validationMessage: false,

        onChange: Function.prototype
    };

    state = {
        touched: false,
        focused: false
    };

    get valid() {
        return this.inputElement ? this.inputElement.validity.valid : true;
    }

    get value() {
        return this.inputElement ? this.inputElement.value : undefined;
    }

    get validationMessage() {
        if (typeof this.props.validationMessage === 'string') {
            return this.props.validationMessage;
        } else if (this.props.validationMessage === true) {
            return this.inputElement ? this.inputElement.validationMessage : undefined;
        }
    }

    get notchedOutlineWidth() {
        if (!this.floatingLabel) return;

        const width = this.floatingLabel.width;
        const labelScale = this.props.dense ? 1 : 0.75;

        return width * labelScale;
    }

    setFloatingLabelRef = component => {
        this.floatingLabel = component;
        
        this.forceUpdate();
    };

    handleRootInteraction = event => {
        this.inputElement.focus();

        this.setState({ focused: true, touched: true });
    };

    handleInputInteraction = event => {
        const targetClientRect = event.target.getBoundingClientRect();
        const coords = { x: event.clientX, y: event.clientY };
        
        this.lineRippleTransformOrigin = coords.x - targetClientRect.left;
    };

    handleInputFocus = event => this.setState({ focused: true, touched: true });

    handleInputBlur = event => {
        this.lineRippleTransformOrigin = undefined;

        this.setState({ focused: false });
    };

    handleInputChange = event => this.props.onChange(this.value, this.inputElement, event);

    render() {
        const {
            value,
            fullwidth,
            outlined,
            dense,
            disabled,
            textarea,
            label,
            leadingIcon,
            trailingIcon,
            helperText,
            validationMessage,

            className,
            onChange,
            ...props
        } = this.props;

        const { focused, touched } = this.state;

        const Input = textarea ? 'textarea' : 'input';

        const classNames = classnames('mdc-text-field', {
            'mdc-text-field--outlined': outlined && !fullwidth,
            'mdc-text-field--fullwidth': fullwidth,
            'mdc-text-field--textarea': textarea,
            'mdc-text-field--dense': dense,
            'mdc-text-field--disabled': disabled,
            'mdc-text-field--focused': focused,
            'mdc-text-field--invalid': !this.valid && touched,
            'mdc-text-field--with-leading-icon': leadingIcon,
            'mdc-text-field--with-trailing-icon': trailingIcon,
        }, 'mdc-text-field--upgraded', className);

        const focusedOrHasValue = focused || value ? true : false;
        
        return (
            <React.Fragment>
                <div className={classNames}>
                    {leadingIcon && React.cloneElement(leadingIcon, {
                        className: 'mdc-text-field__icon',
                        tabIndex: '0',
                        role: 'button'
                    })}

                    <Input
                        className="mdc-text-field__input"
                        ref={element => this.inputElement = element}
                        value={value}
                        placeholder={fullwidth ? label : undefined}
                        disabled={disabled}
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                        onBlur={this.handleInputBlur}
                        onMouseDown={this.handleInputInteraction}
                        onTouchStart={this.handleInputInteraction}
                        {...props}
                    />

                    {(textarea || outlined) &&
                        <NotchedOutline
                            notched={focusedOrHasValue}
                            width={this.notchedOutlineWidth}
                        >
                            <FloatingLabel
                                ref={this.setFloatingLabelRef}
                                float={focusedOrHasValue}
                            >
                                {label}
                            </FloatingLabel>
                        </NotchedOutline>
                    }

                    {(!textarea && !outlined && label && !fullwidth) &&
                        <FloatingLabel
                            float={focusedOrHasValue}
                        >
                            {label}
                        </FloatingLabel>
                    }

                    {trailingIcon && React.cloneElement(trailingIcon, {
                        className: 'mdc-text-field__icon',
                        tabIndex: '0',
                        role: 'button'
                    })}

                    {(!fullwidth && !textarea && !outlined) &&
                        <LineRipple
                            active={focused}
                            center={this.lineRippleTransformOrigin}
                        />
                    }
                </div>

                {(validationMessage && !this.valid) &&
                    <HelperText validation>{this.validationMessage}</HelperText>
                }

                {helperText &&
                    <HelperText persistent>{helperText}</HelperText>
                }
            </React.Fragment>
        );
    }
}