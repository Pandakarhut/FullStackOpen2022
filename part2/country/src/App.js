import './App.css';
import { useState, useEffect } from 'react'
import { pinyin } from 'pinyin-pro'
import countryService from './services/countries'
import Country from './components/country'

function App() {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    countryService.getAll().then(countries => {
      // 预处理国家数据，添加拼音（移除空格）
      const countriesWithPinyin = countries.map(country => {
        const chineseName = country.translations.zho?.common || ''
        return {
          ...country,
          pinyinName: chineseName ? pinyin(chineseName, { toneType: 'none' }).replace(/\s+/g, '') : ''
        }
      })
      setCountries(countriesWithPinyin)
    })
  }, [])

  // 支持汉字、拼音（无空格）和英文搜索
  const filteredCountries = search
    ? countries.filter(country => {
        const searchTerm = search
        const searchTermLower = searchTerm.toLowerCase()// 移除搜索词中的空格

        // 英文名称（不区分大小写）
        const englishName = country.name.common.toLowerCase()
        // 中文名称（直接匹配）
        const chineseName = country.translations.zho?.common || ''
        // 拼音（不区分大小写，无空格）
        const pinyinName = country.pinyinName.toLowerCase()

        return englishName.includes(searchTermLower) ||
               chineseName.includes(searchTerm) ||
               pinyinName.includes(searchTermLower)
      })
    : []

  return (
    <div>
      <p>搜索国家</p>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="支持中文、拼音（无需空格）、英文搜索"
      />

      {filteredCountries.length > 10 &&
        <p>Too many matches, specify another filter 结果太多，请输入更详细的筛选条件</p>
      }

      {filteredCountries.length <= 10 && filteredCountries.length > 1 && (
        <ul>
          {filteredCountries.map(country =>
            <li key={country.cca3}>
              {country.translations.zho?.common || country.name.common}
              {' '}
              ({country.name.common})
              {' '}
              [{country.pinyinName}]
            </li>
          )}
        </ul>
      )}

      {filteredCountries.length === 1 &&
        <Country country={filteredCountries[0]} />
      }
    </div>
  );
}

export default App;