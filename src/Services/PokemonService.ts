import { getAllPokemons as getAll } from "../Respositories/PokemonsRepository"

const getAllPokemons = async (): Promise<any> => {
    return await getAll()
}

export { getAllPokemons }