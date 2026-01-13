/**
 * Simple TableView Examples - Type-Safe Compound Components
 */
import { Button } from '@mui/material';

import Table from '@/components/table';
import type { GridColDef } from '@/components/table';

import { TableView, createTableView } from './table-view';

// ============================================================================
// Example 1: Basic Usage (No Type Safety Needed)
// ============================================================================

export function BasicExample() {
  return (
    <TableView variant='default'>
      <TableView.Header>
        <TableView.Title>Products</TableView.Title>
        <TableView.Actions>
          <Button variant='contained'>Add Product</Button>
        </TableView.Actions>
      </TableView.Header>

      <TableView.Content>
        <TableView.Filters>
          <input placeholder='Search...' />
        </TableView.Filters>

        <TableView.Table>
          <div>Your table here</div>
        </TableView.Table>
      </TableView.Content>
    </TableView>
  );
}

// ============================================================================
// Example 2: Type-Safe Version (When You Need Type Safety)
// ============================================================================

interface Product {
  id: string;
  name: string;
  price: number;
}

export function TypeSafeExample() {
  // Create typed version
  const { TableView: ProductTable } = createTableView<Product>();

  const products: Product[] = [
    { id: '1', name: 'Durian A', price: 100 },
    { id: '2', name: 'Durian B', price: 150 },
  ];

  const columns: GridColDef<Product>[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Product Name', width: 200 },
    { field: 'price', headerName: 'Price (THB)', width: 150 },
  ];

  return (
    <ProductTable
      data={products}
      onRowClick={(row) => {
        // ✅ TypeScript knows row is Product type
        console.log(row.name, row.price);
      }}
    >
      <ProductTable.Header>
        <ProductTable.Title>Products</ProductTable.Title>
        <ProductTable.Actions>
          <Button variant='contained'>Add Product</Button>
        </ProductTable.Actions>
      </ProductTable.Header>

      <ProductTable.Content>
        <ProductTable.Table>
          <Table
            rows={products}
            columns={columns}
            rowCount={products.length}
            paginationModel={{ page: 0, pageSize: 10 }}
          />
        </ProductTable.Table>
      </ProductTable.Content>
    </ProductTable>
  );
}

// ============================================================================
// Example 3: Complete Example with Real Table Component
// ============================================================================

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
}

export function CompleteTableExample() {
  const { TableView: OrderTable } = createTableView<Order>();

  const orders: Order[] = [
    { id: '1', orderNumber: 'ORD-001', customer: 'John Doe', total: 1250, status: 'completed' },
    { id: '2', orderNumber: 'ORD-002', customer: 'Jane Smith', total: 890, status: 'pending' },
    { id: '3', orderNumber: 'ORD-003', customer: 'Bob Wilson', total: 2100, status: 'completed' },
  ];

  const columns: GridColDef<Order>[] = [
    { field: 'orderNumber', headerName: 'Order #', width: 150 },
    { field: 'customer', headerName: 'Customer', width: 200 },
    {
      field: 'total',
      headerName: 'Total (THB)',
      width: 150,
      valueFormatter: (value: number) => `฿${value.toLocaleString()}`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <span
          style={{
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor:
              params.value === 'completed' ? '#d4edda' : params.value === 'pending' ? '#fff3cd' : '#f8d7da',
            color: params.value === 'completed' ? '#155724' : params.value === 'pending' ? '#856404' : '#721c24',
          }}
        >
          {params.value}
        </span>
      ),
    },
  ];

  return (
    <OrderTable data={orders}>
      <OrderTable.Header>
        <OrderTable.Title showBackButton subtitle='View and manage all orders'>
          Order Management
        </OrderTable.Title>
        <OrderTable.Actions>
          <Button variant='outlined'>Export</Button>
          <Button variant='contained'>New Order</Button>
        </OrderTable.Actions>
      </OrderTable.Header>

      <OrderTable.Content fullHeight>
        <OrderTable.Filters>
          <input placeholder='Search orders...' style={{ padding: '8px', width: '200px', borderRadius: '4px', border: '1px solid #ddd' }} />
          <select style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
            <option value=''>All Status</option>
            <option value='pending'>Pending</option>
            <option value='completed'>Completed</option>
            <option value='cancelled'>Cancelled</option>
          </select>
        </OrderTable.Filters>

        <OrderTable.Table>
          <Table
            rows={orders}
            columns={columns}
            rowCount={orders.length}
            paginationModel={{ page: 0, pageSize: 10 }}
            onRowClick={(params) => {
              console.log('Clicked order:', params.row.orderNumber);
            }}
          />
        </OrderTable.Table>

        <OrderTable.Footer>
          <span style={{ color: '#666' }}>
            Total Revenue: ฿{orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}
          </span>
        </OrderTable.Footer>
      </OrderTable.Content>
    </OrderTable>
  );
}

// ============================================================================
// Example 4: Compact Variant
// ============================================================================

export function CompactExample() {
  return (
    <TableView variant='compact'>
      <TableView.Header>
        <TableView.Title>Quick View</TableView.Title>
      </TableView.Header>

      <TableView.Content>
        <TableView.Table minHeight='200px'>
          <div>Compact table</div>
        </TableView.Table>
      </TableView.Content>
    </TableView>
  );
}

// ============================================================================
// Example 5: With Footer
// ============================================================================

export function WithFooterExample() {
  return (
    <TableView>
      <TableView.Header>
        <TableView.Title>Orders</TableView.Title>
      </TableView.Header>

      <TableView.Content>
        <TableView.Table>
          <div>Table content</div>
        </TableView.Table>

        <TableView.Footer>
          <span>Total: 100 items</span>
          <Button size='small'>Load More</Button>
        </TableView.Footer>
      </TableView.Content>
    </TableView>
  );
}

// ============================================================================
// Example 6: Multiple Typed Tables
// ============================================================================

interface Order {
  id: string;
  total: number;
}

interface Shipment {
  id: string;
  tracking: string;
}

export function MultipleTablesExample() {
  const { TableView: OrderTable } = createTableView<Order>();
  const { TableView: ShipmentTable } = createTableView<Shipment>();

  const orders: Order[] = [
    { id: '1', orderNumber: 'ORD-001', customer: 'John Doe', total: 250, status: 'completed' },
  ];
  const shipments: Shipment[] = [{ id: '1', tracking: 'TRK-001' }];

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <OrderTable data={orders}>
        <OrderTable.Header>
          <OrderTable.Title>Orders</OrderTable.Title>
        </OrderTable.Header>
        <OrderTable.Content>
          <OrderTable.Table>
            <div>Orders: {orders.length}</div>
          </OrderTable.Table>
        </OrderTable.Content>
      </OrderTable>

      <ShipmentTable data={shipments}>
        <ShipmentTable.Header>
          <ShipmentTable.Title>Shipments</ShipmentTable.Title>
        </ShipmentTable.Header>
        <ShipmentTable.Content>
          <ShipmentTable.Table>
            <div>Shipments: {shipments.length}</div>
          </ShipmentTable.Table>
        </ShipmentTable.Content>
      </ShipmentTable>
    </div>
  );
}
