import Swal from "sweetalert2";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class AlertHelper {
  // ====== client side alert
  viewAlert(...params: any) {
    const [iconType, title, message] = params;
    return Swal.fire({
      icon: iconType,
      title: title,
      text: message,
      allowOutsideClick: false,
      heightAuto: false,
      scrollbarPadding: false,
    });
  }


  commonSwalFire(options: any) {
    return Swal.fire(options);
  }



  successAlert(message: any = '', title: any = '', iconType: any = '') {
    return Swal.fire({
      text: message,
      title: title || 'Success!',
      icon: iconType || "success",
      allowOutsideClick: false,
    });
  }

  errorAlert(message: any = '', title: any = '', iconType: any = '') {
    let msgString = '';
    if (typeof message == 'object') {
      for (var index1 in message) {
        for (var index2 in message[index1]) {
          msgString += message[index1][index2] + ',';
        }
      }
      msgString = msgString.slice(0, -1)
    } else {
      msgString = message;
    }
    return Swal.fire({
      text: msgString,
      title: title || 'Error!',
      icon: iconType || "error"
    });
  }

  warningAlert(message: any = '', title: any = '', iconType: any = '') {
    return Swal.fire({
      text: message,
      title: title || 'Warning!',
      icon: iconType || "warning",
      allowOutsideClick: false,

    });
  }

  submitAlert(...params: any) {
    const [title, iconType, confirmButtonText, cancelButtonText] = params;
    return Swal.fire({
      title: title || "Do you want to submit?",
      icon: iconType || "question",
      showCancelButton: true,
      confirmButtonText: confirmButtonText || "Yes",
      cancelButtonText: cancelButtonText || "No",
      allowOutsideClick: false,
    });
  }

  updateAlert(...params: any) {
    const [title, text, confirmButtonText, cancelButtonText] = params;
    return Swal.fire({
      title: title || "Do you want to update?",
      icon: text || "question",
      showCancelButton: true,
      confirmButtonText: confirmButtonText || "Yes, update it!",
      cancelButtonText: cancelButtonText || "No, keep it",
      allowOutsideClick: false,
    });
  }

  deleteAlert(...params: any) {
    const [title, text, icon, confirmButtonText] = params;
    return Swal.fire({
      title: title || "Are you sure?",
      text: text,
      icon: icon || "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmButtonText || "Yes, delete it!",
      allowOutsideClick: false,
    });
  }

  confirmAlert(...params: any) {
    const [title, text, icon, confirmButtonText, cancelButtonText] = params;
    return Swal.fire({
      title: title || "Are you sure?",
      text: text,
      icon: icon || "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: confirmButtonText || "Yes",
      cancelButtonColor: "#d33",
      cancelButtonText: cancelButtonText || "Cancel",
      allowOutsideClick: false,
    });
  }

  // ======== server side
  viewAlertHtml(...params: any) {
    const [iconType, title, html] = params;
    return Swal.fire({
      icon: iconType,
      title: title,
      html: html,
      heightAuto: false,
      scrollbarPadding: false,
    });
  }

  infoAlert(message: any = '', title: any = '', iconType: any = '') {
    return Swal.fire({
      text: message,
      title: title || 'information!',
      icon: iconType || "info",
      allowOutsideClick: false,

    });
  }

  confirmAlertWithHtml(title: string, text: string, htmlContent: string, icon: 'success' | 'error' | 'warning' | 'info' | 'question') {
    return Swal.fire({
      title: title,
      html: htmlContent,
      icon: icon,  // Icon must be one of the allowed types
      showCancelButton: true,
      confirmButtonText: 'Proceed',
      cancelButtonText: 'Cancel',
      allowOutsideClick: false,

      preConfirm: () => {
        const selectedGateway = (document.querySelector('input[name="paymentGateway"]:checked') as HTMLInputElement)?.value;
        if (!selectedGateway) {
          Swal.showValidationMessage('Please select a payment gateway');
        }
        return selectedGateway;
      }
    });
  }

}
