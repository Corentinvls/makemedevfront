import React from 'react';
import Navbar from './Navbar';

export default {
    title: 'Example/Navbar',
    component: Navbar,
    argTypes: {},
};

const Template = () => <Navbar />;

export const NoLog = Template.bind({});
NoLog.args = {};
