"use strict";

import Bases from "./bases.js";
import Routes from "./rutas.js";

class App {
    constructor() {
        this._routes = new Routes;
        //Botón añadir//
        let btnAdd = document.getElementById('btnAdd');
        btnAdd.addEventListener('click', this.addBase)       
        //Botón "Eliminar"//
        let btnDelete = document.getElementById('btnDelete');
        btnDelete.addEventListener('click', this.deleteBase);        
        //Botón "Listar"//
        let btnList = document.getElementById('btnList');
        btnList.addEventListener('click', this.listBases);
        //Botón Crear tarjeta//
        let btnCreate = document.getElementById('btnCreate');
        btnCreate.addEventListener('click', this.createCard);
    }

    //Función para añadir una base//
    addBase = () => {         
        let details = document.getElementById('details');       
        let inpName = document.getElementById('txtName');        
        let inpMinutes = document.getElementById('txtMinutes');
        
        let name = inpName.value;
        let minutes = Number(inpMinutes.value);        
        let base;   

        if(name && minutes) {            
            inpName.value = '';            
            inpMinutes.value = '';            
            base =  new Bases(name, minutes);
        } else {
          details.innerHTML += 
           '<h4>Ingresa los datos principales.</h4>';
           return;       
        }
        
        this._routes.addBase(base);
        details.innerHTML += `<h4>Se agregó la base "${base.getName()}".</h4>`;
        console.log(this._routes);
        console.log(this._routes._length);     
    }

    //Función para eliminar una base//
    deleteBase = () => {
        let name = document.getElementById('txtName').value;
        let dltBase = this._routes.deleteBase(name);
        let details = document.getElementById('details');

        document.getElementById('txtName').value = '';
        
        if(dltBase) { 
            console.log(dltBase);
            details.innerHTML += `<h4>Se ha eliminado la base ${name}.</h4>`;
            details.innerHTML += '<div class="card"><h4>Datos del producto:</h4>' + 
            dltBase.dltInfo() + '<div>';
            console.log(this._routes);             
        } else if(!name) {
            details.innerHTML += '<h4>Ingresa el nombre de una base.</h4>';
        } else {
            details.innerHTML += '<h4>Esta base no existe.</h4>';
            console.log(dltBase);
        }

        console.log(this._routes._length);
    }

    // Función para enlistar las bases//
    listBases = () => {
        let list = this._routes.list();
        let details = document.getElementById('details');

        if(!this._routes._start) {      
            details.innerHTML += `<h4>${list}</h4>`;   
        } else {
            details.innerHTML += `<h4>Lista predeterminada.</h4>`;
            details.innerHTML +=  '<div class="card"><h4>Bases:</h4>' + `<p>${list}</p>` + '<div>';                 
        }   
        console.log(list);    
    }

    //Función para crear tarjeta del recorrido de la ruta//
    createCard = () => {
        let details = document.getElementById('details');
        let inpName = document.getElementById('txtName');        
        let inpHour = document.getElementById('txtHour');
        let inpMinutes = document.getElementById('txtMinutes');  
        let name = inpName.value;     
        let hour = Number(inpHour.value);
        let minutes = Number(inpMinutes.value);
        let card = this._routes.createCard(name, hour, minutes);    
        

        if(name && hour && minutes) {
            document.getElementById('txtName').value = '';
            document.getElementById('txtHour').value = '';
            document.getElementById('txtMinutes').value = '';

            if(!this._routes) {      
                details.innerHTML += `<h4>No hay bases registradas.</h4>`;   
            } else if(!card) {
                details.innerHTML += `<h4>La base ${name} no existe.</h4>`;
            } else {
                details.innerHTML += `<h4>La ruta ha comenzado en la base: ${name}.</h4>`;
                details.innerHTML +=  '<div class="card"><h4>Recorrido:</h4>' + `<p>${card}</p>` + '<div>';                 
            }   
            console.log(card); 
            console.log(this._routes._searchBase(name));
        } else {
            details.innerHTML += `<h4>Ingresa todos los datos.</h4>`;
        }       
    }
}

new App();