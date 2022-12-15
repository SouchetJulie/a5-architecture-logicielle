import {Pokemon, PokemonType} from "@/core/entities/pokemon";
import {PokemonNotFound} from "@/core/errors/pokemonNotFound";
import {PokemonGateway} from "@/core/gateways/pokemonGateway";
import {pikachu} from "@/core/entities/pokemon.data";

export class InMemoryPokemonGateway implements PokemonGateway {
  private pokemon: Array<Pokemon> = [];
  private readonly pokemonTypes: any = PokemonType;

  public listAll(): Promise<Array<Pokemon>> {

    const sortedPokemonById: Array<Pokemon> = this.pokemon
        .sort((a, b) => a.id - b.id);

    return Promise.resolve(sortedPokemonById);
  }

  feedWith(...pokemon: Array<Pokemon>) {
    this.pokemon = pokemon;
  }

  public findOne(id: number): Promise<Pokemon> {
    const found: Pokemon | undefined = this.pokemon.find(
      (pokemon: Pokemon) => pokemon.id === id
    );

    if (!found) {
      throw new PokemonNotFound(id);
    }

    return Promise.resolve(found);
  }

  public getPokemonByType(type: PokemonType): Promise<Array<Pokemon>> {
    const filteredPokemon: Array<Pokemon> = this.pokemon.filter((pokemon) =>
      pokemon.types.includes(type)
    );
    return Promise.resolve(filteredPokemon);
  }

  public getAllTypes(): Promise<PokemonType> {
    return Promise.resolve(PokemonType as any);
  }
}
