import * as Yup from 'yup';
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
const add_edit_project_initial_values:AddProjectInitialValueType = {
    title : null,
    description : null,
    demo_link : null,
    code_link : null,
    tech_used : [],
    project_image : null
}

const add_edit_project_schema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .matches(/^\S.*\S$|^\S$/, 'Title should not have leading or trailing spaces'),
    description: Yup.string()
      .required('Description is required')
      .matches(/^\S.*\S$|^\S$/, 'Description should not have leading or trailing spaces'),
    demo_link: Yup.string()
      .required('Demo link is required')
      .matches(urlRegex, 'Demo link must be a valid URL'),
    code_link: Yup.string()
      .nullable()
      .test('is-url', 'Code link must be a valid URL', value => {
        if (!value) return true;
        return urlRegex.test(value);
      }),
      tech_used: Yup.array()
    .of(Yup.string())
    .min(3, 'At least 3 technologies must be specified'),
    project_image: Yup.mixed()
      .required('Image is required')
      .test('is-file-or-url', 'Image must be a file or a valid URL', value => {
        if (typeof value === 'string') {
          return urlRegex.test(value);
        }
        return value instanceof File;
      })
  });
  

  export {add_edit_project_schema,add_edit_project_initial_values }