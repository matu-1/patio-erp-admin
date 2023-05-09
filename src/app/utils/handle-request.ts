import { Observable, lastValueFrom } from 'rxjs';
import { ProgressDialog } from 'src/app/utils/progress-dialog';
import { SnackBar } from './snackbar';
import { Response } from 'src/app/utils/response';

export async function handleRequest<T>(
  func: () => Observable<Response<T>>,
  showMessage: boolean = false,
  showProgress: boolean = false
) {
  if (showProgress) ProgressDialog.show();
  try {
    const res = await lastValueFrom(func());
    if (showProgress) ProgressDialog.hide();
    if (showMessage) SnackBar.show(res.message, { variant: 'success' });
    return res;
  } catch (error: any) {
    if (showProgress) ProgressDialog.hide();
    SnackBar.show(error.message, { variant: error.type });
    return null;
  }
}

export function handleRequestPg<T>(
  func: () => Observable<Response<T>>,
  showMessage: boolean = false
) {
  return handleRequest(func, showMessage, true);
}
