import { dataProduct } from "./product.model";

export interface User {
    _id?: string,
    userName?: string,
    userEmail?: string,
    userPassword?: string,
    userRole?: string,
    userPhoneNumber?: number,
    userFavorites?: dataProduct[];
}