import { Router } from "express";
import { getAllPokemons } from "../Controllers/PokemonsController";

const router = Router();
router.get("/getAll", getAllPokemons);

export { router };