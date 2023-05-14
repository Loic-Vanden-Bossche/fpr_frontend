import {useForm} from "../../lib";
import {TextInput} from "../../ui";
import {loginForm} from "./Login.style";

export function LoginForm() {
    const {form, handleFormModification} = useForm({"email": undefined, "password": undefined});

    return <main css={loginForm}>
        <header>
            <h1>Welcome</h1>
            <p>Enter your credentials to connect.</p>
        </header>
        <form>
            <TextInput label={"email"} form={form} key={"email"} onValueChange={handleFormModification} />
            <TextInput label={"password"} form={form} key={"password"} onValueChange={handleFormModification} type={"password"}/>
        </form>
    </main>;
}