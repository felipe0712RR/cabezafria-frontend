export interface dataProduct {
    _id?: string;
    productName?: string;
    productDescription?: string;
    productPrice?: number;
    productType?: string;
    productSize?: string;
    productColor?: string;
    productStock?: number;
    productCategory?: {
        categoryName?: string;
        categoryDescription?: string;
        categoryState: boolean;
        _id?: string;
        categoryOwner?: string;
    };
    productUrlImage?: string;
    productState?: boolean;
    productReviews?: string[];
    productOwner?: string;
    productFavoriteCounter?: number; 
}
