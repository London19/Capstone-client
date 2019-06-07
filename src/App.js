import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import Videos from './components/Videos'
import CreateVideo from './components/CreateVideo'
import ChangeVideo from './components/ChangeVideo'
// import Video from './components/Video'

import { SnackbarProvider } from 'notistack'
import { AnimatedSwitch } from 'react-router-transition'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  render () {
    const { user } = this.state

    return (
      <SnackbarProvider maxSnack={3}>
        <div><img className='bg' src={'https://www.google.com/search?biw=1390&bih=755&tbm=isch&sa=1&ei=6tj5XNKdCou0ggep85HADg&q=summer&oq=summer&gs_l=img.3..0i67l8j0j0i67.12276.15188..17592...0.0..0.90.479.6......0....1..gws-wiz-img.......35i39.GSdJPJvahyA#imgrc=HX2o60gLgXh95M:'} /></div>
        <Header user={user} />
        <main className="container">
          <Route exact path='/' render={() => (
            <Videos user={user} alert={this.alert} />
          )} />
          <AnimatedSwitch
            atEnter={{ opacity: 0, offset: 100 }}
            atLeave={{ opacity: 0, offset: -100 }}
            atActive={{ opacity: 1, offset: 0 }}
            className="switch-wrapper"
            mapStyles={(styles) => ({
              transform: `translateX(${styles.offset}%)`
            })}
          >
            <Route path='/sign-up' render={() => (
              <SignUp alert={this.alert} setUser={this.setUser} />
            )} />
            <Route path='/sign-in' render={() => (
              <SignIn alert={this.alert} setUser={this.setUser} />
            )} />
          </AnimatedSwitch>
          <AuthenticatedRoute user={user} exact path='/videos/:id/change-video' render={() => (
            <ChangeVideo alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/create-video' render={() => (
            <CreateVideo alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/videos' render={() => (
            <Videos alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
        </main>
      </SnackbarProvider>
    )
  }
}

export default App
