import { useContext } from 'react';
import PlaceContetext from '../../contexts/place';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const CastomChart = () => {
  const Place = useContext(PlaceContetext)
  
  return (
    <Bar options={Place.options} data={Place.data} />
  )

}
export default CastomChart