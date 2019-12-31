import React from 'react';
import './style.scss';

export function FilterContainer({ children }) {
  return (
    <div className="filter-container">
      {children}
    </div>
  )
}

export function Option({ children }) {
  return (
    <div className="option-container">
      {children}
    </div>
  )
}

export function Result({ children }) {
  return (
    <div className="result-container">
      {children}
    </div>
  )
}