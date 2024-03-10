import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './auth/registro/registro.component';

export const routes: Routes = [
    {
        path:'',
        title:"Inicio",
        component: HomeComponent,
    },
    {
        path:'registro',
        title:"Registro",
        component: RegistroComponent,
    }
];
