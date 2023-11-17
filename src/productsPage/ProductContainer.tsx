import Product from "./product/Product";

const ProductContainer: React.FC<{
    product: Product;
    isUsersProduct: boolean;
}> = ({ product, isUsersProduct }) => {

    return (
        <div>
            <input type="checkbox" value={product.isSelected.toString()} onClick={() => {product.isSelected = !product.isSelected;}} disabled={isUsersProduct}/>
            <strong>{product.productData.name}</strong>
            { isUsersProduct && <text> is your product</text> }
        </div>
    );
}

export default ProductContainer;