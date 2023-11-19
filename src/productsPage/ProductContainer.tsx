import { Container, Input, ListItem, Typography } from "@mui/material";
import Product from "./product/Product";

const ProductContainer: React.FC<{
    product: Product;
    isUsersProduct: boolean;
}> = ({ product, isUsersProduct }) => {

    return (
        <ListItem sx={{
            backgroundColor: '#3333', 
            padding: '20px 3px 3px 3px',
            borderRadius: 2, 
            width: '250px', 
            height: '100px', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '2px solid #FFF', 
            boxSizing: 'border-box', 
          }}>
            <Input type="checkbox" value={product.isSelected.toString()} onClick={() => {product.isSelected = !product.isSelected;}} disabled={isUsersProduct}/>
            <Typography>{product.productData.name}</Typography>
            { isUsersProduct && <Typography> is your product</Typography> }
        </ListItem>
    );
}

export default ProductContainer;