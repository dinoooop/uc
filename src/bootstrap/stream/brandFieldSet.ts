export const brandFieldSet = {
    id: {
        forms: 'edit',
        editRule: 'required|number',
    },
    title: {
        description: 'Write a catchy title',
        forms: 'create|edit',
        dummyValue: 'BMW',
        createRule: 'required|string',
        editRule: 'sometimes|required|string',
    },
    description: {
        description: 'Write about car',
        forms: 'create|edit',
        dummyValue: 'Good brand BMW is here',
        createRule: 'required|string',
        editRule: 'sometimes|required|string',
    },
    logo: {
        label: 'Logo',
        forms: 'create|edit',
        createRule: 'file|aurl|image|maxsize:8',
        editRule: 'file|aurl|image|maxsize:8',
    },
    // Index fields
    search: {
        forms: 'index',
        indexRule: 'string',
    },
    so: {
        forms: 'index',
        indexRule: 'string',
    },
    sb: {
        forms: 'index',
        indexRule: 'string',
    },
    page: {
        forms: 'index',
        indexRule: 'number',
    },
}