
export default class SAToasts {

   constructor(iconToast,msjToast,positionToast,timerToast)
   {
      this.iconToast = iconToast
      this.msjToast = msjToast
      this.positionToast = positionToast
      this.timerToast = timerToast
   }

   getToast() {

     var Toast = Swal.mixin({
         toast: true,
         position: this.positionToast,
         showConfirmButton: false,
         timer: this.timerToast,
         timerProgressBar: true,
         didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
         },
      })

      Toast.fire({ 
         icon: this.iconToast, 
         html: '<a style="text-decoration:none;font-weight: 600;">&nbsp;&nbsp;'+this.msjToast+'.</a>' 
      })

      return
   }


}