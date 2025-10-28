export interface WeatherAPI {
    coord?: { lon: number; lat: number };
    weather: Array<{ id: number; main: string; description: string; icon: string }>;
    main: {
        temp: number;
        feel_like?: number;
        temp_min?: number;
        temp_max?: number;
        pressure?: number;
        humidity?: number;
    };
    wind?: {
        speed?: number;
        deg?: number;
    };
    sys?: {
        country?: string;
        sunrise?: number;
        sunset?: number;
    };
    name: string;
    dt?: number;
}

export interface WeatherData {
    city: string;
    temp: number;
    icon: string;
    desc: string;
}

// type을 확정하기 애매 할 때 <T> 사용 ✅
// export interface abcd<T> {
//     name: string;
//     data: T;
// }
