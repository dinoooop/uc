export interface Car {
    id: number;
    title: string; // done
    description: string; // done
    brand: { id: number; title: string }; // done
    year: number; // done
    price: number; // done
    travelled: number;
    mileage: number;
    owner: number;
    image: string;
    created_at: string;
    updated_at: string;
}