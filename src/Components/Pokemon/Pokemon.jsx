import { Link } from 'react-router-dom'
import './Pokemon.css'
export default function Pokemon(props){
    return(
        <Link to={`/pokemon/${props.id}`}>
            <div className="pokemon">
                <img src={props.image} />
                <h1>{props.name}</h1>
            </div>
        </Link>
    )
}