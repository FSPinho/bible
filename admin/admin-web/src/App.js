import * as React from "react";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import renderHTML from 'react-render-html';

import 'react-mde/lib/styles/css/react-mde-all.css';
import 'draft-js/dist/Draft.css'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "**Hello world!!!**"
        };
        this.converter = new Showdown.Converter({
            tables: true,
            simplifiedAutoLink: true,
            strikethrough: true,
            tasklists: true
        });
    }

    handleValueChange = (value: string) => {
        this.setState({value});
    };

    render() {
        return (
            <div style={styles.page}>
                <div style={styles.box}>
                    <ReactMde
                        style={styles.flex}
                        onChange={this.handleValueChange}
                        value={this.state.value}
                        minEditorHeight={480}
                        generateMarkdownPreview={markdown =>
                            Promise.resolve(this.converter.makeHtml(markdown))
                        }
                    />
                    <div style={{...styles.flex, ...styles.box}}>
                        {renderHTML(this.converter.makeHtml(this.state.value))}
                    </div>
                </div>
                <textarea value={this.state.value.replace(/\n/g, '\\n')} rows={10}/>
            </div>
        );
    }
}

const styles = {
    page: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: '#EFEFEF',
    },
    box: {
        display: 'flex',
        flexDirection: 'row',
        padding: 16
    },
    flex: {
        flex: 1
    }
}