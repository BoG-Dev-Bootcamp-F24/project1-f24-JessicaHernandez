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
    };


    const handleMovesClick = () => {
        setShowInfo(false);
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
                    <div className="card-content">
                        <h2 className="card-title">{pokemonData ? pokemonData.name : 'Loading...'}</h2>
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
                                            <h4>Height: {pokemonData.height / 10} m</h4>
                                        </div>
                                        <div>
                                            <h4>Weight: {pokemonData.weight} kg</h4>
                                        </div>
                                        {pokemonHp !== null && (
                                            <div>
                                                <h4>HP: {pokemonHp}</h4>
                                            </div>
                                        )}
                                        {pokemonAttack !== null && (
                                            <div>
                                                <h4>Attack: {pokemonAttack}</h4>
                                            </div>
                                        )}
                                        {pokemonDefense !== null && (
                                            <div>
                                                <h4>Defense: {pokemonDefense}</h4>
                                            </div>
                                        )}
                                        {pokemonSpecialAttack !== null && (
                                            <div>
                                                <h4>Special Attack: {pokemonSpecialAttack}</h4>
                                            </div>
                                        )}
                                        {pokemonSpeed !== null && (
                                            <div>
                                                <h4>Speed: {pokemonSpeed}</h4>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="moves-list">
                                <div className="hello-text">Moves</div>
                                <ul>
                                    {pokemonMoves.map((moveInfo, index) => (
                                        <li key={index}>{moveInfo.move.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="buttons">
                        <ButtonInfo label="Info" onClick={handleInfoClick} />
                        <ButtonInfo label="Moves" onClick={handleMovesClick} />
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
        water: '#6390FO',
        bug: '#A6B91A',
        normal: '#A8A77A',
        electric: '#F7D02C',
        poison: '#A33EA1',

        //need to add more
    };
    return typeColors[type] || '#A8A878';
};

export default Card;
