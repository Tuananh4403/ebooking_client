import toastr from 'toastr';

const toastrOptions = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
    onclick: null,
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '10000',
    extendedTimeOut: '10000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'slideDown',
    hideMethod: 'fadeOut',
    preventOpenDuplicates: true,
};

export function toastWarning(message) {
    toastr.options = { ...toastrOptions };
    
    toastr.warning(message);
}

export function toastSuccess(message) {
    toastr.options = { ...toastrOptions };

    toastr.success(message);
}

export function toastError(message) {
    toastr.options = { ...toastrOptions };
    toastr.error(message);
}