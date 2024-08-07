// firebase

// Import the functions you need from the SDKs you need
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   getDocs,
//   updateDoc,
//   deleteDoc,
//   doc,
// } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
// import {
//   getAuth,
//   signInAnonymously,
//   onAuthStateChanged,
// } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDuj0fxaJaxdbleqORlL34Mi7ep8mG1oDQ',
  authDomain: 'examen-react-9901d.firebaseapp.com',
  projectId: 'examen-react-9901d',
  storageBucket: 'examen-react-9901d.appspot.com',
  messagingSenderId: '583774962590',
  appId: '1:583774962590:web:dbf904c9b06458b728cc8f',
};

// Initialisation de Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);
// __________________________________________________________
// react
class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titre: '',
      contenu: '',
      date: '',
      search: '',
      tab: [],
      erreur: '',
      modif: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleModif = this.handleModif.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { titre, contenu, date } = this.state;
    if (!titre || !contenu || !date) {
      this.setState({ erreur: 'Désolé ! Veuillez remplir tous les champs.' });
      return;
    }
    const nouveauNote = { titre, contenu, date };

    this.setState((prevState) => ({
      tab: [...prevState.tab, nouveauNote],
      titre: '',
      contenu: '',
      date: '',
      erreur: '',
    }));
  }

  handleClick(e) {
    this.setState((state) => ({
      tab: state.tab.filter((_, i) => i !== e),
    }));
  }

  handleModif(index) {
    const note = this.state.tab[index];
    this.setState({
      titre: note.titre,
      contenu: note.contenu,
      date: note.date,
      modif: index,
    });
  }

  handleUpdate(e) {
    e.preventDefault();
    const { titre, contenu, date, modif, tab } = this.state;
    if (!titre || !contenu || !date) {
      this.setState({ erreur: 'Désolé ! Veuillez remplir tous les champs.' });
      return;
    }
    const NoteMisAJour = { titre, contenu, date };
    const tabMisAJour = [...tab];
    tabMisAJour[modif] = NoteMisAJour;

    this.setState({
      tab: tabMisAJour,
      titre: '',
      contenu: '',
      date: '',
      erreur: '',
    });
  }

  handleSearch(e) {
    const titleSearch = e.target;
    if (titleSearch === tab.titre) {
    }
  }

  render() {
    return (
      <div className=" bg-dark py-5 text-center">
        <p>{this.state.titre}</p>

        <form
          onSubmit={
            this.state.modif === null ? this.handleSubmit : this.handleUpdate
          }
          className="d-flex mb-4 flex-rows justify-content-center gap-2"
        >
          <input
            type="text"
            className=" px-2"
            name="titre"
            value={this.state.titre}
            onChange={this.handleChange}
            placeholder="Title"
          />
          <input
            type="text"
            className=" px-2"
            name="contenu"
            value={this.state.contenu}
            onChange={this.handleChange}
            placeholder="Note contains..."
          />
          <input
            type="text"
            className=" px-2"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
            placeholder="JJ-MM-AA"
          />

          <button type="Submit" className="btn btn-primary">
            {this.state.modif === null ? 'Add' : 'Mettre à jour'}
          </button>
        </form>

        {this.state.erreur && (
          <p style={{ color: 'red' }}>{this.state.erreur}</p>
        )}

        <input
          type="text"
          className=""
          value={this.state.search}
          placeholder="search by title"
          onChange={this.handleSearch}
        />

        <div>
          <div className="row">
            {this.state.tab.map((note, index) => (
              <div className="card col-3 mx-1 my-2" key={index}>
                <div className="card-body">
                  <h3 className="card-title text-info">{note.titre}</h3>

                  <p className="card-text">{note.contenu}</p>
                  <p className="card-text">{note.date}</p>

                  <div className="div-btn">
                    <button
                      type="button"
                      className="btn btn-warning ms-0 "
                      onClick={() => this.handleModif(index)}
                    >
                      <i class="bi bi-pencil-square"></i>{' '}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger ms-0 "
                      onClick={() => this.handleClick(index)}
                    >
                      <i class="bi bi-archive-fill"></i>{' '}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Note />, document.querySelector('#root'));
