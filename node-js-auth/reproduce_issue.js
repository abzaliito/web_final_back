const axios = require('axios');

const API_URL = "http://localhost:8080/api/auth/";

async function testAuth() {
    const testUser = {
        username: "debug_user_" + Date.now(),
        email: "debug_" + Date.now() + "@test.com",
        password: "password123"
    };

    console.log("1. Attempting Registration:", testUser);
    try {
        await axios.post(API_URL + "signup", testUser);
        console.log("✅ Registration Success");
    } catch (e) {
        console.error("❌ Registration Failed:", e.response ? e.response.data : e.message);
    }

    console.log("\n2. Attempting Duplicate Registration (should fail):");
    try {
        await axios.post(API_URL + "signup", testUser);
        console.error("❌ Duplicate Registration SUCCEEDED (This is BAD)");
    } catch (e) {
        if (e.response && e.response.status === 400) {
            console.log("✅ Duplicate Registration Blocked (This is GOOD):", e.response.data);
        } else {
            console.error("❌ Duplicate Registration Failed with unexpected error:", e.response ? e.response.data : e.message);
        }
    }

    console.log("\n3. Attempting Login with Email:");
    try {
        const loginRes = await axios.post(API_URL + "signin", {
            username: testUser.email, // Login with email as username
            password: testUser.password
        });
        console.log("✅ Login Success:", loginRes.data.accessToken ? "Token Received" : "No Token");
    } catch (e) {
        console.error("❌ Login Failed:", e.response ? e.response.data : e.message);
    }
}

testAuth();
