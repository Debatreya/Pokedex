import useDebounce from "../../hooks/useDebounce"
import "./Search.css"
// import { useState } from "react";
export default function Search({updateSearchTerm}){
    const debouncedCallback = useDebounce((e) => updateSearchTerm(e.target.value), 500)
    // const [searchTerm, setsearchTerm] = useState('');
    return(
        <div className="search-wrapper">
            <input 
                id="pokemon-name-search"
                type="text"
                placeholder="pokemon name..."
                onChange={debouncedCallback}
            />
        </div>
    )
}
