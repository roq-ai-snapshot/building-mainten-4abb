import * as yup from 'yup';

export const taskSummaryValidationSchema = yup.object().shape({
  task_summaris: yup.string().required(),
});
