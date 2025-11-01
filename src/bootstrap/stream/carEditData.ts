import type { Car } from "./carItem";

export const carEditData = (item: Car | null): Record<string, unknown> => ({
    id: item?.id,
    name: item?.name,
    description: item?.description,
    brand: item?.brand,
    year: item?.year,
    price: item?.price,
    travelled: item?.travelled,
    mileage: item?.mileage,
    owner: item?.owner,
    image: item?.image,
    // created_at: string;
    // updated_at: string;
})