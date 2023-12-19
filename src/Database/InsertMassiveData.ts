import axios from "axios"
import { PrismaClient } from "@prisma/client";

const ImportMassiveData = async (): Promise<any> => {
    const prisma = new PrismaClient();
    const [poke] = await prisma.$transaction([
        prisma.pokemons.findMany(),
    ])
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0')
    let pokemonDetails: Array<any> = []

    let types: Array<any> = []

    for (let i = 1; i < 19; i++) {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${i}/`)

        types.push({
            name: data.name,
            [`pokemons_${data.name}`]: data.pokemon
        })

    }

    const AllPokemons = data?.results.map((pokemon: any) => ({
        IdPoke: parseInt(pokemon.url.slice(pokemon.url.length - 7, pokemon.url.length - 1).replace(/\D/g, "")),
        name: pokemon.name,
        url: pokemon.url,
    }))

    for (let i = 0; i < AllPokemons.length; i++) {
        const pokemon = AllPokemons[i];

        const type = searchPoke(pokemon, types)

        pokemon.type = type
        pokemon.image = poke[i]?.name === pokemon.name ? 
            poke[i].sprite : ''

        console.log(i)
    }
    
    for (let i = 902; i < AllPokemons.length; i++) {
        const pokemon = AllPokemons[i];
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)

        pokemonDetails.push({
            sprite: data.sprites.other.dream_world.front_default ?
            data.sprites.other.dream_world.front_default : '',
            name: data.name,
            props: data,
        })
        console.log(i)

        if (i > 1300) {
            console.log(pokemon.name, i)
            break
        }
    }

    // Inserta los mensajes en MongoDB
    await prisma.pokemons.createMany({
        data: AllPokemons
    })

    await prisma.pokeDetails.createMany({
        data: pokemonDetails
    })
}

const searchPoke = (pokemon: any, types: any) => {
    let typeName: Array<any> = []
    
    for (let index = 0; index < types.length; index++) {
        const tipo = types[index][`pokemons_${types[index].name}`].find((e: any) => e.pokemon.name === pokemon.name)
        if ( tipo ) {
            typeName.push(types[index].name)
        }
    }
    return typeName
}

export { ImportMassiveData }