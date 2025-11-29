export interface Car {
    id: number;
    title: string; // done
    description: string; // done
    brand: { id: number; title: string }; // done
    year: number; // done
    price: number; // done
    travelled: number;
    mileage: number;
    owner: { id: number; first_name: string; email: string, phone?: string };
    image: string;
    created_at: string;
    updated_at: string;
}