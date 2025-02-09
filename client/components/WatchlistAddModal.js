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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const WatchlistAddModal = ({
  open,
  setOpen,
  availableStocks,
  onSubmit,
}) => {
  const [type, setType] = useState("stocks");
  const [stockSelection, setStockSelection] = useState("");
  const [industrySelection, setIndustrySelection] = useState("");
  const [comboboxOpen, setComboboxOpen] = useState(false);

  const handleSubmit = () => {
    onSubmit({
      type,
      selection: type === "stock" ? stockSelection : industrySelection,
    });
    setOpen(false);
    // Reset form
    setType(null);
    setStockSelection(null);
    setIndustrySelection(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Stock/Industry Selector</DialogTitle>
          <DialogDescription>
            Choose a stock or industry and provide additional information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select
              value={type || ""}
              onValueChange={(value) => {
                setType(value);
                setStockSelection(null);
                setIndustrySelection(null);
              }}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stock">Stock</SelectItem>
                <SelectItem value="industry">Industry</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {type === "stock" ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={comboboxOpen}
                    className="col-span-3 justify-between"
                  >
                    {stockSelection
                      ? availableStocks.find(
                          (stock) => stock.ticker === stockSelection
                        )?.name
                      : "Select stock..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search stock..." />
                    <CommandList>
                      <CommandEmpty>No stock found.</CommandEmpty>
                      <CommandGroup>
                        {availableStocks.map((stock, index) => (
                          <CommandItem
                            key={index}
                            onSelect={() => {
                              setStockSelection(
                                stock.ticker === stockSelection
                                  ? null
                                  : stock.ticker
                              );
                              setComboboxOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                stockSelection === stock.ticker
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {stock.name} ({stock.ticker})
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          ) : type === "industry" ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="industry" className="text-right">
                Industry
              </Label>
              <Select
                value={industrySelection || ""}
                onValueChange={setIndustrySelection}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tech">Technology</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Energy">Energy</SelectItem>
                  <SelectItem value="Consumer Discretionary">
                    Consumer Discretionary
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          ) : null}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={
              !type || (type === "stock" ? !stockSelection : !industrySelection)
            }
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
