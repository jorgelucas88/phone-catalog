import { ConfirmProvider } from 'material-ui-confirm';
import './App.css';
import PhoneTable from './components/phonetable/phonetable';

function getPhoneTable() {
  return (
    <div className="col-md-12">               
        <section className="components">
          {<ConfirmProvider>
            <PhoneTable />
          </ConfirmProvider>}
        </section>
    </div>
  );
}

function App() {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      </head>

      <body>
        <header>
          <div className="navbar navbar-dark bg-dark shadow-sm">
            <div className="container d-flex justify-content-between">
                <svg width="30px" height="30px" viewBox="0 0 16 16" className="bi bi-calculator-fill" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm2 .5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zM4.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM4 12.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zM7.5 6a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM7 9.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm.5 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM10 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm.5 2.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-1z" />
                </svg>
            </div>
          </div>
        </header>

        <main role="main">

          <section className="jumbotron text-center">
            <div className="container">
              <h1>Phone catalog</h1>
              <p className="lead text-muted">A phone catalog consuming a rest API</p>
              <p className="lead text-muted"><h2><i>Click on a <b>table line</b> to see more details</i></h2></p>
            </div>
          </section>

          <div className="calculator py-5 bg-light">
            <div className="container">
              <div className="row justify-content-center">
                { getPhoneTable() }
              </div>
            </div>
          </div>
     

        </main>

        <footer className="text-muted">
          <div className="container">
            <p className="float-right">
              <a href="#top">Back to top</a>
            </p>
            <p>New to Bootstrap? <a href="https://getbootstrap.com/">Visit the homepage</a> or read our <a href="/docs/4.5/getting-started/introduction/">getting started guide</a>.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

export default App;
