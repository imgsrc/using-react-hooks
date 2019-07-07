import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { FadingTabIndicator, SlidingTabIndicator } from '../TabIndicator';

import './index.scss';

export default class Tab extends React.Component {
    static displayName = 'MDCTab';

    static propTypes = {
        active: PropTypes.bool,
        stacked: PropTypes.bool,
        minWidth: PropTypes.bool,
        fade: PropTypes.bool,
        underline: PropTypes.bool,
        onActivate: PropTypes.func
    };

    static defaultProps = {
        active: false,
        stacked: false,
        minWidth: false,
        fade: false,
        underline: true,
        onActivate: Function.prototype,

        element: 'button'
    };

    state = {
        isTransitioning: false,
        isTransitionActivating: false,
        isTransitionDeactivating: false
    };

    get isActive() {
        return this.props.active;
    }

    componentDidUpdate(prevProps) {
        if (this.props.active === true && prevProps.active === false) {
            this.setState({
                isTransitioning: true,
                isTransitionActivating: true,
                isTransitionDeactivating: false
            });
        } else if (this.props.active === false && prevProps.active === true) {
            this.setState({
                isTransitioning: true,
                isTransitionActivating: false,
                isTransitionDeactivating: true
            });
        }
    }

    handleClick = event => {
        this.props.onActivate(this.props.value);
    };

    handleTransitionEnd = event => {
        if (this.state.isTransitioning) {
            this.setState({
                isTransitioning: false,
                isTransitionActivating: false,
                isTransitionDeactivating: false
            });
        }
    };

    render() {
        const {
            value,
            icon,
            label,
            active,
            stacked,
            minWidth,
            fade,
            underline,
            previousIndicatorClientRect,
            onActivate,

            element,
            component: Element = element,
            className,
            children = label,
            ...props
        } = this.props;
        const { isTransitioning, isTransitionActivating, isTransitionDeactivating } = this.state;
        
        const Indicator = fade ? FadingTabIndicator : SlidingTabIndicator;
        const classNames = classnames('mdc-tab', {
            'mdc-tab--active': active,
            'mdc-tab--stacked': stacked,
            'mdc-tab--min-width': minWidth,
            'mdc-tab--animating-activate': isTransitioning && isTransitionActivating,
            'mdc-tab--animating-deactivate': isTransitioning && isTransitionDeactivating,
        }, className);

        return (
            <Element
                className={classNames}
                ref={element => this.root = element}
                role='tab'
                aria-selected={active ? 'true' : 'false'}
                tabIndex={active ? '0' : '-1'}
                onClick={this.handleClick}
                onTransitionEnd={this.handleTransitionEnd}
                {...props}
            >
                <div className="mdc-tab__content">
                    {icon && React.cloneElement(icon, { className: 'mdc-tab__icon' })}
                    {children && <span className="mdc-tab__text-label">{children}</span>}
                </div>

                <Indicator
                    ref={component => this.indicator = component}
                    active={active}
                    underline={underline}
                    previousIndicatorClientRect={active ? previousIndicatorClientRect : undefined}
                />

                <span className="mdc-tab__ripple" />
            </Element>
        );
    }
}