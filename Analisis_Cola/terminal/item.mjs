//classe del objeto que almacenara la informacion de los item que seran
//pasados a los objetos

export class Item{
	constructor(id){
		this.id = id
		this.last = undefined
	}

	getId(){
		return this.id
	}

	getLast(){
		return this.last
	}

	setLast(last){
		this.last = last
	}
}
