import { useState, useEffect } from 'react';
// import axios, { Axios } from 'axios';
import axios from 'axios';
import { useCart } from './CartContext'; //공용컴포넌트(CartContext)에서 최종적으로 내보낸 함수
import type { Product } from '../types/products';
import styles from './Products.module.scss';

const Products: React.FC = () => {
    //:React.FC ~ 오류방지차원
    const [list, setList] = useState<Product[]>([]); //Product[] ~ 수량이 없는 상품리스트인데, (원래 그냥 객체지만) 배열로 사용하겠다
    const [error, setError] = useState<string | null>(null);
    const { cart, add, inc, dec } = useCart(); // ~ 여기서 중괄호는 (useCart라는 함수에서 가져오는) 키와 키값을 한꺼번에 가져오겠다는 뜻
    //이대로 주면 못 알아 듣기 때문에 main.tsx가서 한 번 공용변수 컴포넌트 뿌려줘야 됨.

    useEffect(() => {
        const load = async () => {
            try {
                const { data } = await axios.get<Product[]>('products.json'); //data라는 객체 속성을 await로 받음.
                setList(data);
            } catch (err) {
                setError('상품목록을 불러오지 못했습니다.');
                console.error(err);
            }
        };
        load();
    }, []);

    //▼공용 키값에서 수량 들고 오기
    const getQty = (id: number) => {
        const found = cart.find((kk) => kk.product.id === id);
        return Math.max(found ? found.qty : 0, 0); //found에서 일치하는 id값의 qty, 0이 최대값=음수 안받음
    };

    if (error) return <div style={{ color: 'red', padding: 20 }}>{error}</div>;
    //padding:20 ~ 단위없이 숫자만 쓰면 리액트가 px 알아서 붙임. 그 외 단위는 반드시 쓸 것.
    return (
        <div className={styles.product}>
            <h2>Products</h2>
            <div className={styles.gridBox}>
                {list.map((item) => {
                    //list.map() ~ 내가 원하는걸 찝어내는 용도. 현재 list는 data가 부여된 상태 = product.json임.
                    const qty = getQty(item.id); //내가 선택한 상품의 id
                    return (
                        // 출력용도로 article 생성 = return안에 있어야 됨.
                        <article key={item.id} className={styles.card}>
                            <img
                                src={item.image}
                                alt={item.title}
                                className={styles.imgs}
                                style={{ width: '300px', height: '300px', objectFit: 'cover' }}
                            />
                            <div className={styles.info}>
                                <h3>{item.title}</h3>
                                <p>{item.price.toLocaleString()}원</p>
                            </div>
                            <div className={styles.btns}>
                                {
                                    qty === 0 ? (
                                        // 담기버튼
                                        <button onClick={() => add(item, 1)}>담기(상품선택)</button>
                                    ) : (
                                        // +, - 버튼, 수량을 나타내는 태그
                                        <div className={styles.btnOutBox}>
                                            <button
                                                onClick={() => dec(item.id)}
                                                aria-label={`${item.title} 상품 수량 감소 빼기`}
                                            >
                                                -
                                            </button>
                                            <span>{qty}</span>
                                            <button onClick={() => inc(item.id)} aria-label={'상품 수량 증가 더하기'}>
                                                +
                                            </button>
                                        </div>
                                    ) // 삼항 연산자 문법 end
                                }
                                {/* 구현 end */}
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
};

export default Products;
