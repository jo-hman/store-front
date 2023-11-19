
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createProductUrl, defaultHeadersWithAuthorization } from '../utils/storeApi';
import { jwtLocalStorageKey } from '../utils/jwtUtils';
import { FormLabel, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { Container } from '@mui/system';
import { Button } from '@mui/base';

interface ProductCreationRequest {
    name: string;
}

const ProductCreationModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
}> = ({ isOpen, onClose }) => {

    const [isError, setIsError] = useState(false);

    const productCreationRequestInitialValues: ProductCreationRequest = {
        name: '',
    };

    const validation = Yup.object({
        name: Yup.string().required('Product name is required'),
    });

    const onSubmit = (productCreationRequest: ProductCreationRequest) => {
        fetch(createProductUrl, {
            'method': 'POST',
            'headers': defaultHeadersWithAuthorization(localStorage.getItem(jwtLocalStorageKey)),
            'body': JSON.stringify(productCreationRequest),
        })
        .then((response) => {
            if (!response.ok) {
              throw new Error();
            }
            onClose();
          })
        .catch(() => setIsError(true));
    }

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
                {
                    !isError ? (
                        <Formik initialValues={productCreationRequestInitialValues}
                            validationSchema={validation} 
                            onSubmit={onSubmit} 
                            initialErrors={{'name': 'Required'}}>
                            {({ isValid }) => (
                                <Form>
                                    <Typography >Product Name:</Typography>
                                    <Field type='text' id='name' name='name' />
                                    <div></div>
                                    <Button type="submit" disabled={!isValid} >Submit</Button>
                            </Form>
                            )}
                        </Formik>
                    ) : (
                        <>
                            <Typography>
                                There was an error when creating a product. Maybe there is already a product with the name you have specified.
                            </Typography>
                            <Button type="submit" onClick={() => {setIsError(false); onClose();}}>Close</Button>
                        </>
                    )
                }
                </Container>
        </Modal>
    );
}

export default ProductCreationModal;