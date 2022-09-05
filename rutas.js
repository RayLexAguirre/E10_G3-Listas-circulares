"use strict";

export default class Routes {
    constructor() {
        this._start = null;
        this._length = 0;
    }

    addBase(base) {        
        if(this._start === null) {
            this._start = base;
            base._next = this._start;
            base._prev = this._start;
        } else {
            let last = this._start._prev;
            base._next = this._start;
            base._prev = last;
            last._next = base;
            this._start._prev = base;
        }
        this._length++;
    }

    deleteBase(name) {
        let dlt;
        let last;
        let next;   

        if(!this._start) {
            return null;
        }

        if(this._start.getName() === name && this._length === 1) { //Eliminar el único elemento de la lista.
            dlt = this._start;
            this._start = null;
            dlt._next = null;
            dlt._prev = null;
            this._length--;
            return dlt;
        } else if(this._start.getName() === name) { //Eliminar el primero.
            dlt = this._start;
            last = dlt._prev;
            next = dlt._next;
            this._start = next;
            this._start._prev = last;
            last._next = this._start;
            dlt._prev = null;
            dlt._next = null;
            this._length--;
            return dlt;
        } else {            
            let prev = this._start;
            let current = this._start._next;
            while(current !== this._start) {
                if(current.getName() === name && current._next === this._start) { //Eliminar el último.
                    dlt = current;
                    next = dlt._next;
                    prev._next = next;
                    next._prev = prev;
                    dlt._next = null;                    
                    dlt._prev = null;
                    this._length--;
                    return dlt;   
                } else if(current.getName() === name) { //Eliminar entre dos rutas.
                    dlt = current;
                    next = dlt._next;
                    prev._next = next;
                    next._prev = prev;
                    dlt._next = null;
                    dlt._prev = null;
                    this._length--;
                    return dlt;                    
                } else {
                    prev = current;
                    current = current._next;
                }
            }
            return null;
        }
    }

    list() {
        let txt = '';
        let base = this._start;

        if(!base) {
            txt = 'No hay ninguna base registrada.'
            return txt;
        } else {
            do {
                txt += base.info() + '\n' + '-------------------------'
                base = base._next;
            } while(base != this._start);
        }
        return txt;
    }

    createCard(bases, hour, minutes) {
        let card = '';   
        let minHour = 0;
        let find = this._searchBase(bases);

        if(!find) {
            return null;;
        } else {
            while(minutes >= 0) {
                card += find.cardInfo(this._getHour(hour, minHour), minutes) + '\n' + '------------------------------';               
                minHour += find._next.getMinutes();
                minutes -= find._next.getMinutes();
                find = find._next;
            }
            return card;
        }   
    }

    _searchBase(nameBase) {
        let base = this._start;

        if(!base) {
            return null;
        }

        do {
            if(base.getName() === nameBase) {
                return base;
            } else {
                base = base._next;
            }
        } while(base !== this._start);
        return null;  
    }

    _getHour(hour, minutes) {
        let hourToMinutes = ((hour * 60) + minutes)/60;
        let totalHours = Math.trunc(hourToMinutes);
        let lessMinutes = Math.round((hourToMinutes - totalHours)*60);

        if(lessMinutes < 10) {
            return `${totalHours}:0${lessMinutes}`;
        } else {
            return `${totalHours}:${lessMinutes}`;
        }   
    }
}