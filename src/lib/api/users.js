import { headers } from "next/headers";
import { auth } from "../auth";

export const getUsersList = async () => {
    const users = await auth.api.listUsers({
    query: {
        // searchValue: "some name", 
        // searchField: "name", 
        // searchOperator: "contains", 
        // limit: 100, 
        // offset: 100, 
        sortBy: "createdAt", 
        sortDirection: "desc", 
        // filterField: "email", 
        // filterValue: "hello@example.com", 
        // filterOperator: "eq", 
    },
    // This endpoint requires session cookies.
    headers: await headers(),
});
return users;
}

