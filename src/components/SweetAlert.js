// src/components/SweetAlert.js
import Swal from 'sweetalert2';

const SweetAlert = {
  success: (title = "Success", text = "") => {
    Swal.fire({
      icon: 'success',
      title,
      text,
      confirmButtonColor: '#3085d6',
    });
  },

  error: (title = "Error", text = "") => {
    Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonColor: '#d33',
    });
  },

  warning: (title = "Warning", text = "") => {
    Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonColor: '#f39c12',
    });
  },

  info: (title = "Info", text = "") => {
    Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonColor: '#3498db',
    });
  },

  confirm: async (title = "Are you sure?", text = "You won't be able to revert this!") => {
    const result = await Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!',
    });

    return result.isConfirmed;
  }
};

export default SweetAlert;
