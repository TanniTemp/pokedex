export default async function getPokemonData(limit = 12, offset = 0) {  
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await res.json();
    
    return data.results.map((pokemon: {id:number,name:string,url:string}) => ({
        id: pokemon.url.split("/").slice(-2, -1)[0], // Extract Pokemon ID from URL for image source
        name: pokemon.name,
        url: pokemon.url
    }));
}
