import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import Uppy from '@uppy/core';
import Webcam from '@uppy/webcam';
import { DashboardModal } from '@uppy/react';

import '@uppy/core/dist/style.css';
import '@uppy/webcam/dist/style.css';
import '@uppy/dashboard/dist/style.css';

const uppy = Uppy({
  meta: { type: 'avatar' },
  restrictions: { maxNumberOfFiles: 1 },
  autoProceed: false
});

uppy.use(Webcam, {
  id: 'Webcam',
  modes: ['picture'],
  facingMode: 'environment'
});

export default function UppyWebCam({ setImage }) {
  const [camera, setCamera] = useState(false);

  uppy.on('complete', result => {
    setImage(result.successful[0]);
    console.log('successful files:', result.successful[0]);
    setCamera(false);
  });

  return (
    <>
      <IconButton
        style={{
          margin: '5px',
          position: 'absolute',
          bottom: '10%',
          right: '5px'
        }}
        onClick={() => setCamera(state => !state)}
        color='primary'
        aria-label='upload picture'
        component='span'
      >
        <PhotoCamera />
      </IconButton>

      <DashboardModal
        uppy={uppy}
        closeModalOnClickOutside
        open={camera}
        onRequestClose={() => setCamera(state => !state)}
        plugins={['Webcam']}
      />
    </>
  );
}
