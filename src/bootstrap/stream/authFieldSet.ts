export const authFieldSet = {
    email: {
        forms: 'login|register',
        dummyValue: 'john@example.com',
        // dummyValue: 'admin@mail.com',
        loginRule: 'required|email',
        registerRule: 'required|email',
    },
    password: {
        forms: 'login|register',
        dummyValue: 'welcome',
        loginRule: 'required|string',
        registerRule: 'required|string',
    },
}