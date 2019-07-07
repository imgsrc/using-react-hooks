import React from 'react';
import classnames from 'classnames';

import './index.scss';

export default class TabScroller extends React.Component {
    static displayName = 'MDCTabScroller';

    static horizontalScrollbarHeight;

    static computeHorizontalScrollbarHeight(shouldCacheResult = true) {
        if (shouldCacheResult && typeof TabScroller.horizontalScrollbarHeight !== 'undefined') {
            return TabScroller.horizontalScrollbarHeight;
        }

        const el = document.createElement('div');
        
        el.classList.add('mdc-tab-scroller__test');
        document.body.appendChild(el);

        const horizontalScrollbarHeight = el.offsetHeight - el.clientHeight;
        document.body.removeChild(el);

        if (shouldCacheResult) {
            TabScroller.horizontalScrollbarHeight = horizontalScrollbarHeight;
        }

        return horizontalScrollbarHeight;
    }

    state = {
        isAnimating: false
    };

    componentDidMount() {
        const horizontalScrollbarHeight = TabScroller.computeHorizontalScrollbarHeight();

        this.area.style.setProperty('margin-bottom', -horizontalScrollbarHeight + 'px');
        this.area.classList.add('mdc-tab-scroller__scroll-area--scroll');
    }

    handleInteraction = () => { };

    handleTransitionEnd = () => {
        if (this.state.isAnimating) {
            this.setState({ isAnimating: false });
        }
    };

    render() {
        const { align, children } = this.props;
        const { isAnimating } = this.state;
        const classNames = classnames('mdc-tab-scroller', {
            [`mdc-tab-scroller--align-${align}`]: align,
            'mdc-tab-scroller--animating': isAnimating
        });

        return (
            <div
                ref={element => this.root = element}
                className={classNames}
            >
                <div
                    ref={element => this.area = element}
                    className="mdc-tab-scroller__scroll-area"
                    onWheel={this.handleInteraction}
                    onTouchStart={this.handleInteraction}
                    onPointerDown={this.handleInteraction}
                    onMouseDown={this.handleInteraction}
                    onKeyDown={this.handleInteraction}>
                    <div
                        ref={element => this.content = element}
                        className="mdc-tab-scroller__scroll-content"
                        onTransitionEnd={this.handleTransitionEnd}
                    >
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}