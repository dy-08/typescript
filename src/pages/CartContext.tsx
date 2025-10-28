import { useState, createContext, useContext } from 'react';
// createContext : 전역상태(공용저장소)를 만드는 Hooks
// aaa.Provider : 값을 저장, useContext(aaa)로 값을 꺼내 사용
import type { ReactNode } from 'react'; //타입스크립트가 제공. 컴포넌트 안에 들어갈 수 있는 모든 타입의 값
import type { Product } from '../types/products'; //제대로 못읽어오고 빨간줄 뜨면 .d.ts에서 .d 지워보기
import type { Cart } from '../types/cart';

export interface CartcontextValue {
    //Product랑 Cart를 섞어서 새로운 객체 만들기
    cart: Cart; //상품에 대한 모든 정보가 들어간 배열
    //()=>void ~ 값을 돌려주지 않는 함수
    add: (p: Product, qty?: number) => void; //원하는 상품추가, 특정 상품에 대한 함수기 때문에 매개변수 필수
    inc: (id: number) => void; //+1
    dec: (id: number) => void; //-1
    remove: (id: number) => void; //원하는 상품삭제
    clear: () => void; //장바구니 비우기
    totalCount: number;
    totalPrice: number;
}

const CartCtx = createContext<CartcontextValue | null>(null);
//모든 컴포넌트를 돌아다닐 수 있는 공용 변수. ★오늘의 keyPoint!!
//<CartcontextValue> ~ 모든 값을 다 가지고 있는 객체

const CartCountext: React.FC<{ children: ReactNode }> = ({ children }) => {
    //{children} ~ 변수X. 부모가 던져주면 다 받을 준비가 되었다는 일종의 선포. React 속성.
    //:React.FC<{children:ReactNode}> ~ children을 받아치는 CartCountext에게 타입 알려줘야함.

    //▼export interface하는 CartcontextValue값들 정의. 다른 컴포넌트에서 사용하는 값들.
    const [cart, setCart] = useState<Cart>([]); //Cart의 속성을 그대로 사용하겠다는 말.
    const add = (p: Product, qty: number = 1) => {
        //'qty?'로 받으면 기본값 (=1) 못 줌.
        setCart((item) => {
            //Cart에 뭐가 담겨있든 setCart로 Cart에 반환.
            const found = item.find((kk) => kk.product.id === p.id); //전부 다 가지고 있는 item(Cart)에서 임의의 변수를 주고 값을 찾아라.
            if (found) {
                //find 성공해서 값을 찾았으면 내놔라
                return item.map(
                    (bb) => (bb.product.id == p.id ? { ...bb, qty: bb.qty + Math.max(1, qty) } : bb)
                    //bb = map 돌면서 보고 있는 장바구니 항목(CartItem).
                    //bb.product.id는 그 항목의 상품 아이디, p.id는 새로 추가하려는 상품의 아이디.
                    //~ 두 값이 같으면 "이미 장바구니에 있는 같은 상품"이라는 뜻.
                    //...bb, qty:bb.qty + Math.max(1, qty) ~ 기존 객체 bb를 그대로 복사 후 qty만큼 추가.
                    // Math.max ~ 1과 qty 중 더 큰 값을 선택. (qty가 undefined or 음수 or 0이면 최소 1로 더해줌.)
                );
            }
            return [...item, { product: p, qty: Math.max(1, qty) }]; //found에서 값 못 찾았으면 그대로 반환.
        });
    };

    const inc = (id: number) => {
        setCart((item) =>
            item.map(
                (kk) => (kk.product.id === id ? { ...kk, qty: kk.qty + 1 } : kk) //나머지 값들은 그대로 가져가고 수량만 +1
                // (kk) => (kk.product.id === id ? { ...kk, qty: kk.qty + 1 } : kk) //나머지 값들은 그대로 가져가고 수량만 +1
            )
        );
    };
    const dec = (id: number) => {
        setCart((item) =>
            item.map(
                (kk) => (kk.product.id === id ? { ...kk, qty: Math.max(0, kk.qty - 1) } : kk) //나머지 값들은 그대로 가져가고, 최소값을 0으로 제한 겸 수량만 -1
            )
        );
    };

    const remove = (id: number) => {
        setCart((item) => item.filter((kk) => kk.product.id !== id)); //kk.product.id외 나머지를 돌려줘
    };
    const clear = () => setCart([]);

    let totalCount = 0;
    let totalPrice = 0;

    cart.forEach((item) => {
        totalCount += item.qty;
        totalPrice += item.qty * item.product.price;
    });

    const value: CartcontextValue = {
        //CartcontextValue ~ '<>'Hooks=함수 뒤에서만 괄호 줌. 변수뒤에는 그냥 ':'
        cart,
        add,
        inc,
        dec,
        remove,
        clear,
        totalCount,
        totalPrice,
        //아래처럼 키와 키값이 동일할 때는 하나만 써주면 됨.
        // cart:cart,
        // add:add,
        // inc:inc,
        // dec:dec,
        // remove:remove,
        // clear:clear,
        // totalCount:totalCount,
        // totalPrice:totalPrice
    };

    return (
        //해당 컴포넌트 파일의 return은 순수하게 값을 돌려주는 역할.
        <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
        //value ~ CartCtx.Provider로 정의 됨.
        //사용할 때 : useContext(CartCtx.cart)
    );
};

export default CartCountext;
export const useCart = () => {
    //좀 더 쉬운 관리와 사용을 위해 함수로 한 번 더 내보내기
    const ctx = useContext(CartCtx); //(모든걸 다 정의해서 가지고 있는) 공용변수 CartCtx에서 꺼내올 것이다.
    if (!ctx) throw new Error('공용변수에서 값을 찾을 수 없습니다.'); //값없으면 냅다 던져버려
    return ctx;
};
