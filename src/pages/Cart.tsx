// 함수: 👇, 참고해야할 파일: 📍
// import ~ from: useCart를 사용하려고 호출
import { useCart } from './CartContext';

// React.FC: 리엑트의 함수라는 표시
const Cart: React.FC = () => {
    // 이걸 파악해야 하는게 중요 (나머지는 그냥 뿌려주는거임)✨
    // cart: { product(id, title, price, image), qty }
    // useCart 형식 ( 📍 CartContext.tsx – CartcontextValue )
    const { cart, inc, dec, remove, clear, totalCount, totalPrice } = useCart();
    if (cart.length === 0) {
        // 상품이 없으면 아래 return을 반환하고 종료
        return (
            <div>
                <h1>장바구니</h1>
                <h3>선택된 상품이 없습니다</h3>
            </div>
        );
    }
    // 상품이 있다면 아래 return을 반환하고 종료
    return (
        <div>
            <h1>장바구니</h1>
            <ul>
                {cart.map((item) => (
                    <li key={item.product.id}>
                        <img
                            src={item.product.image}
                            alt={item.product.title}
                            // 스타일 적용타입 2가지방법 활용가능 (string, number)
                            style={{ width: '100px', height: 100, objectFit: 'cover' }}
                        />
                        <div>
                            <h3>{item.product.title}</h3>
                            {/* h4: 수량x가격  */}
                            {/* toLocaleString(): 원화 3자리 쉼표 (예: 3,000) */}
                            <h4>{(item.qty * item.product.price).toLocaleString()}원</h4>
                            <div>
                                {/* 👇 dec(), 1씩 감소 */}
                                {/* dec(item.product.id): -1씩 감소하는 함수, id값을 인자로받아 같다면 감소시키는 로직 */}
                                <button onClick={() => dec(item.product.id)}>-</button>

                                {/* qty: 수량 (공용변수이기에 +, - 둘다 대응 가능) */}
                                <span>{item.qty}</span>

                                {/* 👇 inc(), 1씩 증가 */}
                                {/* id값을 인자로받아 같다면 증가시키는 로직 */}
                                <button onClick={() => inc(item.product.id)}>+</button>

                                {/* 👇 상품삭제 */}
                                {/* id값을 인자로받아 같다면 상품삭제 */}
                                <button onClick={() => remove(item.product.id)}>상품삭제</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {/* 목록이 끝난 다음 총 수량을 랜더링*/}
            <div>
                <div>총 수량: {totalCount} 개</div>
                {/* 서비스: 쉼표 */}
                <div>총 금액: {totalPrice.toLocaleString()} 원</div>
                {/* 👇 clear() */}
                <button onClick={() => clear()}>장바구니 전체 비우기</button>
            </div>
        </div>
    );
};

export default Cart;
