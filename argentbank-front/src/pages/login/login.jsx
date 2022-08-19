import Footer from '../../components/Footer/Footer'
import LoginForm from '../../components/LoginForm/LoginForm'
import Navbar from '../../components/Navbar/Navbar'
import './login.scss'


const Login = () => {
    return (
        <>
            <Navbar />
            <main className="main bg-dark">
                <LoginForm />
            </main>
            <Footer />
        </>


    )
}



export default Login