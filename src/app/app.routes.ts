import { Routes } from '@angular/router';
import { PaginaInicialComponent } from './component/pagina-inicial/pagina-inicial.component';
import { LoginComponent } from './component/login/login.component';
import { CadastroUsuarioComponent } from './component/cadastro-usuario/cadastro-usuario.component';
import { ProdutosComponent } from './component/produtos/produtos.component';
import { ProdutoDetalheComponent } from './component/produto-detalhe/produto-detalhe.component';

export const routes: Routes = [
  { path: '', component:  PaginaInicialComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroUsuarioComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'produto/:id', component: ProdutoDetalheComponent },
  { path: '**', redirectTo: '' }
];
