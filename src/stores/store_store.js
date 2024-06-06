import { create } from 'zustand';
import {SEARCH_LIST, STORE_RESULT} from "../apis/search/searchURL";
import { postPrivateApi } from "../apis/privateApi";

const store_store = create((set) => ({

    searchResults: [],

    storeResult: '',

    storeId: null,
    storeName: '',
    storeAddress: '',
    storeTel: '',
    storeDescription: '',
    storeLatitude: null, // 상점 위도 추가
    storeLongitude: null, // 상점 경도 추가

    searchKeyword:'',
    inputValue:'',

    setSearchKeyword: async (keyword) => {
        // 검색어 상태 업데이트
        set({ searchKeyword: keyword });
        console.log("서치키워드 넣었다");
        try {
            // 서버에 검색 요청
            set({ searchResults: [] });
            const response = await postPrivateApi(SEARCH_LIST(), { keyword });
            if (response && Array.isArray(response)) {
                set({ searchResults: keyword !== '' ? response : [] });

                if (response.length > 0) {
                    console.log('검색결과가 있습니다. 총 개수:' + response.length);
                } else {
                    console.log('검색결과가 없습니다');
                }
            } else {
                console.log('No data received or data is not an array');
                set({ searchResults: [] });
            }
        } catch (error) {
            console.error('Error:', error);
            set({ searchResults: [] });
        }
    },


    setStoreResult: async (storeId) => {
        // 검색어 상태 업데이트

        try {
            // 서버에 검색 요청
            const response = await postPrivateApi(STORE_RESULT(), { storeId });
            // 응답 데이터 유효성 검사
            set({storeResult:response});

        } catch (error) {
            console.error('Error:', error);
            // 에러가 발생하면 searchResults를 빈 배열로 설정
            set({ storeResult: '' });
        }

    },

    setInputValue: (inputValue) => set ({ inputValue }),
    setStoreId: (storeId) => set({ storeId }), // storeId 설정 함수
    setStoreResultRemove: (result) => set({result}),
    // 상점의 위도 및 경도 설정 함수
    setStoreLatLon: (latitude, longitude) => set({ storeLatitude: latitude, storeLongitude: longitude })
}));

export default store_store;
