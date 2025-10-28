// .d.ts: 컴파일 할 때 파일 생성을 하지 ❌, 사용만 가능
// 타입스크립트 사용하는 이유: js 안전성 ==> 컴파일 단계에서 에러 표시
// let name:string = 'hello World!';
// let num:number = 1;
// 값이 있으면 생략이 가능 (예: let name='hello World!'); 타입 추론(자동 인식)

// 객체일 때 에러가 제일 많이 남 – 객체는 타입추론이 불가능
// 객체 예:
// 객체생성: interface로 생성
// 타입지정: ?. 문자열이있을 수 도 있고

// export interface CartItem {
//     id: number;
//     title: string;
//     image: string;
//     desc?: string;
//     category?: string;
// }

// export type Cart = CartItem[];

// import ✨
// import type [ Cart, CartItem ] from '../types/cart';

// use ✨
// let [item, setItem] = useState<Cart>([]);

// .then((data:Cart) => setItem(data) )

// .d.ts :: 컴파일시 파일 생성 안함
// 타입스크립트 :: js 안전성 ==? 컴파일 단계에서 에러 표시
// let name:string = "홍길동"
// let name = "홍길동" :: 타입추론(자동인식)
import type { Product } from './product';
export interface CartItem {
    product: Product;
    qty: number;
}

export type Cart = cartItem[];

// import type [Cart, cartItem] from '../type/cart'
// let [item, setItme] = useState<Cart>([])
// .then( (data:Cart) => setItme(data) )
