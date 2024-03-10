import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ModalComponent } from "../modal/modal.component";
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-table',
    standalone: true,
    templateUrl: './table.component.html',
    styleUrl: './table.component.css',
    imports: [ModalComponent, FormsModule]
})
export class TableComponent {
  
  @Input() headerMapping: { [key: string]: string } = {};
  @Input() header: string[] = [];
  @Input() data: any[] = [];
  @Input() showAction: Boolean = false;
  @Output() editItem = new EventEmitter<any>();

  searchTerm: string = '';
  filteredData: any[] = [];

  isModalOpen: boolean = false;
  

  //editar  
  editItemClicked(item: any): void {
    this.editItem.emit(item);
    this.isModalOpen = true;
  }

  //eliminar
  action2(deleteItem: any): void {    
    const confirmacion = confirm(`¿Estás seguro de que quieres eliminar el elemento seleccionado?`);
      if (confirmacion) {
        const index = this.data.indexOf(deleteItem);
      if (index !== -1) {
        this.data.splice(index, 1);
      }
    }
  }

  //modalUniversal
  openModal() {
    this.isModalOpen = true;
  }
  onModalClose() {
    this.isModalOpen = false;
    this.editItem.emit(null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['searchTerm']) {
      this.filterData();
    }
  }

  //Filtro-Verificamos si el campo de busqueda esta vacio
  filterData(): void {
    if (!this.searchTerm.trim()) {
      this.filteredData = [...this.data];
      return;
    }
    
    //Convertimos el termino a buscar en minusculas para luego hacer el filtro.
    const searchTermLower = this.searchTerm.trim().toLowerCase();
    this.filteredData = this.data.filter(item => {
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const value = item[key];
          if (typeof value === 'string' && value.toLowerCase().includes(searchTermLower)) {
            return true;
          }
        }
      }
      return false;
    });
  }
}