import { SORT, SortAction, OtherAction } from './actions'

type BknDatagridAction = 
    SortAction |
    OtherAction;

const initialState = 'updatedAt';

export const bknDatagridSortingReducer = (state: string = initialState, action: BknDatagridAction = OtherAction) => {
    switch (action.type) {
        case SORT:
            return Object.assign({}, state, { 
                bknDatagridSortColumnName: action.columnName 
            });
        default:
            return state;            
    }
}
