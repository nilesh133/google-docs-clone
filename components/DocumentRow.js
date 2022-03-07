import { useRouter } from "next/dist/client/router";
import Icon from "@material-tailwind/react/Icon"
import Button from "@material-tailwind/react/Button"
import { FolderIcon, DotsVerticalIcon } from "@heroicons/react/outline";
function DocumentRow({ id, fileName, date }) {
    // console.log(id);
    const router = useRouter();
    return (
        <div onClick={() => router.push(`/doc/${id}`)} className="flex items-center p-4 rounded-lg text-gray-700 cursor-pointer">
            <div className="flex flex-col border-2 rounded-lg hover:border-blue-400">
                <div className="flex items-center justify-center p-14">
                    <Icon name="article" size="7xl" color="blue" />
                </div>
                <div className="border-t-2 pl-3 pr-3 pt-3 pb-1 font-arial">
                    <p className="flex-grow truncate tracking-widest text-sm">{fileName}</p>
                    <div className="flex items-center justify-between">
                        <Icon name="article" size="3xl" color="blue" />
                        <p className="text-sm tracking-wide">{date?.toDate().toLocaleDateString()}</p>
                        <DotsVerticalIcon className="h-6 w-6 text-sm" color="gray" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DocumentRow
