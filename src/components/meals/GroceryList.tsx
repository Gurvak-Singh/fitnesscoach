
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Plus, 
  Trash, 
  Printer, 
  Share2, 
  CheckCircle2, 
  Circle,
  List 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock grocery categories and items
const groceryCategories = [
  {
    name: "Produce",
    items: [
      { id: 1, name: "Spinach", quantity: "1 bag", checked: false },
      { id: 2, name: "Avocados", quantity: "3", checked: false },
      { id: 3, name: "Bell peppers", quantity: "2", checked: true },
      { id: 4, name: "Cherry tomatoes", quantity: "1 pint", checked: false },
      { id: 5, name: "Broccoli", quantity: "1 head", checked: false }
    ]
  },
  {
    name: "Protein",
    items: [
      { id: 6, name: "Chicken breast", quantity: "2 lbs", checked: false },
      { id: 7, name: "Salmon fillets", quantity: "1 lb", checked: false },
      { id: 8, name: "Eggs", quantity: "1 dozen", checked: false },
      { id: 9, name: "Greek yogurt", quantity: "32 oz", checked: true }
    ]
  },
  {
    name: "Grains",
    items: [
      { id: 10, name: "Quinoa", quantity: "1 box", checked: false },
      { id: 11, name: "Brown rice", quantity: "2 cups", checked: false },
      { id: 12, name: "Whole grain bread", quantity: "1 loaf", checked: false }
    ]
  },
  {
    name: "Pantry",
    items: [
      { id: 13, name: "Olive oil", quantity: "1 bottle", checked: true },
      { id: 14, name: "Balsamic vinegar", quantity: "1 bottle", checked: false },
      { id: 15, name: "Chia seeds", quantity: "4 oz", checked: false },
      { id: 16, name: "Almonds", quantity: "8 oz", checked: false }
    ]
  }
];

const GroceryList = () => {
  const [categories, setCategories] = useState(groceryCategories);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);
  
  const toggleItemCheck = (categoryIndex: number, itemId: number) => {
    setCategories(prev => 
      prev.map((category, idx) => 
        idx === categoryIndex 
          ? {
              ...category,
              items: category.items.map(item => 
                item.id === itemId 
                  ? { ...item, checked: !item.checked }
                  : item
              )
            }
          : category
      )
    );
  };
  
  const addNewItem = () => {
    if (!newItemName || !newItemQuantity || !newItemCategory) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const categoryIndex = categories.findIndex(cat => cat.name === newItemCategory);
    
    if (categoryIndex === -1) {
      toast.error("Invalid category");
      return;
    }
    
    const newItem = {
      id: Math.max(...categories.flatMap(cat => cat.items.map(item => item.id))) + 1,
      name: newItemName,
      quantity: newItemQuantity,
      checked: false
    };
    
    setCategories(prev => 
      prev.map((category, idx) => 
        idx === categoryIndex 
          ? { ...category, items: [...category.items, newItem] }
          : category
      )
    );
    
    setNewItemName("");
    setNewItemQuantity("");
    toast.success("Item added to your grocery list");
  };
  
  const removeCheckedItems = () => {
    setCategories(prev => 
      prev.map(category => ({
        ...category,
        items: category.items.filter(item => !item.checked)
      }))
    );
    toast.success("Checked items removed");
  };
  
  const shareGroceryList = () => {
    const listText = categories
      .map(category => 
        `${category.name}:\n${category.items.map(item => `- ${item.name} (${item.quantity})`).join('\n')}`
      )
      .join('\n\n');
    
    if (navigator.share) {
      navigator.share({
        title: 'FitLife Coach Grocery List',
        text: listText,
      }).catch(() => {
        toast.success("List copied to clipboard!");
        navigator.clipboard.writeText(listText);
      });
    } else {
      navigator.clipboard.writeText(listText);
      toast.success("List copied to clipboard!");
    }
  };
  
  const printGroceryList = () => {
    toast.success("Printing grocery list...");
    window.print();
  };
  
  // Count total and completed items
  const totalItems = categories.reduce((sum, category) => sum + category.items.length, 0);
  const completedItems = categories.reduce(
    (sum, category) => sum + category.items.filter(item => item.checked).length, 
    0
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Grocery List
              </CardTitle>
              <CardDescription>
                Based on your weekly meal plan
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {completedItems} of {totalItems} items
              </span>
              <div className="w-24 h-2 bg-secondary rounded-full">
                <div 
                  className="h-2 bg-primary rounded-full" 
                  style={{ width: `${(completedItems / totalItems) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add new item form */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-2">
                  <Input 
                    placeholder="Item name" 
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                  />
                </div>
                <div>
                  <Input 
                    placeholder="Quantity" 
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <Select 
                    value={newItemCategory}
                    onValueChange={setNewItemCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category, idx) => (
                        <SelectItem key={idx} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Button 
                    className="w-full"
                    onClick={addNewItem}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Grocery list */}
          <Tabs defaultValue="list">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="list" className="flex items-center">
                  <List className="mr-2 h-4 w-4" />
                  List View
                </TabsTrigger>
                <TabsTrigger value="categories" className="flex items-center">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  By Category
                </TabsTrigger>
              </TabsList>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="show-completed" 
                  checked={showCompleted}
                  onCheckedChange={() => setShowCompleted(!showCompleted)}
                />
                <label 
                  htmlFor="show-completed" 
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Show completed items
                </label>
              </div>
            </div>
            
            <TabsContent value="list" className="space-y-4">
              <div className="space-y-2">
                {categories.flatMap(category => 
                  category.items.map(item => 
                    (!item.checked || showCompleted) && (
                      <div 
                        key={item.id} 
                        className={`flex items-center justify-between p-3 rounded-md hover:bg-secondary/40 ${
                          item.checked ? "opacity-60" : ""
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <Checkbox 
                            checked={item.checked}
                            onCheckedChange={() => {
                              const categoryIndex = categories.findIndex(cat => 
                                cat.items.some(i => i.id === item.id)
                              );
                              toggleItemCheck(categoryIndex, item.id);
                            }}
                          />
                          <div className={item.checked ? "line-through" : ""}>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.quantity}</p>
                          </div>
                        </div>
                        <Badge className="text-xs bg-secondary text-foreground">
                          {categories.find(cat => 
                            cat.items.some(i => i.id === item.id)
                          )?.name}
                        </Badge>
                      </div>
                    )
                  )
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="categories" className="space-y-6">
              {categories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-sm font-semibold mb-2">{category.name}</h3>
                  <div className="space-y-2">
                    {category.items
                      .filter(item => !item.checked || showCompleted)
                      .map(item => (
                        <div 
                          key={item.id} 
                          className={`flex items-center justify-between p-3 rounded-md hover:bg-secondary/40 ${
                            item.checked ? "opacity-60" : ""
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <Checkbox 
                              checked={item.checked}
                              onCheckedChange={() => toggleItemCheck(categoryIndex, item.id)}
                            />
                            <div className={item.checked ? "line-through" : ""}>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.quantity}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <Separator className="my-4" />
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={printGroceryList}
              title="Print list"
            >
              <Printer className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={shareGroceryList}
              title="Share list"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            variant="destructive"
            onClick={removeCheckedItems}
            disabled={completedItems === 0}
          >
            <Trash className="mr-2 h-4 w-4" />
            Remove Checked Items
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// Missing Badge component
import { Badge } from "@/components/ui/badge";

export default GroceryList;
