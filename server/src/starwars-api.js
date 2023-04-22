/**
 * Retrieves people data from swapi.dev
 */
import { RESTDataSource } from '@apollo/datasource-rest';

class StarWarsApi extends RESTDataSource {
    constructor() {
      super();
      this.baseURL = 'https://swapi.dev/api/';
    }
  
    async getPeople(page = 1) {
      try {
        const response = await this.get(`people/?page=${page}`);
        return response;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to get people data');
      }
    }
}

export default StarWarsApi;
