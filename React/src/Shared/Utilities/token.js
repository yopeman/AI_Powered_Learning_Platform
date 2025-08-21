import React from 'react';

export default function Token() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login';
        return null;
    }
    return (<></>);
}
