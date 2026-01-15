"use client";

import { useEffect, useState } from "react";

type GroceryItem = {
  id: string;
  food_name: string;
  quantity: number;
  unit: string;
  purchased: boolean;
  created_at: string;
};

export default function GroceryPage() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [addingItem, setAddingItem] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      const response = await fetch("/api/grocery");
      const data = await response.json();
      if (response.ok) {
        setItems(data.items || []);
      }
    } catch (error) {
      console.error("Failed to load grocery list:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newItem.trim()) return;

    setAddingItem(true);
    try {
      const response = await fetch("/api/grocery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ food_name: newItem }),
      });

      if (response.ok) {
        setNewItem("");
        await loadItems();
      }
    } catch (error) {
      console.error("Failed to add item:", error);
    } finally {
      setAddingItem(false);
    }
  }

  async function togglePurchased(item: GroceryItem) {
    try {
      const response = await fetch("/api/grocery", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, purchased: !item.purchased }),
      });

      if (response.ok) {
        await loadItems();
      }
    } catch (error) {
      console.error("Failed to update item:", error);
    }
  }

  async function deleteItem(id: string) {
    try {
      const response = await fetch(`/api/grocery?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await loadItems();
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  }

  async function clearPurchased() {
    const purchasedItems = items.filter((item) => item.purchased);
    await Promise.all(purchasedItems.map((item) => deleteItem(item.id)));
  }

  const unpurchasedItems = items.filter((item) => !item.purchased);
  const purchasedItems = items.filter((item) => item.purchased);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Grocery List</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Keep track of foods you need to buy
        </p>
      </div>

      <form onSubmit={handleAddItem} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            className="h-11 flex-1 rounded-xl border border-zinc-300 bg-transparent px-4 text-sm dark:border-zinc-700"
            placeholder="Add item to grocery list..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button
            type="submit"
            className="h-11 rounded-full bg-zinc-900 px-6 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-white"
            disabled={addingItem || !newItem.trim()}
          >
            Add
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Loading...
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200/70 p-8 text-center dark:border-zinc-800/80">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Your grocery list is empty. Add items manually or from the search page.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {unpurchasedItems.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                To Buy ({unpurchasedItems.length})
              </h2>
              <div className="space-y-2">
                {unpurchasedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl border border-zinc-200/70 p-3 dark:border-zinc-800/80"
                  >
                    <input
                      type="checkbox"
                      checked={item.purchased}
                      onChange={() => togglePurchased(item)}
                      className="h-4 w-4 cursor-pointer rounded border-zinc-300 dark:border-zinc-700"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{item.food_name}</div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">
                        {item.quantity} {item.unit}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-xs text-red-600 hover:text-red-700 dark:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {purchasedItems.length > 0 && (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  Purchased ({purchasedItems.length})
                </h2>
                <button
                  onClick={clearPurchased}
                  className="text-xs text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-2">
                {purchasedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-xl border border-zinc-200/70 p-3 opacity-60 dark:border-zinc-800/80"
                  >
                    <input
                      type="checkbox"
                      checked={item.purchased}
                      onChange={() => togglePurchased(item)}
                      className="h-4 w-4 cursor-pointer rounded border-zinc-300 dark:border-zinc-700"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium line-through">{item.food_name}</div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">
                        {item.quantity} {item.unit}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-xs text-red-600 hover:text-red-700 dark:text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
