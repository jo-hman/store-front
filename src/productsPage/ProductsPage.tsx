import { MouseEvent, useEffect, useState } from "react";
import { defaultHeadersWithAuthorization, getProductsUrl, jwtLocalStorageKey } from "../utils/storeApi";
import ProductContainer from "./ProductContainer";
import Product from "./product/Product";
import ProductData from "./product/ProductData";
import ProductCreationModal from "./ProductCreationModal";


const ProductsPage = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [modal, setModal] = useState(false);

    const mapResponseToProducts = (response: any): Product[] => {
        return response.map((product: ProductData) => {
            return {isSelected: false, productData: product}
        });
    }

    const fetchProducts = () => {
        fetch(getProductsUrl, {
            'method': 'GET',
            'headers': defaultHeadersWithAuthorization(localStorage.getItem(jwtLocalStorageKey)),
        })
        .then(response => response.json())
        .then(response => setProducts(mapResponseToProducts(response)));
    }

    const onModalClose = () => {
        setModal(false);
        fetchProducts();
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const createNewProductHandler = (event: MouseEvent) => {
        setModal(true);
    }

    const orderHandler = (event: MouseEvent) => {
        //todo write order logic
    }

    return (
        <div>
            <div>
                <button onClick={createNewProductHandler}>Create New Product</button>
                <button onClick={orderHandler}>Order Selected Products</button>
            </div>
            <h1>Product List</h1>
            <div>
                {products.map((product) => (
                   <ProductContainer product={product}/> 
                ))}
            </div>

            <ProductCreationModal isOpen={modal} onClose={onModalClose}/>
        </div>
    );
}

export default ProductsPage;