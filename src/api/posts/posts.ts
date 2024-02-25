//import axios from "axios"

//export const getPosts = async () => (axios.get('https://jsonplaceholder.typicode.com/posts'));

export interface IPostItems {
    id: number;
    name: string;
    category: string;
    quantity: number;
    price: string;
    [key: string]: any;
}


//mimic fetching with 2 seconds delay
export const getItems = async (): Promise<IPostItems[]> => {
    await new Promise(resolve => setTimeout(resolve, 2000));// Wait for 2 seconds

    const newData: any = [];
    for (let i = 0; i < 100; i++) {
        newData.push({
            id: i + 1,
            name: `Item ${i + 1}`,
            category: Math.random() < 0.5 ? 'Category A' : 'Category B',
            quantity: Math.floor(Math.random() * 100) + 1,
            price: (Math.random() * 100).toFixed(2)
        });
    }
    return newData;
}
