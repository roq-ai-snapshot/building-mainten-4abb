import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getCostById, updateCostById } from 'apiSdk/costs';
import { costValidationSchema } from 'validationSchema/costs';
import { CostInterface } from 'interfaces/cost';

function CostEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<CostInterface>(
    () => (id ? `/costs/${id}` : null),
    () => getCostById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CostInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCostById(id, values);
      mutate(updated);
      resetForm();
      router.push('/costs');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<CostInterface>({
    initialValues: data,
    validationSchema: costValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Costs',
              link: '/costs',
            },
            {
              label: 'Update Cost',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Cost
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Total Cost"
            formControlProps={{
              id: 'total_cost',
              isInvalid: !!formik.errors?.total_cost,
            }}
            name="total_cost"
            error={formik.errors?.total_cost}
            value={formik.values?.total_cost}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_cost', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.date ? new Date(formik.values?.date) : null}
              onChange={(value: Date) => formik.setFieldValue('date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.material_usage_details}
            label={'Material Usage Details'}
            props={{
              name: 'material_usage_details',
              placeholder: 'Material Usage Details',
              value: formik.values?.material_usage_details,
              onChange: formik.handleChange,
            }}
          />

          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/costs')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'Cost',
    operation: AccessOperationEnum.UPDATE,
  }),
)(CostEditPage);
