import axios from "axios";
import { useEffect, useState } from "react";
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

export default function PokemonList() {
    
    const [PokemonList, setPokemonList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
    const [nextUrl, setNextUrl] = useState(null);
    const [prevUrl, setPrevUrl] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(pokedexUrl);
                setNextUrl(response.data.next);
                setPrevUrl(response.data.previous); // Use response.data.previous

                const pokemonResults = [...response.data.results];
                const pokemonResultPromises = pokemonResults.map((pokemon) => axios.get(pokemon.url));
                const pokemonData = await Promise.all(pokemonResultPromises); // Use Promise.all

                const res = pokemonData.map((pokeData) => ({
                    id: pokeData.data.id,
                    name: pokeData.data.name,
                    image: pokeData.data.sprites.other.dream_world.front_default,
                    types: pokeData.data.types,
                }));

                setPokemonList(res);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [pokedexUrl]);

    return (
        <div className="pokemon-list-wrapper">
            <h3>Pokemon List</h3>
            <div className="pokemon-wrapper">
                {isLoading ? 'Loading.....' : 
                    PokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)
                }
            </div>
            <div className="controls">
                <button className="prev" disabled={prevUrl == null} onClick={() => setPokedexUrl(prevUrl)}>Prev</button>
                <button className="next" disabled={nextUrl == null} onClick={() => setPokedexUrl(nextUrl)}>Next</button>
            </div>
        </div>
    );
}
