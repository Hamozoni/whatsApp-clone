
export const SubmitBtn = ({text,isLoading})=> {
    return (
        <div>
            <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-700 hover:bg-emerald-600 focus:outline-none disabled:opacity-50"
                >
                {isLoading ? "loading..." : text}
            </button>
        </div>
    )
}