import { DotsVerticalIcon, FolderIcon } from "@heroicons/react/outline";
import Image from 'next/image';
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import { useEffect, useState } from 'react';
import { db } from "../firebase";
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { getSession, useSession } from "next-auth/react";
import { useCollectionOnce } from "react-firebase-hooks/firestore"
import DocumentRow from "./DocumentRow";
import { useRouter } from "next/dist/client/router";
import Logo from "../pages/images/Logo.png"
import AddDoc from "../pages/images/AddDoc.png"
import Icon from "@material-tailwind/react/Icon"
function Middle() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [allDocs, setAllDocs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [input, setInput] = useState("");

    useEffect(() => {
        db.collection('userDocs')
            .doc(session.user.email)
            .collection('docs')
            .orderBy('timestamp', 'desc')
            .onSnapshot((querySnapshot) => {
                setAllDocs([]);
                querySnapshot.forEach((doc) => {
                    setAllDocs((oldDocs) => [...oldDocs, doc]);
                });
            })
    }, [])

    const createDocument = () => {
        if (!session) {
            return;
        }
        db.collection("userDocs").doc(session.user.email).collection("docs").add({
            fileName: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        router.push("/")
        setInput("");
        setShowModal(false);
    }

    const modal = (
        <Modal
            size="sm"
            active={showModal}
            toggler={() => setShowModal(false)}
        >

            <ModalBody>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    className='outline-none w-full'
                    placeholder='Enter name of document...'
                    onKeyDown={(e) => e.key === "Enter" && createDocument()}
                />

            </ModalBody>

            <ModalFooter>
                <Button
                    color="blue"
                    buttonType="link"
                    onClick={(e) => setShowModal(false)}
                    ripple="dark"
                >
                    Cancel
                </Button>
                <Button
                    color="blue"
                    onClick={createDocument}
                    ripple="light"
                >
                    Create
                </Button>

            </ModalFooter>

        </Modal>
    );
    return (
        <>
            {modal}
            <section className="bg-[#F8F9FA] pb-10 px-10 font-arial">
                <div className="max-w-3xl mx-auto">
                    <div className="py-5 flex justify-between items-center">
                        <h2>Start a new document</h2>
                        <Button
                            color="gray"
                            buttonType="outline"
                            rounded={true}
                            iconOnly={true}
                            ripple="dark"
                            className="border-0"
                        >
                            <Icon name="more_vert" size="2xl" />
                        </Button>
                    </div>
                    <div>
                        <div onClick={() => setShowModal(true)}
                            className="relative h-44 w-36 border-2 rounded-sm hover:border-blue-400 hover:border-1 cursor-pointer">
                            <Image src={AddDoc} layout="fill" />
                        </div>
                    </div>
                    <p className="ml-2 mt-2 text-sm">Blank</p>
                </div>
            </section>

            <section className="px-10 md:px-0">

                <div className="mx-auto py-8 text-sm text-gray-700 px-0 sm:px-10 md:px-5 xl:px-28">
                    <h2 className="text-black text-base font-arial">Recent documents</h2>
                    <div className="grid place-items-center sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {allDocs?.map((doc) => (
                            <DocumentRow
                                key={doc.id}
                                id={doc.id}
                                fileName={doc.data().fileName}
                                date={doc.data().timestamp}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>

    )
}

export default Middle
