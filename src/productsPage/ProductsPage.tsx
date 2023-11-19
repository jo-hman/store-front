import { useEffect, useState } from "react";
import { defaultHeadersWithAuthorization, ordersUrl, productsUrl } from "../utils/storeApi";
import ProductContainer from "./ProductContainer";
import Product from "./product/Product";
import ProductData from "./product/ProductData";
import ProductCreationModal from "./ProductCreationModal";
import { extractJwtPayload, jwtLocalStorageKey } from "../utils/jwtUtils";
import OrderAcceptedModal from "./OrderAcceptedModal";
import { Button, Container, List, Typography } from "@mui/material";

const ProductsPage = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [productCreationModal, setProductCreationModal] = useState(false);
    const [orderAcceptedModal, setOrderAcceptedModal] = useState(false);
    const [hideMyProducts, setHideMyProducts] = useState(true);

    const fetchProducts = () => {
        fetch(productsUrl, {
            'method': 'GET',
            'headers': defaultHeadersWithAuthorization(localStorage.getItem(jwtLocalStorageKey)),
        })
        .then(response => response.json())
        .then(response => setProducts(mapResponseToProducts(response)));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const mapResponseToProducts = (response: any): Product[] => {
        return response.map((product: ProductData) => {
            return {isSelected: false, productData: product}
        });
    };

    const onModalClose = () => {
        setProductCreationModal(false);
        fetchProducts();
    };

    const onOrderModalClose = () => setOrderAcceptedModal(false);

    const createNewProductHandler = () => setProductCreationModal(true);

    const orderHandler = () => {
        const productsToOrder = products.filter(product => product.isSelected).map(product => product.productData.id);
        if (productsToOrder.length !== 0) {
            fetch(ordersUrl, {
                'method': 'POST',
                'headers': defaultHeadersWithAuthorization(localStorage.getItem(jwtLocalStorageKey)),
                'body': JSON.stringify({productIds: productsToOrder}),
            })
            .then(response => setOrderAcceptedModal(true));
        }
    };

    const logOutHandler = () => {
        localStorage.clear();
        window.location.reload();
    };

    const handleHideMyProducts = () => {
        setHideMyProducts(!hideMyProducts);
    };

    return (
        <Container>
            <Container sx={{
                        backgroundColor: '#3333', // Dark color for the square
                        padding: 3, // Adjust padding as needed
                        borderRadius: 5, // Apply border radius
                        width: '300px', // Set the width to create a square
                        height: '120px', // Set the height to create a square
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '2px solid #FFF', 
                        boxSizing: 'border-box',
                    }}>
                <Button onClick={createNewProductHandler}>Create New Product</Button>
                <Button onClick={orderHandler}>Order Selected Products</Button>
                <Button onClick={logOutHandler}>Log out</Button>
            </Container>
            <Typography>Product List</Typography>
            <Button onClick={handleHideMyProducts}>{hideMyProducts && 'Don\'t '}Hide My Products</Button>
            <List sx={{
                        backgroundColor: '#3333',
                        borderRadius: 5,
                        width: '300px',
                        height: '600px', 
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '2px solid #FFF',
                        boxSizing: 'border-box',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                    }}>
                        {   
                            products.map((product) => {
                                    const isUsersProduct = product.productData.accountID === extractJwtPayload(localStorage.getItem(jwtLocalStorageKey)).sub;
                                    return (!isUsersProduct || !hideMyProducts) && <ProductContainer product={product} isUsersProduct={isUsersProduct}/>;
                                })
                        }
            </List>

            <ProductCreationModal isOpen={productCreationModal} onClose={onModalClose}/>
            <OrderAcceptedModal isOpen={orderAcceptedModal} onClose={onOrderModalClose}/>
        </Container>
    );
}

export default ProductsPage;