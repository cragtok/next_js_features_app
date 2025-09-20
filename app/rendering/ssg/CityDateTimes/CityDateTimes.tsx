import { fetchCityDateTimes } from "./apiCall";
import CityDateTimeCard from "./CityDateTimeCard";

const CityDateTimes = async () => {
    const cityDateTimes = await fetchCityDateTimes();

    return (
        <div className="flex flex-col">
            {cityDateTimes.map((cdt) => (
                <CityDateTimeCard
                    key={crypto.randomUUID()}
                    cityDateTime={cdt}
                />
            ))}
        </div>
    );
};

export default CityDateTimes;
