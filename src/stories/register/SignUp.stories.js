import React from 'react';
import SignUp from './SignUp';

export default {
    title: 'Example/SignUp',
    component: SignUp,
    argTypes: {},
};

const Template = (args) => <SignUp {...args} />;

export const Sign = Template.bind({});
Sign.args = {open: true};
