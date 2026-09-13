
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;



// export const serverFetch = async (path) => {
//     const res = await fetch(`${baseUrl}${path}`);
//     // handle 401, 404, 403

//     return res.json();
// };



// export const serverMutation = async (path, Data) => {
//     const res = await fetch(`${baseUrl}${path}`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(Data),
//     });

//     // handle 401, 404, 403

//     return res.json();
// }








const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    const text = await res.text();

    if (!res.ok) {
        throw new Error(text || `Request failed: ${res.status}`);
    }

    return text ? JSON.parse(text) : null;
};

export const serverMutation = async (path, data) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const text = await res.text();

    if (!res.ok) {
        throw new Error(text || `Request failed: ${res.status}`);
    }

    return text ? JSON.parse(text) : null;
};


