import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

const DOWN_EVENTS = ['mousedown', 'touchstart'];
const UP_EVENTS = ['mouseup', 'touchend'];

const MOVE_EVENT_MAP = {
    mousedown: 'mousemove',
    touchstart: 'touchmove',
};

const KEY_IDS = {
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_UP: 'ArrowUp',
    END: 'End',
    HOME: 'Home',
    PAGE_DOWN: 'PageDown',
    PAGE_UP: 'PageUp',
};

export default class MDCSlider extends React.Component {
    static displayName = 'MDCSlider';

    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        min: PropTypes.number,
        max: PropTypes.number,
        step: PropTypes.number,
        discrete: PropTypes.bool,
        disabled: PropTypes.bool,
        onChange: PropTypes.func
    };

    static defaultProps = {
        value: 0,
        min: 0,
        max: 100,
        step: 0,
        onChange: Function.prototype
    };

    state = {
        active: false,
        focused: false
    };

    get clientRect() {
        return this.rootElement ? this.rootElement.getBoundingClientRect() : ({ top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 });
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    getKeyId(event) {
        if (event.key === KEY_IDS.ARROW_LEFT || event.keyCode === 37) {
            return KEY_IDS.ARROW_LEFT;
        }
        if (event.key === KEY_IDS.ARROW_RIGHT || event.keyCode === 39) {
            return KEY_IDS.ARROW_RIGHT;
        }
        if (event.key === KEY_IDS.ARROW_UP || event.keyCode === 38) {
            return KEY_IDS.ARROW_UP;
        }
        if (event.key === KEY_IDS.ARROW_DOWN || event.keyCode === 40) {
            return KEY_IDS.ARROW_DOWN;
        }
        if (event.key === KEY_IDS.HOME || event.keyCode === 36) {
            return KEY_IDS.HOME;
        }
        if (event.key === KEY_IDS.END || event.keyCode === 35) {
            return KEY_IDS.END;
        }
        if (event.key === KEY_IDS.PAGE_UP || event.keyCode === 33) {
            return KEY_IDS.PAGE_UP;
        }
        if (event.key === KEY_IDS.PAGE_DOWN || event.keyCode === 34) {
            return KEY_IDS.PAGE_DOWN;
        }

        return '';
    }

    getValueForKeyId(keyId) {
        const { value, max, min, step } = this.props;
        const delta = step || (max - min) / 100;

        switch (keyId) {
            case KEY_IDS.ARROW_LEFT:
            case KEY_IDS.ARROW_DOWN:
                return value - delta;
            case KEY_IDS.ARROW_RIGHT:
            case KEY_IDS.ARROW_UP:
                return value + delta;
            case KEY_IDS.HOME:
                return min;
            case KEY_IDS.END:
                return max;
            default:
                return NaN;
        }
    }

    setValue(value) {
        if (value === this.props.value) return;

        const { min, max, step } = this.props;
        const valueSetToBoundary = value === min || value === max;

        if (step && !valueSetToBoundary) {
            value = Math.round(value / step) * step;
        }

        if (value < min) {
            value = min;
        } else if (value > max) {
            value = max;
        }

        this.props.onChange(value);
    }

    getPageX(event) {
        if (event.targetTouches && event.targetTouches.length > 0) {
            return event.targetTouches[0].pageX;
        }

        return event.pageX;
    }

    getValueFromEvent(event) {
        const pageX = this.getPageX(event)
        const { min, max } = this.props;
        const offsetX = pageX - this.clientRect.left;
        const pctComplete = offsetX / this.clientRect.width;

        // Fit the percentage complete between the range [min,max]
        // by remapping from [0, 1] to [min, min+(max-min)].
        return min + pctComplete * (max - min);
    }

    getThumbStyle(value, min, max) {
        const pctComplete = (value - min) / (max - min);
        const translateX = pctComplete * this.clientRect.width;

        return {
            transform: `translateX(${translateX}px) translateX(-50%)`
        };
    }

    getTrackStyle(value, min, max) {
        const scaleX = (value - min) / (max - min);

        return {
            transform: `scaleX(${scaleX})`
        };
    }

    handleResize = event => {
        this.forceUpdate();
    };

    handleUp = event => {
        this.setState({ active: false });
    };

    handleMove = event => {
        const value = this.getValueFromEvent(event);

        this.setValue(value);
    };

    handleDown = event => {
        if (this.props.disabled) return;

        const eventType = MOVE_EVENT_MAP[event.type];

        const handleUp = event => {
            this.handleUp();
            document.body.removeEventListener(eventType, this.handleMove);
            UP_EVENTS.forEach(eventName => document.body.removeEventListener(eventName, handleUp));
        };

        document.body.addEventListener(eventType, this.handleMove);
        UP_EVENTS.forEach(eventName => document.body.addEventListener(eventName, handleUp));

        this.handleMove(event);
    };

    handleRootInteraction = event => {
        this.handleDown(event);
    };

    handleThumbInteraction = event => {
        this.setState({ active: true });
        this.handleDown(event);
    };

    handleKeyDown = event => {
        event.preventDefault();

        const keyId = this.getKeyId(event);
        const value = this.getValueForKeyId(keyId);

        if (isNaN(value)) return;

        this.setValue(value);
        this.setState({ focused: true });
    };

    handleFocus = event => {
        if (this.state.active) return;

        this.setState({ focused: true });
    };

    handleBlur = event => {
        this.setState({ active: false, focused: false });
    };

    render() {
        const { value, min, max, step, discrete, displayMarkers, disabled, className } = this.props;
        const { active, focused } = this.state;

        const classNames = classnames('mdc-slider', {
            'mdc-slider--active': active,
            'mdc-slider--focus': focused,
            'mdc-slider--discrete': discrete,
            'mdc-slider--display-markers': displayMarkers,
            'mdc-slider--disabled': disabled
        }, className);

        const thumbStyle = this.getThumbStyle(value, min, max);
        const trackStyle = this.getTrackStyle(value, min, max);

        return (
            <div
                className={classNames}
                role="slider"
                tabIndex="0"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value}
                aria-disabled={disabled}
                ref={elemnet => this.rootElement = elemnet}
                onMouseDown={this.handleRootInteraction}
                onTouchStart={this.handleRootInteraction}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
            >
                <div className="mdc-slider__track-container">
                    <div className="mdc-slider__track" style={trackStyle} />
                </div>

                <div
                    className="mdc-slider__thumb-container"
                    style={thumbStyle}
                    onMouseDown={this.handleThumbInteraction}
                    onTouchStart={this.handleThumbInteraction}
                >
                    {discrete &&
                        <div className="mdc-slider__pin">
                            <span className="mdc-slider__pin-value-marker">{value}</span>
                        </div>
                    }
                    <svg className="mdc-slider__thumb" width="21" height="21">
                        <circle cx="10.5" cy="10.5" r="7.875" />
                    </svg>

                    <div className="mdc-slider__focus-ring" />
                </div>
            </div>
        );
    }
}