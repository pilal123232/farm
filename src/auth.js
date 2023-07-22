import axios from "axios";

const Auth = async () => {
   const session_url = "http://localhost:3003/auth/login";

   await axios.post(session_url, {
         username: "admin",
         password: "qwe123QWE!@#",
         tokenDevice :"fGD5gxO6bu-smiauxLg8r-:APA91bF-IEPBiZjTa46kLg19xwCTBPJk1Nmex5u_G282jjfds7QcoVd95OHBJ4e2lnidKkh8Wh0Wwzj4cX8UWA1gwG70RJjjQyPpdhR736NBam4CPqRjNuWnxnhrR2kkZhtjVW-aORFi"
      }).then((res) =>{
         console.log('done')
         localStorage.setItem('token',res.data.data.token);
      }).catch((res) => {

      })
};

export default Auth;
