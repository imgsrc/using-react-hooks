import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import TopAppBarRow from './TopAppBarRow';
import TopAppBarSection from './TopAppBarSection';

export default class TopAppBar extends React.Component {
    static displayName = 'MDCTopAppBar';

    static propTypes = {
        fixed: PropTypes.bool,
        sticky: PropTypes.bool,
        dense: PropTypes.bool,
        prominent: PropTypes.bool,
        short: PropTypes.bool,
        collapsed: PropTypes.bool,
        fixedAdjustSibling: PropTypes.bool
    };

    static defaultProps = {
        fixed: false,
        sticky: false,
        dense: false,
        prominent: false,
        short: false,
        collapsed: false,
        fixedAdjustSibling: false,

        element: 'header'
    };

    state = {
        hidden: undefined,
        scrolled: false
    };

    rootElement = React.createRef();

    lastScrollPosition = this.viewportScrollY;

    get viewportScrollY() {
        return window.pageYOffset;
    }

    get height() {
        return this.root.current ? this.root.current.clientHeight : 0;
    }

    setScrolled() {
        const currentScroll = this.viewportScrollY;

        if (currentScroll <= 0) {
            if (this.state.scrolled) {
                this.setState({ scrolled: false });
            }
        } else {
            if (!this.state.scrolled) {
                this.setState({ scrolled: true });
            }
        }
    }

    componentDidMount() {
        if (this.props.fixed) {
            window.addEventListener('scroll', this.handleFixedScroll);
            this.setScrolled();
        } else if (this.props.sticky) {
            window.addEventListener('scroll', this.handleScroll);
        }

        if (this.props.fixedAdjustSibling) {
            this.rootElement.current.nextSibling.classList.add('mdc-top-app-bar--fixed-adjust');
        }
        
    }

    componentWillUnmount() {
        if (this.props.fixed) {
            window.removeEventListener('scroll', this.handleFixedScroll);
        } else if (this.props.sticky) {
            window.removeEventListener('scroll', this.handleScroll);
        }

        if (this.props.fixedAdjustSibling) {
            this.rootElement.current.nextSibling.classList.remove('mdc-top-app-bar--fixed-adjust');
        }
    }

    handleScroll = event => {
        const currentScrollPosition = Math.max(this.viewportScrollY, 0);
        const diff = currentScrollPosition - this.lastScrollPosition;

        this.lastScrollPosition = currentScrollPosition;
        
        if (diff > 0) {
            this.setState({ hidden: true });
        } else if (diff < 0) {
            this.setState({ hidden: false });
        }
    };

    handleFixedScroll = event => this.setScrolled();

    handleResize = event => {};

    render() {
        const {
            title,
            navigationIcon,
            actionItems,
            fixed,
            sticky,
            dense,
            prominent,
            short,
            collapsed,
            fixedAdjustSibling,

            element,
            component: Element = element,
            className,
            children,
            ...props
        } = this.props;

        const { scrolled, hidden } = this.state;
        
        const classNames = classnames('mdc-top-app-bar', {
            'mdc-top-app-bar--fixed': fixed,
            'mdc-top-app-bar--sticky': sticky,
            'mdc-top-app-bar--dense': dense,
            'mdc-top-app-bar--prominent': prominent,
            'mdc-top-app-bar--short': short,
            'mdc-top-app-bar--short-collapsed': short && collapsed,
            'mdc-top-app-bar--fixed-scrolled': fixed && scrolled,
            'mdc-top-app-bar--hidden': hidden === true,
            'mdc-top-app-bar--shown': hidden === false
        }, className);

        return (
            <Element
                className={classNames}
                ref={this.rootElement}
                {...props}
            >
                <TopAppBarRow>
                    {(navigationIcon || title || actionItems) &&
                        <TopAppBarSection alignStart>
                            {navigationIcon &&
                                React.cloneElement(navigationIcon, { className: 'mdc-top-app-bar__navigation-icon' })
                            }

                            {title && (React.isValidElement(title) ?
                                React.cloneElement(title, { className: 'mdc-top-app-bar__title' })
                                :
                                <span className="mdc-top-app-bar__title">{title}</span>
                            )}
                        </TopAppBarSection>
                    }

                    {children &&
                        <TopAppBarSection>
                            {children}
                        </TopAppBarSection>
                    }

                    {(actionItems && actionItems.length > 0) &&
                        <TopAppBarSection alignEnd>
                            {actionItems.map((item, key) =>
                                React.cloneElement(item, { key, className: 'mdc-top-app-bar__action-item' })
                            )}
                        </TopAppBarSection>
                    }
                </TopAppBarRow>
            </Element>
        );
    }
}