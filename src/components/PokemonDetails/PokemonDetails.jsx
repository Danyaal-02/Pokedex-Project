import {useParams } from "react-router-dom"
import './PokemonDetails.css'
import usePokemonDetails from "../../hooks/usePokemonDetails.js"

function PokemonDetails({pokemonName}){
    const{id}=useParams()
    const[pokemon]=usePokemonDetails(id,pokemonName)

    return (
        <div className="pokemon-details-wrapper">
            <div className="pokemon-details-name"><span>{pokemon.name}</span></div>
            <img className="pokemon-details-image" src={pokemon.image} alt="" />
            <div className="pokemon-details-height">Height: {pokemon.height}</div>
            <div className="pokemon-details-weight">Weight: {pokemon.weight}</div>
            <div className="pokemon-details-types">
                {pokemon.types && pokemon.types.length > 0 && pokemon.types.map((t)=><div key={t}>{t}</div>)}
            </div>

            {
            pokemon.types && pokemon.similarPokemons &&
            <div>
                More {pokemon.types[0]} type pokemons
                <ul>
                    {pokemon.similarPokemons.map((p)=><li key={p.pokemon.url}>{p.pokemon.name}</li>)}
                </ul>
            </div>
            }
            
        </div>
    )
}

export default PokemonDetails