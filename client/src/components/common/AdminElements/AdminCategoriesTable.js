import React, { useContext } from 'react';
import MaterialTable from 'material-table';
import { AppContext } from '../../../Context';
import Api from '../../../utils/api';

export default function AdminCategoriesTable() {
  const { allCategories, setAllCategories } = useContext(AppContext);

  const columns = [
    { title: 'Category name', field: 'catName' }
    // { title: 'Category id', field: 'categoryId', editable: 'never' }
  ];

  return (
    <MaterialTable
      style={{ height: '100%' }}
      title='Categories'
      columns={columns}
      data={allCategories.map(el => {
        return {
          catName: el.catName,
          categoryId: el._id
        };
      })}
      options={{
        actionsColumnIndex: -1
      }}
      editable={{
        onRowAdd: newData =>
          new Promise(async (resolve, reject) => {
            try {
              const { data } = await Api.createCategory({
                catName: newData.catName
              });
              if (data) {
                setAllCategories([...allCategories, data]);
                resolve();
              }
            } catch (err) {
              reject(err);
            }
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(async (resolve, reject) => {
            try {
              const { data } = await Api.updateCategory(
                oldData.categoryId,
                newData
              );
              if (data) {
                const index = allCategories.findIndex(
                  el => el._id === data._id
                );
                allCategories[index] = data;
                setAllCategories([...allCategories]);
                resolve();
              }
            } catch (err) {
              reject(err);
            }
          }),
        onRowDelete: oldData =>
          new Promise(async (resolve, reject) => {
            try {
              const { data } = await Api.deleteCategory(oldData.categoryId);
              if (data) {
                setAllCategories(categories =>
                  categories.filter(el => el._id !== data._id)
                );
                resolve();
              }
            } catch (err) {
              reject(err);
            }
          })
      }}
    />
  );
}
