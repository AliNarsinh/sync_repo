import { toast } from 'react-toastify';

export enum ToastType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

export const showToast = (toastType: ToastType, message: string) => {
  const show =
    toastType === ToastType.Success ? toast.success : toastType === ToastType.Error ? toast.error : toast.info;

  show(message, {
    position: toast.POSITION.TOP_CENTER,
  });
};
