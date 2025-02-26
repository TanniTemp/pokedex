"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
interface Pokemon {
  id: number;
  name: string;
  url: string;
  height: number;
  category: string;
  weight: number;
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}
interface Species {
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  genera: { genus: string; language: { name: string } }[];
}
function Page() {
  const [pokemonData, setPokemonData] = useState<Pokemon>({
    id: 0,
    name: "",
    url: "",
    height: 0,
    weight: 0,
    category: "",
    abilities: [{ ability: { name: "" } }],
    types: [{ type: { name: "" } }],
    stats: [{ base_stat: 0, stat: { name: "" } }],
  });
 
  const [speciesData, setSpeciesData] = useState<Species>({
    flavor_text_entries: [{ flavor_text: "", language: { name: "" } }],
    genera: [{ genus: "", language: { name: "" } }],
  });
  const {id} = useParams();
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const data = await res.json();
        const speciesRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const species = await speciesRes.json();
        setSpeciesData(species);
        setPokemonData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemon();
  }, [id]);
  console.log(pokemonData);
  console.log(speciesData);

  return (
    
     <div className="h-[100vh] relative bg-black text-white flex flex-col p-6">
       
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        {/* tiitle */}
        <Link
          href={"/"}
          passHref
          className="flex text-3xl font-bold items-center justify-center"
        >
          P
          <Image
            className=" animate-bounce"
            src="/pokemon.png"
            width={50}
            height={50}
            alt="pokemon"
           
          />
          KEMON
        </Link>
      </div>

      {/* navigation menu */}
      <div className="flex justify-evenly  p-4 gap-3 ">
        {/* move backwards */}
        <Link
          href={`/pokemon/${pokemonData.id - 1}`}
          passHref
          className="flex gap-3 justify-start items-center"
        >
          <ArrowLeft /> <p> Prev Pokemon</p>
        </Link>
        {/* move forward */}
        <Link
          href={`/pokemon/${pokemonData.id + 1}`}
          passHref
          className="flex justify-end gap-3 items-center"
        >
          <p> Next Pokemon </p> <ArrowRight />
        </Link>
      </div>

      {/* pokemon Name */}
      <div className="flex mx-auto uppercase gap-4 text-3xl">
        {pokemonData.name} <p>#{pokemonData.id}</p>
      </div>

      {/* pokemon Details */}
      <div className="grid p-6 pt-10 md:grid-cols-2 grid-cols-1 gap-4 max-w-screen-md mx-auto">
        {/* image and stats */}
        <div className="flex flex-col gap-4 bg-white rounded-xl justify-start">
          {/* image */}
          <Image
            className="mx-auto"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`}
            width={200}
            height={200}
            alt={pokemonData.name}
          />
          {/* stats */}
          <div></div>
        </div>

        {/* bio, type, other info */}
        <div className="pt-6 bg-white p-6 rounded-xl text-black gap-4 flex items-start justify-start flex-col">
          {/* bio */}
          {
    speciesData.flavor_text_entries.find(entry => entry.language.name === "en")?.flavor_text || "No description available"
  }
          {/* about */}
          <div className="grid grid-cols-2  bg-[#2ea7d7] rounded-xl p-4 justify-between w-full gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-black font-semibold">Height</h1>
              <h3 className="text-white">
                {Math.floor((pokemonData.height / 10) * 3.28084) +
                  "'" +
                  Math.round(((pokemonData.height / 10) * 39.3701) % 12) +
                  '"'}
              </h3>

              <h1 className="text-black font-semibold">Weight</h1>
              <h3 className="text-white">
                {((pokemonData.weight / 10) * 2.20462).toFixed(1) + " lbs"}
              </h3>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-black font-semibold">Category</h1>
              <h3 className="text-white">
                {speciesData.genera.find((gen) => gen.language.name === "en")
                  ?.genus || "Unknown"}
              </h3>

              <h1 className="text-black font-semibold">Abilities</h1>
              <h3 className="text-white">
                {pokemonData.abilities[0].ability.name}
              </h3>
            </div>
          </div>

          {/* type */}
          <div>
            <h1 className="font-bold tracking-wider">Types</h1>
            <div className="flex gap-2">
              {pokemonData.types.map((type) => (
                <div
                  key={type.type.name}
                  className={` py-2 px-3 rounded-xl text-black`}
                  style={{ backgroundColor: `var(--${type.type.name})` }}
                >
                  {type.type.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Page;
