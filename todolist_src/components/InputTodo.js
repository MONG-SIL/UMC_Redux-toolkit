import React, {useState} from 'react'
import {useDispatch  } from 'react-redux'
import {add} from '../redux/todoSlice'

export default function InputTodo() {
   // Redux 액션을 디스패치할 수 있는 dispatch 함수를 가져옴
   const dispatch = useDispatch();

   // todolist 상태와 이를 업데이트할 수 있는 setTodolist 함수를 초기화
   // 초기값은 { id: 0, text: "" }
   const [todolist, setTodolist] = useState({ id: 0, text: "" });

   // input 필드의 값이 변경될 때마다 호출되는 함수
   function handleText(e) {
       // todolist 객체의 text 속성만 업데이트
       setTodolist({text : e.target.value})
   }

   // input 필드를 초기화하는 함수
   function onReset () {
       setTodolist({text : ""})
   }

   // form이 제출될 때마다 호출되는 함수
   function handleSubmit(e) {
       // 기본 form 동작 방지
       e.preventDefault();

       // todolist의 text 값이 비어있지 않은 경우
       if (todolist.text !== "") {
           // add 액션을 디스패치하여 todolist 업데이트
           dispatch(add(todolist.text));
           // 텍스트 초기화
           onReset();
       } else {
           // 텍스트가 비어있는 경우 경고 메시지 출력
           alert("할 일을 입력해주세요.");
       }

       // 입력 필드 초기화
       onReset()
   }

   return (
       <div >
           {/* handleSubmit 함수를 onSubmit 이벤트 핸들러로 설정 */}
           <form onSubmit={handleSubmit}>
               <div>
                   {/* input 필드의 값을 todolist.text로 바인딩 */}
                   {/* handleText 함수를 onChange 이벤트 핸들러로 설정 */}
                   <input
                       type="text"
                       value={todolist.text}
                       onChange={handleText}
                   />
                   {/* form 제출 버튼 */}
                   <input
                       type="submit"
                       value="+"
                   />
               </div>
           </form>
       </div>
   )
}