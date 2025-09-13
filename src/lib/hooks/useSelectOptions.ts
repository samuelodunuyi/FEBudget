import { useMemo } from 'react';

import { shortenText } from '../utils/formatter';
import { useGetBudgetLinesQuery } from '~/lib/redux/services/budgetLine.service';
import { useGetGrantProvidersQuery } from '~/lib/redux/services/grantProvider.service';
import { useGetUseTypesQuery } from '~/lib/redux/services/useType.service';

interface UseSelectOptionsParams {
  budgetLinesParams?: {
    pageSize?: number;
    currentPage?: number;
    IsFunded?: boolean;
    [key: string]: any;
  };
  useTypesParams?: {
    pageSize?: number;
    currentPage?: number;
    [key: string]: any;
  };
  grantProvidersParams?: {
    pageSize?: number;
    currentPage?: number;
    [key: string]: any;
  };
}

export const useBudgetLineOptions = (
  params: UseSelectOptionsParams['budgetLinesParams'] = {}
) => {
  const defaultParams = {
    pageSize: 1000,
    currentPage: 1,
    ...params,
  };

  // Remove IsFunded from params if it's not explicitly provided
  const queryParams = { ...defaultParams };
  if (params.IsFunded === undefined) {
    delete queryParams.IsFunded;
  }

  const {
    data: budgetLines,
    isLoading,
    error,
  } = useGetBudgetLinesQuery(queryParams);

  const options = useMemo(() => {
    return (
      budgetLines?.data?.result?.map((budgetLine: any) => ({
        label: shortenText(budgetLine.description, 15),
        value: budgetLine.id,
      })) || []
    );
  }, [budgetLines]);

  return {
    options,
    budgetLines: budgetLines?.data?.result || [],
    isLoading,
    error,
  };
};

export const useUseTypeOptions = (
  params: UseSelectOptionsParams['useTypesParams'] = {}
) => {
  const defaultParams = {
    pageSize: 1000,
    currentPage: 1,
    ...params,
  };

  const {
    data: useTypes,
    isLoading,
    error,
  } = useGetUseTypesQuery(defaultParams);

  const options = useMemo(() => {
    return (
      useTypes?.data?.map((useType: any) => ({
        label: useType.name,
        value: useType.id,
      })) || []
    );
  }, [useTypes]);

  return {
    options,
    isLoading,
    error,
  };
};

export const useGrantProviderOptions = (
  params: UseSelectOptionsParams['grantProvidersParams'] = {}
) => {
  const defaultParams = {
    pageSize: 1000,
    currentPage: 1,
    ...params,
  };

  const {
    data: grantProviders,
    isLoading,
    error,
  } = useGetGrantProvidersQuery(defaultParams);

  const options = useMemo(() => {
    return (
      grantProviders?.data?.result?.map((grantProvider: any) => ({
        label: grantProvider.description,
        value: grantProvider.id,
      })) || []
    );
  }, [grantProviders]);

  return {
    options,
    isLoading,
    error,
  };
};
