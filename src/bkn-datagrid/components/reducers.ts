import { SORT, SortAction } from './actions'

type BknDatagridAction = SortAction;

interface IBknDatagridState {
    bknDatagridSortColumnName: string;
    bknDatagridSortAscending: boolean;
}

const initialState = {
    bknDatagridSortColumnName: 'updatedAt',
    bknDatagridSortAscending: true
};

export const bknDatagridSortingReducer = (state: IBknDatagridState = initialState, action: BknDatagridAction): IBknDatagridState => {
    switch (action.type) {
        case SORT:
            return Object.assign({}, state, { 
                bknDatagridSortColumnName: action.columnName,
                bknDatagridSortAscending: !state.bknDatagridSortAscending
            });
        default:
            return state;            
    }
}
