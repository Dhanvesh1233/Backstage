import React from 'react';
import {
  Table,
  TableColumn,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import useAsync from 'react-use/lib/useAsync';

// Function to format price in INR
const formatPrice = (price: string) => {
  const numericValue = parseFloat(price.replace(/[^\d.-]/g, ''));
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(numericValue);
};

export const PricingDashboard = () => {
  const keyMetricsColumns: TableColumn[] = [
    { title: 'Metric', field: 'metric' },
    { title: 'Value', field: 'value' },
  ];

  const vehicleColumns: TableColumn[] = [
    { title: 'S.No', field: 'serialNo' },
    { title: 'Vehicle Group', field: 'vehicleGroup' },
    { title: 'Description', field: 'description' },
    { title: 'Price Per KM After Base KMS', field: 'pricePerKM' },
    { title: 'Waiting Price Per Minute(s)', field: 'waitingPrice' },
    { title: 'Waiting Time(Mins)', field: 'waitingTime' },
    { title: 'Waiting Grace Time(Mins)', field: 'waitingGrace' },
  ];

  // Updated vehicle details based on the request
  const vehicleDetails = [
    { serialNo: '1', 
      vehicleGroup: 'Bike', 
      description: 'Yamaha FZ - 150cc, fuel efficient', 
      pricePerKM: formatPrice('5.50'), 
      waitingPrice: formatPrice('0.00'), 
      waitingTime: '2 min', 
      waitingGrace: '2 min' },
    { serialNo: '2', 
      vehicleGroup: 'Auto', 
      description: 'Bajaj RE Compact - Three-wheeler, ideal for city rides', 
      pricePerKM: formatPrice('10.00'), 
      waitingPrice: formatPrice('1.00'), 
      waitingTime: '3 min', 
      waitingGrace: '2 min' },
    { serialNo: '3', 
      vehicleGroup: 'Car (Mini)', 
      description: 'Maruti Suzuki Alto - Compact city car, 800cc', 
      pricePerKM: formatPrice('12.00'), 
      waitingPrice: formatPrice('1.50'), 
      waitingTime: '3 min', 
      waitingGrace: '2 min' },
    { serialNo: '4', 
      vehicleGroup: 'Car (Sedan)', 
      description: 'Honda City - Mid-size sedan, comfortable for long rides', 
      pricePerKM: formatPrice('18.00'), 
      waitingPrice: formatPrice('2.00'), 
      waitingTime: '2 min', 
      waitingGrace: '3 min' },
    { serialNo: '5', 
      vehicleGroup: 'Car (SUV)', 
      description: 'Toyota Fortuner - Premium SUV, spacious with powerful engine', 
      pricePerKM: formatPrice('22.00'), 
      waitingPrice: formatPrice('3.00'), 
      waitingTime: '2 min', 
      waitingGrace: '3 min' },
    { serialNo: '6', 
      vehicleGroup: 'EV SEDAN', 
      description: 'EV SEDAN - Electric sedan car from OHM', 
      pricePerKM: formatPrice('22.50'), 
      waitingPrice: formatPrice('0.00'), 
      waitingTime: '1 min', 
      waitingGrace: '3 min' },
    { serialNo: '7', 
      vehicleGroup: 'EV MG', 
      description: 'MG - Electric car from OHM', 
      pricePerKM: formatPrice('27.50'), 
      waitingPrice: formatPrice('0.00'), 
      waitingTime: '3 min', 
      waitingGrace: '3 min' },
    { serialNo: '8', 
      vehicleGroup: 'EV BYD', 
      description: 'BYD - Electric car from OHM', 
      pricePerKM: formatPrice('27.50'), 
      waitingPrice: formatPrice('0.00'), 
      waitingTime: '1 min', 
      waitingGrace: '3 min' },
  ];

  const dataFetch = useAsync(async () => {
    return { vehicleDetails };
  }, []);

  if (dataFetch.loading) {
    return <Progress />;
  } else if (dataFetch.error) {
    return <ResponseErrorPanel error={dataFetch.error} />;
  }

  const { vehicleDetails: vehicles } = dataFetch.value || {};

  return (
    <div>
      <h3>Vehicle Group Details</h3>
      <Table
        title="Vehicle Group Details"
        columns={vehicleColumns}
        data={vehicles ?? []}
        options={{ paging: false, search: true, sorting: false }}  // Added search functionality for easier filtering
      />

      {/* Any additional sections can go here */}
    </div>
  );
};
