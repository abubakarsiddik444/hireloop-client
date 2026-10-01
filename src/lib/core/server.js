
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

import { getUserToken } from "./session";



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

export const authHeaders = async () => {
    const token = await getUserToken();
    const headers = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return headers;
};

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`);
    const text = await res.text();

    if (!res.ok) {
        throw new Error(text || `Request failed: ${res.status}`);
    }

    // return text ? JSON.parse(text) : null;
    return handleStatusCode(res);

};


export const protectedFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`,
        {
            headers: await authHeaders(),
        }
    );

    // handle 401, 403

    // return res.json();
    return handleStatusCode(res);

};


export const serverMutation = async (path, data, method = 'POST') => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...await authHeaders(),
        },
        body: JSON.stringify(data),
    });

    return handleStatusCode(res);



    // const text = await res.text();

    // if (!res.ok) {
    //     throw new Error(text || `Request failed: ${res.status}`);
    // }

    // return text ? JSON.parse(text) : null;
};



// handle 401, 403, 404 errors
const handleStatusCode = async (res) => {
    const text = await res.text();

    if (res.status === 401) {
        redirect("/unauthorized");
    }

    if (res.status === 403) {
        redirect("/forbidden");
    }

    if (!res.ok) {
        throw new Error(
            text || `Request failed: ${res.status}`
        );
    }

    return text ? JSON.parse(text) : null;
};


