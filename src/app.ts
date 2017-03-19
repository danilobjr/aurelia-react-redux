import { IBknDatagridHeader, IBknDatagridSorting } from './bkn-datagrid/components/BknDatagrid'

export interface IPerson {
    id: number;
    name: string;
    email: string;
}

export class App {
    constructor(
        public people: IPerson[],
        public gridHeaders: IBknDatagridHeader[],
        public gridSorting: IBknDatagridSorting
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
            column: 'name',
            asc: true
        };
    }
}
