export async function my_request(duongDan: string) {
    //truy van endpoint
    const response = await fetch(duongDan);

    if(!response.ok) {
        throw new Error(`không thể truy cập ${duongDan}`);
    }

    return response.json();
}