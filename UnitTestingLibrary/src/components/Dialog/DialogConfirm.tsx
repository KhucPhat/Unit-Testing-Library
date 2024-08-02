import { Button, Dialog, DialogActions, DialogContent, Typography } from "@mui/material";

interface DialogProps {
    openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>,
    formik: any
}

const DialogConfirm: React.FC<DialogProps> = (props) => {
    const {
        openDialog,
        setOpenDialog,
        formik
    } = props;
    return (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogContent>
                <Typography>Are you sure you want to submit the form?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        formik.submitForm();
                        setOpenDialog(false);
                    }}
                    color="primary"
                >
                    Apply
                </Button>
            </DialogActions>
        </Dialog>

    )
};

export default DialogConfirm;