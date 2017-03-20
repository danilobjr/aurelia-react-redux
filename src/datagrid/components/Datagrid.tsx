import * as React from 'react';
import { SortDirection } from './../SortDirection'

interface IDatagridHeader {
    key: string; 
    name: string;
}

interface IDatagridSorting {
    columnKey: string; 
    direction: SortDirection;
}

interface IProps {
    data: any[];
    headers: IDatagridHeader[];
    sorting: IDatagridSorting;
    onSort: (column: string) => void;
}

class Datagrid extends React.Component<IProps, any> {
    private dataPropertiesForRenderTableCells: string[];

    constructor(props: IProps) {
        super(props);

        this.dataPropertiesForRenderTableCells = this.props.headers.map(c => c.key);
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
        const { headers, onSort } = this.props;

        return headers.map((c, index) => 
            <th key={index} onClick={() => onSort(c.key)}>{c.name}</th>
        );
    }

    renderBody() {
        const { headers, data }: IProps = this.props;

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
    Datagrid,
    IDatagridHeader,
    IDatagridSorting
}
