import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store } from 'redux'
import { inject, bindable, noView } from 'aurelia-framework';
import { Datagrid, IDatagridHeader, IDatagridSorting } from './components/Datagrid';
import { sortByColumnName } from './actions';
import { store, IState } from './../store'
import { IPerson } from './../app'

@noView()
@inject(Element)
export class DatagridCustomElement {
    @bindable data: any[];
    @bindable headers: IDatagridHeader[];
    @bindable sorting: IDatagridSorting;

    private store: any = store;

    constructor(
        private element: Element,
    ) {
        this.element = element;

        const state = this.store.getState() as IState;

        this.sorting = this.sorting || {
            columnKey: state.datagrid.sortColumnKey,
            direction: state.datagrid.sortDirection
        };
    }
    
    render() {
        ReactDOM.render(
            <Datagrid
                data={this.data} 
                headers={this.headers}
                sorting={this.sorting}
                onSort={this.sort}
            />,
            this.element
        );
    }
    
    bind() {
        this.render();
    }
    
    /**
     * Data Changed
     * 
     * An automatic callback function when our "data"
     * bindable value changes. We need to rebind the React
     * element to get the new data from the ViewModel.
     * 
     * @param {any} newVal The updated data
     * @returns {void}
     * 
     */
    dataChanged(newVal) {
        this.bind();
    }

    sort = (column: string) => {
        this.store.dispatch(sortByColumnName(column));
    }
}
