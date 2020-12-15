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

export default function CustomDraft(props) {
     const [selectedTab, setSelectedTab] = React.useState("write");
const tools=props.isCode?[["header","bold","italic","strikethrough"], ["code","link","quote"] ,["unordered-list","ordered-list","checked-list"]]:[["header","bold","italic","strikethrough"], ["link","quote"] ,["unordered-list","ordered-list","checked-list"]]
    return (
            <ReactMde
                value={props.value}
                onChange={props.onChange}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                toolbarCommands={tools}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                childProps={{
                    writeButton: {
                        tabIndex: -1
                    }
                }}

            />

    );}