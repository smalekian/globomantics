import { useMutation } from '@apollo/client';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import { CREATE_SESSION } from './CREATE_SESSION';

export function SessionForm() {
  const navigate = useNavigate();
  const [create] = useMutation(CREATE_SESSION);

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 10,
      }}
    >
      <Formik
        initialValues={{
          title: '',
          description: '',
          format: '',
          level: '',
        }}
        onSubmit={async (values) => {
          await create({ variables: { session: values } });
          setTimeout(() => {
            navigate('/conference/sessions');
          }, 2000);
        }}
      >
        {() => (
          <Form style={{ width: '100%', maxWidth: 500 }}>
            <h3 className="h3 mb-3 font-weight-normal">Submit a Session!</h3>
            <div className="mb-3" style={{ paddingBottom: 5 }}>
              <label htmlFor="inputTitle">Title</label>
              <Field id="inputTitle" className="form-control" required autoFocus name="title" />
            </div>
            <div className="mb-3" style={{ paddingBottom: 5 }}>
              <label htmlFor="inputDescription">Description</label>
              <Field
                type="textarea"
                id="inputDescription"
                className="form-control"
                required
                name="description"
              />
            </div>
            <div className="mb-3" style={{ paddingBottom: 5 }}>
              <label htmlFor="inputFormat">Format</label>
              <Field name="format" id="inputFormat" className="form-control" required />
            </div>
            <div className="mb-3" style={{ paddingBottom: 5 }}>
              <label htmlFor="inputLevel">Level</label>
              <Field name="level" id="inputLevel" className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
