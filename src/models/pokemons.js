import Model from './model';

export default class Pokemons extends Model {
	constructor() {
		super();
		this.basepath = '/api/v2/pokemon';
	}

	async get(args = '') {
		let res = null;

		await this.superagent.get(`${this.API_ROOT + this.basepath + args}`)
			.then(r => {
				res = r.body.results;
			});

		return res;
	}

	async getImages(itens) {
		let results = [];

		itens.forEach(async (data) => {
			let id = data.name;

			await this.superagent.get(`${this.API_ROOT + this.basepath }/${ id }`)
			.then(r => {
				results.push({ name: id, image: r.body.sprites.back_default });
			})
		});

		return results;
	}
}