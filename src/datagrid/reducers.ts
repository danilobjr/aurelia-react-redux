import { SORT, SortAction } from './actions'
import { SortDirection } from './SortDirection'

type DatagridAction = SortAction;

export interface IDatagridState {
    sortColumnKey: string;
    sortDirection: SortDirection;
}

const initialState = {
    sortColumnKey: 'updatedAt',
    sortDirection: SortDirection.Asc
} as IDatagridState;

export const datagrid = (state: IDatagridState = initialState, action: DatagridAction): IDatagridState => {
    switch (action.type) {
        case SORT:
            const sortDirection = state.sortColumnKey === action.columnKey 
                ? (state.sortDirection === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc)
                : SortDirection.Asc;

            return Object.assign({}, state, { 
                sortColumnKey: action.columnKey,
                sortDirection: sortDirection
            } as IDatagridState);
        default:
            return state;            
    }
}
