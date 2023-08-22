//Clase del objeto que representara el tiempo de ejecucion de los procesos
//y de la simulacion del sistema

export class Tic{
	constructor(minutos){
		this.minutos = minutos
	}

	getTime(){
		const temp = (this.minutos/10)*1000
		return temp
	}
}
