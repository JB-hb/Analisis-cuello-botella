//Clase del objeto que representara los procesos del sistema
//cada proceso es un nodo del arbol de sistema

import {Cola} from './cola.mjs'
import {Tic} from './tic.mjs'

export class Proceso{

	constructor(nombre, duracion){
		this.nombre = nombre
		this.tiempo = new Tic(duracion)
		this.cola = new Cola()
		this.terminado = 0
		this.activo = false
		this.mayorCola = 0
		this.dependenci = undefined
		this.siguiente = undefined
	}

	start(item){
		return new Promise((resolve) => {
			setTimeout(()=>{
				item.setLast(this.getNombre())
				if(this.siguiente !== undefined){
					this.siguiente.forEach(elemento => {
						elemento.agregarItem(item)
					})
				}
				resolve(1)
			}, this.tiempo.getTime())
		})
	}

	async run(item, acceso = false){
		if(this.dependenci !== undefined){
			for(const [key, value] of Object.entries(this.dependenci)){
				if(key !== item.getLast()){
					this.dependenci[key].forEach((element, index)=>{
						if(element.getId() === item.getId()){
							this.dependenci[key].splice(index,1)
							acceso = true
						}
					})
					if(acceso === false){
						this.dependenci[item.last].push(item)
					}
				}
			}
		}else{
			acceso = true
		}	
		if(acceso === true){
			this.activo = true
			await this.start(item)
			this.terminado += 1
			if(this.cola.empty() === true){
				this.activo = false
				return
			}else{
				const temp = this.cola.dequeue()
				return this.run(temp)
			}
		}
	}

	agregarItem(item){
		if(this.activo === false){
			return this.run(item)
		}else{
			this.cola.enqueue(item)
			if(this.cola.getSize() > this.mayorCola){
				this.mayorCola = this.cola.getSize()
			} 
		}
	}

	agregarDependencia(dependenciaId){
		if(this.dependenci === undefined){
			this.dependenci = {[dependenciaId]:[]}
		}else{
			this.dependenci = {...this.dependenci, [dependenciaId]:[]}
		}
	}

	getSiguiente(){
		return this.siguiente
	}

	addSiguiente(proceso){
		if(this.siguiente === undefined){
			this.siguiente = [proceso]
		}else{
			this.siguiente.push(proceso)
		}
	}

	getNombre(){
		return this.nombre
	}

	getMax(){
		return this.mayorCola
	}

}
