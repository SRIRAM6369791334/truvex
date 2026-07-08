export async function confirmAction(message: string, confirmText = 'Yes, proceed') {
  const { default: Swal } = await import('sweetalert2');
  const result = await Swal.fire({
    title: 'Confirmation',
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0B1F3A',
    cancelButtonColor: '#dc2626',
    confirmButtonText: confirmText,
    customClass: { popup: 'premium-swal-popup' },
  });
  return result.isConfirmed;
}
