import {h} from './lib/h.js';
import {RJElement} from './lib/elements.js';
import {store} from './lib/store.js';

customElements.define('rj-tabs', class extends RJElement {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  getStyle() {
    return `
      <style>
      .rj-tabs {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
      }
      
      .rj-tabs-tab {
          border-bottom: 2px solid transparent;
          color: #888;
          display: block;
          flex: 1;
          padding: 12px;
          text-align: center;
          text-decoration: none;
          text-transform: uppercase;
          transition: all 0.3s;
      }
      
      .rj-tabs-tab[data-is-active="true"] {
          border-color: #f03232;
          color: #f03232;
      }
      </style>
    `;
  }

  render() {
    // return `
    //   <div class="rj-tabs">
    //     <div class="rj-tabs-tab" data-is-active="true" onclick="">Tab 1</div>
    //     <div class="rj-tabs-tab" data-is-active="false" onclick="">Tab 2</div>
    //   </div>
    // `;

    return h(
      'div',
      {
        class: 'rj-tabs'
      },
      store.tabs.map((tab) => {
        return h(
          'div',
          {
            class: 'rj-tabs-tab',
            'data-is-active': store.activeTab === tab,
            'data-tab': tab,
            'on-click': this.handleClick
          },
          tab
        );
      })
    );
  }

  handleClick(e) {
    store.activeTab = e.target.dataset.tab;
  }
});

customElements.define('rj-message', class extends RJElement {
  getStyle() {
    return `
      <style>
      .rj-message {
        background-color: #fcf8e3;
        border: 1px solid #faebcc;
        border-radius: 3px;
        color: #8a6d3b;
        padding: 8px;
      }
      </style>
    `;
  }

  render() {
    // return `
    //   <div class="rj-message">
    //     <p>{{ content }}</p>
    //   </div>
    // `;

    return h(
      'div',
      {
        class: 'rj-message'
      },
      `${this.props.content} Content`
    );
  }
});

customElements.define('rj-contents', class extends RJElement {
  getStyle() {
    return `
      <style>
      .rj-contents {
          overflow: hidden;
      }
      
      .rj-contents-inner {
          display: flex;
          transition: all 0.3s;
          width: 200%;
      }
      
      .rj-contents[data-active-tab="0"] .rj-contents-inner {
          transform: translateX(0);
      }
      
      .rj-contents[data-active-tab="1"] .rj-contents-inner {
          transform: translateX(-50%);
      }
      
      .rj-contents[data-active-tab="0"] [data-tab="0"],
      .rj-contents[data-active-tab="1"] [data-tab="1"] {
          height: 0;
      }
      
      .rj-contents-tab {
          flex: 1;
          padding: 20px;
          text-transform: capitalize;
      }
      </style>
    `;
  }

  render() {
    // return `
    //   <div class="rj-contents" data-active-tab="0" data-tabs="2">
    //     <div class="rj-contents-inner">
    //       <div class="rj-contents-tab" data-tab="0">
    //         <rj-message></rj-message>
    //       </div>
    //       <div class="rj-contents-tab" data-tab="1">
    //         <rj-message></rj-message>
    //       </div>
    //     </div>
    //   </div>
    // `;

    return h(
      'div',
      {
        class: 'rj-contents',
        'data-active-tab': store.tabs.indexOf(store.activeTab),
        'data-tabs': store.tabs.length,
      },
      h(
        'div',
        {
          class: 'rj-contents-inner'
        },
        store.tabs.map((tab) => {
          return h(
            'div',
            {
              class: 'rj-contents-tab',
              'data-tab': store.tabs.indexOf(tab),
            },
            h(
              'rj-message',
              {
                'props-content': tab
              }
            )
          );
        })
      )
    );
  }
});

customElements.define('rj-app', class extends RJElement {
  constructor() {
    super();

    store.activeTab = 'valid';
    store.tabs = ['valid', 'expired'];

    this.handleResetWords = this.handleResetWords.bind(this);
  }

  getStyle() {
    return `
      <style>
      button {
        background-color: #f2f2f2;
        border: 0;
        border-radius: 3px;
        display: block;
        margin: auto;
        padding: 10px 20px;
      }
      </style>
    `;
  }

  render() {
    // return `
    //   <div class="rj-app">
    //     <rj-tabs></rj-tabs>
    //     <rj-contents></rj-contents>
    //     <button>Replace Content</button>
    //   </div>
    // `;

    return h(
      'div',
      {
        class: 'rj-app'
      },
      [

        h('rj-tabs'),

        h('rj-contents'),

        h(
          'button',
          {
            'on-click': this.handleResetWords,
          },
          'Replace Content'
        ),

      ]
    );
  }

  handleResetWords() {
    let words = getRandomWords();
    store.tabs = words;
    store.activeTab = rand(words);
  }
});

function getRandomWords() {
  let adj = ['jive', 'infinity', 'winter'];
  let noun = ['turkey', 'war', 'soldier'];
  let r = cycle(3);
  return [adj[r], noun[r]];
}

function cycle(n) {
  cycle.n = cycle.n || 0;
  cycle.n++;
  return (cycle.n - 1) % n;
}

function rand(n) {
  return n[Math.floor(Math.random() * n.length)];
}
