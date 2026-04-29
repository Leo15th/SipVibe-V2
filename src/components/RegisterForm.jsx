import { createUserWithEmailAndPassword } from "firebase/auth"
import {doc, setDoc} from "firebase/firestore"
import {auth, db} from "../firebase"
import { sendEmailVerification } from "firebase/auth"

export default function RegisterForm({onClose, onSwitchToLogIn}){
    const handleRegister = async (e)=>{
        e.preventDefault();

        //getvalues from input
        const name = e.target.elements.name.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const confirmPassword = e.target.elements.confirmPassword.value;

        // Check if passwords match
        if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
        }
        try{
            //1.create user in fire base  authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            //2.save extra info in firestore
            await setDoc(doc(db, "users", user.uid),{
                name,
                email,
                createdAt: new Date()
            });
            //3.send email verification
            await sendEmailVerification(user);

            //alert for the remind the verification
            alert("Register Successful! We've sent a verification link to your email. Please open your inbox, click the link, and then log in.");

            alert("Register Successful!!");
            onClose();
        } catch (error){
            alert(error.message)
        }
    }

    return(
        <form onSubmit={handleRegister} className="pt-32 px-10 flex flex-col w-1/3 gap-4 relative backdrop-blur-lg border border-white/50 rounded-2xl">
            <button onClick={onClose} className="text-4xl absolute top-0 right-2 text-gray-500 hover:text-gray-700">×</button>
            <h3 className="text-3xl self-center font-bold bg-gradient-to-br from-white/95 via-red-700 to-red-800 rounded-b-xl w-fit p-3 absolute top-0 text-white black-text-shadow-md">Register</h3>
            <div className="flex flex-col gap-6 mb-8">
                <div className="grid grid-cols-2 gap-5 gap-y-10 mb-6">                            
                    <input name="name" type="text" placeholder="Name" className="w-full text-lg px-2 py-1 rounded-2xl bg-transparent border border-white/10 outline-none text-gray-400"/>
                    <input name="email" type="email" placeholder="Email"  className="w-full text-lg px-2 py-1 rounded-2xl bg-transparent border border-white/10 outline-none text-gray-400"/>
                    <input name="password" type="password" placeholder="Password"  className="w-full text-lg px-2 py-1 rounded-2xl bg-transparent border border-white/10 outline-none text-gray-400"/>
                    <input name="confirmPassword" type="password" placeholder="Confirm Password"  className="w-full text-lg px-2 py-1 rounded-2xl bg-transparent border border-white/10 outline-none text-gray-400"/>
                </div>
                <button type="submit" className="border rounded-lg w-fit bg-white text-black px-8 py-2 transition-all duration-500 self-center text-xl hover:font-bold hover:text-slate-300 hover:black-text-shadow-md hover:scale-125 hover:shadow-md hover:shadow-white">Register</button>
                <div className="flex gap-2">
                    <div className="capitalize text-white text-md">Do You have an account?</div>
                    <div className="capitalize text-green-700 transition-all duration-200 hover:animate-bounce cursor-pointer" onClick={onSwitchToLogIn}>Log In Here</div>
                </div>
            </div>
        </form>
    )
}