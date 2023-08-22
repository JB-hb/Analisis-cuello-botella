//clase del objeto sistema que agrupara en una estructura de arbol
//a todos los procesos

import {Arbol} from './arbol.mjs'
import {Tic} from './tic.mjs'
import {Item} from './item.mjs'

export class Sistema {

	constructor(repetidor){
		this.repetidor = repetidor
		this.contenido = new Arbol()
		this.interval = new Tic(60)
	}

	espera(){
		return new Promise((resolve)=>{
			const ready = setTimeout(()=>{return}, this.interval.getTime())
			resolve(1)
		})
	}

	async run(repetir = this.repetidor, cont = 0){
		const item = new Item(cont)
		this.contenido.insertItem(item)
		await this.espera()
		repetir -= 1
		cont += 1

		if(repetir>=0){
			return this.run(repetir, cont)
		}else{
			return true
		}
	}

	add(proceso, destino = undefined){
		if(destino === undefined){
			this.contenido.agregarNodo(proceso)
		}else{
			this.contenido.agregarNodo(proceso, destino)
		}
	}

	getRepetidor(){
		return this.repetidor
	}

	getCuelloBotella(){
		this.contenido.getData()
		this.contenido.printData()
	}

}
