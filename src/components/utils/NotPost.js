import React from 'react';
import empty from '../../assets/empty.svg';

export default function NotPost({ text }) {
    return (
        <div className='not-post-component'>
            <div className='post-image-container'>
                <h2>No hay posts públicos disponibles</h2>
                <object type='image/svg+xml' data={empty}>
                    {text}
                </object>
            </div>
        </div>
    )
}
