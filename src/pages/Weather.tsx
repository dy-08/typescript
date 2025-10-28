import { useEffect, useState } from 'react';
import axios from 'axios';
// 타입을 가지고올 때는 import type을 적어주어야함
import type { WeatherAPI, WeatherData } from '../types/weather';
import styles from './Weather.module.scss';
const APIKEY_OPENWEATHER = 'a4bfe6de4970ebc1f4f7245e8443d703';
const APIKEY_KAKAO = 'b44fd652bbfd036d382bdbe44f110976';
const Weather = () => {
    // 함수의 타입을 알려줄 때는<> (2가지 이상 타입이 들어갈 경우 < | >)
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [time, setTime] = useState<string>('');
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            // ✅
            const formatTime = now.toLocaleString('ko-KR', {
                year: 'numeric', // 2-digit 둘중 하나 선택
                month: 'long', // short
                day: 'numeric',
                weekday: 'long',
                hour: '2-digit',
                minute: '2-digit',
            });

            setTime(formatTime);
        };
        updateTime();
        const timer = setInterval(updateTime, 60 * 1000);
        return () => clearInterval(timer);
    }, []); // 시간,날짜 구하기

    // return: 종료하는게 다르기 때문에 useEffect가 따로 만들어야함
    useEffect(() => {
        // 현재위치 가져오기 (web api)
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                // 타입스크립트라 이름을 변경해서 가져오지못함 (정확히 적어주어야함, 예:lat 불가능 => latitude 가능)
                const { latitude, longitude } = pos.coords; // coords: 위도와 경도를 가지고 있음
                try {
                    // 날씨 가져오기
                    // https://openweathermap.org/current 참고
                    // &units=metric (기본: 화씨, 옵션: 섭씨)
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY_OPENWEATHER}&units=metric&lang=kr`;
                    // WeatherAPI 타입으로 받음
                    const { data } = await axios.get<WeatherAPI>(url);
                    // 객체는 인터페이스를 만들어놓고 집어넣을 때에는 타입대신 인터페이스를 알려줘야함
                    // 객체와 인터페이스의 차이 , 와 ;
                    const reData: WeatherData = {
                        city: data.name,
                        temp: data.main.temp,
                        icon: data.weather[0].icon,
                        desc: data.weather[0].description,
                    };
                    setWeather(reData);
                } catch {
                    setError('날씨 정보를 불러오지 못했습니다');
                }

                // 카카오맵 가져오기
                const script = document.createElement('script');
                script.type = 'text/javascript';
                // http: < 붙여야함, &autoload=false
                script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APIKEY_KAKAO}&autoload=false`;
                script.onload = () => {
                    // script문에서 react에게 객체라고 알려줄라고 as HTML 써줘야함
                    // kakao.d.ts에서 window넣어서 지금 사용할 수 있는거임
                    // load(()=>{...}): 지금 스크립트안에서 코드 작성해주는 작업
                    window.kakao.maps.load(() => {
                        const mapContainer = document.getElementById('map') as HTMLElement;
                        const mapOption = {
                            center: new window.kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
                            level: 3, // 지도의 확대 레벨
                        };
                        // 마커가 표시될 위치입니다
                        const markerPosition = new window.kakao.maps.LatLng(latitude, longitude);
                        const map = new window.kakao.maps.Map(mapContainer, mapOption);

                        // 마커를 생성합니다
                        const marker = new window.kakao.maps.Marker({
                            position: markerPosition,
                        });
                        console.log('mapEl', mapContainer, mapContainer?.offsetWidth, mapContainer?.offsetHeight);

                        // 마커가 지도 위에 표시되도록 설정합니다
                        marker.setMap(map);
                        // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
                        // marker.setMap(null);
                    }); // kakao load end
                }; // script onload end
                document.body.appendChild(script);
            },

            (error) => {
                console.log(error);
                setError('위치정보를 가져올 수 없습니다');
            } // pos end
        );
    }, []); // useEffect end
    if (error) return <p className={styles.error}>{error}</p>;
    if (!weather) return null;
    return (
        <div className={styles.weather}>
            <div className={styles.info}>
                <h2>오늘의 현재 날씨</h2>
                <p>{time}</p>
                <div className={styles.datas}>
                    <p>{weather.city}</p>
                    <p>{weather.temp} ℃</p>
                    <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
                    <p>{weather.desc}</p>
                </div>
            </div>
            <div id='map' className={styles.map}></div>
        </div>
    );
};

export default Weather;
