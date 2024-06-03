import { createSlice } from '@reduxjs/toolkit'

// 새로운 todo 항목의 id를 관리하기 위한 변수
let nextId = 0;

// 초기 todo 상태는 빈 배열
const initialState = [];

// Redux Toolkit의 createSlice 함수를 사용하여 todo 리듀서를 생성
export const todoSlice = createSlice({
   name: 'todofunction', // 슬라이스 이름
   initialState, // 초기 상태
   reducers: { // 리듀서 함수들
       add: (state, action) => { // todo 항목 추가 리듀서
           nextId++; // 새로운 todo 항목의 id 값 증가
           state.push({ // 새로운 todo 항목을 상태에 추가
               id: nextId, // 새로운 id 값
               text: action.payload, // 액션 페이로드에서 전달된 todo 텍스트
               complete: false, // 완료 여부 초기값은 false
           })
       },
       remove: (state, action) => { // todo 항목 삭제 리듀서
           // id가 액션 페이로드와 다른 todo 항목들만 새로운 배열로 리턴
           return state.filter(e => e.id !== action.payload)
       },
       complete: (state, action) => { // todo 항목 완료 여부 변경 리듀서
           // id가 액션 페이로드와 같은 todo 항목의 complete 값을 반전시킨 새로운 배열 리턴
           return state.map(e => e.id === action.payload ? { ...e, complete: !e.complete } : e)
       }
   }
})

// 각 리듀서 함수를 액션 생성자로 내보냄
export const { add, remove, complete } = todoSlice.actions

// store에서 add, remove, complete 액션을 내보낸다.
export default todoSlice.reducer