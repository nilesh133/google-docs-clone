import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { EditorState } from "draft-js";
import { db } from "../firebase";
import { useRouter } from "next/dist/client/router";
import { convertFromRaw, convertToRaw } from "draft-js";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
const Editor = dynamic(() => import("react-draft-wysiwyg").then((module) => module.Editor),
    {
        ssr: false,
    });

function TextEditor() {
    const { data: session, status } = useSession();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const router = useRouter();
    const { id } = router.query;

    const [snapshot] = useDocumentOnce(db.collection("userDocs").doc(session.user.email).collection("docs").doc(id));


    useEffect(() => {
        if (snapshot?.data()?.editorState) {
            setEditorState(EditorState.createWithContent(
                convertFromRaw(snapshot?.data()?.editorState)
            ))
        }
    }, [snapshot])

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
        db.collection("userDocs").doc(session.user.email).collection("docs").doc(id).set({
            editorState: convertToRaw(editorState.getCurrentContent())
        }, {
            merge: true
        })
    }
    return (
        <div className="bg-[#F8F9FA] min-h-screen pb-16 ml-8 mr-8 mt-4">
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                toolbarClassName="flex !justify-center mx-auto sticky top-0 z-50"
                editorClassName="m-4 lg:mx-auto mt-6 mb-12 p-8 bg-white max-w-5xl shadow-lg"
            />
        </div>
    )
}

export default TextEditor
