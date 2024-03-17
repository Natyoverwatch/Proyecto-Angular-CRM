import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  imports: [ModalComponent, FormsModule],
})
export class TableComponent {
  @Input() datos: any[] = [];
  @Input() headers: string[] = [];
  @Input() columnasMapeo: { [key: string]: string } = {};
  @Output() editar = new EventEmitter<any>();
  @Output() eliminar = new EventEmitter<any>();

  searchTerm: string = '';
  filteredData: any[] = [];

  editarElemento(elemento: any) {
    this.editar.emit(elemento);
  }

  eliminarElemento(elemento: any) {
    this.eliminar.emit(elemento);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datos'] || changes['searchTerm']) {
      this.filterData();
    }
  }

  //Filtro-Verificamos si el campo de busqueda esta vacio
  filterData(): void {
    if (!this.searchTerm.trim()) {
      this.filteredData = [...this.datos];
      return;
    }

    //Convertimos el termino a buscar en minusculas para luego hacer el filtro.
    const searchTermLower = this.searchTerm.trim().toLowerCase();
    this.filteredData = this.datos.filter((item) => {
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const value = item[key];
          if (
            typeof value === 'string' &&
            value.toLowerCase().includes(searchTermLower)
          ) {
            return true;
          }
        }
      }
      return false;
    });
  }
}
