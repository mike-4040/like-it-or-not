import React from 'react';

import Record from '../SingleRecord/Record.js';
import LoadingSpinner from '../LoadingSpinner.js';

export default function SimpleExpansionPanel({ records }) {
  return (
    <>
      <div>
        {console.log('records', records)}

        {records &&
          records.map(record => <Record key={record._id} {...record} />)}
      </div>
      {!records && (
        <div
          style={{
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <LoadingSpinner />}
        </div>
      )}
    </>
  );
}
