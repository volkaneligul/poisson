import React, { Component, Fragment } from 'react';

class Landing extends Component {
  render() {
    return (
      <Fragment>
        <section class="hero is-info is-medium">
          <div class="hero-body">
            <div class="container">
              <div class="has-text-centered">
                <h1 class="title is-1">
                  Let's join with us in awesome digital product brand.
                </h1>
                <a class="bd-tw-button button" href="/">
                  <span class="icon">
                    <i class="fa fa-lg fa-github" />
                  </span>
                  <span>Login with Github</span>
                </a>
                <a class="button" href="/">
                  <span class="icon">
                    <i class="fa fa-lg fa-twitter" />
                  </span>
                  <span>Login with Twitter</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section class="hero">
          <div class="hero-body">
            <div class="container">
              <div class="has-text-centered">
                <h1 class="title is-2 has-text-grey">Our Services</h1>
                <div class="columns">
                  <div class="column">
                    <i class="fa fa-code fa-5x has-text-primary" />
                    <h1 class="subtitle is-4 has-text-grey">Web Development</h1>
                    <p class="has-text-grey-dark">
                      Flexitarian vaporware disrupt ramps food truck mixtape
                      shaman health goth bicycle rights four loko. Schlitz
                      sustainable af scenester, air plant 8-bit poutine brunch
                      heirloom mixtape iPhone
                    </p>
                  </div>
                  <div class="column">
                    <i class="fa fa-mobile fa-5x has-text-primary" />
                    <h1 class="subtitle is-4 has-text-grey">
                      Mobile Development
                    </h1>
                    <p class="has-text-grey-dark">
                      Flexitarian vaporware disrupt ramps food truck mixtape
                      shaman health goth bicycle rights four loko. Schlitz
                      sustainable af scenester, air plant 8-bit poutine brunch
                      heirloom mixtape iPhone
                    </p>
                  </div>
                  <div class="column">
                    <i class="fa fa-desktop fa-5x has-text-primary" />
                    <h1 class="subtitle is-4 has-text-grey">Web Design</h1>
                    <p class="has-text-grey-dark">
                      Flexitarian vaporware disrupt ramps food truck mixtape
                      shaman health goth bicycle rights four loko. Schlitz
                      sustainable af scenester, air plant 8-bit poutine brunch
                      heirloom mixtape iPhone
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Landing;
