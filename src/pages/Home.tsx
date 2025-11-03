import VideoSlider from '../com/VideoSlider';
import styles from './Home.module.scss';
const prefix = import.meta.env.BASE_URL;

const Home = () => {
    // Props 보내기
    let slides = [
        { src: `${prefix}/mov/video1.mp4`, title: 'Naver Works!', subtitle: '네이버웍스' },
        { src: `${prefix}/mov/video2.mp4`, title: 'Socar!', subtitle: '쏘카' },
        { src: `${prefix}/mov/video3.mp4`, title: 'KNUT!', subtitle: '국립한국교통대학교' },
    ];
    return (
        <div className={styles.home}>
            <div className={styles.sb}>
                <VideoSlider slides={slides} />
            </div>
        </div>
    );
};

export default Home;
