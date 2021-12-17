import 'materialize-css';
import VoicesList from './components/VoicesList';

const App = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s12">
          <h1>Список голосов</h1>
        </div>
      </div>
      <VoicesList></VoicesList>
    </div>
  );
}

export default App;
