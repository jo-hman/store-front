import { Container, Modal, Typography } from '@mui/material';

const OrderAcceptedModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
}> = ({ isOpen, onClose }) => {

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            sx={{
                background: 'rgba(255, 255, 255, 1)', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Container sx={{
                    backgroundColor: '#3333',
                    padding: '3px',
                    borderRadius: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: '2px solid #FFF',
                    boxSizing: 'border-box',
                    height: 'auto'
                }}>
                    <Typography>
                        Your order will be processed in a minute.
                    </Typography>
                </Container>
        </Modal>
    );
}

export default OrderAcceptedModal;