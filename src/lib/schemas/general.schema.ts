import * as Yup from 'yup';

export const addBudgetLineSchema = Yup.object().shape({
  description: Yup.string().required('Description is Required'),
  grantProviderId: Yup.string().required('Grant Provider is Required'),
});

export const addFundSchema = Yup.object().shape({
  budgetLineId: Yup.string().required('Budget Line is Required'),
  grantType: Yup.number().required('Grant Type is Required'),
  year: Yup.number().required('Year is Required'),
  impactIndicator: Yup.string().required('Impact Indicator is Required'),
  tfaAmount: Yup.number().required('TFA Amount is Required'),
});

export const addRequestSchema = Yup.object().shape({
  BudgetLineId: Yup.string().required('Budget Line is Required'),
  ClientName: Yup.string().required('Client Name is Required'),
  Currency: Yup.string().required('Currency is Required'),
  Description: Yup.string().required('Description is Required'),
  ExpectedImpact: Yup.string().required('Expected Impact is Required'),
  GrantProviderId: Yup.string().required('Grant Provider is Required'),
  LogisticCosts: Yup.string().required('Logistic Costs is Required'),
  Introduction: Yup.string().required('Introduction is Required'),
  Narration: Yup.string().required('Narration is Required'),
  ProcurementReport: Yup.string().required('Procurement Report is Required'),
  ProjectName: Yup.string().required('Project Name is Required'),
  Purpose: Yup.string().required('Purpose is Required'),
  TASupportLetter: Yup.string().required('TA Support Letter is Required'),
  UseTypeId: Yup.string().required('Use Type is Required'),
});

export const addExpenseSchema = Yup.object().shape({
  beneficiary: Yup.string().required('Beneficiary is Required'),
  contractAmountExclTax: Yup.number().required(
    'Contract Amount Excl Tax is Required'
  ),
  contractAmountInclTax: Yup.number().required(
    'Contract Amount Incl Tax is Required'
  ),
  bankName: Yup.string().required('Bank Name is Required'),
  accountNumber: Yup.string().required('Account Number is Required'),
  accountName: Yup.string().required('Account Name is Required'),
  contractAmountExclTaxInDollar: Yup.number().required(
    'Contract Amount Excl Tax in Dollar is Required'
  ),
  exchangeRate: Yup.number().required('Exchange Rate is Required'),
  exchangeRateSource: Yup.string().required('Exchange Rate Source is Required'),
  exchangeRateDate: Yup.string().required('Exchange Rate Date is Required'),
  engagementLetter: Yup.string().required('Engagement Letter is Required'),
  invoiceLetter: Yup.string().required('Invoice Letter is Required'),
});

export const addGrantProviderSchema = Yup.object().shape({
  currency: Yup.string().required('Currency is Required'),
  contactFirstName: Yup.string().required('Contact First Name is Required'),
  contactLastName: Yup.string().required('Contact Last Name is Required'),
  description: Yup.string().required('Description is Required'),
  email: Yup.string().required('Email is Required'),
  address: Yup.string().required('Address is Required'),
});

export const addUserSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is Required'),
  lastName: Yup.string().required('Last Name is Required'),
  email: Yup.string().email('Invalid email').required('Email is Required'),
  phoneNumber: Yup.string().required('Phone Number is Required'),
  role: Yup.number().required('Role is Required'),
  designation: Yup.string().required('Designation is Required'),
});

export const addUseTypeSchema = Yup.object().shape({
  name: Yup.string().required('Use Type name is required'),
});
