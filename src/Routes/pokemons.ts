import { Router } from "express";
import { getAllPokemons, getPokemonByName } from "../Controllers/PokemonsController";

const router = Router();
router.get("/getAll", getAllPokemons);
router.get("/:name", getPokemonByName);

export { router };