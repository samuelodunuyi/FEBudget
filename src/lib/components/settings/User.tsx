import { HStack, VStack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';

import Button from '~/lib/components/ui/Button';
import Input from '~/lib/components/ui/Input';
import Select from '~/lib/components/ui/Select';
import { addUserSchema } from '~/lib/schemas/general.schema';
import { roles } from '~/lib/utils/formatter';

interface UserProps {
  onClose?: () => void;
  data?: any;
}

const User = ({ onClose, data }: UserProps) => {
  const initialValues = {
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    email: data?.email || '',
    phoneNumber: data?.phoneNumber || '',
    role: data?.role || '',
    designation: data?.designation || '',
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
              label="First Name"
              name="firstName"
              type="text"
              placeholder="Enter First Name"
            />

            <Input
              label="Last Name"
              name="lastName"
              type="text"
              placeholder="Enter Last Name"
            />

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email"
            />

            <Input
              label="Phone Number"
              name="phoneNumber"
              type="text"
              placeholder="Enter Phone Number"
            />

            <Select
              label="Role"
              placeholder="Select Role"
              name="role"
              options={roles}
              fontSize={14}
            />

            <Select
              label="Designation"
              placeholder="Select Designation"
              name="designation"
              options={[
                { label: 'Designation 1', value: 'Designation 1' },
                { label: 'Designation 2', value: 'Designation 2' },
                { label: 'Designation 3', value: 'Designation 3' },
              ]}
              fontSize={14}
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

export default User;
