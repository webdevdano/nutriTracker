(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/Portfolio_projects/nutritracker/apps/web/components/PWARegister.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PWARegister
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/node_modules/.pnpm/next@16.1.2_@babel+core@7.29.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/node_modules/.pnpm/next@16.1.2_@babel+core@7.29.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
function PWARegister() {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PWARegister.useEffect": ()=>{
            // Disable for now - service worker not deployed to Vercel
            // Will re-enable once we have proper SW setup
            if (false && "serviceWorker" in navigator && ("TURBOPACK compile-time value", "development") === "production") //TURBOPACK unreachable
            ;
        }
    }["PWARegister.useEffect"], []);
    return null;
}
_s(PWARegister, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = PWARegister;
var _c;
__turbopack_context__.k.register(_c, "PWARegister");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Portfolio_projects/nutritracker/apps/web/store/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api,
    "useAddFavoriteMutation",
    ()=>useAddFavoriteMutation,
    "useAddFoodLogMutation",
    ()=>useAddFoodLogMutation,
    "useAddGroceryItemMutation",
    ()=>useAddGroceryItemMutation,
    "useAddWeightLogMutation",
    ()=>useAddWeightLogMutation,
    "useCreateCustomFoodMutation",
    ()=>useCreateCustomFoodMutation,
    "useCreateUserRecipeMutation",
    ()=>useCreateUserRecipeMutation,
    "useDeleteCustomFoodMutation",
    ()=>useDeleteCustomFoodMutation,
    "useDeleteFavoriteMutation",
    ()=>useDeleteFavoriteMutation,
    "useDeleteFoodLogMutation",
    ()=>useDeleteFoodLogMutation,
    "useDeleteGroceryItemMutation",
    ()=>useDeleteGroceryItemMutation,
    "useDeleteUserRecipeMutation",
    ()=>useDeleteUserRecipeMutation,
    "useDeleteWeightLogMutation",
    ()=>useDeleteWeightLogMutation,
    "useGetCustomFoodsQuery",
    ()=>useGetCustomFoodsQuery,
    "useGetFavoritesQuery",
    ()=>useGetFavoritesQuery,
    "useGetFoodDetailQuery",
    ()=>useGetFoodDetailQuery,
    "useGetFoodLogsQuery",
    ()=>useGetFoodLogsQuery,
    "useGetGroceryItemsQuery",
    ()=>useGetGroceryItemsQuery,
    "useGetSavedRecipesQuery",
    ()=>useGetSavedRecipesQuery,
    "useGetStreakQuery",
    ()=>useGetStreakQuery,
    "useGetUserGoalsQuery",
    ()=>useGetUserGoalsQuery,
    "useGetUserRecipesQuery",
    ()=>useGetUserRecipesQuery,
    "useGetWeightLogsQuery",
    ()=>useGetWeightLogsQuery,
    "useLazyGetFoodDetailQuery",
    ()=>useLazyGetFoodDetailQuery,
    "useLazySearchFoodsQuery",
    ()=>useLazySearchFoodsQuery,
    "useSaveRecipeMutation",
    ()=>useSaveRecipeMutation,
    "useSearchFoodsQuery",
    ()=>useSearchFoodsQuery,
    "useUnsaveRecipeMutation",
    ()=>useUnsaveRecipeMutation,
    "useUpdateCustomFoodMutation",
    ()=>useUpdateCustomFoodMutation,
    "useUpdateFoodLogMutation",
    ()=>useUpdateFoodLogMutation,
    "useUpdateGroceryItemMutation",
    ()=>useUpdateGroceryItemMutation,
    "useUpdateUserGoalsMutation",
    ()=>useUpdateUserGoalsMutation,
    "useUpdateUserRecipeMutation",
    ()=>useUpdateUserRecipeMutation
]);
/**
 * RTK Query API slice — central hub for all server communication.
 * Each endpoint automatically generates hooks like:
 *   useGetFoodLogsQuery, useAddFoodLogMutation, etc.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$3_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/node_modules/.pnpm/@reduxjs+toolkit@2.11.2_react-redux@9.2.0_@types+react@19.2.14_react@19.2.3_redux@5.0.1__react@19.2.3/node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$3_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/node_modules/.pnpm/@reduxjs+toolkit@2.11.2_react-redux@9.2.0_@types+react@19.2.14_react@19.2.3_redux@5.0.1__react@19.2.3/node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs [app-client] (ecmascript)");
;
const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$3_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createApi"])({
    reducerPath: "api",
    baseQuery: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$3_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchBaseQuery"])({
        baseUrl: "/"
    }),
    tagTypes: [
        "FoodLog",
        "Goals",
        "Grocery",
        "Favorites",
        "CustomFoods",
        "UserRecipes",
        "SavedRecipes",
        "WeightLogs"
    ],
    endpoints: (builder)=>({
            // ── Food Logs ──────────────────────────────────────────────────────────
            getFoodLogs: builder.query({
                query: ({ date, start, end })=>{
                    const params = new URLSearchParams();
                    if (date) params.set("date", date);
                    if (start) params.set("start", start);
                    if (end) params.set("end", end);
                    return `api/food-logs?${params}`;
                },
                transformResponse: (res)=>res.logs ?? [],
                providesTags: (result)=>result ? [
                        ...result.map(({ id })=>({
                                type: "FoodLog",
                                id
                            })),
                        {
                            type: "FoodLog",
                            id: "LIST"
                        }
                    ] : [
                        {
                            type: "FoodLog",
                            id: "LIST"
                        }
                    ]
            }),
            addFoodLog: builder.mutation({
                query: (body)=>({
                        url: "api/food-logs",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    {
                        type: "FoodLog",
                        id: "LIST"
                    }
                ]
            }),
            updateFoodLog: builder.mutation({
                query: (body)=>({
                        url: "api/food-logs",
                        method: "PATCH",
                        body
                    }),
                invalidatesTags: (_result, _err, { id })=>[
                        {
                            type: "FoodLog",
                            id
                        }
                    ]
            }),
            deleteFoodLog: builder.mutation({
                query: (id)=>({
                        url: `api/food-logs?id=${id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: (_result, _err, id)=>[
                        {
                            type: "FoodLog",
                            id
                        },
                        {
                            type: "FoodLog",
                            id: "LIST"
                        }
                    ]
            }),
            // ── User Goals ────────────────────────────────────────────────────────
            getUserGoals: builder.query({
                query: ()=>"api/user-goals",
                transformResponse: (res)=>res.goals,
                providesTags: [
                    "Goals"
                ]
            }),
            updateUserGoals: builder.mutation({
                query: (body)=>({
                        url: "api/user-goals",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Goals"
                ]
            }),
            // ── Food Search ───────────────────────────────────────────────────────
            searchFoods: builder.query({
                query: (q)=>`api/foods/search?query=${encodeURIComponent(q)}&pageSize=5`,
                transformResponse: (res)=>{
                    const seen = new Set();
                    return (res.foods ?? []).filter((f)=>{
                        const key = f.description.toLowerCase().trim();
                        if (seen.has(key)) return false;
                        seen.add(key);
                        return true;
                    }).slice(0, 5);
                }
            }),
            getFoodDetail: builder.query({
                query: (fdcId)=>`api/foods/${fdcId}`
            }),
            // ── Grocery ───────────────────────────────────────────────────────────
            getGroceryItems: builder.query({
                query: ()=>"api/grocery",
                transformResponse: (res)=>res.items ?? [],
                providesTags: (result)=>result ? [
                        ...result.map(({ id })=>({
                                type: "Grocery",
                                id
                            })),
                        {
                            type: "Grocery",
                            id: "LIST"
                        }
                    ] : [
                        {
                            type: "Grocery",
                            id: "LIST"
                        }
                    ]
            }),
            addGroceryItem: builder.mutation({
                query: (body)=>({
                        url: "api/grocery",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    {
                        type: "Grocery",
                        id: "LIST"
                    }
                ]
            }),
            updateGroceryItem: builder.mutation({
                query: (body)=>({
                        url: "api/grocery",
                        method: "PATCH",
                        body
                    }),
                invalidatesTags: (_result, _err, { id })=>[
                        {
                            type: "Grocery",
                            id
                        }
                    ]
            }),
            deleteGroceryItem: builder.mutation({
                query: (id)=>({
                        url: `api/grocery?id=${id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    {
                        type: "Grocery",
                        id: "LIST"
                    }
                ]
            }),
            // ── Favorites ─────────────────────────────────────────────────────────
            getFavorites: builder.query({
                query: ()=>"api/favorites",
                transformResponse: (res)=>res.favorites ?? [],
                providesTags: (result)=>result ? [
                        ...result.map(({ id })=>({
                                type: "Favorites",
                                id
                            })),
                        {
                            type: "Favorites",
                            id: "LIST"
                        }
                    ] : [
                        {
                            type: "Favorites",
                            id: "LIST"
                        }
                    ]
            }),
            addFavorite: builder.mutation({
                query: (body)=>({
                        url: "api/favorites",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    {
                        type: "Favorites",
                        id: "LIST"
                    }
                ]
            }),
            deleteFavorite: builder.mutation({
                query: (id)=>({
                        url: `api/favorites?id=${id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    {
                        type: "Favorites",
                        id: "LIST"
                    }
                ]
            }),
            // ── Custom Foods ──────────────────────────────────────────────────────
            getCustomFoods: builder.query({
                query: (q)=>`api/foods/custom${q ? `?q=${encodeURIComponent(q)}` : ""}`,
                transformResponse: (res)=>res.foods ?? [],
                providesTags: (result)=>result ? [
                        ...result.map(({ id })=>({
                                type: "CustomFoods",
                                id
                            })),
                        {
                            type: "CustomFoods",
                            id: "LIST"
                        }
                    ] : [
                        {
                            type: "CustomFoods",
                            id: "LIST"
                        }
                    ]
            }),
            createCustomFood: builder.mutation({
                query: (body)=>({
                        url: "api/foods/custom",
                        method: "POST",
                        body
                    }),
                transformResponse: (res)=>res.food,
                invalidatesTags: [
                    {
                        type: "CustomFoods",
                        id: "LIST"
                    }
                ]
            }),
            updateCustomFood: builder.mutation({
                query: (body)=>({
                        url: "api/foods/custom",
                        method: "PATCH",
                        body
                    }),
                transformResponse: (res)=>res.food,
                invalidatesTags: (_res, _err, { id })=>[
                        {
                            type: "CustomFoods",
                            id
                        },
                        {
                            type: "CustomFoods",
                            id: "LIST"
                        }
                    ]
            }),
            deleteCustomFood: builder.mutation({
                query: (id)=>({
                        url: `api/foods/custom?id=${id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: (_res, _err, id)=>[
                        {
                            type: "CustomFoods",
                            id
                        },
                        {
                            type: "CustomFoods",
                            id: "LIST"
                        }
                    ]
            }),
            // ── Streak ──────────────────────────────────────────────────────
            getStreak: builder.query({
                query: ()=>"api/streak",
                transformResponse: (res)=>res
            }),
            // ── User Recipes (CRUD) ───────────────────────────────────────────────
            getUserRecipes: builder.query({
                query: ()=>"api/recipes/user-recipes",
                transformResponse: (res)=>res.recipes ?? [],
                providesTags: (result)=>result ? [
                        ...result.map(({ id })=>({
                                type: "UserRecipes",
                                id
                            })),
                        {
                            type: "UserRecipes",
                            id: "LIST"
                        }
                    ] : [
                        {
                            type: "UserRecipes",
                            id: "LIST"
                        }
                    ]
            }),
            createUserRecipe: builder.mutation({
                query: (body)=>({
                        url: "api/recipes/user-recipes",
                        method: "POST",
                        body
                    }),
                transformResponse: (res)=>res.recipe,
                invalidatesTags: [
                    {
                        type: "UserRecipes",
                        id: "LIST"
                    }
                ]
            }),
            updateUserRecipe: builder.mutation({
                query: ({ id, ...body })=>({
                        url: `api/recipes/user-recipes/${id}`,
                        method: "PUT",
                        body
                    }),
                transformResponse: (res)=>res.recipe,
                invalidatesTags: (_res, _err, { id })=>[
                        {
                            type: "UserRecipes",
                            id
                        },
                        {
                            type: "UserRecipes",
                            id: "LIST"
                        }
                    ]
            }),
            deleteUserRecipe: builder.mutation({
                query: (id)=>({
                        url: `api/recipes/user-recipes/${id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: (_res, _err, id)=>[
                        {
                            type: "UserRecipes",
                            id
                        },
                        {
                            type: "UserRecipes",
                            id: "LIST"
                        }
                    ]
            }),
            // ── Saved (Bookmarked) Spoonacular Recipes ────────────────────────────
            getSavedRecipes: builder.query({
                query: ()=>"api/recipes/saved",
                transformResponse: (res)=>res.saved ?? [],
                providesTags: [
                    {
                        type: "SavedRecipes",
                        id: "LIST"
                    }
                ]
            }),
            saveRecipe: builder.mutation({
                query: (body)=>({
                        url: "api/recipes/saved",
                        method: "POST",
                        body
                    }),
                transformResponse: (res)=>res.saved,
                invalidatesTags: [
                    {
                        type: "SavedRecipes",
                        id: "LIST"
                    }
                ]
            }),
            unsaveRecipe: builder.mutation({
                query: (id)=>({
                        url: `api/recipes/saved?id=${id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    {
                        type: "SavedRecipes",
                        id: "LIST"
                    }
                ]
            }),
            // ── Weight Logs ───────────────────────────────────────────────────
            getWeightLogs: builder.query({
                query: (arg)=>`api/weight${arg?.days ? `?days=${arg.days}` : ""}`,
                transformResponse: (res)=>res.logs ?? [],
                providesTags: [
                    {
                        type: "WeightLogs",
                        id: "LIST"
                    }
                ]
            }),
            addWeightLog: builder.mutation({
                query: (body)=>({
                        url: "api/weight",
                        method: "POST",
                        body
                    }),
                transformResponse: (res)=>res.log,
                invalidatesTags: [
                    {
                        type: "WeightLogs",
                        id: "LIST"
                    }
                ]
            }),
            deleteWeightLog: builder.mutation({
                query: (id)=>({
                        url: `api/weight?id=${id}`,
                        method: "DELETE"
                    }),
                invalidatesTags: [
                    {
                        type: "WeightLogs",
                        id: "LIST"
                    }
                ]
            })
        })
});
const { useGetFoodLogsQuery, useAddFoodLogMutation, useUpdateFoodLogMutation, useDeleteFoodLogMutation, useGetUserGoalsQuery, useUpdateUserGoalsMutation, useSearchFoodsQuery, useLazySearchFoodsQuery, useGetFoodDetailQuery, useLazyGetFoodDetailQuery, useGetGroceryItemsQuery, useAddGroceryItemMutation, useUpdateGroceryItemMutation, useDeleteGroceryItemMutation, useGetFavoritesQuery, useAddFavoriteMutation, useDeleteFavoriteMutation, useGetCustomFoodsQuery, useCreateCustomFoodMutation, useUpdateCustomFoodMutation, useDeleteCustomFoodMutation, useGetStreakQuery, useGetUserRecipesQuery, useCreateUserRecipeMutation, useUpdateUserRecipeMutation, useDeleteUserRecipeMutation, useGetSavedRecipesQuery, useSaveRecipeMutation, useUnsaveRecipeMutation, useGetWeightLogsQuery, useAddWeightLogMutation, useDeleteWeightLogMutation } = api;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Portfolio_projects/nutritracker/apps/web/store/uiSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "setActiveTab",
    ()=>setActiveTab,
    "setAdding",
    ()=>setAdding,
    "setCustomServing",
    ()=>setCustomServing,
    "setEditCustomServing",
    ()=>setEditCustomServing,
    "setEditServingSize",
    ()=>setEditServingSize,
    "setEditingLog",
    ()=>setEditingLog,
    "setMealType",
    ()=>setMealType,
    "setNewItem",
    ()=>setNewItem,
    "setSavingFavorite",
    ()=>setSavingFavorite,
    "setScannedBarcode",
    ()=>setScannedBarcode,
    "setSearchQuery",
    ()=>setSearchQuery,
    "setSelectedFood",
    ()=>setSelectedFood,
    "setServingSize",
    ()=>setServingSize,
    "setShowMealPlan",
    ()=>setShowMealPlan,
    "setShowScanner",
    ()=>setShowScanner,
    "setTimeView",
    ()=>setTimeView,
    "setUpdating",
    ()=>setUpdating,
    "toggleShowAllNutrients",
    ()=>toggleShowAllNutrients,
    "uiSlice",
    ()=>uiSlice
]);
/**
 * uiSlice — manages ephemeral UI state that doesn't belong in the server cache.
 * This covers view toggles, modal state, selected items, and form inputs.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$3_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/node_modules/.pnpm/@reduxjs+toolkit@2.11.2_react-redux@9.2.0_@types+react@19.2.14_react@19.2.3_redux@5.0.1__react@19.2.3/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const initialState = {
    dashboard: {
        timeView: "today",
        showAllNutrients: false,
        editingLog: null,
        editServingSize: 100,
        editCustomServing: "",
        updating: false
    },
    search: {
        query: "",
        selectedFood: null,
        servingSize: 100,
        customServing: "",
        mealType: "Lunch",
        showScanner: false,
        scannedBarcode: null,
        adding: false,
        savingFavorite: false
    },
    grocery: {
        activeTab: "grocery",
        newItem: "",
        showMealPlan: false
    }
};
const uiSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$3_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "ui",
    initialState,
    reducers: {
        // ── Dashboard ──────────────────────────────────────────────────────────
        setTimeView (state, action) {
            state.dashboard.timeView = action.payload;
        },
        toggleShowAllNutrients (state) {
            state.dashboard.showAllNutrients = !state.dashboard.showAllNutrients;
        },
        setEditingLog (state, action) {
            state.dashboard.editingLog = action.payload;
            state.dashboard.editServingSize = 100;
            state.dashboard.editCustomServing = "";
            state.dashboard.updating = false;
        },
        setEditServingSize (state, action) {
            state.dashboard.editServingSize = action.payload;
        },
        setEditCustomServing (state, action) {
            state.dashboard.editCustomServing = action.payload;
        },
        setUpdating (state, action) {
            state.dashboard.updating = action.payload;
        },
        // ── Search ─────────────────────────────────────────────────────────────
        setSearchQuery (state, action) {
            state.search.query = action.payload;
        },
        setSelectedFood (state, action) {
            state.search.selectedFood = action.payload;
            state.search.servingSize = 100;
            state.search.customServing = "";
        },
        setServingSize (state, action) {
            state.search.servingSize = action.payload;
        },
        setCustomServing (state, action) {
            state.search.customServing = action.payload;
        },
        setMealType (state, action) {
            state.search.mealType = action.payload;
        },
        setShowScanner (state, action) {
            state.search.showScanner = action.payload;
        },
        setScannedBarcode (state, action) {
            state.search.scannedBarcode = action.payload;
        },
        setAdding (state, action) {
            state.search.adding = action.payload;
        },
        setSavingFavorite (state, action) {
            state.search.savingFavorite = action.payload;
        },
        // ── Grocery ────────────────────────────────────────────────────────────
        setActiveTab (state, action) {
            state.grocery.activeTab = action.payload;
        },
        setNewItem (state, action) {
            state.grocery.newItem = action.payload;
        },
        setShowMealPlan (state, action) {
            state.grocery.showMealPlan = action.payload;
        }
    }
});
const { // Dashboard
setTimeView, toggleShowAllNutrients, setEditingLog, setEditServingSize, setEditCustomServing, setUpdating, // Search
setSearchQuery, setSelectedFood, setServingSize, setCustomServing, setMealType, setShowScanner, setScannedBarcode, setAdding, setSavingFavorite, // Grocery
setActiveTab, setNewItem, setShowMealPlan } = uiSlice.actions;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Portfolio_projects/nutritracker/apps/web/store/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "store",
    ()=>store,
    "useAppDispatch",
    ()=>useAppDispatch,
    "useAppSelector",
    ()=>useAppSelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$3_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/node_modules/.pnpm/@reduxjs+toolkit@2.11.2_react-redux@9.2.0_@types+react@19.2.14_react@19.2.3_redux@5.0.1__react@19.2.3/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$3_redux$40$5$2e$0$2e$1$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/node_modules/.pnpm/react-redux@9.2.0_@types+react@19.2.14_react@19.2.3_redux@5.0.1/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$apps$2f$web$2f$store$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/apps/web/store/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$apps$2f$web$2f$store$2f$uiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/apps/web/store/uiSlice.ts [app-client] (ecmascript)");
;
;
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f40$reduxjs$2b$toolkit$40$2$2e$11$2e$2_react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$3_redux$40$5$2e$0$2e$1_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        // RTK Query cache — handles all server state
        [__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$apps$2f$web$2f$store$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].reducerPath]: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$apps$2f$web$2f$store$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].reducer,
        // UI slice — handles all client/ephemeral state
        ui: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$apps$2f$web$2f$store$2f$uiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uiSlice"].reducer
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$apps$2f$web$2f$store$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].middleware)
});
const useAppDispatch = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$3_redux$40$5$2e$0$2e$1$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"];
const useAppSelector = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$3_redux$40$5$2e$0$2e$1$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Portfolio_projects/nutritracker/apps/web/lib/apollo-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getApolloClient",
    ()=>getApolloClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/node_modules/.pnpm/next@16.1.2_@babel+core@7.29.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * Apollo Client singleton — safe for Next.js App Router client components.
 *
 * Uses a module-level singleton so `<ApolloProvider>` wraps the whole app
 * without creating multiple client instances during hot-reload.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f40$apollo$2b$client$40$4$2e$1$2e$6_graphql$40$16$2e$13$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_rxjs$40$7$2e$8$2e$2$2f$node_modules$2f40$apollo$2f$client$2f$core$2f$ApolloClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/node_modules/.pnpm/@apollo+client@4.1.6_graphql@16.13.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_rxjs@7.8.2/node_modules/@apollo/client/core/ApolloClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f40$apollo$2b$client$40$4$2e$1$2e$6_graphql$40$16$2e$13$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_rxjs$40$7$2e$8$2e$2$2f$node_modules$2f40$apollo$2f$client$2f$cache$2f$inmemory$2f$inMemoryCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/node_modules/.pnpm/@apollo+client@4.1.6_graphql@16.13.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_rxjs@7.8.2/node_modules/@apollo/client/cache/inmemory/inMemoryCache.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f40$apollo$2b$client$40$4$2e$1$2e$6_graphql$40$16$2e$13$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_rxjs$40$7$2e$8$2e$2$2f$node_modules$2f40$apollo$2f$client$2f$link$2f$http$2f$HttpLink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/node_modules/.pnpm/@apollo+client@4.1.6_graphql@16.13.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_rxjs@7.8.2/node_modules/@apollo/client/link/http/HttpLink.js [app-client] (ecmascript)");
;
;
let _client;
function createApolloClient() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f40$apollo$2b$client$40$4$2e$1$2e$6_graphql$40$16$2e$13$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_rxjs$40$7$2e$8$2e$2$2f$node_modules$2f40$apollo$2f$client$2f$core$2f$ApolloClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApolloClient"]({
        link: new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f40$apollo$2b$client$40$4$2e$1$2e$6_graphql$40$16$2e$13$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_rxjs$40$7$2e$8$2e$2$2f$node_modules$2f40$apollo$2f$client$2f$link$2f$http$2f$HttpLink$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HttpLink"]({
            // Use relative URL so it works in both browser (localhost) and Docker
            uri: "/api/graphql",
            // Forward credentials so NextAuth session cookies are included
            credentials: "same-origin"
        }),
        cache: new __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f40$apollo$2b$client$40$4$2e$1$2e$6_graphql$40$16$2e$13$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_rxjs$40$7$2e$8$2e$2$2f$node_modules$2f40$apollo$2f$client$2f$cache$2f$inmemory$2f$inMemoryCache$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["InMemoryCache"](),
        devtools: {
            enabled: ("TURBOPACK compile-time value", "development") === "development"
        }
    });
}
function getApolloClient() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Reuse on the browser
    if (!_client) _client = createApolloClient();
    return _client;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/Portfolio_projects/nutritracker/apps/web/components/Providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/node_modules/.pnpm/next@16.1.2_@babel+core@7.29.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$5$2e$0$2e$0$2d$beta$2e$30_next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$_dc431550fc2c01f5c95f2647e3b730f3$2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/node_modules/.pnpm/next-auth@5.0.0-beta.30_next@16.1.2_@babel+core@7.29.0_babel-plugin-react-compiler@1.0._dc431550fc2c01f5c95f2647e3b730f3/node_modules/next-auth/react.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$3_redux$40$5$2e$0$2e$1$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/node_modules/.pnpm/react-redux@9.2.0_@types+react@19.2.14_react@19.2.3_redux@5.0.1/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f40$apollo$2b$client$40$4$2e$1$2e$6_graphql$40$16$2e$13$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_rxjs$40$7$2e$8$2e$2$2f$node_modules$2f40$apollo$2f$client$2f$react$2f$context$2f$ApolloProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/node_modules/.pnpm/@apollo+client@4.1.6_graphql@16.13.0_react-dom@19.2.3_react@19.2.3__react@19.2.3_rxjs@7.8.2/node_modules/@apollo/client/react/context/ApolloProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$apps$2f$web$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/apps/web/store/index.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$apps$2f$web$2f$lib$2f$apollo$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/apps/web/lib/apollo-client.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
function Providers({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f40$apollo$2b$client$40$4$2e$1$2e$6_graphql$40$16$2e$13$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3_rxjs$40$7$2e$8$2e$2$2f$node_modules$2f40$apollo$2f$client$2f$react$2f$context$2f$ApolloProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApolloProvider"], {
        client: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$apps$2f$web$2f$lib$2f$apollo$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApolloClient"])(),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$react$2d$redux$40$9$2e$2$2e$0_$40$types$2b$react$40$19$2e$2$2e$14_react$40$19$2e$2$2e$3_redux$40$5$2e$0$2e$1$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
            store: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$apps$2f$web$2f$store$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"],
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$2d$auth$40$5$2e$0$2e$0$2d$beta$2e$30_next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$_dc431550fc2c01f5c95f2647e3b730f3$2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SessionProvider"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/components/Providers.tsx",
                lineNumber: 13,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/components/Providers.tsx",
            lineNumber: 12,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/components/Providers.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_Portfolio_projects_nutritracker_apps_web_b11b16e3._.js.map