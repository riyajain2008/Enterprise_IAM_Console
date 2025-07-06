
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, Download, DollarSign, TrendingUp, Calendar, FileText } from 'lucide-react';

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
  dueDate: string;
}

const BillingPage = () => {
  const [invoices] = useState<Invoice[]>([
    {
      id: 'INV-2024-001',
      date: '2024-01-01',
      amount: 299.99,
      status: 'paid',
      description: 'Monthly subscription - January 2024',
      dueDate: '2024-01-15'
    },
    {
      id: 'INV-2024-002',
      date: '2024-02-01',
      amount: 299.99,
      status: 'paid',
      description: 'Monthly subscription - February 2024',
      dueDate: '2024-02-15'
    },
    {
      id: 'INV-2024-003',
      date: '2024-03-01',
      amount: 399.99,
      status: 'pending',
      description: 'Monthly subscription - March 2024 (Pro Plan)',
      dueDate: '2024-03-15'
    }
  ]);

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'pending').reduce((sum, invoice) => sum + invoice.amount, 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <CreditCard className="w-8 h-8 mr-3" />
            Billing & Invoices
          </h1>
          <p className="text-gray-600 mt-1">Manage your subscription and view billing history</p>
        </div>
        
        <Button className="flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Download Statement
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Billed</p>
                <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Paid</p>
                <p className="text-2xl font-bold text-green-600">${paidAmount.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">${pendingAmount.toFixed(2)}</p>
              </div>
              <Calendar className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Plan</p>
                <p className="text-lg font-bold text-purple-600">Pro Plan</p>
              </div>
              <CreditCard className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Current Subscription
          </CardTitle>
          <CardDescription>Your active plan and billing information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Plan</label>
                <p className="text-lg font-semibold">Pro Plan</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Monthly Cost</label>
                <p className="text-lg font-semibold">$399.99</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Next Billing Date</label>
                <p className="text-lg font-semibold">March 15, 2024</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Payment Method</label>
                <p className="text-lg font-semibold">•••• •••• •••• 4242</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Billing Email</label>
                <p className="text-lg font-semibold">billing@example.com</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">Update Payment</Button>
                <Button variant="outline" size="sm">Change Plan</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Invoice History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Invoice History
          </CardTitle>
          <CardDescription>All your past invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-mono text-sm">{invoice.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{new Date(invoice.date).toLocaleDateString()}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{invoice.description}</span>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold">${invoice.amount.toFixed(2)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{new Date(invoice.dueDate).toLocaleDateString()}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingPage;
