import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';

export default function Github() {
  let style = {
    textAlign: 'center',
    width: '100%'
  };
  return (
    <div style={style}>
      <a href='https://github.com/mike-4040/like-it-or-not'>
        <GitHubIcon style={{ color: 'black' }} />
      </a>
    </div>
  );
}
