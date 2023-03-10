import Yup from "./validation";

export const registerSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    full_name : Yup.string().required(),
    username: Yup.mixed().required().test({
        message : "Write avialable username",
        test : str => /^[a-z0-9\.\_]+$/i.test(str)
    }),
    password: Yup.string().required()
})
