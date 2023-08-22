//Clase que determinara cuando se termina la simulacion

export class Final{
	constructor(sistema){
		this.repetidor = sistema.getRepetidor()
		this.lista = []
		this.sistema = sistema
	}

	agregarItem(item){
		for(let i in this.lista){
			if(this.lista[i].getId() === item.getId()){
			return
			}
		}
		this.lista.push(item)
		if(this.lista.length === this.repetidor){
			this.sistema.getCuelloBotella()
			return console.log('simulacion terminada')
		}
	}

	getNombre(){
		return 'final'
	}

	getMax(){
		return 0
	}
}
