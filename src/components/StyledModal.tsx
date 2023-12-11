import { Container, Modal } from "@mui/material";
import { ReactNode } from "react";

const StyledModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}> = ({ isOpen, onClose, children }) => {

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
                height: 'auto',
            }}>
                {children}
            </Container>
        </Modal>
    );
};

export default StyledModal;