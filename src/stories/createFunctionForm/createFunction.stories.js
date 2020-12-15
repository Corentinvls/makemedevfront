import React from 'react';

import CreateFunction from "./CreateFunction";

export default {
    title: 'Example/CreateFunction',
    component: CreateFunction,
    argTypes: {},
};

const Template = (args) => <CreateFunction {...args}/>;

export const createFunction = Template.bind({});
createFunction.args = {
    tags: [
        "js ","php ","react"
    ], params : [{
        name: "Bob",
        type: "string",
        description: "zaeazeaea",
        defaultValue: "null"
    },{
        name: "Bob",
        type: "string",
        description: "zaeazeaea",
        defaultValue: "null"
    },{
        name: "Bob",
        type: "string",
        description: "zaeazeaea",
        defaultValue: "null"
    },{
        name: "Bob",
        type: "string",
        description: "Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.Praesent non nunc mollis, fermentum neque at, semper arcu.Nullam eget est sed sem iaculis gravida eget vitae justo",
        defaultValue: "null"
    }],returnvalue : [{
        name: "Bob",
        type: "string",
        description: "zaeazeaea",
        defaultValue: "null"
    }],post:[
        {
            "id": "",
            "description": "Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.Praesent non nunc mollis, fermentum neque at, semper arcu.Nullam eget est sed sem iaculis gravida eget vitae justo",
            "author": {
                "pseudo": "",
                "avatar": "",
                "creationDate": ""
            },
            "function": "Ma function",
            "like": 0,
            "dislike": 0,
            "commentary": [
                {
                    "pseudo": "",
                    "commentary": "",
                    "date": ""
                }
            ]
        }
    ],title:"TESTTT"

};
