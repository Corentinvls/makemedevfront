import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";



const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
});

export default function CustomDraft() {
    const [value, setValue] = React.useState("**Hello world!!!**");
    const [selectedTab, setSelectedTab] = React.useState("write");

    return (
            <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                toolbarCommands={[["header","bold","italic","strikethrough"], ["code","link","quote"] ,["unordered-list","ordered-list","checked-list"]]}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                childProps={{
                    writeButton: {
                        tabIndex: -1
                    }
                }}

            />

    );
}
