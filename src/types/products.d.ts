// export interface Product {
//     id: number;
//     name: string;
//     price: number;
//     image: string;
//     category?: string;
//     desc?: string;
// }

// 객체안에 객체를 한번에 넣음
export interface ProductItem {
    product: Product;
    qty: number;
}

export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category?: string;
    brand: string;
    desc: string;
}
