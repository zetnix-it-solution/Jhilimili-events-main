export type DecorationCategory = "All" | "Entrance Gate" | "Entrance Gallery" | "Welcome Board" | "Stage Decor" | "Mandap Decor" | "Mehendi & Haldi Decor" | "Photobooth" | "Car Decor" | "Home Decor" | "Bridal Entry" | "Props";

export const categories: DecorationCategory[] = [
    "All", "Entrance Gate", "Entrance Gallery", "Welcome Board", "Stage Decor",
    "Mandap Decor", "Mehendi & Haldi Decor", "Photobooth", "Car Decor",
    "Home Decor", "Bridal Entry", "Props"
];

export interface DecorationItem {
    id: string;
    code: string;
    category: DecorationCategory;
    image: string;
    preference?: "Indoor" | "Outdoor";
    addons?: string[];
}

export const addonOptions = [
    { id: "sofa", label: "Sofa", icon: "sofa" },
    { id: "chair", label: "Chair", icon: "chair" },
    { id: "hawan", label: "Hawan", icon: "flame" },
    { id: "jhoomar", label: "Jhoomar", icon: "flame" },
];

// using Unsplash placeholders for now, in a real scenario we'd use actual assets.
export const decorationItems: DecorationItem[] = [
    {
        id: "s-102",
        code: "S-102",
        category: "Stage Decor",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "s-103",
        code: "S-103",
        category: "Stage Decor",
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "s-104",
        code: "S-104",
        category: "Stage Decor",
        image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "e-201",
        code: "E-201",
        category: "Entrance Gate",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "m-301",
        code: "M-301",
        category: "Mandap Decor",
        image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "h-401",
        code: "H-401",
        category: "Mehendi & Haldi Decor",
        image: "https://images.unsplash.com/photo-1530103862676-de8c9eb0f2fa?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "p-501",
        code: "P-501",
        category: "Photobooth",
        image: "https://images.unsplash.com/photo-1505364810795-db75a4087b21?auto=format&fit=crop&q=80&w=800",
    },
    {
        id: "w-601",
        code: "W-601",
        category: "Welcome Board",
        image: "https://images.unsplash.com/photo-1629856985012-70b145deccb4?auto=format&fit=crop&q=80&w=800",
    },
];
