import uniqid from "uniqid";
import { useAuth } from "../../hooks/useAuth";
import { MemoryCard } from "../memories";

const Content = ({memories}) => {
    const auth = useAuth();

    if (!memories.length || !auth.user){
        return <div>YOU HAVE NO MEMORIES</div>
    }else{
        return (
        memories.map(memory => {
            return <MemoryCard key={uniqid()} memory={memory}/>
        }))
    }
}

export { Content };