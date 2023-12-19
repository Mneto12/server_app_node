import { Request, Response } from "express";
import { getAllPokemons as getAll } from "../Services/PokemonService";

const getAllPokemons = async (req: Request, res: Response) => {
    const data = await getAll()
    res.send(data);
};
  
export { getAllPokemons }