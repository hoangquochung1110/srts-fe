export const MemoryForm = ({onSubmit, onChange}) => {
    return (
        <form className="memory-form" onSubmit={onSubmit}>
            <input className="form-control" name="name" type="text" placeholder="Name" onChange={onChange}></input>
            <input className="form-control" name="comment" type="text" placeholder="Comment" onChange={onChange}></input>
            <button className="btn btn-primary" type="submit">Save</button>
        </form>
    )
}

