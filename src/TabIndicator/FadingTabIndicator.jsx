import React from 'react';
import classnames from 'classnames';

import TabIndicatorContent from './TabIndicatorContent';

export default class FadingTabIndicator extends React.Component {
    static displayName = 'MDCFadingTabIndicator';

    state = {
        isFadingActivating: false,
        isFadingDeactivating: false
    };

    computeContentClientRect() {
        return this.content && this.content.getBoundingClientRect();
    }

    componentDidUpdate(prevProps) {
        if (this.props.active === true && prevProps.active === false) {
            this.setState({
                isFadingActivating: true
            });
        } else if (this.props.active === false && prevProps.active === true) {
            this.setState({
                isFadingDeactivating: true
            });
        }
    }

    handleTransitionEnd = () => this.setState({
        isFadingActivating: false,
        isFadingDeactivating: false
    });

    render() {
        const { isFadingActivating, isFadingDeactivating } = this.state;
        
        const classNames = classnames('mdc-tab-indicator--fade', {
            'mdc-tab-indicator--fading-activate': isFadingActivating,
            'mdc-tab-indicator--fading-deactivate': isFadingDeactivating
        });

        return (
            <span
                ref={element => this.root = element}
                className={classNames}
            >
                <TabIndicatorContent
                    ref={component => this.content = component}
                    {...props} 
                />
            </span>
        );
    }
}