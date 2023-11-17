import { useEffect, useState } from "react";
import { defaultHeadersWithAuthorization, ordersUrl, productsUrl } from "../utils/storeApi";
import ProductContainer from "./ProductContainer";
import Product from "./product/Product";
import ProductData from "./product/ProductData";
import ProductCreationModal from "./ProductCreationModal";
import { extractJwtPayload, jwtLocalStorageKey } from "../utils/jwtUtils";


const ProductsPage = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [modal, setModal] = useState(false);
    const [hideMyProducts, setHideMyProducts] = useState(true);

    const fetchProducts = () => {
        fetch(productsUrl, {
            'method': 'GET',
            'headers': defaultHeadersWithAuthorization(localStorage.getItem(jwtLocalStorageKey)),
        })
        .then(response => response.json())
        .then(response => setProducts(mapResponseToProducts(response)));
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const mapResponseToProducts = (response: any): Product[] => {
        return response.map((product: ProductData) => {
            return {isSelected: false, productData: product}
        });
    }

    const onModalClose = () => {
        setModal(false);
        fetchProducts();
    }

    const createNewProductHandler = () => setModal(true)

    const orderHandler = () => {
        const productsToOrder = products.filter(product => product.isSelected).map(product => product.productData.id);
        if (productsToOrder.length !== 0) {
            fetch(ordersUrl, {
                'method': 'POST',
                'headers': defaultHeadersWithAuthorization(localStorage.getItem(jwtLocalStorageKey)),
                'body': JSON.stringify({productIds: productsToOrder}),
            })
            .then(response => response);
        }
    }

    const logOutHandler = () => {
        localStorage.clear();
        window.location.reload();
    }

    const handleHideMyProducts = () => {
        setHideMyProducts(!hideMyProducts);
    }

    return (
        <div>
            <div>
                <button onClick={createNewProductHandler}>Create New Product</button>
                <button onClick={orderHandler}>Order Selected Products</button>
                <button onClick={logOutHandler}>Log out</button>
            </div>
            <h1>Product List</h1>
            <button onClick={handleHideMyProducts}>{hideMyProducts && 'Don\'t '}Hide My Products</button>
            <div>
                {
                    products.map((product) => {
                            const isUsersProduct = product.productData.accountID === extractJwtPayload(localStorage.getItem(jwtLocalStorageKey)).sub;
                            return (!isUsersProduct || !hideMyProducts) && <ProductContainer product={product} isUsersProduct={isUsersProduct}/>;
                        })
                }
            </div>

            <ProductCreationModal isOpen={modal} onClose={onModalClose}/>
        </div>
    );
}

export default ProductsPage;