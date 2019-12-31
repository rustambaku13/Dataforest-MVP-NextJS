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
    <div style={{ padding: '3rem 15px 0 3rem', width: '33%' }}>
      {children}
    </div>
  )
}

export function Result({ children }) {
  return (
    <div style={{ padding: '3rem 15px 0 15px', width: '66%' }}>
      {children}
    </div>
  )
}