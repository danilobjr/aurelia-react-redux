import { IDatagridHeader, IDatagridSorting } from './datagrid/components/Datagrid'
import { SortDirection } from './datagrid/SortDirection'
import { store } from './store'

export interface IPerson {
    id: number;
    name: string;
    email: string;
}

export class App {
    private store: any = store;

    constructor(
        public people: IPerson[],
        public gridHeaders: IDatagridHeader[],
        public gridSorting: IDatagridSorting
    ) {
        this.people = [
            { id: 1, name: 'Danilo', email: 'danilo@beakyn.com' },
            { id: 2, name: 'Abraao', email: 'abraao@beakyn.com' },
            { id: 3, name: 'Ricardo', email: 'ricardo@beakyn.com' },
            { id: 4, name: 'Juan', email: 'juan@beakyn.com' }
        ];

        this.gridHeaders = [
            { 
                key: 'name',
                name: 'Name'
            },
            { 
                key: 'email',
                name: 'Email'
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
