interface IPerson {
    id: number;
    name: string;
}

export class App {
    constructor(private people: IPerson[]) {
        this.people = [
            { id: 1, name: 'Danilo' },
            { id: 2, name: 'Abraao' },
            { id: 3, name: 'Ricardo' },
            { id: 4, name: 'Juan' }
        ];
    }
}
