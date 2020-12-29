import React from 'react'

export default function FormError({ errorMessage }) {
    return (
        <div className="error__title">
            <small >{errorMessage}</small>
        </div>
    )
}
