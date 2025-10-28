// Window 객체에 넣음
export {};

declare global {
    interface Window {
        // Window: webAPI처럼 사용할 수 있도록 설정해줌 => Weather.tsx 66~67번째줄
        kakao: any; // any: 타입이 뭐가 들어오는지 모를 때
    }
}
