import Product from "./product/Product";

const ProductContainer: React.FC<{
    product: Product;
}> = ({ product }) => {

    //todo write checkbox logic
    return (
        <div>
            <input type="checkbox" value={product.isSelected.toString()}/>
            <strong>{product.productData.name}</strong>
        </div>
    );
}

export default ProductContainer;