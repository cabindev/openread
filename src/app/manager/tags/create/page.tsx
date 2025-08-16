import CreateTagForm from "~/components/tag/CreateTagForm";
import Wrapper from "~/components/Wrapper";

export default function page() {
    return (
        <Wrapper className="max-w-lg">
            <CreateTagForm />
        </Wrapper>
    );
}
