module.exports = {

"[project]/.next-internal/server/app/api/vote/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/mongoose [external] (mongoose, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("mongoose", () => require("mongoose"));

module.exports = mod;
}}),
"[project]/src/models/utils/database.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "connectToDb": (()=>connectToDb)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
let isConnected = false;
const connectToDb = async ()=>{
    if (isConnected) return;
    try {
        await __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB connection error:', error);
    }
};
}}),
"[project]/src/models/RaceWeekend.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs)");
;
const raceWeekendSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].Schema({
    race: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    votes: {
        fullRace: {
            type: Number,
            default: 0
        },
        raceIn30: {
            type: Number,
            default: 0
        }
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].models.RaceWeekend || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$29$__["default"].model('RaceWeekend', raceWeekendSchema);
}}),
"[project]/src/utils/analytics.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "trackVote": (()=>trackVote)
});
const trackVote = async (raceId, voteType)=>{
    try {
        const getScreenSize = ()=>{
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            }
            return 'test'; // Fallback if not running in a browser environment
        };
        const analyticsData = {
            raceId,
            voteType,
            timestamp: new Date(),
            metadata: {
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                userAgent: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 'test',
                language: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 'test',
                platform: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 'test',
                screenSize: getScreenSize(),
                referrer: typeof document !== 'undefined' ? document.referrer : 'test',
                deviceType: "undefined" !== 'undefined' && /mobile/i.test(window.navigator.userAgent) ? ("TURBOPACK unreachable", undefined) : 'desktop',
                timeOnPage: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 0,
                performanceMetrics: {
                    pageLoadTime: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 0,
                    domInteractive: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : 0,
                    firstContentfulPaint: typeof performance !== 'undefined' && performance.getEntriesByType('paint')[0] ? performance.getEntriesByType('paint')[0]?.startTime : 0
                },
                connection: {
                    type: typeof navigator !== 'undefined' && navigator.connection ? navigator.connection?.effectiveType || 'unknown' : 'unknown',
                    downlink: typeof navigator !== 'undefined' && navigator.connection ? navigator.connection?.downlink : 0
                }
            }
        };
        // Helper to get the correct analytics endpoint URL
        const getAnalyticsUrl = ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                // Server-side: must use absolute URL
                const base = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}` || 'http://localhost:3000';
                return `${base}/api/analytics`;
            }
            "TURBOPACK unreachable";
        };
        if (typeof fetch !== 'undefined') {
            await fetch(getAnalyticsUrl(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(analyticsData)
            });
        } else {
            console.warn('fetch is not available');
        }
    } catch (error) {
        console.error('Analytics error:', error);
    }
};
}}),
"[project]/src/app/api/vote/route.js [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$utils$2f$database$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/utils/database.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$RaceWeekend$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/models/RaceWeekend.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$analytics$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/analytics.js [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    try {
        const { raceId, voteType } = await request.json();
        // Input validation
        if (!raceId || !voteType) {
            return new Response(JSON.stringify({
                error: 'Missing required fields'
            }), {
                status: 400
            });
        }
        // Validate vote type
        if (![
            'fullRace',
            'raceIn30'
        ].includes(voteType)) {
            return new Response(JSON.stringify({
                error: 'Invalid vote type'
            }), {
                status: 400
            });
        }
        // Connect to database
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$utils$2f$database$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["connectToDb"])();
        // Update vote count
        const race = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$models$2f$RaceWeekend$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findByIdAndUpdate(raceId, {
            $inc: {
                [`votes.${voteType}`]: 1
            }
        }, {
            new: true
        });
        // Check if race exists
        if (!race) {
            return new Response(JSON.stringify({
                error: 'Race not found'
            }), {
                status: 404
            });
        }
        // Track analytics
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$analytics$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["trackVote"])(raceId, voteType);
        } catch (analyticsError) {
            // Log but don't fail the vote if analytics fails
            console.error('Analytics error:', analyticsError);
        }
        // Return updated race data
        return new Response(JSON.stringify(race), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Vote error:', error);
        return new Response(JSON.stringify({
            error: 'Failed to cast vote'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__0b8f88f9._.js.map