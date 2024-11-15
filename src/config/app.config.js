import * as bootstrap from 'bootstrap'
import * as Popper from '/node_modules/@popperjs/core'

import 'simplebar';
import 'simplebar/dist/simplebar.css';

import ResizeObserver from 'resize-observer-polyfill';
window.ResizeObserver = ResizeObserver;

try{
    window.bootstrap = bootstrap
	window.Popper = Popper
    // window.Swiper = Swiper
	// window._ = _
	// window.httpErrors = httpErrors
    // window.formatting = Formatting
    // window.notify = iziToast
	// window.Swal = Swal.mixin({
    //     showCloseButton: true,
    //     customClass: {
    //         confirmButton: 'btn btn-rc-primary me-2',
    //         cancelButton: 'btn btn-outline-danger me-2',
    //         denyButton: 'btn btn-outline-rc-secondary'
    //     },
    //     buttonsStyling: false
    // })

    // initialDom()

} catch(error) {
    console.error(error)
}
