"use client";
import getPokemonData from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [allPokemonData, setAllPokemonData] = useState<{ id: string; name: string }[]>([]);
  const [pokemon, setPokemon] = useState<{ id: string; name: string }[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(12);
  
  const [search, setSearch] = useState("");

  //get all pokemon data
  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const data = await getPokemonData(10000, 0); 
        setAllPokemonData(data);
        setPokemon(data.slice(0, limit));
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllPokemon();
  }, [limit]);

  // Pagination
  useEffect(() => {
    if (!search) {
      setPokemon(allPokemonData.slice(0, offset + limit));
    }
  }, [offset, search,allPokemonData,limit]);

  // Handle search
  useEffect(() => {
    if (search) {
      const filtered = allPokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      );
      setPokemon(filtered);
    } else {
      setPokemon(allPokemonData.slice(0, offset + limit));
    }
  }, [search, allPokemonData, offset,limit]);

  return (
    <div className="w-[100vw] h-[100vh] bg-black text-white flex flex-col p-6 ">
      {/* nav */}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {/* tiitle */}
         <div className="flex text-3xl font-bold items-center justify-center">
          P <Image className=" animate-bounce" src="/pokemon.png" width={50} height={50} alt="pokemon" />KEMON
         </div>

        {/* Search Bar */}
          <div className="flex gap-4 justify-center items-center ">
            <input
              type="text"
              placeholder="Search Pokémon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className=" p-3 mt-2 rounded-xl   text-black"
            />

         {
          search&&  <Image className=" animate-spin  "  src={'/pokemon.png'} alt={"pokemon"} height={50} width={50}  />||   <Image src={'/pokemon.png'} alt={"pokemon"} height={50} width={50}  />
         }
            
          </div>

      </div>
      {/* Pokémon List */}
      <div className="grid md:grid-cols-3 grid-cols-1 lg:grid-cols-4 p-10 gap-4 mt-4">
        {pokemon.map((pokemon) =>(
          
          <Link href={`/pokemon/${pokemon.id}`} passHref key={pokemon.id}  className="bg-white text-black p-4 rounded-lg flex flex-col items-start justify-start">
            {/* image */}
            <Image className="bg-gray-400 mx-auto p-2 rounded-xl" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} width={200} height={200} alt={pokemon.name} />
            <div className="text-gray-400 px-5 py-1">#{pokemon.id}</div>
            {/* name */}
            <div className="pt-3 px-5 text-xl uppercase">{pokemon.name}</div>
             
          
          </Link>
        ))}
        </div>
         {/* Load More Button*/}
      {!search && (
        <div className="pb-40 w-full flex justify-center">
        <button className=" mx-auto bg-white px-5 py-2 text-black rounded-xl text-xl font-semibold tracking-wide " type="button" onClick={() => setOffset((prev) => prev + limit)} >
          Load More
        </button>
        </div>
       
      )}
     <div className="">
     
     </div>
    </div>
  );
}
