import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import NotchedOutline from '../NotchedOutline';
import LineRipple from '../LineRipple';
import FloatingLabel from '../FloatingLabel';
import { Menu, MenuItem } from '../Menu';
import MenuSurface from '../MenuSurface';
import HelperText from './HelperText';

import './index.scss';

SelectOption.displayName = 'MDCSelectOption';

export function SelectOption(props) {
    return <MenuItem {...props} />;
}

export class Select extends React.Component {
    static displayName = 'MDCSelect';

    static propTypes = {
        value: PropTypes.string.isRequired,
        outlined: PropTypes.bool,
        disabled: PropTypes.bool,
        helperTextProps: PropTypes.object,
        onChange: PropTypes.func
    };

    static defaultProps = {
        value: '',
        outlined: false,
        disabled: false,
        helperTextProps: {},
        onChange: Function.prototype
    };

    state = {
        focused: false,
        touched: false
    };

    options = this.getOptions();

    get valid() {
        if (!this.props.required) return true;

        return this.props.value !== '' ? true : false;
    }

    get notchedOutlineWidth() {
        if (!this.floatingLabel) return;

        const width = this.floatingLabel.width;
        const labelScale = 0.75;

        return width * labelScale;
    }

    getOptions() {
        const children = React.Children.toArray(this.props.children);

        return new Map(children.map(child => [child.props.value, child.props.text || child.props.children]));
    }

    componentDidUpdate(prevProps) {
        if (React.Children.count(this.props.children) !== React.Children.count(prevProps.children)) {
            this.options = this.getOptions();
        }
    }

    setFloatingLabelRef = component => {
        this.floatingLabel = component;

        this.forceUpdate();
    };

    handleMenuClose = () => this.setState({ focused: false });

    handleSelectClick = event => {
        const targetClientRect = event.target.getBoundingClientRect();
        const coords = { x: event.clientX, y: event.clientY };
        
        this.lineRippleTransformOrigin = coords.x - targetClientRect.left;

        this.setState({ focused: true });
    };

    handleOptionClick = (value, event) => {
        event.stopPropagation();

        this.props.onChange(value, this.inputElement);

        this.setState({ focused: false, touched: true });
    };

    render() {
        const {
            value,
            outlined,
            required,
            disabled,
            label,
            leadingIcon,
            helperText,
            helperTextProps,
            
            className,
            children,
            ...props
        } = this.props;

        const { focused, touched } = this.state;
        
        const classNames = classnames('mdc-select', {
            'mdc-select--outlined': outlined,
            'mdc-select--required': required,
            'mdc-select--disabled': disabled,
            'mdc-select--focused': focused,
            'mdc-select--invalid': !this.valid && touched,
            'mdc-select--with-leading-icon': leadingIcon
        }, className);

        const selectedText = this.options.get(value);
        const focusedOrHasValue = focused || value ? true : false;
        
        return (
            <React.Fragment>
                <div
                    className={classNames}
                    ref={element => this.rootElement = element}
                    onClick={this.handleSelectClick}
                >
                    <input
                        type="hidden"
                        ref={element => this.inputElement = element}
                        value={value}
                        required={required}
                        disabled={disabled}
                        {...props}
                    />

                    {leadingIcon && React.cloneElement(leadingIcon, {
                        className: 'mdc-select__icon',
                        tabIndex: '0',
                        role: 'button'
                    })}
        
                    <i className="mdc-select__dropdown-icon" />

                    <div className="mdc-select__selected-text">{selectedText}</div>

                    {outlined && label &&
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

                    <MenuSurface
                        open={focused}
                        anchor={this.rootElement}
                        onClose={this.handleMenuClose}
                    >
                        <Menu className="mdc-select__menu">
                            {React.Children.map(children, (option, index) =>
                                React.cloneElement(option, {
                                    value: undefined,
                                    selected: option.props.value === value,
                                    onClick: option.props.disabled ? undefined : event => this.handleOptionClick(option.props.value, event)
                                })
                            )}
                        </Menu>
                    </MenuSurface>

                    {!outlined && label &&
                        <FloatingLabel float={focusedOrHasValue}>
                            {label}
                        </FloatingLabel>
                    }

                    {!outlined &&
                        <LineRipple
                            active={focused}
                            center={this.lineRippleTransformOrigin}
                        />
                    }
                </div>

                {helperText &&
                    <HelperText {...helperTextProps}>{helperText}</HelperText>
                }
            </React.Fragment>
        );
    }
}