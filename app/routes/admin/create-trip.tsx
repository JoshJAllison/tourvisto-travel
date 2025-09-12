import { ComboBox, ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Header } from "../../../components";
import type { Route } from "./+types/create-trip";
import { selectItems, comboBoxItems } from "~/constants";
import { formatKey } from "~/lib/utils";

export const loader = async () => {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,latlng,flag,maps"
  );
  if (!res.ok)
    throw new Response("Failed to load countries", { status: res.status });

  const data = await res.json();
  if (!Array.isArray(data))
    throw new Response("Unexpected countries payload", { status: 502 });

  return data.map((c: any) => ({
    name: c.flag + (c.name?.common ?? ""),
    value: c.name?.common ?? "",
    coordinates: c.latlng ?? [],
    openStreetMap: c.maps?.openStreetMap,
  }));
};

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const handleSubmit = async () => {};

  const handleChange = (key: keyof TripFormData, value: string | number) => {};

  const countries = loaderData as { name: string; value: string }[];

  const countryData = countries.map((c) => ({
    text: c.name,
    value: c.value,
  }));

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Add a New Trip"
        description="View and edit AI generated travel plans"
      />

      <section className="mt-2.5 wrapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">Country</label>
            <ComboBoxComponent
              id="country"
              dataSource={countryData}
              fields={{ text: "text", value: "value" }}
              placeholder="Select a Country"
              className="combo-box"
              change={(e: { value: string | undefined }) => {
                if (e.value) {
                  handleChange("country", e.value);
                }
              }}
              allowFiltering
              filtering={(e) => {
                const query = e.text.toLowerCase();

                e.updateData(
                  countries
                    .filter((country) =>
                      country.name.toLowerCase().includes(query)
                    )
                    .map((country) => ({
                      text: country.name,
                      value: country.value,
                    }))
                );
              }}
            />
          </div>
          <div>
              <label htmlFor="duration">Duration</label>
              <input
                id="duration"
                name="duration"
                type="number"
                placeholder="Enter a number of days"
                className="form-input placeholder:text-gray-100"
                onChange={(e) => handleChange('duration', Number(e.target.value))}
              />
          </div>

          {selectItems.map((key) => (
            <div key={key}>
              <label htmlFor={key}>
                {formatKey(key)}
              </label>
              <ComboBoxComponent 
                id={key}
                dataSource={comboBoxItems[key].map((item) => ({
                  text: item,
                  value: item,
                }))}
              />
            </div>
          ))}
        </form>
      </section>
    </main>
  );
};

export default CreateTrip;
