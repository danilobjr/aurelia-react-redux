import { createStore, combineReducers } from 'redux'
import { datagrid, IDatagridState } from './datagrid/reducers'

export interface IState {
    datagrid: IDatagridState;
}

const reducers = combineReducers({
    datagrid
});

export const store = createStore(reducers);
