import Image from 'next/image';
import { signIn } from 'next-auth/react';
import Button from "@material-tailwind/react/Button"
import MainLogo from "../pages/images/MainLogo.png";
function Login() {
    return (
        <div className='flex justify-center items-center flex-col min-h-screen py-2'>
            <Image
                src={MainLogo}
                height="300"
                width="550"
                objectFit="contain"
            />
            <Button
                color="lightBlue"
                buttonType="filled"
                size="regular"
                className="h-10 pl-8 pr-8"
                rounded={false}
                iconOnly={false}
                ripple="light"
                onClick={signIn}
            >
                LOGIN
            </Button>

        </div>
    )
}

export default Login
