import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { authGuard } from './guards/auth/auth.guard';
import { RecuperarComponent } from './auth/recuperar/recuperar.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { GuardmsgComponent } from './shared/guardmsg/guardmsg.component';

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
    },
    {
        path:'recuperar',
        title:"Restablecer",
        component: RecuperarComponent,
    },
    {
        path:'notfound',
        title:"404",
        component: NotfoundComponent,
    },
    {
        path:'guardmsg',
        title:"Inaccesible",
        component: GuardmsgComponent,
    },
    {
        path:'usuarios',
        title:"Usuarios",
        component: UsuariosComponent,
        canActivate: [authGuard],
    },

    {path: '**', redirectTo: 'notfound', pathMatch: 'full'}
];
