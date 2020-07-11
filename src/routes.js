import React from 'react';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Analysis from './pages/Analysis';
import NewAnalysis from './pages/NewAnalysis';
import AnalysisSingle from './pages/AnalysisSingle';
import AnalysisHome from './pages/AnalysisHome';

const BaseRouter = props => {
  return (
    <div style={{
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }} >
      <Route exact path='/' component={AnalysisHome} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/analysis' component={Analysis}/>
      <Route exact path='/analysis/create' component={NewAnalysis}/>
      <Route exact path='/analysis/view/:analysisID' component={AnalysisSingle}/>
    </div>
  );
};

export default BaseRouter;