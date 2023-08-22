//Clase del objeto donde se almacenaran los procesos del sistema en una
//estructura de arbol

import {Proceso} from './proceso.mjs'

export class Arbol{
	constructor(){
		this.root = new Proceso('inicio',0)
		this.datos = {}
	}

	empty(){
		if(this.root.getSiguiente() === undefined){
			return true
		}else{
			return false
		}
	}

	agregarNodo(proceso, destino = this.root, nodo = this.root){
		if(this.empty() === true){
			nodo.addSiguiente(proceso)
		}
		if(nodo.getNombre() === destino.getNombre()){
			nodo.addSiguiente(proceso)
			return true
		}
		for(let i in nodo.getSiguiente()){
			const temp = nodo.getSiguiente()[i]
			if(temp.getNombre() === destino.getNombre()){
				temp.addSiguiente(proceso)
				return true
			}
			if(temp.getSiguiente !== undefined){
				const fin = this.agregarNodo(proceso, destino, temp)
				if(fin === true){
					return
				}
			}
		}
		return false
	}

	insertItem(item){
		this.root.agregarItem(item)
	}

	getData(nodo = this.root, data = this.datos){
		this.datos = {...this.datos, [nodo.getNombre()] : nodo.getMax()}
		if(nodo.getSiguiente !== undefined){
			nodo.getSiguiente().forEach(elemento => {
				return this.getData(elemento)
			})
		}
		return	
	}

	printData(){
		let mayor = 0
		let proceso = null
		for(const [key, value] of Object.entries(this.datos)){
			if(value > mayor){
				mayor = value
				proceso = key
			}	
		}
		console.log(`El cuello de botella esta en el proceso ${proceso} \nse recomienda agregar mas estaciones de este proceso o optimizar internamente el proceso`)
	}
}
