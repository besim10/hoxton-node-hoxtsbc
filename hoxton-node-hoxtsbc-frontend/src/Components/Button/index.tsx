import React from 'react';
import './style.css';

interface Props extends React.HTMLProps<HTMLButtonElement> {
  text: string;
  handleClick: () => void;
  type?: HTMLButtonElement['type'];
}

const Button = ({ text, handleClick, type, ...rest }: Props) =>
  <button onClick={handleClick} className={`.button-blue-large ${rest?.className ?? 'main'}`} {...rest}>{text}</button>

export default React.memo(Button);
