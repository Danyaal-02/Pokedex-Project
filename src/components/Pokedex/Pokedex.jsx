import Search from "../Search/Search.jsx"
import './Pokedex.css'
import PokemonList from "../PokemonList/PokemonList.jsx"


function Pokedex(){
    return(
        <div className="pokedex-wrapper">
            <h1 id="pokedex-heading">Pokedex</h1>
            <Search/>
            <PokemonList />
        </div>
    )
}

export default Pokedex