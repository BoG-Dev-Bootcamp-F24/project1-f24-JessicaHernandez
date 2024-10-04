import React, { useState, useEffect } from 'react';
import ButtonInfo from './ButtonInfo.jsx';

function Card() {
    const [currentId, setCurrentId] = useState(1);
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonHp, setPokemonHp] = useState(null);
    const [pokemonAttack, setPokemonAttack] = useState(null);
    const [pokemonDefense, setPokemonDefense] = useState(null);
    const [pokemonSpecialAttack, setPokemonSpecialAttack] = useState(null);
    const [pokemonSpeed, setPokemonSpeed] = useState(null);
    const [showInfo, setShowInfo] = useState(true);
    const [pokemonMoves, setPokemonMoves] = useState([]);
    const [activeButton, setActiveButton] = useState('info');



    const fetchPokemon = async (id) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (response.ok) {
            const data = await response.json();
            setPokemonData(data);
            setPokemonMoves(data.moves);


            const hpStat = data.stats.find(stat => stat.stat.name === 'hp');
            setPokemonHp(hpStat ? hpStat.base_stat : null);
            const attackStat = data.stats.find(stat => stat.stat.name === 'attack');
            setPokemonAttack(attackStat ? attackStat.base_stat : null);
            const defenseStat = data.stats.find(stat => stat.stat.name === 'defense');
            setPokemonDefense(defenseStat ? defenseStat.base_stat : null);
            const specialAttackStat = data.stats.find(stat => stat.stat.name === 'special-attack');
            setPokemonSpecialAttack(specialAttackStat ? specialAttackStat.base_stat : null);
            const speedStat = data.stats.find(stat => stat.stat.name === 'speed');
            setPokemonSpeed(speedStat ? speedStat.base_stat : null);
        } else {
            console.error('Pokémon not found');
        }
    };


    useEffect(() => {
        fetchPokemon(currentId);
    }, [currentId]);


    const handleInfoClick = () => {
        setShowInfo(true);
        setActiveButton('info');
    };

    const handleMovesClick = () => {
        setShowInfo(false);
        setActiveButton('moves');
    };


    const handlePrevious = () => {
        if (currentId > 1) {
            setCurrentId(currentId - 1);
        }
    };

    const handleNext = () => {
        setCurrentId(currentId + 1);
    };

    return (
        <>
            <div className="card-container">
                <div className="card">
                    <h2 className="card-title">{"Bits of Good Mid-Semester Project"}</h2>
                    <div className="card-content">
                        <div className="image">
                            <img
                                src={pokemonData ? pokemonData.sprites.front_default : 'basil.jpg'}
                                alt="Card Image"
                                className="card-pic"
                            />
                        </div>
                        <div className="name">
                            <p>{pokemonData ? pokemonData.name : 'Name of Pokémon'}</p>
                        </div>
                        <div className="pokemon_type">
                            <div className="types-text">Types:</div>

                        </div>
                        <div className="type">
                            {pokemonData && pokemonData.types.map((typeInfo) => (
                                <span key={typeInfo.type.name} style={{ backgroundColor: getTypeColor(typeInfo.type.name) }}>
                                    {typeInfo.type.name}
                                </span>
                            ))}
                        </div>

                        <div className="arrows">
                            <div className="left_arrow" onClick={handlePrevious}>
                                <p>&#60;</p>
                            </div>
                            <div className="right_arrow" onClick={handleNext}>
                                <p>&#62;</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card_right">
                    <div className="info_box">
                        {showInfo ? (
                            <div className="info-content">
                                <div className="hello-text">Info</div>
                                {pokemonData && (
                                    <>
                                        <div>
                                            <p>Height: {pokemonData.height / 10} m</p>
                                        </div>
                                        <div>
                                            <p>Weight: {pokemonData.weight} kg</p>
                                        </div>
                                        {pokemonHp !== null && (
                                            <div>
                                                <p>HP: {pokemonHp}</p>
                                            </div>
                                        )}
                                        {pokemonAttack !== null && (
                                            <div>
                                                <p>Attack: {pokemonAttack}</p>
                                            </div>
                                        )}
                                        {pokemonDefense !== null && (
                                            <div>
                                                <p>Defense: {pokemonDefense}</p>
                                            </div>
                                        )}
                                        {pokemonSpecialAttack !== null && (
                                            <div>
                                                <p>Special Attack: {pokemonSpecialAttack}</p>
                                            </div>
                                        )}
                                        {pokemonSpeed !== null && (
                                            <div>
                                                <p>Speed: {pokemonSpeed}</p>
                                            </div>
                                        )}
                                    </>
                                )}

                            </div>
                        ) : (
                            <>
                                <div className="hello-text">Moves</div>
                                <div className="moves-list">
                                    <ul>
                                        {pokemonMoves.map((moveInfo, index) => (
                                            <li key={index}>{moveInfo.move.name}</li> // Display move name
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}

                    </div>

                    <div className="buttons">
                        <ButtonInfo
                            label="Info"
                            onClick={handleInfoClick}
                            className={activeButton === 'info' ? 'active-button' : ''}
                        />
                        <ButtonInfo
                            label="Moves"
                            onClick={handleMovesClick}
                            className={activeButton === 'moves' ? 'active-button' : ''}
                        />
                    </div>

                </div>
            </div>
        </>
    );
}

const getTypeColor = (type) => {
    const typeColors = {
        grass: '#78C850',
        fire: '#EE8130',
        water: '#6390F0',
        bug: '#A6B91A',
        normal: '#A8A77A',
        electric: '#F7D02C',
        poison: '#A33EA1',
        grass: '#7AC74C',
        ice: '#96D9D6',
        fighting: '#C22E28',
        ground: '#E2BF65',
        flying: '#A98FF3',
        psychic: '#F95587',
        rock: '#B6A138',
        ghost: '#735797',
        dragon: '#6F35FC',
        dark: '#705746',
        steel: '#B7B7CE',
        fairy: '#D685AD'
        //need to add more
    };
    return typeColors[type] || '#A8A878';
};

export default Card;
