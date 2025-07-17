import { dataProduct } from "./product.model";

export interface CartItem {
    product: dataProduct;
    cartQuantity: number;
}
