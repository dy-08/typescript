import styles from './Contact.module.scss';
import { useEffect, useState } from 'react';

const Contact = () => {
    const [url, setUrl] = useState('');
    const [date, setDate] = useState('');
    useEffect(() => {
        setUrl(
            'https://image.msscdn.net/thumbnails/campaign_service/images/cpcms/2025/7d700033c8394d5aa781773fdcc05986.jpg?w=1080'
        );
        setDate('11.01(토) - 11.03(월), 단 3일');

        return;
    }, []);

    const clicked = (id: string) => {
        switch (id) {
            case 'notice':
                setUrl(
                    'https://image.msscdn.net/thumbnails/campaign_service/images/cpcms/2025/7d700033c8394d5aa781773fdcc05986.jpg?w=1080'
                );
                setDate('11.01(토) - 11.03(월), 단 3일');
                return;
            case 'event':
                setUrl('https://image.msscdn.net/static/images/order/musinsa-money/musinsa-money-image1-1022.jpg');
                setDate('무신사머니 론칭 첫 결제 시 10% 추가 적립');
                return;
            case 'termsOfUse':
                setUrl(
                    'https://media.istockphoto.com/id/2165482001/ko/%EC%82%AC%EC%A7%84/%EC%8A%A4%EB%A7%88%ED%8A%B8-%ED%8F%B0%EC%9D%84-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B3%A0-%EC%84%9C%EB%B9%84%EC%8A%A4-%EC%95%BD%EA%B4%80%EC%9D%84-%EC%9D%BD%EA%B3%A0-%EC%9D%B4%EC%9A%A9-%EC%95%BD%EA%B4%80%EC%97%90-%EB%8F%99%EC%9D%98%ED%95%98%EB%8A%94-%EC%84%9C%EB%AA%85%EC%9D%84%ED%95%98%EB%8A%94-%EC%82%AC%EC%97%85%EA%B0%80.jpg?s=612x612&w=0&k=20&c=cEB5WJdtLQmKUbceVtmyzJrerl56aT0tSt10HfxL4FI='
                );
                setDate(
                    '제1조 (목적) 이 약관은 주식회사 무신사(이하 “회사”)가 운영하는 사이버몰 및 매장에서 제공하는 통신판매,'
                );
                return;
        }
    };
    return (
        <>
            <div className={styles.contact}>
                <div id='notice' className={styles.contact_i} onClick={() => clicked('notice')}>
                    <div>
                        <p className={styles.contact_i_title}>공지 사항</p>
                    </div>
                </div>
                <div id='event' className={styles.contact_i} onClick={() => clicked('event')}>
                    <div>
                        <p className={styles.contact_i_title}>이벤트</p>
                    </div>
                </div>
                <div id='termsOfUse' className={styles.contact_i} onClick={() => clicked('termsOfUse')}>
                    <div>
                        <p className={styles.contact_i_title}>이용 약관</p>
                    </div>
                </div>
            </div>
            <div className={styles.contact_display}>
                <section className={styles.contact_cards}>
                    <div>
                        <img src={url} />
                    </div>
                    <div>{date}</div>
                </section>
            </div>
        </>
    );
};

export default Contact;
