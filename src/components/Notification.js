import React, { Component } from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';


const Notification = (props) => {
    return (

        <React.Fragment>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={props.open}
                autoHideDuration={200}
            >
                <SnackbarContent
                    message={props.title}
                    action={[<CloseIcon style={{ cursor: "pointer" }} onClick={props.handleClose} />]}
                />
            </Snackbar>
        </React.Fragment>

    );
}

export default Notification;