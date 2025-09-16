import moment from 'moment';

export const formatRelativeTime = (date: string, isMessage = false) => {
  const now = moment();
  const inputDate = moment(date);
  const diffInMinutes = now.diff(inputDate, 'minutes');

  if (diffInMinutes < 1) {
    return 'just now';
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  if (diffInMinutes < 1440) {
    const diffInHours = now.diff(inputDate, 'hours');
    return `${diffInHours} hr${diffInHours > 1 ? 's' : ''} ago`;
  }
  if (isMessage) {
    return inputDate.format('DD/MM/YYYY');
  }
  const diffInDays = now.diff(inputDate, 'days');
  return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
};

export const formatNumber = (num: number) => {
  if (num === undefined || num === null) return '0.0';
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatNumber2 = (num: number) => {
  if (!num) return '0.00';
  return num
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatNumber3 = (num: number) => {
  if (!num) return '0';
  return num
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatCurrency = (num: number) => {
  return `₦${formatNumber(num)}`;
};

export const formatCardValue = (num: number) => {
  if (!num) return '0.00';
  return num
    .toFixed(0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatPercentage = (num: number) => {
  return `${num}%`;
};

export const shortenText = (text: string, maxLength: number) => {
  if (text?.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength)}...`;
};

export const formatTime = (time: string) => {
  return moment(time).format('MMMM D, YYYY hh:mm A');
};

export const formatValidUntil = (date: any) => {
  return moment(date).format('MM.DD.YY');
};

export const formatDate = (date: string) => {
  return moment(date).format('ddd, DD MMM YYYY HH:mm:ss');
};

export const formatDate2 = (date: string) => {
  return moment(date).format('DD MMM YYYY');
};

export const formatDate3 = (date: string) => {
  return moment(date).format('ddd, DD MMM');
};

export const formatDate4 = (date: string) => {
  return moment(date).format('yyyy-MM-dd');
};

export const convertExchangeRateDate = (date: string) => {
  // Handle the specific date format from currency conversion API: "8/26/2025 12:00:00 AM"
  if (!date) return '';

  // Parse the date using moment with the specific format
  const parsedDate = moment(date, 'M/D/YYYY h:mm:ss A');

  // If parsing fails, try with zero-padded month/day format
  if (!parsedDate.isValid()) {
    const fallbackDate = moment(date, 'MM/DD/YYYY h:mm:ss A');
    if (fallbackDate.isValid()) {
      return fallbackDate.format('YYYY-MM-DD');
    }
  }

  // Check if the date is valid
  if (!parsedDate.isValid()) {
    console.warn('Invalid exchange rate date provided:', date);
    return '';
  }

  return parsedDate.format('YYYY-MM-DD');
};

// "2025-09-11T20:51:54.668425" to "2025-09-11"
export const convertExchangeRateDate2 = (date: string) => {
  return moment(date).format('YYYY-MM-DD');
};

export const currencyOptions = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' },
  { label: 'JPY', value: 'JPY' },
  { label: 'SAR', value: 'SAR' },
  { label: 'CHF', value: 'CHF' },
  { label: 'DKK', value: 'DKK' },
  { label: 'CNY', value: 'CNY' },
  { label: 'XOF', value: 'XOF' },
  { label: 'ZAR', value: 'ZAR' },
  { label: 'XDR', value: 'XDR' },
  { label: 'WAUA', value: 'WAUA' },
];

const developmentPlans = [
  { label: 'AFD', value: 1 },
  { label: 'FSD Africa', value: 2 },
  { label: 'KFW', value: 3 },
  { label: 'PIDG', value: 4 },
];

export const grantTypes = [
  { label: 'Non Refundable', value: 0 },
  { label: 'Refundable', value: 1 },
];

export const getGrantType = (value: number) => {
  return grantTypes.find((item) => item.value === value)?.label;
};

export const getDevelopmentPlan = (value: number) => {
  return developmentPlans.find((item) => item.value === value)?.label;
};

export const getCurrency = (value: string) => {
  return currencyOptions.find((item) => item.value === value)?.label || '';
};

export const getCurrencySymbol = (currencyCode: string): string => {
  const currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    SAR: 'ر.س',
    CHF: 'CHF',
    DKK: 'kr',
    CNY: '¥',
    XOF: 'CFA',
    ZAR: 'R',
    XDR: 'SDR',
    WAUA: 'WAUA',
  };

  return currencySymbols[currencyCode] || currencyCode;
};

export const tableHeaderStyle = {
  bg: 'brand.100',
  color: 'white',
  fontSize: '12px',
  fontWeight: 500,
  textAlign: 'left' as const,
  py: 4,
  textTransform: 'capitalize' as const,
};

export const tableCellStyle = {
  color: 'headText.100',
  fontSize: '12px',
  textAlign: 'left' as const,
  fontWeight: 400,
  py: 4,
  textTransform: 'capitalize' as const,
};
export const tableCellStyle2 = {
  color: 'headText.100',
  fontSize: '12px',
  textAlign: 'left' as const,
  fontWeight: 400,
  py: 4,
};

export const statusColor = (status: string) => {
  switch (status) {
    case 'Under review':
      return {
        color: '#808080',
        bg: '#EDEDED',
      };
    case 'Awaiting CEO approval':
      return {
        color: '#227CBF',
        bg: '#EDF5FE',
      };
    case 'Disbursed':
      return {
        color: '#47B65C',
        bg: '#E5FEE2',
      };
    case 'Awaiting disbursement':
      return {
        color: '#1E5F8A',
        bg: '#E8F4FD',
      };
    case 'Rejected by finance':
      return {
        color: '#FF3B30',
        bg: '#FFD5D5',
      };
    default:
      return {
        color: 'gray.200',
        bg: 'gray.100',
      };
  }
};

export const statusEnumList = [
  {
    id: 1,
    value: 'Draft',
    description: 'Draft',
  },
  {
    id: 2,
    value: 'AwaitingProcurementApproval',
    description: 'Awaiting Procurement Approval',
  },
  {
    id: 3,
    value: 'AwaitingCeoApproval',
    description: 'Awaiting Ceo Approval',
  },
  {
    id: 4,
    value: 'Approved',
    description: 'Approved',
  },
  {
    id: 5,
    value: 'NeedsReview',
    description: 'Needs Review',
  },
  {
    id: 6,
    value: 'InApproval',
    description: 'In Approval',
  },
];

export const statusOptions = [
  { label: 'Draft', value: 1 },
  { label: 'Awaiting Procurement Approval', value: 2 },
  { label: 'Awaiting Ceo Approval', value: 3 },
  { label: 'Approved', value: 4 },
  { label: 'Needs Review', value: 5 },
  { label: 'In Approval', value: 6 },
];

export const statusColor2 = (status: number) => {
  switch (status) {
    case 1: // Draft
      return {
        color: '#6B7280',
        bg: '#F3F4F6',
      };
    case 2: // AwaitingProcurementApproval
      return {
        color: '#227CBF',
        bg: '#EDF5FE',
      };
    case 3: // AwaitingCeoApproval
      return {
        color: '#47B65C',
        bg: '#E5FEE2',
      };
    case 4: // Approved
      return {
        color: '#1E5F8A',
        bg: '#E8F4FD',
      };
    case 5: // NeedsReview
      return {
        color: '#FF3B30',
        bg: '#FFD5D5',
      };
    case 6: // InApproval
      return {
        color: '#D97706',
        bg: '#FEF3C7',
      };
    default:
      return {
        color: '#9CA3AF',
        bg: '#E5E7EB',
      };
  }
};

export const getStatus = (value: number) => {
  return statusEnumList.find((item) => item.id === value)?.description;
};

export const clientStatusEnumList = [
  {
    id: 1,
    value: 'Draft',
    description: 'Draft',
  },
  {
    id: 2,
    value: 'AwaitingProcurementReview',
    description: 'Awaiting Procurement Review',
  },

  {
    id: 3,
    value: 'AwaitingCeoReview',
    description: 'Awaiting Ceo Review',
  },

  {
    id: 4,
    value: 'AwaitingFinanceDisbursement',
    description: 'Awaiting Finance Disbursement',
  },

  {
    id: 5,
    value: 'ObjectedByProcurement',
    description: 'Objected by Procurement',
  },

  {
    id: 6,
    value: 'RejectedByCeo',
    description: 'Rejected by Ceo',
  },

  {
    id: 7,
    value: 'DisbursedByFinance',
    description: 'Disbursed by Finance',
  },

  {
    id: 8,
    value: 'ObjectedByFinance',
    description: 'Objected by Finance',
  },

  {
    id: 9,
    value: 'NeedsReview',
    description: 'Needs Review',
  },
];

export const clientStatusOptions = [
  { label: 'Draft', value: 1 },
  { label: 'Awaiting Procurement Review', value: 2 },
  { label: 'Awaiting Ceo Review', value: 3 },
  { label: 'Awaiting Finance Disbursement', value: 4 },
  { label: 'Objected by Procurement', value: 5 },
  { label: 'Rejected by Ceo', value: 6 },
  { label: 'Disbursed by Finance', value: 7 },
  { label: 'Objected by Finance', value: 8 },
  { label: 'Needs Review', value: 9 },
];

export const getClientStatus = (value: number) => {
  return clientStatusEnumList.find((item) => item.id === value)?.description;
};

export const clientStatusColor = (status: number) => {
  switch (status) {
    case 1:
      return {
        color: '#6B7280',
        bg: '#F3F4F6',
      };
    case 2:
      return {
        color: '#227CBF',
        bg: '#EDF5FE',
      };
    case 3:
      return {
        color: '#47B65C',
        bg: '#E5FEE2',
      };
    case 4:
      return {
        color: '#1E5F8A',
        bg: '#E8F4FD',
      };
    case 5:
      return {
        color: '#FF3B30',
        bg: '#FFD5D5',
      };
    case 6:
      return {
        color: '#D97706',
        bg: '#FEF3C7',
      };
    case 7:
      return {
        color: '#059669',
        bg: '#D1FAE5',
      };
    case 8:
      return {
        color: '#DC2626',
        bg: '#FEE2E2',
      };
    case 9:
      return {
        color: '#EA580C',
        bg: '#FFEDD5',
      };
    default:
      return {
        color: '#9CA3AF',
        bg: '#E5E7EB',
      };
  }
};

export const calculateSLA = (
  startDate: string | null | undefined,
  endDate: string | null | undefined,
  slaDays: number = 1
): {
  days: number | null;
  bgColor: string;
  textColor: string;
  displayText: string;
  isOverdue: boolean;
} => {
  // Return N/A state if either date is missing
  if (!startDate || !endDate) {
    return {
      days: null,
      bgColor: '#F3F4F6',
      textColor: '#6B7280',
      displayText: 'Not Available',
      isOverdue: false,
    };
  }

  // Parse dates and normalize to start of day
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Reset time to start of day for accurate calculation
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  // Calculate the difference in days
  const daysDifference = Math.round(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Subtract SLA period
  const slaResult = daysDifference - slaDays;

  // Determine colors and display format
  let bgColor: string;
  let textColor: string;

  if (slaResult <= 0) {
    // Early or on-time completion - green
    bgColor = '#E5FEE2';
    textColor = '#47B65C';
  } else {
    // Overdue - red
    bgColor = '#FFD5D5';
    textColor = '#FF3B30';
  }

  // Format display text
  let displayText: string;
  if (slaResult < 0) {
    displayText = `${Math.abs(slaResult)} days`;
  } else if (slaResult > 0) {
    displayText = `+${slaResult} days`;
  } else {
    displayText = 'On time';
  }

  return {
    days: slaResult,
    bgColor,
    textColor,
    displayText,
    isOverdue: slaResult > 0,
  };
};

export const roles = [
  { label: 'Others', value: 1 },
  { label: 'Finance', value: 2 },
  { label: 'IT Admin', value: 3 },
  { label: 'CEO', value: 4 },
];

export const getRole = (value: number) => {
  return roles.find((item) => item.value === value)?.label;
};
export const yearOptions = (startYear: number = 5, endYear: number = 10) => {
  const currentYear = new Date().getFullYear();
  const years: any[] = [];
  for (let i = currentYear - startYear; i <= currentYear + endYear; i += 1) {
    years.push({ label: i.toString(), value: i });
  }
  return years;
};

export const dashboardStatusOptions = [
  { label: 'Submitted', value: 1 },
  { label: 'Pending Submission', value: 2 },
  { label: 'Approved', value: 3 },
  { label: 'Rejected', value: 4 },
];

// color and bg for dashboard status
export const dashboardStatusColor = (status: string) => {
  switch (status) {
    case 'Pending Submission':
      return { color: '#808080', bg: '#EDEDED' };
    case 'Submitted':
      return { color: '#FF7926', bg: '#FFD3B7' };
    case 'Reviewed':
      return { color: '#47B65C', bg: '#B8FFAE' };
       case 'Approved':
      return { color: '#47B65C', bg: '#B8FFAE' };
       case 'Rejected':
      return { color: '#f70000ff', bg: '#ffffffff' };
    default:
      return { color: '#9CA3AF', bg: '#E5E7EB' };
  }
};
