import superagentPromise from 'superagent-promise';
import superagent from 'superagent';

export default class Model {
	constructor() {
		this.API_ROOT = 'https://pokeapi.co';
		this.superagent = superagentPromise(superagent, global.Promise);

		this.basepath = '';
	}
}