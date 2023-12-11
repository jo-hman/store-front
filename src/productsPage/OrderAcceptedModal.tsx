import { Typography } from '@mui/material';
import StyledModal from '../components/StyledModal';

const OrderAcceptedModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
}> = ({ isOpen, onClose }) => {

    return (
        <StyledModal isOpen={isOpen} onClose={onClose}>
            <Typography>
                Your order will be processed in a minute.
            </Typography>
        </StyledModal>
    );
}

export default OrderAcceptedModal;