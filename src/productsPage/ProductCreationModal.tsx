
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';
import { createProductUrl, defaultHeadersWithAuthorization } from '../utils/storeApi';
import { useState } from 'react';
import { jwtLocalStorageKey } from '../utils/jwtUtils';

Modal.setAppElement('#root');

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
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Product specification">
                {
                    !isError ? (
                        <Formik initialValues={productCreationRequestInitialValues}
                            validationSchema={validation} 
                            onSubmit={onSubmit} 
                            initialErrors={{'name': 'Required'}}>
                            {({ isValid }) => (
                                <Form>
                                <div>
                                    <label htmlFor='name'>Product Name:</label>
                                    <Field type='text' id='name' name='name' />
                                    <ErrorMessage name='name' component='div' />
                                </div>

                                <div>
                                    <button type="submit" disabled={!isValid} >Submit</button>
                                </div>
                            </Form>
                            )}
                        </Formik>
                    ) : (
                        <div>
                            <p>
                                There was an error when creating a product. Maybe there is already a product with the name you have specified.
                            </p>
                            <button type="submit" onClick={onClose}>Close</button>
                        </div>
                    )
                }
        </Modal>
    );
}

export default ProductCreationModal;