export type SORT = 'datagrid.components.actions.SORT';
export const SORT: SORT = 'datagrid.components.actions.SORT';

export type SortAction = {
    type: SORT;
    columnKey: string;
};

export const sortByColumnName = (columnKey: string): SortAction => ({
    type: SORT,
    columnKey
});
