import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setLocation, setIndustry, setSalary } from "@/redux/jobSlice";
import { useLocation, useNavigate } from "react-router-dom";

const filterData = [
  {
    filterType: "Location",
    array: ["All", "Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "All",
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["All", "0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setLocation(selectedLocation));
    dispatch(setIndustry(selectedIndustry));
    dispatch(setSalary(selectedSalary));
  }, [selectedLocation, selectedIndustry, selectedSalary, dispatch]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (selectedLocation) params.set("location", selectedLocation);
    else params.delete("location");

    if (selectedIndustry) params.set("industry", selectedIndustry);
    else params.delete("industry");

    if (selectedSalary) params.set("salary", selectedSalary);
    else params.delete("salary");

    navigate({ search: params.toString() });
  }, [
    selectedLocation,
    selectedIndustry,
    selectedSalary,
    location.search,
    navigate,
  ]);

  const handleFilterChange = (type, value) => {
    if (type === "Location") {
      setSelectedLocation(value);
    } else if (type === "Industry") {
      setSelectedIndustry(value);
    } else if (type === "Salary") {
      setSelectedSalary(value);
    }
    if (value === "All") {
      if (type === "Location") setSelectedLocation("");
      else if (type === "Industry") setSelectedIndustry("");
      else setSelectedSalary("");
    }
  };

  return (
    <div className="w-full bg-white p-3 rounded-md max-w-full sm:max-w-md md:max-w-lg">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      {filterData.map((data, index) => (
        <div key={index} className="mt-4">
          <h2 className="font-bold text-lg">{data.filterType}</h2>
          <RadioGroup
            value={
              data.filterType === "Location"
                ? selectedLocation
                : data.filterType === "Industry"
                ? selectedIndustry
                : selectedSalary
            }
            onValueChange={(value) =>
              handleFilterChange(data.filterType, value)
            }
          >
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
