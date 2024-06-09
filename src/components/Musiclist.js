import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase, clearmusic } from '../redux/musicSlice';
import { openModal, closeModal } from '../redux/modalSlice';
import { CartIcon, ChevronDown, ChevronUp } from '../contants/icons';
import styled from 'styled-components';

const IMG = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

export default function Musiclist() {
  const dispatch = useDispatch();
  const { cartItems, totalAmount, totalQuantity } = useSelector(state => state.music);
  const { showModal } = useSelector((state) => state.modal);

  const musiclistView = cartItems.map((music) => (
    <li key={music.id}>
      <IMG src={music.img} alt={music.title} />
      <div>{music.title}</div>
      <div>{music.singer}</div>
      <div>{music.price}</div>
      <button type="button" onClick={() => dispatch(increase({ id: music.id }))}>
        +
      </button>
      <div>{music.amount}</div>
      <button type="button" onClick={() => dispatch(decrease({ id: music.id }))}>
        -
      </button>
    </li>
  ));

  function clearCart() {
    dispatch(clearmusic());
    dispatch(closeModal());
  }

  return (
    <>
      <ul>{musiclistView}</ul>
      <div>
        전체 금액: {totalAmount}원 / 전체 수량: {totalQuantity}개
      </div>
      <button onClick={() => dispatch(openModal())}>장바구니 비우기</button>
      <Modal show={showModal}>
        <ModalContent>
          <h2>장바구니 비우기</h2>
          <p>장바구니를 비우시겠습니까?</p>
          <button onClick={clearCart}>예</button>
          <button onClick={() => dispatch(closeModal())}>아니오</button>
        </ModalContent>
      </Modal>
    </>
  );
}