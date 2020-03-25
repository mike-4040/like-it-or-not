import React from 'react';
import { useParams } from 'react-router-dom';

export default function ShortTokenHandler() {
  const { token } = useParams();
/** @todo:
 * 1.send token to /api/auth/token as param
 * 2. Accept real token and save it in local storage
 */
  return (
    <div>
      <h3>Token: {token}</h3>
    </div>
  );
}
