import store from "../store/store"


export default class SAQuestions {

   constructor(iconQuestion,titleQuestion,textQuestion,confirmBtnQuestion,cancelBtnQuestion)
   {
      this.iconQuestion = iconQuestion
      this.titleQuestion = titleQuestion
      this.textQuestion = textQuestion
      this.confirmBtnQuestion = confirmBtnQuestion 
      this.cancelBtnQuestion = cancelBtnQuestion
   }

   getQuestionRoute() {

      const swalWithBootstrapButtons = Swal.mixin({
         customClass: {
            confirmButton: 'btn btn-sm btn-dark ml-2',
            cancelButton: 'btn btn-sm btn-dark',
         },
         buttonsStyling: false,
      })

      var succesResult = swalWithBootstrapButtons.fire({
         title: this.titleQuestion,
         // icon: this.iconQuestion,
         text: this.textQuestion,
         showCancelButton: true,
         confirmButtonText: this.confirmBtnQuestion,
         cancelButtonText: this.cancelBtnQuestion,
         reverseButtons: true
      }).then((result) => {
         if (result.isConfirmed) {
            return true;
         } else if ( result.dismiss === Swal.DismissReason.cancel ) {
            return false;
         }
      })
      return Promise.resolve(succesResult)

   }

}