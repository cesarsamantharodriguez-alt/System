"use server"

export const authenticateUser = async (email, password) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Login failed");

        return data
    } catch (err) {
        console.log(err)
    }
}