import Icon from "@material-tailwind/react/Icon"
import Button from "@material-tailwind/react/Button"
import { useRouter } from "next/dist/client/router";
import { db } from "../../firebase";
import TextEditor from "../../components/TextEditor"
import 'tailwindcss/tailwind.css';
import "@material-tailwind/react/tailwind.css";
import { useDocumentOnce } from "react-firebase-hooks/firestore"
import { getSession, useSession, signOut } from "next-auth/react";
import Login from "../../components/Login"
import { DocumentTextIcon, UsersIcon } from "@heroicons/react/outline";
import Image from 'next/image';
import Logo from "../../pages/images/Logo.png"
function Doc() {
    const { data: session, status } = useSession();
    if (!session) {
        return <Login />;
    }
    const router = useRouter();
    const { id } = router.query;
    // console.log(id);
    const [snapshot, loadingSnapshot] = useDocumentOnce(db.collection("userDocs").doc(session.user.email).collection("docs").doc(id));

    if (!loadingSnapshot && !snapshot?.data()?.fileName) {
        router.replace("/");
    }
    return (
        <div>
            <header className="flex justify-between items-center p-3 pb-1">
                <span className="cursor-pointer" onClick={() => router.push("/")}>
                <Image src={Logo} width={45}
                        height={45} />
                </span>

                <div className="flex-grow px-2">
                    <h2 className="text-gray-600 text-lg font-arial">{snapshot?.data()?.fileName}</h2>
                    <div className="hidden xsm:flex items-center text-sm space-x-1 h-6 text-black-600 font-arial">
                        <p className="option">File</p>
                        <p className="option">Edit</p>
                        <p className="option">View</p>
                        <p className="option">Insert</p>
                        <p className="option">Format</p>
                        <p className="option">Tools</p>
                    </div>
                </div>
                <Button
                    color="blue"
                    buttonType="filled"
                    size="regular"
                    className="hidden md:!inline-flex w-20 h-8"
                    rounded={false}
                    iconOnly={false}
                    ripple="light"
                >
                    <UsersIcon className="h-4 w-4" />SHARE
                </Button>
                <img src={session.user?.image}
                    className="h-8 w-8 cursor-pointer rounded-full ml-4"
                    alt="" />
            </header>
            <TextEditor />
        </div>
    )
}

export default Doc

export async function getServerSideProps(context) {
    const session = await getSession(context);
    return {
        props: {
            session
        }
    }
}