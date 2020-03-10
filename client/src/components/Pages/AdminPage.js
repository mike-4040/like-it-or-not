import React, { useState, useContext } from 'react';
import Api from '../../utils/api';
import { AppContext } from '../../Context';

export default function AdminPage() {
  const { allCategories, setAllCategories } = useContext(AppContext);
  const [newCategory, setNewCategory] = useState('');
  const [editCategory, setEditCategory] = useState();

  const submitNewCategory = async e => {
    e.preventDefault();
    try {
      const { data } = await Api.createCategory({ catName: newCategory });
      if (data) {
        setAllCategories([...allCategories, data]);
        setNewCategory('');
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleEditCategory = id => {
    setEditCategory(() => {
      return allCategories.find(cat => cat._id === id);
    });
  };

  const submitEditCategory = async e => {
    e.preventDefault();
    try {
      const { data } = await Api.updateCategory(editCategory._id, editCategory);
      if (data) {
        const index = allCategories.findIndex(el => el._id === data._id);
        allCategories[index] = data;
        setAllCategories([...allCategories]);
        setEditCategory(null);
      }
    } catch (err) {
      console.log('err', err);
    }
  };
  const handleDeleteCategory = async id => {
    try {
      const { data } = await Api.deleteCategory(id);
      console.log(' data', data);
      if (data) {
        setAllCategories(categories =>
          categories.filter(el => el._id !== data._id)
        );
      }
    } catch (err) {
      console.log(' err', err);
    }
  };

  return (
    <div>
      <form onSubmit={submitNewCategory}>
        <input
          type='text'
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
        ></input>
        <input type='submit'></input>
      </form>
      {editCategory && (
        <div>
          <h4>edit here</h4>
          <form onSubmit={submitEditCategory}>
            <input
              type='text'
              value={editCategory.catName}
              onChange={e =>
                setEditCategory({
                  ...editCategory,
                  catName: e.target.value
                })
              }
            ></input>
            <input type='submit'></input>
          </form>
        </div>
      )}
      <ul>
        {allCategories.map(el => {
          return (
            <li key={el._id}>
              <p>{el.catName}</p>
              <button
                onClick={() => {
                  handleEditCategory(el._id);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  handleDeleteCategory(el._id);
                }}
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
