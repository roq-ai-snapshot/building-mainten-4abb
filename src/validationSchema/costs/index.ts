import * as yup from 'yup';

export const costValidationSchema = yup.object().shape({
  total_cost: yup.number().integer().nullable(),
  date: yup.date().nullable(),
  material_usage_details: yup.string().nullable(),
});
