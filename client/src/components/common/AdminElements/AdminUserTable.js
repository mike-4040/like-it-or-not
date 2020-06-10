import React, { useEffect, useState, useContext } from 'react';
import MaterialTable from 'material-table';
import Api from '../../../utils/api';
import { AppContext } from '../../../Context';
import { User } from '../../../utils/models';

const columns = [
  { title: 'First name', field: 'firstName', editable: 'never' },
  { title: 'Last name', field: 'lastName', editable: 'never' },
  { title: 'Email', field: 'email', editable: 'never' },
  {
    title: 'Role',
    field: 'role',
    lookup: { admin: 'admin', user: 'user' }
  }
];

export default function AdminUserTable() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const getUsers = async () => {
      const { data: users } = await Api.getAllUsers();
      setUsers(users);
    };
    getUsers();
  }, []);

  const onRowUpdate = (newData, oldData) =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await Api.updateRole({
          id: oldData.id,
          role: newData.role
        });
        const index = users.findIndex(user => user.id === data.id);
        users[index] = data;
        setUsers(() => [...users]);
        if (user.id === data.id) resolve(window.location.reload());
        else resolve();
      } catch (err) {
        reject(err);
      }
    });

  const onRowDelete = oldData =>
    new Promise(async (resolve, reject) => {
      try {
        const { data } = await Api.deleteUser(oldData.id);
        if (data) {
          setUsers(users => users.filter(user => user.id !== data.id));
          resolve();
        }
      } catch (err) {
        reject(err);
      }
    });

  return (
    <MaterialTable
      title='Users'
      columns={columns}
      data={users.map(dbUser => new User(dbUser))}
      editable={{
        onRowUpdate,
        onRowDelete
      }}
    />
  );
}
