import { useState, useEffect } from "react";
import axios from "axios";

export default function usePokemonList(url, type){
    const [pokemonListState, setPokemonListState] = useState({
        PokemonList: [],
        isLoading: true,
        pokedexUrl: url,
        nextUrl: null,
        prevUrl: null
    });
    const fetchData = async () => {
            // setIsLoading(true);
            setPokemonListState((state) => ({ 
                ...state, 
                isLoading: true
            }));
            try {
                const response = await axios.get(pokemonListState.pokedexUrl);
                // setNextUrl(response.data.next);
                setPokemonListState((state) => ({ 
                    ...state, 
                    nextUrl: response.data.next, 
                    prevUrl: response.data.previous
                }))
                // setPrevUrl(response.data.previous); // Use response.data.previous
                if(type){
                    setPokemonListState((state) => ({
                        ...state,
                        PokemonList: response.data.pokemon.slice(0, 5)
                    }))
                    console.log('hi', pokemonListState.PokemonList);
                }
                else{
                    const pokemonResults = [...response.data.results];
                    const pokemonResultPromises = pokemonResults.map((pokemon) => axios.get(pokemon.url));
                    const pokemonData = await Promise.all(pokemonResultPromises); // Use Promise.all

                    const res = pokemonData.map((pokeData) => ({
                        id: pokeData.data.id,
                        name: pokeData.data.name,
                        image: pokeData.data.sprites.other.dream_world.front_default,
                        types: pokeData.data.types,
                    }));

                    // setPokemonList(res);
                    setPokemonListState((state) => ({...state,
                        PokemonList: res,
                        isLoading: false
                    }))
                }
                // setIsLoading(false);
                // setPokemonListState({ ...pokemonListState, isLoading: false});
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    useEffect(() => {
        fetchData();
    }, [pokemonListState.pokedexUrl]);
    return [pokemonListState, setPokemonListState];
}