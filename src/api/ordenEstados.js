const ESTADOS = {
  INCOMPLETO:"INCOMPLETO",
  COMPLETO:"COMPLETO",
  EN_PROGRESO:"EN PROGRESO"
}

const estadoValido= (estado) => {
  let existe = false
  for (const e in ESTADOS) {
    if (ESTADOS[e] === estado) {
      existe = true
    }
  }
  return existe
}

module.exports = {ESTADOS,estadoValido}