import { ComboBox, ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns";
import { Header } from "../../../components";
import type { Route } from "./+types/create-trip";
import { selectItems, comboBoxItems } from "~/constants";
import { formatKey, cn } from "~/lib/utils";
import { LayersDirective, MapsComponent, LayerDirective, Coordinate } from "@syncfusion/ej2-react-maps";
import { useState } from "react";
import { world_map } from "~/constants/world_map";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Account } from "appwrite";
import { account } from "~/appwrite/client";

type Country = {
  name: string;
  value: string;
  coordinates: number[];
  openStreetMap: string;
};

type TripFormData = {
  country: string;
  travelStyle: string;
  interest: string;
  duration: number;
  groupType: string;
  budget: string; // Add this missing property
};

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
  const countries = loaderData as Country[];
  const [formData, setFormData] = useState<TripFormData>({
    country: countries[0]?.value || '', // Use .value instead of .name
    travelStyle: '',
    interest: '',
    duration: 0,
    groupType: '',
    budget: '' // Initialize the new property
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true);

    if(
      !formData.country ||
      !formData.travelStyle ||
      !formData.interest ||
      !formData.budget ||
      !formData.groupType
    ) {
      setError('Please provide values for all fields');
      setLoading(false)
      return;
    }

    if(formData.duration < 1 || formData.duration > 10){
      setError('Duration must be between 1 and 10 days');
      setLoading(false)
      return;
    }
    const user = await account.get();
    if(!user.$id){
      console.error('User not authenticated');
      setLoading(false)
      return;
    }
    try{
      console.log('user', user);
      console.log('formData', formData);
    } catch (e){
      console.error('Error generating trips', e);
    } finally{
        setLoading(false)
    }
  };

  const handleChange = (key: keyof TripFormData, value: string | number) => {
    setFormData({ ... formData, [key]: value})
  };

  const countryData = countries.map((country) => ({
    text: country.name,
    value: country.value,
  }));

  const mapData = [
    {
      country: formData.country,
      color: '#EA382E',
      Coordinates: countries.find((c: Country) => c.name === formData.country)?.coordinates || []
    }
  ]

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
                fields={{ text: "text", value: "value" }}
                placeholder={`Select ${formatKey(key)}`}
                change={(e: { value: string | undefined }) => {
                  if (e.value) {
                    handleChange(key, e.value);
                  }
                }}
                allowFiltering
                filtering={(e) => {
                  const query = e.text.toLowerCase();

                  e.updateData(
                    comboBoxItems[key]
                      .filter((item) => item.toLowerCase().includes(query))
                      .map((item) => ({
                        text: item,
                        value: item,
                      }))
                  );
                }}
                className="combo-box"
              />
            </div>
          ))}

          <div>
            <label htmlFor="location">
              Location on the world map
            </label>
            <MapsComponent>
              <LayersDirective>
                <LayerDirective
                  shapeData={world_map}
                  dataSource={mapData}
                  shapePropertyPath="name"
                  shapeDataPath="country"
                  shapeSettings={{ colorValuePath: 'color', fill: '#e5e5e5'}}
                />
              </LayersDirective>
            </MapsComponent>
          </div>

          <div className="bg-gray-200 h-px w-full"/>

          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}

          <footer className="px-6 w-full">
            <ButtonComponent type="submit" className="button-class !h-12 !w-full disabled={loading}">
              <img src={`/assets/icons/${loading ? 'loader.svg' : 'magic-star.svg'}`} className={cn("size-5", {'animate-spin' : loading})}  />
              <span className="p-16-semibold text-white">
                {loading ? 'Generating...' : 'Generate Trip'}
              </span>
            </ButtonComponent>
          </footer>

        </form>
      </section>
    </main>
  );
};

export default CreateTrip;
