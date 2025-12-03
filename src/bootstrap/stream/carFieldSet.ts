export const carFieldSet = {
    id: {
        forms: 'edit',
        editRule: 'required|number',
    },
    title: {
        description: 'Write a catchy title',
        forms: 'create|edit',
        dummyValue: 'xxx',
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
        forms: 'create|edit|index',
        dummyValue: 3,
        createRule: 'required|number',
        editRule: 'sometimes|required|number',
        indexRule: 'sometimes|required|number',
    },
    year: {
        label: 'Model Year',
        forms: 'create|edit',
        dummyValue: 2015,
        createRule: 'number',
        createValue: 2025,
        editRule: 'number',
    },
    price: {
        forms: 'create|edit',
        dummyValue: 550000,
        createRule: 'number',
        editRule: 'number',
    },
    travelled: {
        label: 'Travelled distance (Km)',
        forms: 'create|edit',
        dummyValue: 200000,
        createRule: 'number',
        editRule: 'number',
    },
    mileage: {
        label: 'Mileage (Km/ltr)',
        forms: 'create|edit',
        dummyValue: 12,
        createRule: 'number',
        createValue: 10,
        editRule: 'number',
    },
    image: {
        label: 'Thumbnail',
        forms: 'create|edit',
        createRule: 'file|aurl|image|maxsize:8',
        editRule: 'file|aurl|image|maxsize:8',
    },
    image_crop: {
        forms: 'create|edit',
    },
    // Front index fields
    price_min: {
        forms: 'index',
        indexRule: 'number',
        indexValue: 0,
    },
    price_max: {
        forms: 'index',
        indexRule: 'number',
        indexValue: 2000000,

    },
    year_min: {
        forms: 'index',
        indexRule: 'number',
    },
    year_max: {
        forms: 'index',
        indexRule: 'number',
    },
    travelled_min: {
        forms: 'index',
        indexRule: 'number',
    },
    travelled_max: {
        forms: 'index',
        indexRule: 'number',
    },
    mileage_min: {
        forms: 'index',
        indexRule: 'number',
    },
    mileage_max: {
        forms: 'index',
        indexRule: 'number',
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
    // set while update db
    // owner
}
