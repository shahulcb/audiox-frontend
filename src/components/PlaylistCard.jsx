import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const PlaylistCard = ({ type, title }) => {
    const backgroundColors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-info', 'bg-success', 'bg-warning', 'bg-error'];
    const getRandomColorClass = () => {
        return backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    }
    return (
        <div className={`card h-40 text-primary-content rounded-md hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden ${getRandomColorClass()}`}>
            <div className="card-body items-center justify-center">
                <h2 className="font-bold text-xl">{type === "create" ? <FontAwesomeIcon icon={faPlus} /> : title}</h2>
            </div>
        </div>
    )
}

export default PlaylistCard
