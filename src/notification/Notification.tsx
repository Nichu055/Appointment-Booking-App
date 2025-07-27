import { ToastContainer, toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => (
  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
  />
);

export const notifySuccess = (message: string, options?: ToastOptions) =>
  toast.success(message, options);

export const notifyError = (message: string, options?: ToastOptions) =>
  toast.error(message, options);

export default Notification;
