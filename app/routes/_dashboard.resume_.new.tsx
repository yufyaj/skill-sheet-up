import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { addDoc, collection } from "firebase/firestore";
import ResumeForm from "~/components/ResumeForm";
import { db } from "~/lib/firebaseConfig";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const career = Object.fromEntries(formData);

  try {
    await addDoc(collection(db, "careers"), {
      title: career.title,
      description: career.description,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return redirect("/resume");
};

export default function ResumeNew() {
  return <ResumeForm />;
}
