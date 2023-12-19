import { 
    getAllPokemons as getAll,
    getPokemonByName as getByName
} from "../Respositories/PokemonsRepository"

const getAllPokemons = async (): Promise<any> => {
    return await getAll()
}

const getPokemonByName = async (name: string): Promise<any> => {
    return await getByName(name)
}

export { getAllPokemons, getPokemonByName }