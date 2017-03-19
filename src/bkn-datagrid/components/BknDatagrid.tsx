import * as React from 'react';

interface IBknDatagridConfig {
    key: string;
    name: string;
}

interface IProps {
    data: any[];
    config: IBknDatagridConfig[];
}

class BknDatagrid extends React.Component<IProps, any> {
    private dataPropertiesForRenderTableCells: string[];

    constructor(props: IProps) {
        super(props);

        this.dataPropertiesForRenderTableCells = this.props.config.map(c => c.key);
    }

    static defaultProperties: Partial<IProps> = {
        data: []
    }
    
    render() {
        if (!this.props.data.length) {
            return null;
        }
        
        return (
            <div>
                <table>
                    <thead>{this.renderHeaders()}</thead>
                    <tbody>{this.renderBody()}</tbody>
                </table>
            </div>
        );
    }

    renderHeaders() {
        return this.props.config.map((c, index) => 
            <th key={index}>{c.name}</th>
        );
    }

    renderBody() {
        const { config, data }: IProps = this.props;

        return data.map((d, index) => 
            <tr key={index}>
                {this.renderCells(d)}
            </tr>
        );
    }

    renderCells(data) {
        return this.dataPropertiesForRenderTableCells.map((property, index) => 
            <td key={index}>{data[property]}</td>
        );
    }
}

export {
    BknDatagrid,
    IBknDatagridConfig
}
