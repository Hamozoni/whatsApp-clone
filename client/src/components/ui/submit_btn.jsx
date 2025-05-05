
export const Submit_btn = ({text,is_loading})=> {
    return (
        <div>
            <button
                type="submit"
                disabled={is_loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
                >
                {is_loading ? "loading..." : text}
            </button>
        </div>
    )
}