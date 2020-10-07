import React from 'react'

function Rating({value, text}) {
    return (
        <div className="rating">
            <div>
                <span>
                    {value} stars
                </span>
                <span>
                    {/* if text show text */}
                    {text && text}    
                </span>                
            </div>
        </div>
    )
}

export default Rating;