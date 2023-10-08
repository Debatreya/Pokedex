import axios from "axios";
import { useEffect, useState } from "react";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

export default function PokemonList() {
    
    // const [PokemonList, setPokemonList] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    // const [nextUrl, setNextUrl] = useState(null);
    // const [prevUrl, setPrevUrl] = useState(null);

    // Advance UseSate. We can replace all the above useStates using only 1 useState
    const [pokemonListState, setPokemonListState] = useState({
        PokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: null,
        prevUrl: null
    });

    useEffect(() => {
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
                // setIsLoading(false);
                // setPokemonListState({ ...pokemonListState, isLoading: false});
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [pokemonListState.pokedexUrl]);

    return (
        <div className="pokemon-list-wrapper">
            <h3>Pokemon List</h3>
            <div className="pokemon-wrapper">
                {pokemonListState.isLoading ? 'Loading.....' : 
                    pokemonListState.PokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
                }
            </div>
            <div className="controls">
                <button className="prev" disabled={pokemonListState.prevUrl == null} onClick={() => setPokemonListState((state) => ({...state, pokedexUrl: state.prevUrl}))}>Prev</button>
                <button className="next" disabled={pokemonListState.nextUrl == null} onClick={() => setPokemonListState((state) => ({...state, pokedexUrl: state.nextUrl}))}>Next</button>
            </div>
        </div>
    );
}
