import Model from './model';

export default class Pokemon extends Model {
	constructor(name) {
		super();
		this.id = name;
		this.basepath = '/api/v2/';

		this.data = null;
	}

	async get() {
		console.log(this);
		const res = { name: this.id };

		await this.superagent.get(`${ this.API_ROOT + this.basepath }pokemon/${ this.id }`)
			.then(r => {
				return Object.assign(res, { image: r.body.sprites.back_default }, r.body);
			})

		this.data = res;
		return res;
	}

	async getAbilities() {
		let abilities = [];

		this.data.abilities.forEach(async (data) => {
			let id = data.ability.url.replace('https://pokeapi.co/api/v2/ability/', '').replace('/', '');

			await this.superagent.get(`${ this.API_ROOT + this.basepath }ability/${ id }`)
			.then(r => {
				let effectEntries = r.body.effect_entries.filter((effect) => {
					return effect.language.name === "en";
				});

				abilities.push({
					name: data.ability.name,
					effect: effectEntries[0].effect
				});
			})
		});

		return abilities;
	}
}