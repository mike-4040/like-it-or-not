import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles, Button, Typography, Avatar } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles(theme => ({
  box: {
    outline: 'none',
    padding: '20px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    margin: '10px'
  },
  thumbsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  thumb: {
    alignSelf: 'center',
    borderRadius: '50%',
    border: '1px solid grey',
    margin: '10px',
    width: theme.spacing(12),
    height: theme.spacing(12),
    overflow: 'hidden'
  },
  img: {
    width: theme.spacing(13),
    height: theme.spacing(13),
    margin: 'auto'
  }
}));

export default function UploadAvatar({ handleClose }) {
  const classes = useStyles();

  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState();

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: false,
    maxSize: 3000000,
    onDropRejected: ([file]) => {
      console.log('file', file);
      setErrors(
        `Sorry, but this file ${file.name} is ${formatBytes(
          file.size
        )}, Please upload photo less then 3.00 MB`
      );
    },
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <section>
      <aside className={classes.thumbsContainer}>
        {files.map(file => (
          <Avatar key={file.name} className={classes.img} src={file.preview} />
        ))}
        {files[0] && (
          <>
            <Button
              className={classes.button}
              onClick={() => {
                console.log('sending file', files[0]);
                handleClose();
              }}
              variant='contained'
              color='primary'
            >
              Looks cool, I will keep it!
            </Button>
            <Button
              className={classes.button}
              onClick={() => {
                handleClose();
              }}
              variant='contained'
              color='secondary'
            >
              Cancel
            </Button>
          </>
        )}
        {errors}
      </aside>
      <Button>
        <div elevation={3} {...getRootProps({ className: classes.box })}>
          <input {...getInputProps()} />
          <GetAppIcon fontSize='large' />
          <Typography variant='subtitle1' component='p'>
            Drop you image here on click to open window
          </Typography>
        </div>
      </Button>
    </section>
  );
}
