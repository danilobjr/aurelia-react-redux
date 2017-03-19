export type SORT = 'bkn-datagrid.components.actions.SORT';
export const SORT: SORT = 'bkn-datagrid.components.actions.SORT';

export type SortAction = {
    type: SORT;
    columnName: string;
};

export type OtherAction = { type: '' };
export const OtherAction: OtherAction = { type: '' };

export const sortByColumnName = (columnName: string): SortAction => ({
    type: SORT,
    columnName
});
