'use client';
import { post } from "@/lib/api/api";
import { Button } from "@/components/ui/button"
import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
 const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name Required'),
    email: Yup.string().email('Please enter valid email').required('Email required'),
    phone_number: Yup.string()
    .required('Phone number required')
    .test('is-number', 'Only numbers are allowed', (value) => {
      if (!value) return false; // Return false if value is empty or null
      return /^\d+$/.test(value); // Return true if value contains only digits
    })
});
function Contact() {
  console.log(process.env.SERVER_URL);
  
  const handleOnSubmit =  (values:any,{resetForm}:any) => {
    post(`/contact/saveContact`,values).then((res)=>{
      resetForm()
      
      toast.success('Your message has been sent!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

        });
    })
   }
  return (
    <>
    <div className="contact_page   space-y-5 flex flex-col py-20 items-center" id="contact">
        <p className="text-royalBlue text-s18_w600">Contact with me</p>
        <h2 className="text-4.5xl px-10" >Wanna Digitalize Your Idea ? </h2>
        <p className="text-s18_w500 text-customLightGray w-2/3">Got an idea or a problem in your business? Let`s make it happen! Reach out to me, and together, we`ll turn your vision into reality.</p>
        <div className="container mx-auto">
        <Formik
       initialValues={{
         name: '',
         company: '',
         email: '',
         phone_number: '',
         message: '',
       }}
       validationSchema={SignupSchema}
       onSubmit={handleOnSubmit}
     >
       {({ errors, touched }) => (
         <Form className="grid grid-cols-1 gap-8 sevenh:grid-cols-2">

          <div>
           <Field name="name" placeholder="Name"  className="bot_border_input" />
           {errors.name && touched.name? (
             <div className="error">{errors.name}</div>
           ) : null}
           </div>
           <Field name="company" placeholder="Company"  className="bot_border_input" />

           <div>
           <Field name="email" type="email" placeholder="Email"  className="bot_border_input" />
           {errors.email && touched.email ? <div className="error">{errors.email}</div> : null}
           </div>
           <div>
           <Field name="phone_number" placeholder="Phone Number"  className="bot_border_input"  />
           {errors.phone_number && touched.phone_number ? (
             <div className="error">{errors.phone_number}</div>
           ) : null}
           </div>
           
           <Field as="textarea" name="message" placeholder="Type your message here."  className="bot_border_textarea sevenh:col-span-2" />
           <Button variant="outline" className="sevenh:col-span-2 place-self-center text-s16_w600 bg-royalBlue text-white w-36" type="submit">Contact Me</Button>
         </Form>
       )}
     </Formik>
    </div>

      
    </div>
    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"

/>

    

     

    </>
  )
}

export default Contact
