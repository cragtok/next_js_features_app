import { fetchCityDateTimes } from "./apiCall";
import CityDateTimeCard from "./CityDateTimeCard";

const CityDateTimes = async () => {
    const cityDateTimes = await fetchCityDateTimes();

    return (
        <div className="flex flex-col">
            {cityDateTimes.map((cdt) => (
                <CityDateTimeCard
                    key={crypto.randomUUID()}
                    city={cdt.city}
                    date={cdt.date}
                    time={cdt.time}
                />
            ))}
        </div>
    );
};

export default CityDateTimes;
