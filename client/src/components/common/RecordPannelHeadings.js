import React from 'react';
import { Grid, Typography, ExpansionPanelSummary } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function RecordPannelHeadings({ subject, categoryId, rating }) {
  return (
    <ExpansionPanelSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls='panel1a-content'
      id='panel1a-header'
    >
      <Grid container justify='space-between' alignItems='center'>
        {/* Here goes the name of the record */}
        <Grid item xs={7}>
          <Typography component='h2' variant='body1'>
            {subject}
          </Typography>
        </Grid>
        {/* Here goes rating */}
        <Grid item xs={4} md={3}>
          <Rating
            name='size-small'
            size='small'
            value={Number(rating)}
            readOnly
          />
        </Grid>
        {/* This one is for category */}
        <Grid item xs={2}>
          <Typography component='h2' variant='subtitle2'>
            {categoryId}
          </Typography>
        </Grid>
      </Grid>
    </ExpansionPanelSummary>
  );
}
