import uniqid from "uniqid";
import { MemoryCard } from "../memories";

const Content = ({memories}) => {
    if (!memories.length){
        return <div>YOU HAVE NO MEMORIES</div>
    }else{
        return (
        memories.map(memory => {
            return <MemoryCard key={uniqid()} memory={memory}/>
        }))
    }
}

export { Content };