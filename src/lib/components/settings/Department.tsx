import { HStack, VStack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import Button from '~/lib/components/ui/Button';
import Input from '~/lib/components/ui/Input';
import { addUserSchema } from '~/lib/schemas/general.schema';

interface DepartmentProps {
  onClose?: () => void;
  data?: any;
}

const Department = ({ onClose, data }: DepartmentProps) => {
  const initialValues = {
    departmentName: data?.departmentName || '',
    description: data?.description || '',
  };

  const handleSubmit = async (values: any) => {
    console.log(values);
    onClose?.();
  };

  const handleUpdate = async (values: any) => {
    console.log(values);
    onClose?.();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addUserSchema}
      onSubmit={data ? handleUpdate : handleSubmit}
    >
      {() => (
        <Form style={{ width: '100%' }}>
          <VStack bg="white" borderRadius="12px" w="full" align="stretch">
            <Input
              label="Department Name"
              name="departmentName"
              type="text"
              placeholder="Enter Department Name"
            />

            <Input
              label="Description"
              name="description"
              type="text"
              placeholder="Enter Last Name"
            />
          </VStack>

          <HStack w="full" justify="flex-end" spacing={4} mt={6}>
            <Button
              text={data ? 'Update' : 'Add'}
              fontWeight={400}
              width="full"
              isLoading={false}
              isDisabled={false}
            />
          </HStack>
        </Form>
      )}
    </Formik>
  );
};

export default Department;
