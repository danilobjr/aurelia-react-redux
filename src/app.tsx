import * as React from 'react'
import { IDatagridHeader, IDatagridSorting } from './datagrid/components/Datagrid'
import { SortDirection } from './datagrid/SortDirection'
import { store } from './store'

export interface IPerson {
    id: number;
    name: string;
    email: string | JSX.Element;
}

export class App {
    private store: any = store;

    constructor(
        public people: IPerson[],
        public gridHeaders: IDatagridHeader[],
        public gridSorting: IDatagridSorting
    ) {
        const peopleFakeDataFromServer = [
            { id: 1, name: 'Danilo', email: 'danilo@beakyn.com' },
            { id: 2, name: 'Abraao', email: 'abraao@beakyn.com' },
            { id: 3, name: 'Ricardo', email: 'ricardo@beakyn.com' },
            { id: 4, name: 'Juan', email: 'juan@beakyn.com' }
        ];

        this.people = peopleFakeDataFromServer.map(p => ({
            id: p.id,
            name: p.name,
            email: <a href={`mailto:${p.email}`}>{p.email}</a> 
        }));

        this.gridHeaders = [
            { 
                key: 'name',
                render: 'Name'
            },
            { 
                key: 'email',
                render: <strong style={{ color: 'red', textTransform: 'uppercase' }}>Name</strong>
            }
        ];

        this.gridSorting = {
            columnKey: 'name',
            direction: SortDirection.Asc
        };

        const state = this.store.getState();
        console.log(state.datagrid);
        this.store.subscribe(this.update.bind(this));
    }

    update() {
        const state = this.store.getState();
        console.log(state.datagrid);
    }
}
