import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useStore from "../store";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { BsChevronExpand } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { useEffect } from "react";
import Input from "./ui/input";
import { fetchCountries } from "../libs";
import { Button } from "./ui/button";
import { toast } from "sonner";
import api from "../libs/apiCall";

export const SettingsForm = () => {
  const { user, theme, setTheme } = useStore((state) => state);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...user },
  });

  const [selectedCountry, setSelectedCountry] = useState(
    { country: user?.country, currency: user?.currency } || "",
  );
  const [query, setQuery] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const filteredCountries =
    query === ""
      ? countriesData
      : countriesData.filter((country) =>
          country.country
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, "")),
        );

 const onSubmit = async (values) => {
  try {
    setLoading(true); 
    const newData = {
      ...values,
      country: selectedCountry.country,
      currency: selectedCountry.currency,
    };

    const { data: res } = await api.put(`/user`, newData);

    if (res?.user) {
      const newUser = { ...res.user, token: user.token };
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success(res?.message);
    }
  } catch (error) {
    console.error("Something went wrong:", error);
    toast.error(error?.response?.data?.message || error.message);
  } finally {
    setLoading(false);
  }
};

  const toggleTheme = (val) => {
    setTheme(val);
    localStorage.setItem("theme", val);
  };

  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);
      const data = await fetchCountries();
      setCountriesData(data);
      setLoading(false);
    };
    loadCountries();
  }, []);

  const Countries = () => {
    return (
      <div className="w-full">
        <Combobox value={selectedCountry} onChange={setSelectedCountry}>
          <div className="relative mt-1">
            <div className="">
              <ComboboxInput
                className="inputStyles"
                displayValue={(country) => country?.country || ""}
                onChange={(e) => setQuery(e.target.value)}
              />
              <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                <BsChevronExpand className="text-gray-400" />
              </ComboboxButton>
            </div>
            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <ComboboxOptions className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-slate-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {filteredCountries.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-gray-500">
                    Nothing found.
                  </div>
                ) : (
                  filteredCountries?.map((country, index) => (
                    <ComboboxOption
                      key={country.country + index}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-violet-600/20 text-gray-900 dark:text-white"
                            : "text-gray-700 dark:text-gray-500"
                        }`
                      }
                      value={country}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center gap-2">
                            <img
                              src={country?.flag}
                              alt={country.country}
                              className="w-8 h-5 rounded-sm object-cover"
                            />
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {country?.country}
                            </span>
                          </div>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-teal-600"
                              }`}
                            >
                              <BiCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ComboboxOption>
                  ))
                )}
              </ComboboxOptions>
            </Transition>
          </div>
        </Combobox>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full">
          <Input
            disabled={loading}
            id="firstName"
            label="Name"
            type="text"
            placeholder="john"
            error={errors.firstName?.message}
            {...register("firstName")}
            className="inputStyle"
          />
        </div>
        <div className="w-full">
          <Input
            disabled={loading}
            id="lastName"
            label="Last Name"
            type="text"
            placeholder="john"
            error={errors.lastName?.message}
            {...register("lastName")}
            className="inputStyle"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full">
          <Input
            disabled={loading}
            id="email"
            label="Name"
            type="text"
            placeholder="john"
            error={errors.email?.message}
            {...register("email")}
            className="inputStyle"
          />
        </div>
        <div className="w-full">
          <Input
            disabled={loading}
            id="contact"
            label="Phone Number"
            type="text"
            placeholder="john"
            error={errors.contact?.message}
            {...register("contact",{
                required: "Contact number is required",
            })}
            className="inputStyle"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full">
          <span className="labelStyles">Country</span>
          <Countries />
        </div>
        <div className="w-full">
          <span className="labelStyles">Currency</span>
          <select className="inputStyles">
            <option>{selectedCountry?.currency || user?.currency}</option>
          </select>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-10">
        <div>
          <p className="text-lg font-semibold text-black dark:text-gray-400">
            Appearance
          </p>
          <span className="labelStyles">
            Customize how your theme looks on your device.
          </span>
        </div>
        <div className="w-28 md:w-40">
          <select
            className="inputStyles"
            defaultValue={theme}
            onChange={(e) => toggleTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      <div className="w-full flex items-center justify-between pb-10">
        <div>
          <p className="text-lg font-semibold text-black dark:text-gray-400">
            Language
          </p>
          <span className="labelStyles">
            Customize what language you want to use.
          </span>
        </div>
        <div className="w-28 md:w-40">
          <select className="inputStyles">
            <option value="English">English</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-6 justify-end pb-10 border-b-2 border-gray-200 dark:border-gray-800">
        <Button
          variant="outline"
          loading={loading}
          type="reset"
          className="px-6 bg-transparent text-black dark:text-white border border-gray-200 dark:border-gray-700"
        >
          Reset
        </Button>
        <Button
          loading={loading}
          type="submit"
          className="px-8 bg-violet-800 text-white"
        >
          Save
        </Button>
      </div>
    </form>
  );
};
