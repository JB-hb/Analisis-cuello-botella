//Clase del objeto que almacenara la cola de cada proceso

export class Cola{
	constructor(){
		this.list = []
	}

	enqueue(item){
		this.list.push(item)
	}

	dequeue(){
		const item = this.list[0]
		this.list.shift()
		return item
	}

	empty(){
		if(this.list.length > 0){
			return false
		}else{
			return true
		}
	}

	getSize(){
		return this.list.length
	}
}
