import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-funcionario',
  templateUrl: './listar-funcionario.component.html',
  styleUrls: ['./listar-funcionario.component.css']
})
export class ComponenteListarFuncionario implements OnInit {

    page = 4
    constructor() { }

    ngOnInit(): void {}
}
