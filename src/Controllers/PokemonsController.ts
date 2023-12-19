import { Request, Response } from "express";
import { 
    getAllPokemons as getAll, 
    getPokemonByName as getByName 
} from "../Services/PokemonService";

const getAllPokemons = async (req: Request, res: Response) => {
    const data = await getAll()
    res.send(data);
};

const getPokemonByName = async ({ params }: Request, res: Response) => {
    const { name } = params
    const data = await getByName(name)
    res.send(data);
};
  
export { getAllPokemons, getPokemonByName }