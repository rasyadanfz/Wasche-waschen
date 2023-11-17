import Button from "@/components/Button";
import TextField from "@/components/TextField";

const TestPage = () => {
    return (
        <div className="px-2 mx-5">
            <div className="text-center mt-10">
                <Button text="Login" />
            </div>
            <div className="mt-10">
                <TextField />
            </div>
        </div>
    );
};

export default TestPage;
