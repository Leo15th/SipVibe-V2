export default function LogInForm({onClose}){
    return(
                <form className="pt-20 px-10 flex flex-col w-1/3 gap-4 relative backdrop-blur-lg border border-white/50 rounded-2xl">
                    <button onClick={onClose} className="text-4xl absolute top-0 right-2 text-gray-500 hover:text-gray-700">×</button>
                    <h3 className="text-3xl self-center font-bold bg-gradient-to-br from-white/95 via-red-700 to-red-800 rounded-b-xl w-fit p-3 absolute top-0 text-white black-text-shadow-md">Log In</h3>
                    <div className="flex flex-col gap-6 mb-8">
                        <input type="text" placeholder="Name" className="w-full text-lg px-2 py-1 rounded-2xl bg-transparent border border-white/10 outline-none text-gray-400"/>
                        <input type="email" placeholder="Email"  className="w-full text-lg px-2 py-1 rounded-2xl bg-transparent border border-white/10 outline-none text-gray-400"/>
                        <input type="password" placeholder="Password"  className="w-full text-lg px-2 py-1 rounded-2xl bg-transparent border border-white/10 outline-none text-gray-400"/>
                        <div className="flex gap-10 justify-between">
                            <div className="flex gap-4 items-center">
                                <input type="checkbox" className="cursor-pointer appearance-none w-5 h-5 border border-white/30 rounded-md relative checked:before:content-['✔'] checked:before:absolute checked:before:top-[-4px] checked:before:left-[-2px] checked:shadow-sm checked:shadow-white"/>
                                <span className="text-white">Remember Me</span>
                            </div>
                            <a href="" className="text-red-500 transition-colors duration-700 hover:animate-bounce ease-in-out hover:text-white hover:underline">Forgot Password?</a>
                        </div>
                        <button className="border rounded-lg w-fit bg-white text-black px-8 py-2 self-center text-xl">Log In</button>
                        <div className="flex gap-2">
                            <div className="capitalize text-white text-md">don't have an account?</div>
                            <div className="capitalize text-green-700 transition-all duration-200 hover:animate-bounce cursor-pointer">register Here</div>
                        </div>
                    </div>
                </form>
    )
}