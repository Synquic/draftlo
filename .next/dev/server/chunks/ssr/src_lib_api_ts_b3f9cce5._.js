module.exports = [
"[project]/src/lib/api.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAppData",
    ()=>getAppData,
    "partialUpdateAppData",
    ()=>partialUpdateAppData,
    "updateAppData",
    ()=>updateAppData
]);
async function getAppData() {
    // Use local API route instead of external API
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/data`, {
        // Revalidate every 60 seconds
        next: {
            revalidate: 60
        }
    });
    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    return res.json();
}
async function updateAppData(data) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        throw new Error("Failed to update data");
    }
    return res.json();
}
async function partialUpdateAppData(updates) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/data`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
    });
    if (!res.ok) {
        throw new Error("Failed to update data");
    }
    return res.json();
}
}),
];

//# sourceMappingURL=src_lib_api_ts_b3f9cce5._.js.map