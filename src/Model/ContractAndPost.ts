import { ContractModel, ContactStatusEnum } from "./Contract";
import { PostModel } from "./Post";

class ContractAndPost {
    Contract: ContractModel;
    Post: PostModel;
    Status: ContactStatusEnum;
}

export default ContractAndPost;