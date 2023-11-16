import { MouseEvent, useEffect, useState } from "react";
import { defaultHeadersWithAuthorization, getProductsUrl, jwtLocalStorageKey } from "../utils/storeApi";
import ProductContainer from "./ProductContainer";
import Product from "./product/Product";
import ProductData from "./product/ProductData";

const ProductsPage = () => {

    const [products, setProducts] = useState<Product[]>([]);

    const mapResponseToProducts = (response: any): Product[] => {
        return response.map((product: ProductData) => {
            return {isSelected: false, productData: product}
        });
    }

    useEffect(() => {
        fetch(getProductsUrl, {
            'method': 'GET',
            'headers': defaultHeadersWithAuthorization(localStorage.getItem(jwtLocalStorageKey)),
        })
        .then(response => response.json())
        .then(response => setProducts(mapResponseToProducts(response)));
    }, []);

    const createNewProductHandler = (event: MouseEvent) => {
        //todo open modal with product creation
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
        </div>
    );
}

export default ProductsPage;