// Props 받기
// ✅ TypeScript에서는 Props를 받을 때 받는다고 타입을 지정해줘야함 (예: :React.FC<Props>)
import { useEffect, useState, useRef } from 'react';
import styles from './VideoSilder.module.scss';
// export로 나중에 활용할 수 있으니깐 interface는 전역변수로 남김
interface Slides {
    src: string;
    title: string;
    subtitle?: string;
}

// 이런식으로 최종적으로 알려줘야함
interface Props {
    slides: Slides[];
    autoplay?: boolean;
    intervalMs?: number;
}

const VideoSlider: React.FC<Props> = ({ slides, autoplay = true, intervalMs = 6000 }) => {
    let [index, setIndex] = useState(0);
    // 함수에 타입을 선언할 때는 => <>
    // 변수에 타입을 선언할 때는 => :
    let timerRef = useRef<number | null>(null);
    useEffect(() => {
        if (!autoplay) return;
        timerRef.current = window.setInterval(() => {
            setIndex((k) => (k + 1) % slides.length);
        }, intervalMs);

        return () => {
            if (timerRef.current) window.clearInterval(timerRef.current);
        };
    }, [slides.length, intervalMs, autoplay]);
    // 외부에서 Props로 넘어온 데이터는 다 적어줬었다 요새는 모름

    let kkk = slides[index];
    return (
        <div className={styles.videoSilder}>
            {/* 비디오는 모바일에서는 전체페이지로 강제변환함 (성능이 좋아지려고) */}
            {/* playsInline: 모바일 환경에서 전체화면으로 전환되지않고 페이지에서 재생 */}
            <video key={kkk.src} className={styles.video} src={kkk.src} autoPlay muted loop playsInline />
            <div className={styles.overlay} key={index}>
                <h2 className={styles.title}>{kkk.title}</h2>
                <p className={styles.subtitle}>{kkk.subtitle}</p>
            </div>
        </div>
    );
};

export default VideoSlider;
