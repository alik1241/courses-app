import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import Filter from "./components/Filters/Filter";
import axios from 'axios';
import { AppContext } from './services/AppContext';

function App() {
    const [data, setData] = useState({});
    const [load, setLoad] = useState(true);
    const [filter, setFilter] = useState({});
    const [isRub, setRub] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const request = {"data":""};
            const result = await axios.post(
                'http://krapipl.imumk.ru:8082/api/mobilev1/update',
                {request}
            );

            setData(result.data);
            setLoad(false);
        };

        loadData();
    }, []);

  return (
      <AppContext.Provider value={{data, filter, isRub, setRub, setFilter}}>
        <div className="App">
          <Header />
          <div className={'app__title'}>Витрина</div>
          <Filter />
          <Content load={load} />
          <Footer />
        </div>
      </AppContext.Provider>
  );
}

export default App;