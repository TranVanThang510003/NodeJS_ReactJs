export interface User {
    id: string;
    email: string;
    name?: string;
    accountType?: string;
    [key: string]: any; // fallback cho các field khác từ API
}