import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles, Button, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  box: {
    outline: 'none',
    padding: '20px',
    cursor: 'pointer'
  },
  button: {
    margin: '0 10px'
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
    display: 'block',
    width: '100%',
    height: '100%'
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
    <section className='container'>
      <aside className={classes.thumbsContainer}>
        {files.map(file => (
          <div className={classes.thumb} key={file.name}>
            <img src={file.preview} className={classes.img} />
          </div>
        ))}
        {errors}
      </aside>
      <Paper elevation={3} {...getRootProps({ className: classes.box })}>
        <input {...getInputProps()} />
        <Typography variant='subtitle1' component='p'>
          Drop you image here on click to open window
        </Typography>
      </Paper>
    </section>
  );
}
