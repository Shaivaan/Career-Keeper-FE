import * as Yup from 'yup';
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
const urlValidation = Yup.string().url('Must be a valid URL');
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
  

  const edit_profile_form_initial_values = {
    first_name :null,
    last_name : null,
    profile_picture:null,
    email : null,
    about: null
  }

  const edit_profile_form_validation_schema = Yup.object().shape({
    first_name: Yup.string()
    .required('First Name is required')
    .matches(/^\S.*\S$|^\S$/, 'Title should not have leading or trailing spaces'),
    last_name: Yup.string()
    .required('Last Name is required')
    .matches(/^\S.*\S$|^\S$/, 'Title should not have leading or trailing spaces'),
    email: Yup.string().email('Please enter proper email').required('Email is required'),
    about : Yup.string().required('About is required'),
    profile_picture: Yup.mixed()
      .required('Profile Picture is required')
      .test('is-file-or-url', 'Image must be a file or a valid URL', value => {
        if (typeof value === 'string') {
          return urlRegex.test(value);
        }
        return value instanceof File;
    }),
    
  });



  const showcase_form_initial_values = {
    linked_in : null,
    github : null,
    resume : null,
    instagram : null,
    youtube : null
  }

  const showcaseFormValidationSchema = Yup.object().shape({
    linked_in: urlValidation.required('LinkedIn Link is required'),
    github: urlValidation.required('GitHub Link is required'),
    resume: urlValidation.required('Resume Link is required'),
    instagram: urlValidation.nullable().matches(
      /^(https?:\/\/)?((w{3}\.)?)instagram\.com\/[a-zA-Z0-9(@\.\-_)]{1,}/,
      'Must be a valid Instagram URL'
    ),
    youtube: urlValidation.nullable().matches(
      /^(https?:\/\/)?((w{3}\.)?)youtube\.com\/[a-zA-Z0-9(@\.\-_)]{1,}/,
      'Must be a valid YouTube URL'
    ),
  });

  const expereince_form_initial_value={
    company_name : null,
    company_logo : null,
    exp_desciption : null,
    joining_date : null,
    end_date : null,
    is_currently_working : false
  }


  const baseExpchema = Yup.object().shape({
    company_name: Yup.string().required('Company name is required'),
    is_currently_working: Yup.boolean().required(),
    exp_desciption: Yup.string().required('Description is required'),
    company_logo: Yup.mixed()
      .required('Company logo is required')
      .test('is-file-or-url', 'Image must be a file or a valid URL', (value) => {
        if (typeof value === 'string') {
          const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
          return urlRegex.test(value);
        }
        return value instanceof File;
      }),
    joining_date: Yup.date().required('Joining date is required')
  });



  const endDateRequiredSchema = baseExpchema.shape({
    end_date: Yup.date()
      .required('End date is required')
      .min(Yup.ref('joining_date'), 'End date must be after joining date')
  });

  const endDateNotRequiredSchema = baseExpchema.shape({
    end_date: Yup.date().nullable()
  });


  export {baseExpchema,endDateRequiredSchema,endDateNotRequiredSchema,expereince_form_initial_value, showcase_form_initial_values,showcaseFormValidationSchema,edit_profile_form_initial_values,edit_profile_form_validation_schema ,add_edit_project_schema,add_edit_project_initial_values }