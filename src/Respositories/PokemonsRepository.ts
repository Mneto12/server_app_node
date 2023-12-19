import axios from "axios"
import { PrismaClient } from "@prisma/client";

const getAllPokemons = async (): Promise<any> => {
    const prisma = new PrismaClient();

    try {
        const pokemons = await prisma.pokemons.findMany()
        return pokemons
    } catch (e) {
        console.error(e);
        prisma.$disconnect();
        return e;
    }
}

const getPokemonByName = async (name: string): Promise<any> => {
    const prisma = new PrismaClient();

    try {
        const pokemon = await prisma.pokeDetails.findFirstOrThrow({
            where: {
                name: name
            }
        })
        return pokemon
    } catch (e) {
        console.error(e);
        prisma.$disconnect();
        return e;
    }
}

export { getAllPokemons, getPokemonByName }