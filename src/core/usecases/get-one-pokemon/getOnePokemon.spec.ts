import { InMemoryPokemonGateway } from "@/adapters/secondary/inMemoryPokemonGateway";
import { getOnePokemon } from "@/core/usecases/get-one-pokemon/getOnePokemon";
import { pikachu } from "@/core/entities/pokemon.data";

describe("Get the data of a pokemon with his id", function () {
  let pokemonGateway: InMemoryPokemonGateway;

  beforeEach(() => {
    pokemonGateway = new InMemoryPokemonGateway();
  });

  // Tests
  it("should return error if id does not exist", async () => {
    expect(() => getOnePokemon(pokemonGateway, 9999)).toThrow(
      "Pokemon not found with id 9999"
    );
  });
  it("should return the pokemon with corresponding id", async () => {
    pokemonGateway.feedWith(pikachu);
    expect(await getOnePokemon(pokemonGateway, 25)).toBe(pikachu);
  });
});
