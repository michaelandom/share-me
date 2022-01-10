import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import { client } from "../client";
const Login = () => {
    const navigate=useNavigate();
    const responseGoogle= (response) =>{
      console.log("google response ",response)
     localStorage.setItem('user' ,JSON.stringify(response.profileObj));

     const { name , googleId, imageUrl} = response.profileObj;

     const doc={
         _id:googleId,
         _type:"user",
         userName:name,
         image:imageUrl
         
     }
client.createIfNotExists(doc).then (() =>{
    navigate('/',{replace:true})
})

    }
  return (
    <div className='flex  justify-start item-center flex-col h-screen bg-black'>
      {/* <div className='relative w-full h-full'>
        <video
          src={shareVideo}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'></video>
      </div> */}
      <div className=" flex flex-col items-center top-0 left-0 right-0 bottom-0 bg-black space-y-10 pt-20 ">
        {/* //bg-blackOverlay */}

          <div className="p-5 ">
         {/* <img src={logo} width="130px" alt="" /> */}
         
         <span className='w-full font-bold text-5xl lg:text-[150px] text-white '>
            {/* font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 */}
            <h4 className=' font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
              Logo
            </h4>
          </span>
          </div>

          <div className="shadow-2xl">
              <GoogleLogin 
            
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) =>(
                  <button
                   type="button"
                   className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none "
                   onClick={renderProps.onClick}
                   disabled={renderProps.disabled}
                  >
                      <FcGoogle  className="mr-4 "/> Sign in With Google
                  </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"

              
              />

          </div>
      </div>
    </div>
  );
};

export default Login;
