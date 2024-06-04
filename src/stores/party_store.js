import { create } from 'zustand';
import {PARTY_INFO, PARTY_LIST, PARTY_RESULT} from "../apis/party/partyURL";
import { postPrivateApi } from "../apis/privateApi";

const party_store = create((set) => ({
    storeId: null, // storeId 상태 추가

    partyList: [],
    partyId: null, // partyId 상태 추가
    partyName: '',
    partyHost: '',
    partyLimitNum: null,
    partyDescription: '',

    partyInfo: '',

    setPartyList: async (storeId) => {

        if(storeId){
        try {

            // 서버에 검색 요청
            const response = await postPrivateApi(PARTY_LIST(), { storeId });

            // 응답 데이터 유효성 검사
            if (response && Array.isArray(response) && response.length > 0) {
                // 응답 데이터가 유효하면 searchResults에 저장
                const updatedPartyList = response.map(party => ({
                    storeId: party.storeId,
                    partyName: party.partyName,
                    partyHost: party.partyHost,
                    partyLimitNum: party.partyLimitNum,
                    partyDescription: party.partyDescription
                }));
                set((state) => ({
                    partyList: [...state.partyList, ...updatedPartyList]
                }));            } else {
                console.log('No data received or data is not an array');
                // 응답 데이터가 유효하지 않으면 빈 배열 설정
                set({ partyList: [] });
            }
        } catch (error) {
            console.error('Error:', error);
            // 에러가 발생하면 searchResults를 빈 배열로 설정
            set({ partyList: [] });
        }
        }
    },


    setPartyInfo: async (clickedPartyId) => {

        try {
            // 서버에 검색 요청
            const response = await postPrivateApi(PARTY_INFO(), { clickedPartyId });
            // 응답 데이터 유효성 검사
            set({partyInfo:response});

        } catch (error) {
            console.error('Error:', error);
            // 에러가 발생하면 searchResults를 빈 배열로 설정
            set({ partyInfo: '' });
        }

    },

    setPartyStoreId: (storeId) => set({ storeId }), // storeId 설정 함수
    setPartyListRemove: () => set({ partyList: [] }), // 파티 리스트 초기화 함수

}));

export default party_store;