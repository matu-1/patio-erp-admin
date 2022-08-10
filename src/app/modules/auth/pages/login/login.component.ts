import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PAGE_ROUTE } from '../../../../constants/page-route.constant';
import { authSchema } from '../../configs/form-schema';
import { buildform } from 'src/app/components/text-field/text-field.util';
import { handleRequestPg } from 'src/app/utils/handle-request';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = buildform(authSchema);
  authSchema = authSchema;

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    const res = await handleRequestPg(
      () => this.authService.login(this.form.value),
      true
    );
    if (res) this.router.navigateByUrl(PAGE_ROUTE.HOME);
  }
}
