import Search from "../Search/Search.jsx"
import './Pokedex.css'
import PokemonList from "../PokemonList/PokemonList.jsx"


function Pokedex(){
    return(
        <div className="pokedex-wrapper">
            <Search/>
            <PokemonList />
        </div>
    )
}

export default Pokedex