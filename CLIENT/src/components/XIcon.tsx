import { XIcon } from "lucide-react"

const X = () => {
  return (
    <>
          <div className="absolute top-2 h-8 w-8 hover:rotate-90 active:rotate-180 transition-transform duration-300 hover:bg-black/10 flex justify-center items-center rounded-full right-4">
                      <XIcon size={20}/>
                    </div>
    </>
  )
}

export default X