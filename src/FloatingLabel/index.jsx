import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

export default class FloatingLabel extends React.Component {
    static displayName = 'MDCFloatingLabel';

    static propTypes = {
        float: PropTypes.bool
    };

    static defaultProps = {
        float: false
    };

    get width() {
        return this.rootElement ? this.rootElement.offsetWidth : 0;
    }

    render() {
        const { float, className, ...props } = this.props;
        
        const classNames =  classnames('mdc-floating-label', {
            'mdc-floating-label--float-above': float
        }, className);

        return (
            <label
                ref={element => this.rootElement = element}
                className={classNames}
                {...props}
            />
        );
    }
}