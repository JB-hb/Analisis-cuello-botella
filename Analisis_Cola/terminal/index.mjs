//Modulo que ejecuta todo el programa

import {Sistema} from './sitema.mjs'
import {Proceso} from './proceso.mjs'
import {Final} from './fin.mjs'

const Despacho = new Sistema(10)
const cargaCamion = new Proceso('cargaCamion', 60)
const genNotaEntrega = new Proceso('genNotaEntrega', 30)
const genGuiaSada = new Proceso('genGuiaSada', 20)
const envioDocumentos = new Proceso('envioDocumentos', 60)
const firmaDocumentos = new Proceso('firmaDocumentos', 5)
const finale = new Final(Despacho)


firmaDocumentos.agregarDependencia(envioDocumentos.getNombre())
firmaDocumentos.agregarDependencia(cargaCamion.getNombre())

Despacho.add(cargaCamion)
Despacho.add(genNotaEntrega)
Despacho.add(genGuiaSada, genNotaEntrega)
Despacho.add(envioDocumentos, genGuiaSada)
Despacho.add(firmaDocumentos, cargaCamion)
Despacho.add(firmaDocumentos, envioDocumentos)
Despacho.add(finale, firmaDocumentos)

console.log('simulacion en curso')
Despacho.run()
