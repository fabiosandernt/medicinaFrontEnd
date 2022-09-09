import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-empresa',
  templateUrl: './listar-empresa.component.html',
  styleUrls: ['./listar-empresa.component.css']
})
export class ComponenteListarEmpresa implements OnInit {

    page = 4

    constructor() { }

    ngOnInit(): void {}
}
