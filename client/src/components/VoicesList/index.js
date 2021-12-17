import axios from 'axios';
import { useState, useEffect } from 'react';
import Autocomplete from '../Autocomplete';
import Table from '../Table';
import columnHeaders from './columnHeaders';
import s from './style.module.scss';

const VoicesList = () => {
  const [searchOptions, setSearchOptions] = useState([]);
  const [voices, setVoices] = useState([]);

  const fetchVoicesData = async (language = '') => {
    const voicesData = await axios(
      `/api/v1/voices/list?lang=${language}`
    );

    setVoices(voicesData.data);
  }

  const onAutocompleteHandler = (query) => {
    fetchVoicesData(query);
  }

  useEffect(() => {
    const fetchData = async () => {
      const languagesData = await axios(
        `/api/v1/voices/languages`
      );

      let options = {
        data: {}
      };

      languagesData.data.map( el => options.data[el] = null);

      setSearchOptions(options);
    }

    fetchData();
    fetchVoicesData();
  }, [])

  return (
    <>
      <div className="row">
          <div className="col m12">
          <div className="card">
            <div className={`card-content ${s.filterWrap} ${s.clearfix}`}>
              <span className="card-title col m12">Фильтр</span>
              <Autocomplete name="language" label="Язык" uppercase={true} customClass="col m12" options={searchOptions} onAutocompleteHandler={onAutocompleteHandler}></Autocomplete>
            </div>
          </div>
          </div>
          <div className="col m12">
          <Table columns={columnHeaders} rows={voices} />
          </div>
      </div>
    </>
  );
}

export default VoicesList;
