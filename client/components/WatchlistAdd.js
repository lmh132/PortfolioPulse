"use client";

import { useState, useEffect } from "react";
import { PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [newItemType, setNewItemType] = useState("stock");
  const [newItemName, setNewItemName] = useState("");

  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addItem = () => {
    if (newItemName.trim()) {
      const newItem = {
        id: Date.now().toString(),
        type: newItemType,
        name: newItemName.trim().toUpperCase(),
      };
      setWatchlist([...watchlist, newItem]);
      setNewItemName("");
    }
  };

  const removeItem = (id) => {
    setWatchlist(watchlist.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-background">
      <h1 className="text-2xl font-bold mb-4">Stock & Industry Watchlist</h1>
      <div className="flex gap-2 mb-4">
        <Select
          value={newItemType}
          onValueChange={(value) => setNewItemType(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stock">Stock</SelectItem>
            <SelectItem value="industry">Industry</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder={
            newItemType === "stock"
              ? "Enter stock ticker"
              : "Enter industry name"
          }
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={addItem}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
      <div className="space-y-2">
        {watchlist.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 bg-muted rounded"
          >
            <span className="font-medium">
              {item.name}
              <span className="ml-2 text-sm text-muted-foreground">
                ({item.type})
              </span>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(item.id)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
