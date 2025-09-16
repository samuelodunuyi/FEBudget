import {
  HStack,
  VStack,
  useToast,
  Button as ChakraButton,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

import Input from '~/lib/components/ui/Input';
import Select from '~/lib/components/ui/Select';
import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetAllDepartmentsQuery,
} from '~/lib/redux/services/user.service';
import { addUserSchema } from '~/lib/schemas/general.schema';
import { roles } from '~/lib/utils/formatter';

interface UserProps {
  onClose?: () => void;
  data?: any;
}

const User = ({ onClose, data }: UserProps) => {
  const toast = useToast();
  const [createUser, { isLoading: creating }] = useCreateUserMutation();
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();

  const { data: departmentsData } = useGetAllDepartmentsQuery(undefined);
  const departmentOptions =
    departmentsData?.data?.map((d: any) => ({
      label: d.name,
      value: d.id,
    })) || [];

  const initialValues = {
    name: data?.name || '',
    email: data?.email || '',
    phoneNumber: data?.phoneNumber || '',
    role: data?.role || '',
    department: data?.department || '',
    address: '',
  };

  const submitHandler = async (values: any) => {
    try {
      await addUserSchema.validate(values, { abortEarly: false });

      const payload = {
        ...values,
        address: '', 
      };

      if (data) {
        await updateUser({ id: data.id, ...payload }).unwrap();
        toast({
          title: 'User updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        await createUser(payload).unwrap();
        toast({
          title: 'User created successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }

      onClose?.();
    } catch (err: any) {
      if (err.inner && err.inner.length) {
        err.inner.forEach((e: any) => {
          toast({
            title: e.message,
            status: 'error',
            duration: 4000,
            isClosable: true,
          });
        });
      } else {
        toast({
          title: 'Something went wrong',
          status: 'error',
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={submitHandler}>
      {({ values, setFieldValue, isSubmitting }) => (
        <Form style={{ width: '100%' }}>
          <VStack bg="white" borderRadius="12px" w="full" align="stretch">
            <Input
              label="Full Name"
              name="name"
              type="text"
              placeholder="Enter Full Name"
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

            <Field name="role">
              {({ field, form }: any) => (
                <Select
                  label="Role"
                  placeholder="Select Role"
                  value={field.value}
                  onChange={(val: any) =>
                    form.setFieldValue('role', Number(val))
                  }
                  options={roles.map((r) => ({
                    label: r.label,
                    value: Number(r.value),
                  }))}
                  fontSize={14}
                />
              )}
            </Field>

            <Select
              label="Department"
              placeholder="Select Department"
              value={values.department || ''}
              onChange={(val: any) => setFieldValue('department', val)}
              options={departmentOptions.map(
                (dept: { label: any; value: any }) => ({
                  label: dept.label,
                  value: dept.value,
                  key: dept.value,
                })
              )}
              fontSize={14}
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

export default User;
