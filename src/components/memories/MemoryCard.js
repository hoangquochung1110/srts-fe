export const MemoryCard = ({memory}) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{memory.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted"></h6>
                <p className="card-text">{memory.comment}</p>
            </div>
        </div>
    )
}
