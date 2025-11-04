export const carFieldSet = {
    id: {
        forms: 'edit',
        editRule: 'required|number',
    },
    title: {
        description: 'Write a catchy title',
        forms: 'create|edit',
        dummyValue: 'i10 for sale',
        createRule: 'required|string',
        editRule: 'sometimes|required|string',
    },
    description: {
        description: 'Write about car',
        forms: 'create|edit',
        dummyValue: 'Sample test data',
        createRule: 'required|string',
        editRule: 'sometimes|required|string',
    },
    brand: {
        forms: 'create|edit',
        dummyValue: 1,
        createRule: 'required|number',
        editRule: 'sometimes|required|number',
    },
    year: {
        label: 'Model Year',
        forms: 'create|edit',
        dummyValue: 2024,
        createRule: 'number',
        createValue: 2025,
        editRule: 'number',
    },
    price: {
        forms: 'create|edit',
        dummyValue: 15000,
        createRule: 'number',
        editRule: 'number',
    },
    travelled: {
        label: 'Travelled distance (Km)',
        forms: 'create|edit',
        dummyValue: 5000,
        createRule: 'number',
        editRule: 'number',
    },
    mileage: {
        label: 'Mileage (Km/ltr)',
        forms: 'create|edit',
        dummyValue: 50,
        createRule: 'number',
        createValue: 10,
        editRule: 'number',
    },
    image: {
        label: 'Thumbnail',
        forms: 'create|edit',
        createRule: 'file|image|maxsize:8',
        editRule: 'file|image|maxsize:8',
    },
    image_crop: {
        forms: 'create|edit',
    },
    // Front index fields
    price_min: {
        forms: 'front_index',
        indexRule: 'number',
        indexValue: 100,
    },
    price_max: {
        forms: 'front_index',
        indexRule: 'number',
        indexValue: 10000,
    },
    // Index fields
    search: {
        forms: 'front_index|index',
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
    // set while update db
    // owner
}
