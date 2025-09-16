import { HStack, VStack, useToast, Button as ChakraButton } from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import Input from '~/lib/components/ui/Input';
import { useCreateDepartmentMutation, useUpdateDepartmentMutation } from '~/lib/redux/services/user.service';

interface DepartmentProps {
  onClose?: () => void;
  data?: any;
}

const Department = ({ onClose, data }: DepartmentProps) => {
  const toast = useToast();
  const [createDepartment, { isLoading: creating }] = useCreateDepartmentMutation();
  const [updateDepartment, { isLoading: updating }] = useUpdateDepartmentMutation();

  const initialValues = {
    name: data?.name || '',
    description: data?.description || '',
    code: data?.code || '',
  };

  const submitHandler = async (values: any) => {
    try {
      if (data) {
      await updateDepartment({ id: data.id, ...values }).unwrap();
        toast({
          title: 'Department updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await createDepartment(values).unwrap();
        toast({
          title: 'Department created successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }

      onClose?.();
    } catch (err: any) {
      // If Yup validation errors exist, show each in a toast
      if (err.inner && err.inner.length) {
        err.inner.forEach((e: any) => {
          toast({
            title: e.message,
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: 'top-right',
          });
        });
      } else {
        toast({
          title: 'Something went wrong',
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        });
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <Form style={{ width: '100%' }}>
          <VStack bg="white" borderRadius="12px" w="full" align="stretch">
            <Input
              label="Department Name"
              name="name"
              type="text"
              placeholder="Enter Department Name"
            />
            <Input
              label="Description"
              name="description"
              type="text"
              placeholder="Enter Description"
            />

                        <Input
              label="Code"
              name="code"
              type="text"
              placeholder="Enter Code"
            />
          </VStack>

          <HStack w="full" justify="flex-end" spacing={4} mt={6}>
            <ChakraButton
              type="submit"
              colorScheme="blue"
              isLoading={creating || updating || isSubmitting}
              width="full"
              fontWeight={400}
            >
              {data ? 'Update' : 'Add'}
            </ChakraButton>
          </HStack>
        </Form>
      )}
    </Formik>
  );
};

export default Department;
