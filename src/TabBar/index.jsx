import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TabScroller from '../TabScroller';

import './index.scss';

export default class TabBar extends React.Component {
    static displayName = 'MDCTabBar';

    static propTypes = {
        stacked: PropTypes.bool,
        minWidth: PropTypes.bool,
        fade: PropTypes.bool,
        underline: PropTypes.bool,
        onChange: PropTypes.func
    };

    static defaultProps = {
        stacked: false,
        minWidth: false,
        fade: false,
        underline: true,
        onChange: Function.prototype
    };

    tabs = new Map();

    get activeTab() {
        return this.tabs.get(this.props.value);
    }

    handleTabActivate = value => {
        this.previousIndicatorClientRect = this.activeTab.indicator.clientRect;
        this.props.onChange(value);
    };

    render() {
        const {
            value,
            stacked,
            minWidth,
            fade,
            underline,
            align,
            onChange,

            element = 'nav',
            component: Element = element,
            className,
            children,
            ...props
        } = this.props;
        
        const classNames = classnames('mdc-tab-bar', className);

        return (
            <Element
                ref={element => this.root = element}
                className={classNames}
                role="tablist"
                {...props}
            >
                <TabScroller align={align}>
                    {React.Children.map(children, (tab, index) => 
                        tab && React.cloneElement(tab, {
                            ref: component => this.tabs.set((tab.props.value || index), component),
                            value: tab.props.value || index,
                            active: (tab.props.value || index) === value,
                            stacked: tab.props.stacked || stacked,
                            minWidth: tab.props.minWidth || minWidth,
                            fade,
                            underline,
                            previousIndicatorClientRect: this.previousIndicatorClientRect,
                            onActivate: this.handleTabActivate
                        })
                    )}
                </TabScroller>
            </Element>
        );
    }
}