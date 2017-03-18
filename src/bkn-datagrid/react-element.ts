import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {customElement, inject, bindable, noView} from 'aurelia-framework';

import { MyReactElement } from './components/MyReactElement';

@noView()
@inject(Element)
@customElement('react-element')
export class ReactElement {
    // reactComponent = {};

    @bindable data: any[];

    private element: Element;
    
    constructor(element: Element) {
        this.element = element;
    }
    
    render() {
        // this.reactComponent = 
        ReactDOM.render(
            React.createElement(MyReactElement, { data: this.data }),
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
