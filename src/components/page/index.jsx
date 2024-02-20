import React from 'react'
import PropTypes from 'prop-types';
import { Layout } from 'antd';

const { Content } = Layout;
function Page({ children, ...props }) {
    return (
        <Content style={{ padding: '0 48px' }} {...props}>
            {children}
        </Content>
    )
}

Page.propTypes = {
    children: PropTypes.any
};

export default Page
