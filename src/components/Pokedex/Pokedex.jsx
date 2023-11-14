import Search from "../Search/Search.jsx"
import './Pokedex.css'
import PokemonList from "../PokemonList/PokemonList.jsx"
import { useState } from "react"
import PokemonDetails from "../PokemonDetails/PokemonDetails.jsx"


function Pokedex(){
    const[searchTerm,setSearchTerm]=useState('')
    return(
        <div className="pokedex-wrapper">
            <Search updateSearchTerm={setSearchTerm}/>
            {(searchTerm.length==0)?<PokemonList />:<PokemonDetails key={searchTerm} pokemonName={searchTerm}/>}
        </div>
    )
}

export default Pokedex