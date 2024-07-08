import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const navigate = useNavigate()

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLoginAdmin = async () => {
        const auth = {
            email: email,
            password: password
        }
        try {
            const res = await axios.post('https://api-car-rental.binaracademy.org/admin/auth/login', auth)
            console.log(res.data.access_token);
            setSuccess(res.data.access_token)
            localStorage.setItem("token_admin_binar", res.data.access_token)
            setError(null)
            setTimeout(() => {
                navigate("/")
            }, 500)
        } catch (error) {
            console.log(error);
            setError(error.response.data.message)
            setSuccess(null)
        }
    }


    const handleMessege = () => {
        if(error) {
            return <p className="text-red-500 bg-red-200 p-2 px-5 rounded-md">{error}</p>
        }
        else if(success) {
            return <p className="text-green-500 bg-green-200 p-2 px-5 rounded-md">Login Success</p>
        }
        return null
    }

    const handleValidateInput = () => {
        if (!email.length || !password.length) {
            return true
        } else {
            return false
        }         
    }

    return (
        <div className="flex w-full h-screen">
            <div className="w-[60%]">
                <img src="LoginBanner.png" alt=""  className="w-full h-screen bg-gradient-to-b from-gray-800 to-blue-600"/>
            </div>
            <div className="flex flex-col  gap-4  w-[40%]">
                <div className="w-[80%] mx-auto flex flex-col gap-4 justify-center h-full">
                    <h1 className="text-2xl font-bold bg-[#0D28A6] p-2 px-5 rounded-md text-white w-max mb-4">Logo</h1>
                    <h1 className="text-2xl font-bold mb-3">Welcome, Admin BCR </h1>
                    {handleMessege()}
                    <div className="flex flex-col gap-2">
                        <label className="text-lg">Email</label>
                        <input 
                        onChange={handleEmail}
                        type="email" 
                        placeholder="Contoh: johndee@gmail.com"
                        className="border-[1px] border-[#d1d1d1] p-2 rounded-lg placeholder:pl-2 placeholder:text-sm outline-none"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-lg">Password</label>
                        <input 
                        onChange={handlePassword}
                        type="password" 
                        placeholder="6+ karakter"
                        className="border-[1px] border-[#d1d1d1] p-2 rounded-lg placeholder:pl-2 placeholder:text-sm outline-none"/>
                    </div>
                    <button 
                    disabled={handleValidateInput()}
                    onClick={handleLoginAdmin}
                    className="bg-[#0D28A6] text-white p-2 text-lg font-medium mt-4 hover:bg-[#1b2b74]">Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage