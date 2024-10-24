import React, { useState } from 'react';
import {
  Table,
  TableColumn,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import { Button, TextField, Breadcrumbs, Link } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'; // Check if this is correctly imported
import useAsync from 'react-use/lib/useAsync';

// Function to format price in INR
const formatPrice = (price: string) => {
  const numericValue = parseFloat(price.replace(/[^\d.-]/g, ''));
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(numericValue);
};

type VehicleDetails = {
  serialNo: number;
  vehicleGroup: string;
  description: string;
  pricePerKM: string;
  waitingPrice: string;
  waitingTime: number;
  waitingGrace: number;
};

type DenseTableProps = {
  pricing: VehicleDetails[];
};

const EditForm: React.FC<{
  row: VehicleDetails;
  onSave: (updatedRow: VehicleDetails) => void;
  onCancel: () => void;
}> = ({ row, onSave, onCancel }) => {
  const [editingRow, setEditingRow] = useState<VehicleDetails>(row);

  const handleChange = (
    field: keyof VehicleDetails,
    value: string | number,
  ) => {
    setEditingRow({ ...editingRow, [field]: value });
  };

  const handleSubmit = async () => {
    await fetch(
      `http://localhost:8080/api/vehicleGroup/updateVehicle/${editingRow.serialNo}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingRow),
      },
    );
    onSave(editingRow);
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '16px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <TextField
        label="Vehicle Group"
        value={editingRow.vehicleGroup}
        InputProps={{
          readOnly: true,
        }}
        fullWidth
        variant="outlined" // Ensure variant is applied
        InputLabelProps={{ shrink: true}} // Keep label from overlapping
        style={{ marginBottom: '16px' }} // Add spacing between fields
      />

      <TextField
        label="Description"
        value={editingRow.description}
        onChange={e => handleChange('description', e.target.value)}
        fullWidth
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        style={{ marginBottom: '16px' }}
      />

      <TextField
        label="Price Per KM After Base KMS"
        type="text"
        value={editingRow.pricePerKM}
        onChange={e => handleChange('pricePerKM', formatPrice(e.target.value))}
        fullWidth
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        style={{ marginBottom: '16px' }}
      />

      <TextField
        label="Waiting Price Per Minute(s)"
        type="text"
        value={editingRow.waitingPrice}
        onChange={e =>
          handleChange('waitingPrice', formatPrice(e.target.value))
        }
        fullWidth
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        style={{ marginBottom: '16px' }}
      />

      <TextField
        label="Waiting Time(Mins)"
        type="number"
        value={editingRow.waitingTime}
        onChange={e => handleChange('waitingTime', Number(e.target.value))}
        fullWidth
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        style={{ marginBottom: '16px' }}
      />

      <TextField
        label="Waiting Grace Time(Mins)"
        type="number"
        value={editingRow.waitingGrace}
        onChange={e => handleChange('waitingGrace', Number(e.target.value))}
        fullWidth
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        style={{ marginBottom: '16px' }}
      />

      <div style={{ margin: '8px 0' }} />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={onCancel}
        style={{ marginLeft: '8px' }}
      >
        Cancel
      </Button>
    </div>
  );
};

export const DenseTable: React.FC<DenseTableProps> = ({ pricing }) => {
  const [data, setData] = useState<VehicleDetails[]>(pricing);
  const [editingRow, setEditingRow] = useState<VehicleDetails | null>(null);

  const handleEditClick = (row: VehicleDetails) => {
    setEditingRow(row);
  };

  const handleSave = (updatedRow: VehicleDetails) => {
    const updatedData = data.map(item =>
      item.serialNo === updatedRow.serialNo ? updatedRow : item,
    );
    setData(updatedData);
    setEditingRow(null);
  };

  const columns: TableColumn<VehicleDetails>[] = [
    { title: 'S.No', field: 'serialNo' },
    { title: 'Vehicle Group', field: 'vehicleGroup' },
    { title: 'Description', field: 'description' },
    { title: 'Price Per KM After Base KMS', field: 'pricePerKM' },
    { title: 'Waiting Price Per Minute(s)', field: 'waitingPrice' },
    { title: 'Waiting Time(Mins)', field: 'waitingTime' },
    { title: 'Waiting Grace Time(Mins)', field: 'waitingGrace' },
    {
      title: 'Actions',
      render: (rowData: VehicleDetails) => (
        <EditIcon
          style={{ cursor: 'pointer' }}
          onClick={() => handleEditClick(rowData)}
        />
      ),
    },
  ];

  return (
    <div>
      {editingRow ? (
        <div>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              color="primary"
              onClick={() => setEditingRow(null)}
              style={{ fontWeight: 'bold' }}
            >
              Vehicle Group Details
            </Link>
            <span>Edit Vehicle Group</span>
          </Breadcrumbs>
          <EditForm
            row={editingRow}
            onSave={handleSave}
            onCancel={() => setEditingRow(null)}
          />
        </div>
      ) : (
        <Table
          title="Vehicle Group Details"
          options={{ search: true, paging: true, sorting: false }}
          columns={columns}
          data={data}
          style={{
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }} // Same styling as the edit form
        />
      )}
    </div>
  );
};

export const ExampleFetchComponent: React.FC = () => {
  const { value, loading, error } = useAsync(async (): Promise<
    VehicleDetails[]
  > => {
    const response = await fetch(
      'http://localhost:8080/api/vehicleGroup/vehicleDetails',
    ); // New API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }, []);

  if (loading) {
    return <Progress />;
  } else if (error) {
    return <ResponseErrorPanel error={error} />;
  }

  return <DenseTable pricing={value || []} />;
};
