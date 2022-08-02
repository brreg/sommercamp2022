import { useEffect, useState} from 'react';
import axios from 'axios';

const useFetchData = () => {
  const [deathdata, setDeathData] = useState([]);
  const [licedata, setLiceData] = useState([]);
  const [escapedata, setEscapeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get('http://127.0.0.1:5000/orgs/averages/deadliness')
      .then(response => {
        setDeathData(response.data)
        console.log(response.data);
      }).catch (error => {
        console.error(error)
      }).finally(
        setLoading(false)
      )
    };

      fetchData();
    }, []);

  return {
    deathdata,
    loading
  };
};

export default useFetchData;