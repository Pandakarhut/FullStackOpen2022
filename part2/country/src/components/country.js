const Country = ({ country }) => {
    // 获取中文名称
    const chineseName = country.translations.zho?.common || country.name.common

    return (
        <div>
            <h3>{chineseName}</h3>
            <p>Capital {country.capital}</p>
            <p>Area {country.area} km²</p>
            <h4>Official languages</h4>
            <ul>
                {Object.values(country.languages).map((lang, index) =>
                    <li key={index}>{lang}</li>
                )}
            </ul>
            <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
                width="150"
            />
        </div>
    )
}

export default Country