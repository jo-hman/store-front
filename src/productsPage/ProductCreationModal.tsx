
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createProductUrl, defaultHeadersWithAuthorization } from '../utils/storeApi';
import { jwtLocalStorageKey } from '../utils/jwtUtils';
import { FormLabel, Modal, Typography } from '@mui/material';
import { useState } from 'react';
import { Button } from '@mui/base';
import StyledModal from '../components/StyledModal';

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
        <StyledModal isOpen={isOpen} onClose={onClose}>
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
        </StyledModal>
    );
}

export default ProductCreationModal;