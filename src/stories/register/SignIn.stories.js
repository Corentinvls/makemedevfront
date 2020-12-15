import React from 'react';
import SignIn from './SignIn';

export default {
    title: 'Example/SignIn',
    component: SignIn,
    argTypes: {},
};

const Template = (args) => <SignIn {...args} />;

export const Sign = Template.bind({});
Sign.args = {open: true};
