import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import usePokemonList from "./usePokemonList.js"

function usePokemonDetails(id){
    // const{id}=useParams()
    const[pokemon,setPokemon]=useState({})
    async function downloadPokemon(){
        const response=await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokemonOfSameTypes=await axios.get(`https://pokeapi.co/api/v2/type/${response.data.types?response.data.types[0].type.name:''}`)
        setPokemon((state)=>({
            ...state,
            name:response.data.name,
            image:response.data.sprites.other.dream_world.front_default,
            weight:response.data.weight,
            height:response.data.height,
            types:response.data.types.map((t)=>t.type.name),
            similarPokemons:pokemonOfSameTypes.data.pokemon.slice(0,5)
        }))
        pokemonOfSameTypes.then((response)=>{
            setPokemon((state)=>({
                ...state,
                similarPokemons:response.data.pokemon
            }))
        })
        setPokemonListState({...pokemonListState,type:response.data.types?response.data.types[0].type.name:''})
    }

    const[pokemonListState,setPokemonListState]=usePokemonList(true)

    useEffect(()=>{
        downloadPokemon()
    },[])

    return[pokemon]
}

export default usePokemonDetails