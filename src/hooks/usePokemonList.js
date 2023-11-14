import axios from "axios"
import { useEffect, useState } from "react"

function usePokemonList(){
    const[pokemonListState,setPokemonListState]=useState({
        pokemonList:[],
        isLoading:true,
        pokedexUrl:'https://pokeapi.co/api/v2/pokemon/',
        nextUrl:'',
        prevUrl:''
    })

    async function downloadPokemons(){
           
        
        //setIsLoading(true)
        setPokemonListState((state)=>({...state,isLoading:true}))
        // Fetch the list of 20 pokemons
        const response = await axios.get(pokemonListState.pokedexUrl)
        const pokemonResults = response.data.results // Retrieve the array of pokemons from the result

        console.log(response.data)
        // setNextUrl(response.data.next)
        // setPrevUrl(response.data.previous)
        setPokemonListState((state)=>({
            ...state,
            nextUrl:response.data.next,
            prevUrl:response.data.previous
        }))

        // Iterate over the array of pokemons to create an array of promises
        // that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
        const pokemonData = await Promise.all(pokemonResultPromise) // Get an array of 20 pokemon detailed data
        console.log('data',pokemonData)

        // Iterate through the data of each pokemon to extract id, name, and types
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
        })
        console.log(pokeListResult)
        // setPokemonList(pokeListResult)
        // setIsLoading(false)
        setPokemonListState((state)=>({
            ...state,
            pokemonList:pokeListResult,
            isLoading:false
        }))

        
    }

    useEffect(() => {
        downloadPokemons()
    }, [pokemonListState.pokedexUrl])

    return[pokemonListState,setPokemonListState]
}

export default usePokemonList