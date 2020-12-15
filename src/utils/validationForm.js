import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
    login: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required')
});

export const SignUpSchema = Yup.object().shape({
    pseudo: Yup.string()
        .required('Required'),
    mail: Yup.string()
        .email("Must be an address E-mail")
        .required('Required'),
    password: Yup.string()
        .required('Required')
});

