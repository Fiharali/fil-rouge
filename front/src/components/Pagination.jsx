
export default function Pagination(props) {
    return (
        <>
            {props.pagination.total > 8 && (
                <div className="join mx-auto flex justify-center mt-10">
                    {Array.from({ length: props.pagination.total_pages }, (_, index) => (
                        <button className="join-item btn btn-md" key={index} onClick={() => props.handlePageChange(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </>
    )
}
