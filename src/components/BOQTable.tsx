
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

interface FurnitureItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
  leadTime: string;
}

interface BOQTableProps {
  items: FurnitureItem[];
  onPrint: () => void;
  onDownload: () => void;
}

const BOQTable = ({ items, onPrint, onDownload }: BOQTableProps) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Bill of Quantities</h3>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onPrint}
            className="flex items-center"
          >
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onDownload}
            className="flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Item</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {item.description}
                  <div className="mt-1">
                    <Badge variant="outline" className="text-xs">
                      Lead time: {item.leadTime}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">{item.quantity}</TableCell>
                <TableCell className="text-right font-mono">
                  ${item.price.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-mono">
                  ${(item.price * item.quantity).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex flex-col items-end space-y-2 p-4">
        <div className="flex justify-between w-[300px]">
          <span className="text-muted-foreground">Subtotal:</span>
          <span className="font-mono">${subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between w-[300px]">
          <span className="text-muted-foreground">Tax (8%):</span>
          <span className="font-mono">${tax.toLocaleString()}</span>
        </div>
        <div className="flex justify-between w-[300px] font-medium border-t pt-2">
          <span>Total:</span>
          <span className="font-mono">${total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BOQTable;
