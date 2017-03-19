import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {inject, bindable, noView} from 'aurelia-framework';
import { BknDatagrid, IBknDatagridConfig } from './components/BknDatagrid';

@noView()
@inject(Element)
export class BknDatagridCustomElement {
    @bindable data: any[];
    @bindable config: IBknDatagridConfig[];

    private element: Element;
    
    constructor(element: Element) {
        this.element = element;
    }
    
    render() {
        ReactDOM.render(
            <BknDatagrid 
                data={this.data} 
                config={this.config}
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
}
