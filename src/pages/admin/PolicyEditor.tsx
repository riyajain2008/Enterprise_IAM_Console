import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Edit, Trash, Copy, CheckCircle, AlertTriangle, ShieldCheck } from "lucide-react";

interface PolicyStatement {
  id: string;
  effect: "Allow" | "Deny";
  action: string;
  resource: string;
  condition: string;
}

const PolicyEditor = () => {
  const [policyName, setPolicyName] = useState("New Policy");
  const [policyDescription, setPolicyDescription] = useState("Description of the policy");
  const [statements, setStatements] = useState<PolicyStatement[]>([
    {
      id: "1",
      effect: "Allow",
      action: "read",
      resource: "users/*",
      condition: "role=admin"
    },
    {
      id: "2",
      effect: "Deny",
      action: "delete",
      resource: "users/123",
      condition: ""
    }
  ]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStatement, setSelectedStatement] = useState<PolicyStatement | null>(null);

  const addStatement = () => {
    const newStatement: PolicyStatement = {
      id: Date.now().toString(),
      effect: "Allow" as const,
      action: "",
      resource: "",
      condition: ""
    };
    setStatements([...statements, newStatement]);
  };

  const updateStatement = (id: string, field: keyof PolicyStatement, value: string) => {
    setStatements(statements.map(stmt => 
      stmt.id === id ? { ...stmt, [field]: value } : stmt
    ));
  };

  const deleteStatement = (id: string) => {
    setStatements(statements.filter(stmt => stmt.id !== id));
  };

  const duplicateStatement = (statement: PolicyStatement) => {
    const newStatement: PolicyStatement = {
      ...statement,
      id: Date.now().toString()
    };
    setStatements([...statements, newStatement]);
  };

  const openDialog = (statement: PolicyStatement) => {
    setSelectedStatement(statement);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedStatement(null);
  };

  const saveChanges = () => {
    // In a real application, this is where you would save the changes to a database or API
    alert("Policy saved!");
    closeDialog();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <ShieldCheck className="w-8 h-8 mr-3" />
            Policy Editor
          </h1>
          <p className="text-gray-600 mt-1">Define and manage access policies</p>
        </div>
        
        <div className="space-x-2">
          <Button variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Duplicate Policy
          </Button>
          <Button>
            <CheckCircle className="w-4 h-4 mr-2" />
            Save Policy
          </Button>
        </div>
      </div>

      {/* Policy Details */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Information</CardTitle>
          <CardDescription>Basic details about the policy</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="policy-name">Policy Name</Label>
            <Input
              type="text"
              id="policy-name"
              value={policyName}
              onChange={(e) => setPolicyName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="policy-description">Description</Label>
            <Textarea
              id="policy-description"
              value={policyDescription}
              onChange={(e) => setPolicyDescription(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Policy Statements */}
      <Card>
        <CardHeader>
          <CardTitle>Policy Statements</CardTitle>
          <CardDescription>Define the rules for this policy</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Effect</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead className="w-24"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statements.map((statement) => (
                <TableRow key={statement.id}>
                  <TableCell>
                    <Select
                      value={statement.effect}
                      onValueChange={(value) => updateStatement(statement.id, "effect", value)}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Effect" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Allow">Allow</SelectItem>
                        <SelectItem value="Deny">Deny</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={statement.action}
                      onChange={(e) => updateStatement(statement.id, "action", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={statement.resource}
                      onChange={(e) => updateStatement(statement.id, "resource", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={statement.condition}
                      onChange={(e) => updateStatement(statement.id, "condition", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => duplicateStatement(statement)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteStatement(statement.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            variant="secondary"
            onClick={addStatement}
            className="w-full mt-4"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Statement
          </Button>
        </CardContent>
      </Card>

      {/* Dialog for editing statement details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Policy Statement</DialogTitle>
            <DialogDescription>
              Make changes to the selected policy statement.
            </DialogDescription>
          </DialogHeader>
          {selectedStatement && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="effect" className="text-right">
                  Effect
                </Label>
                <Select
                  value={selectedStatement.effect}
                  onValueChange={(value) => selectedStatement && updateStatement(selectedStatement.id, "effect", value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Effect" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Allow">Allow</SelectItem>
                    <SelectItem value="Deny">Deny</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="action" className="text-right">
                  Action
                </Label>
                <Input
                  type="text"
                  id="action"
                  value={selectedStatement.action}
                  onChange={(e) => selectedStatement && updateStatement(selectedStatement.id, "action", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="resource" className="text-right">
                  Resource
                </Label>
                <Input
                  type="text"
                  id="resource"
                  value={selectedStatement.resource}
                  onChange={(e) => selectedStatement && updateStatement(selectedStatement.id, "resource", e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="condition" className="text-right">
                  Condition
                </Label>
                <Input
                  type="text"
                  id="condition"
                  value={selectedStatement.condition}
                  onChange={(e) => selectedStatement && updateStatement(selectedStatement.id, "condition", e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
            <Button type="submit" onClick={saveChanges}>Save changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PolicyEditor;
