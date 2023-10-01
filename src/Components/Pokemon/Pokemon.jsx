import './Pokemon.css'
export default function Pokemon(props){
    return(
        <div className="pokemon">
            <img src={props.image} />
            <h1>{props.name}</h1>
        </div>
    )
}