import {SearchIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import Icon from "@material-tailwind/react/Icon"
import Button from "@material-tailwind/react/Button";
import Logo from "../pages/images/Logo.png";
import Image from 'next/image';
function Header() {
    const { data: session, status } = useSession();
    // console.log(session);

    return (
        <div className="flex items-center justify-between pt-1 pb-1 pl-5 pr-5 bg-white shadow-md font-arial">
            <div className="hidden sm:block md:block xl:block">
                <Button
                    color="gray"
                    buttonType="outline"
                    rounded={true}
                    iconOnly={true}
                    ripple="dark"
                    className="border-0"
                >
                    <Icon name="menu" size="2xl" />
                </Button>
            </div>

            <button className="flex flex-center items-center p-2 outline-none border-none">
                <Image src={Logo} width={40}
                    height={40} />
                <h1 className="text-xl text-gray-700 tracking-normal ml-2">Docs</h1>
            </button>

            <div className="hidden xsm:flex flex-grow items-center bg-gray-100 text-gray-600 px-5 rounded-lg mx-5 focus-within:drop-shadow-md focus-within:bg-white p-2 md:mx-14 sm:mx-20">
                <SearchIcon className="h-6 w-6" />
                <input type="text" placeholder="Search" className="flex-grow bg-transparent outline-none px-5" />
            </div>

            <div className="flex flex-center items-center">
                <div className="">
                    <Button
                        color="red"
                        buttonType="outline"
                        rounded={true}
                        iconOnly={true}
                        ripple="dark"
                        className="mr-2 border-0"
                        onClick={signOut}
                    >
                        <Icon name="logout" size="2xl" />
                    </Button>
                </div>
                <img src={session.user?.image}
                    className="h-8 w-8 cursor-pointer rounded-full"
                    alt="" />
            </div>

        </div>
    )
}

export default Header
