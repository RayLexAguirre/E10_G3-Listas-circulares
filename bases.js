"use strict";

export default class Bases {
    constructor(name, minutes) {
        this._name = name;        
        this._minutes = minutes;
        this._next = null;
        this._prev = null;
    }

    getName() {
        return this._name;
    }   

    getMinutes() {
        return this._minutes;
    }

    dltInfo() {
        return `<div>
                    <p>Nombre: "${this.getName()}"</p>                    
                    <p>Minutos laborales: ${this.getMinutes()}</p>                                  
                </div>`;
    }

    info() {
        return `<div>
                    <p>Nombre: "${this.getName()}"</p>                    
                    <p>Minutos laborales: ${this.getMinutes()}</p>
                    <p>Anterior: ${this._prev.getName()}</p>
                    <p>Siguiente: ${this._next.getName()}</p>                    
                </div>`;
    }

    cardInfo(hour, minutes) {
        return `<div>
                    <p>Base actual: ${this.getName()}</p>
                    <p>Hora de llegada: ${hour}</p>
                    <p>Minutos laborales restantes: ${minutes}</p>                                 
                </div>`;
    }
}