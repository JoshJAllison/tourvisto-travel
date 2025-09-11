import { ComboBox, ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Header } from "../../../components";
import type { Route } from './+types/create-trip'

export const loader = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  const data = await response.json();
  return data;
}

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const handleSubmit = async () => {};
  const countries = loaderData as Country[];
  console.log(countries);

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header title="Add a New Trip" description="View and edit AI generated travel plans" />

      <section className="mt-2.5 wrapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">
              Country
            </label>
              <ComboBoxComponent 
                  id="country"
                  dataSource={['title', 'title1']}
                />
          </div>
        </form>
      </section>
    </main>
  )
}

export default CreateTrip