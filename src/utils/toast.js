// toast.js
import toastr from 'toastr';

export function toastWarning(message) {
    toastr.options = {
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
    toastr.warning(message);
}
export function toastSuccess( message )
{
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "10000",
        "extendedTimeOut": "10000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "slideDown",
        "hideMethod": "fadeOut",
        "preventOpenDuplicates":true,

    };
    toastr.success(message);
};

export function toastError( message )
{
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true, 
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "10000",
        "extendedTimeOut": "10000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "slideDown",
        "hideMethod": "fadeOut",
        "preventOpenDuplicates":true, 
    };
    toastr.error(message);
};

