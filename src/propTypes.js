import PropTypes from 'prop-types';

const commonPropTypes = {
    element: PropTypes.string,
    component: PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.func]),
    className: PropTypes.string,
    children: PropTypes.node
};

export default commonPropTypes;