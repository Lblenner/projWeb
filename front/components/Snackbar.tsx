import React, { FunctionComponent } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export const SimpleSnackbar: FunctionComponent<{open : boolean, handleClose: any}> = (props) => {
  
  return (

    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={props.open}
      autoHideDuration={6000}
      onClose={props.handleClose}
      message="Une erreur s'est produite, nous n'avons pas pu poster votre recette"
      action={
        <React.Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={props.handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />

  );
}
