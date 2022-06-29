
export default class PushMsj {

    constructor(bodyPM,timeoutPM)
    {
       this.bodyPM = bodyPM
       this.timeoutPM = timeoutPM
    }
 
    getPushJs() {
 
        PushJs.create("Inicio de sesión", {
            body: this.bodyPM,
            icon: '/images/circle-logo.png',
            timeout: this.timeoutPM,
            onClick: function () {
                window.focus();
                this.close();
            }
        });
    }
 
 
 }