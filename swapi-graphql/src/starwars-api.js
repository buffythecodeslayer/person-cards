/**
 * Retrieves people data from swapi.dev
 */
import { RESTDataSource } from '@apollo/datasource-rest';

class StarWarsApi extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = 'https://swapi.dev/api/';
    }
  
    // swapi.dev does not require a page, but including it simplifies the design.
    async getPeople(page = 1) {
      try {
        const response = await this.get(`people/?page=${page}`);
        return response;
      } catch (error) {
        console.error(error);
        throw new Error('Starwars-Api: Failed to get people data');
      }
    }
}

export default StarWarsApi;
