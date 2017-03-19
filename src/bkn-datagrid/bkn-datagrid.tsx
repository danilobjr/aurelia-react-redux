import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux'
import {inject, bindable, noView} from 'aurelia-framework';
import { BknDatagrid, IBknDatagridHeader, IBknDatagridSorting } from './components/BknDatagrid';
import { sortByColumnName } from './components/actions';
import { bknDatagridSortingReducer } from './components/reducers';

@noView()
@inject(Element)
export class BknDatagridCustomElement {
    @bindable data: any[];
    @bindable headers: IBknDatagridHeader[];
    @bindable sorting: IBknDatagridSorting;

    private element: Element;
    private store = createStore(bknDatagridSortingReducer);
    
    constructor(element: Element) {
        this.element = element;

        const state = this.store.getState();

        this.sorting = this.sorting || {
            column: state.bknDatagridSortColumnName,
            asc: state.bknDatagridSortAscending
        };

        this.store.subscribe(this.update.bind(this))
    }
    
    render() {
        ReactDOM.render(
            <BknDatagrid 
                data={this.data} 
                headers={this.headers}
                sorting={this.sorting}
                onSort={(column) => this.sort(column)}
            />,
            this.element
        );
    }

    update() {
        const state = this.store.getState();
        this.sorting.column = state.bknDatagridSortColumnName;
        this.sorting.asc = state.bknDatagridSortAscending;
        console.log(this.sorting);
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

    sort(column: string) {
        this.store.dispatch(sortByColumnName(column));
    }
}
