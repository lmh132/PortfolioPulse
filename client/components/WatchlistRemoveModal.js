"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

export const WatchlistRemoveModal = ({
  open,
  setOpen,
  stocks,
  industries,
  onRemove,
}) => {
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);

  const handleToggleSelection = (id, type) => {
    if (type === "stock") {
      setSelectedStocks((prev) => (prev.includes(id) ? prev : [...prev, id]));
    } else {
      setSelectedIndustries((prev) =>
        prev.includes(id) ? prev : [...prev, id]
      );
    }
  };

  const handleRemove = () => {
    onRemove({
      stocks: selectedStocks,
      industries: selectedIndustries,
    });
    setOpen(false);
    // Reset selections
    setSelectedStocks([]);
    setSelectedIndustries([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Remove from Watchlist</DialogTitle>
          <DialogDescription>
            Select items to remove from your watchlist.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Search watchlist..." />
            <CommandList>
              <ScrollArea className="h-[200px]">
                <CommandEmpty>No items found.</CommandEmpty>
                <CommandGroup heading="Stocks">
                  {stocks.map((stock, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => handleToggleSelection(stock, "stock")}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedStocks.includes(stock)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {stock}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Industries">
                  {industries.map((industry, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() =>
                        handleToggleSelection(industry, "industry")
                      }
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedIndustries.includes(industry)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {industry}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </ScrollArea>
            </CommandList>
          </Command>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleRemove}
            disabled={
              selectedStocks.length === 0 && selectedIndustries.length === 0
            }
          >
            Remove Selected ({selectedStocks.length + selectedIndustries.length}
            )
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
