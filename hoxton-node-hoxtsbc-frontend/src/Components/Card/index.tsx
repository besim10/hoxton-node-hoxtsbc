import './style.css';
import React from 'react'

interface Props {
  header?: string;
  text?: string;
  children?: any;
}

const Card = ({ header, text, children }: Props): JSX.Element =>
  <div className='card'>
    {header && <h4>{header}</h4>}
    {text && <p>{text}</p>}
    {children}
  </div>


export default React.memo(Card)
